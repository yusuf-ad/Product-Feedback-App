const express = require("express");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

router
  .route("/")
  .get(feedbackController.getAllFeedbacks)
  .post(feedbackController.createFeedback)
  .delete(feedbackController.deleteAllFeedback);

router
  .route("/:id")
  .get(feedbackController.getFeedback)
  .put(feedbackController.updateFeedback)
  .patch(feedbackController.upvoteFeedback)
  .delete(feedbackController.deleteFeedback);

module.exports = router;
