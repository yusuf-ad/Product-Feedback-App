const express = require("express");
const replyController = require("../controllers/replyController");
const router = express.Router();

router
  .route("/:id")
  .get(replyController.getAllReplies)
  .post(replyController.createReply)
  .delete(replyController.deleteAllReplies);

module.exports = router;
