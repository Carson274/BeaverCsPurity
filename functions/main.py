# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import firestore_fn, https_fn
from firebase_admin import initialize_app, firestore
import json
from models import ChecklistItem
from dotenv import load_dotenv
import os

load_dotenv()
ALLOWED_ORIGINS = {
  origin.strip()
  for origin in (os.environ.get("ALLOWED_ORIGIN", "")).split(",")
  if origin.strip()
}

initialize_app()

def cors_headers(request_origin: str | None):
  allow_origin = request_origin if request_origin in ALLOWED_ORIGINS else next(iter(ALLOWED_ORIGINS), "")
  return {
    'Access-Control-Allow-Origin': allow_origin,
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  }

@https_fn.on_request(max_instances=10)
def submit_score(req: https_fn.Request) -> https_fn.Response:
  headers = cors_headers(req.headers.get('Origin'))

  if req.method == 'OPTIONS':
    return https_fn.Response('', status=204, headers=headers)

  if req.method != 'POST':
    return https_fn.Response(json.dumps({"error": "Method not allowed"}), status=405, headers=headers)

  try:
    data = req.get_json(silent=True) or {}
    score_value = data.get("score")
    user_id = str(data.get("userId", "anonymous"))  # force string for Firestore doc ID
    checklist_raw = data.get("checklist", [])

    if score_value is None:
      return https_fn.Response(json.dumps({"error": "Missing score"}), status=400, headers=headers)

    try:
      checklist: List[ChecklistItem] = [ChecklistItem(**item) for item in checklist_raw]
    except ValidationError as e:
      return https_fn.Response(json.dumps({"error": "Invalid checklist", "details": e.errors()}), status=400, headers=headers)

    db = firestore.client()

    # Create a new document in the "scores" collection
    doc_ref = db.collection("scores").document()

    doc_ref.set({
        "userId": user_id,
        "score": score_value,
        "checklist": [item.dict() for item in checklist],
        "submittedAt": firestore.SERVER_TIMESTAMP
    })

    stats_ref = db.collection("question_stats").document("global")

    for item in checklist:
      question_key = f"Q{item.id + 1}"
      vote_doc_ref = db.collection("question_votes").document(question_key).collection("voters").document(user_id)
      vote_snapshot = vote_doc_ref.get()

      if item.isChecked:
        if not vote_snapshot.exists:
          vote_doc_ref.set({})
          stats_ref.set({question_key: firestore.Increment(1)}, merge=True)
      else:
        if vote_snapshot.exists:
          vote_doc_ref.delete()
          stats_ref.set({question_key: firestore.Increment(-1)}, merge=True)

    return https_fn.Response(json.dumps({
      "message": "Score submitted successfully",
      "userId": user_id,
      "score": score_value
    }), status=200, headers=headers)

  except Exception as e:
    return https_fn.Response(json.dumps({"error": str(e)}), status=500, headers=headers)


@https_fn.on_request(max_instances=10)
def get_stats(req: https_fn.Request) -> https_fn.Response:
  headers = cors_headers(req.headers.get('Origin'))

  if req.method == 'OPTIONS':
    return https_fn.Response('', status=204, headers=headers)

  if req.method != 'GET':
    return https_fn.Response(json.dumps({"error": "Method not allowed"}), status=405, headers=headers)

  try:
    db = firestore.client()
    snapshot = db.collection("question_stats").document("global").get()
    stats = snapshot.to_dict() if snapshot.exists else {}
    return https_fn.Response(json.dumps({"stats": stats}), status=200, headers=headers)
  except Exception as e:
    return https_fn.Response(json.dumps({"error": str(e)}), status=500, headers=headers)