const Feedback = require("../models/feedbackModel");
const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
  try {
    const newComment = {
      fullName: req.body.fullName,
      username: req.body.username,
      comment: req.body.comment,
      userImg: req.body.userImg,
    };

    const comment = await Comment.create(newComment);

    await Feedback.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: comment._id }, $inc: { totalComments: 1 } }, // $inc is used to increment totalComments by 1
      { new: true } // Set new: true to return the updated feedback document
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
      message: `${err.message} 😂`,
    });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate(
      "comments"
    );

    res.status(200).json({
      status: "success",
      length: feedback.comments.length,
      data: {
        comments: feedback.comments,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteAllComments = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        comments: [],
        totalComments: 0,
      },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        feedback,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
