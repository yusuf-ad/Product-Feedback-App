const mongoose = require("mongoose");

const { Schema } = mongoose;

const replySchema = new Schema({
  fullName: { type: String, default: "yusuf ad" },
  username: {
    type: String,
    lowercase: true,
  },
  comment: {
    required: [true, "please write a comment"],
    type: String,
    maxlength: [255, "max length should be 255 characters"],
    trim: true,
  },
  userImg: {
    type: String,
  },
});

replySchema.pre("save", function (next) {
  // arrow functions doesnt have this keyword
  console.log(this);

  this.username = this.fullName.split(" ").join("");

  next();
});

const Reply = mongoose.model("reply", replySchema);

module.exports = { Reply, replySchema };
