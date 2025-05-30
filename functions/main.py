# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import firestore_fn, https_fn
from firebase_admin import initialize_app, firestore

initialize_app()


@https_fn.on_request()
def submit_score(req: https_fn.Request) -> https_fn.Response:
  data = req.get_json(silent=True) or {}
  score_value = data.get("score")

  if score_value is None:
    return https_fn.Response("Missing score", status=400)

  response = {
    "score": score_value,
  }

  # Save the score to Firestore
  db = firestore.client()
  db.collection("scores").add({
    "userId": "anonymous",
    "score": score_value,
  })

  return https_fn.Response("Score submitted successfully", status=200)

