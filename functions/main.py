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
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN")

initialize_app()

def cors_headers():
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  }

@https_fn.on_request()
def submit_score(req: https_fn.Request) -> https_fn.Response:
  headers = cors_headers()

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

    # Save user submission to scores - update previously submitted score if exists
    query = db.collection("scores").where("userId", "==", user_id).limit(1).get()

    if query:
        # Found existing doc
        doc_ref = query[0].reference
    else:
        # No document found, create a new one
        doc_ref = db.collection("scores").document()

    doc_ref.set({
        "userId": user_id,
        "score": score_value,
        "checklist": [item.dict() for item in checklist]
    }, merge=True)

    # Increment global stats — but only if user hasn't already voted for that item
    for item in checklist:
      vote_doc_ref = db.collection("checklist_votes").document(f"item_{item.id}").collection("voters").document(user_id)
      vote_snapshot = vote_doc_ref.get()

      if item.isChecked:
        if not vote_snapshot.exists:
          # User newly checked → increment and record
          vote_doc_ref.set({})
          stats_ref = db.collection("checklist_stats").document("global")
          stats_ref.set({str(item.id): firestore.Increment(1)}, merge=True)
      else:
        if vote_snapshot.exists:
          # User previously checked but now unchecked → decrement and remove vote
          vote_doc_ref.delete()
          stats_ref = db.collection("checklist_stats").document("global")
          stats_ref.set({str(item.id): firestore.Increment(-1)}, merge=True)

    return https_fn.Response(json.dumps({
      "message": "Score submitted successfully",
      "userId": user_id,
      "score": score_value
    }), status=200, headers=headers)

  except Exception as e:
    return https_fn.Response(json.dumps({"error": str(e)}), status=500, headers=headers)