const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

router
  .route("/:id")
  .get(commentController.getAllComments)
  .put(commentController.createComment)
  .delete(commentController.deleteAllComments);

module.exports = router;
