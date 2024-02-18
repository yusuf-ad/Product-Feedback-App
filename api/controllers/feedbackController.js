const Feedback = require("../models/feedbackModel");

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    res.status(200).json({
      results: feedbacks.length,
      status: "success",
      data: {
        feedbacks,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate(
      "comments"
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
      message: err.message,
    });
  }
};

exports.createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);

    console.log(req.body);

    res.status(200).json({
      status: "success",
      data: {
        feedback,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

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

exports.upvoteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (feedback.upvoted) --feedback.totalUpvotes;
    else ++feedback.totalUpvotes;

    feedback.upvoted = !feedback.upvoted;

    // save this document to the database
    feedback.save();

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

exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback)
      return res.status(404).json({
        message: "Cannot found an item by that id",
      });

    // ! 204 means no content
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
