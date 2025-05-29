# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import firestore_fn, https_fn
from firebase_admin import initialize_app, firestore

initialize_app()


@https_fn.on_request()
def submit_score(req: https_fn.Request) -> https_fn.Response:
  # Should be just a parameter like "score=100"
  score = req.args

  if not score or len(score) != 1:
    return https_fn.Response("Invalid request", status_code=400)

  score_value = score.get("score")

  response = {
    "score": score_value,
  }

  # Save the score to Firestore
  db = firestore.client()

  scores_ref = db.collection("scores")
  scores_ref.add(
    {
      "userId": "anonymous",
      "score": score_value,
    }
  )

  return https_fn.Response("Score submitted successfully")

