const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  mediaName: {
    type: String,
    required: true,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      comment: {
        type: String,
        default: "",
      },
    },
  ],
  tags: [String],
  dateCreated: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dateUpdated: {
    type: Date,
  },
});

module.exports = Post = mongoose.model("posts", PostSchema);
