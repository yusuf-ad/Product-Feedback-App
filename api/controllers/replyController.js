const Comment = require("../models/commentModel");
const { Reply } = require("../models/replyModel");

exports.getAllReplies = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        replies: comment.replies,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "not found",
      message: err.message,
    });
  }
};

exports.createReply = async (req, res) => {
  try {
    const newReply = {
      fullName: req.body.fullName,
      username: req.body.username,
      comment: req.body.comment,
      userImg: req.body.userImg,
    };

    const reply = await Reply.create(newReply);

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $push: { replies: reply } },
      { new: true } // Set new: true to return the updated feedback document
    );

    if (!comment)
      return res.status(404).json({
        message: "Comment can not be found!",
      });

    res.status(200).json({
      status: "success",
      data: {
        reply,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed to create reply",
      error: err.message,
    });
  }
};

exports.deleteAllReplies = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        replies: [],
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
