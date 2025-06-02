# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import firestore_fn, https_fn
from firebase_admin import initialize_app, firestore
import json

initialize_app()

def cors_headers():
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  }

@https_fn.on_request()
def submit_score(req: https_fn.Request) -> https_fn.Response:
  # Configure CORS
  headers = cors_headers()

  # Handle preflight requests
  if req.method == 'OPTIONS':
    return https_fn.Response('', status=204, headers=headers)
    
  # Handle non-POST requests
  if req.method != 'POST':
    return https_fn.Response(
      json.dumps({"error": "Method not allowed"}),
      status=405,
      headers=headers
    )

  try:
    # Grab the data
    data = req.get_json(silent=True) or {}
    score_value = data.get("score")
    user_id = data.get("userId", "anonymous")

    # Validate the score
    if score_value is None:
      return https_fn.Response(
        json.dumps({"error": "Missing score"}),
        status=400,
        headers=headers
      )

    # Save the score to Firestore
    db = firestore.client()
    doc_ref = db.collection("scores").add({
      "userId": "anonymous",
      "score": score_value,
    })

    # Return a success response
    return https_fn.Response(
      json.dumps({
        "message": "Score submitted successfully", 
        "score": score_value,
      }),
      status=200,
      headers=headers
    )

  # Handle any exceptions
  except Exception as e:
    # Log the error
    return https_fn.Response(
      json.dumps({"error": str(e)}),
      status=500,
      headers=headers
    )