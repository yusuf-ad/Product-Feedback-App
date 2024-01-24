const mongoose = require("mongoose");
const { commentSchema } = require("./commentModel");

const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      default: "Feature",
    },
    status: {
      type: String,
      default: "Suggestion",
    },
    upvoted: {
      type: Boolean,
      default: false,
    },
    totalUpvotes: {
      type: Number,
      default: 0,
    },
    totalComments: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema], // Defining the comments field as an array of commentSchema objects
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
