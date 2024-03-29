const { replySchema } = require("./replyModel");

const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
  fullName: { type: String, default: "yusuf ad" },
  username: {
    type: String,
    lowercase: true,
  },
  comment: {
    required: [true, "please enter write a comment"],
    type: String,
    maxlength: [255, "max length should be 255 characters"],
    trim: true,
  },
  userImg: {
    type: String,
    default: "https://mighty.tools/mockmind-api/content/human/65.jpg",
  },
  replies: [replySchema],
});

commentSchema.pre("save", function (next) {
  // arrow functions doesnt have this keyword
  console.log(this);

  this.username = this.fullName.split(" ").join("");

  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
