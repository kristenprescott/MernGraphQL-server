const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  username: String,
  title: String,
  body: String,
  tags: [String],
  selectedFile: String,
  commentCount: Number,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
      comments: [
        {
          body: String,
          username: String,
          createdAt: String,
        },
      ],
      likes: [
        {
          username: String,
          createdAt: String,
        },
      ],
      likeCount: Number,
      commentCount: Number,
    },
  ],
  likeCount: Number,
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: String,
});

module.exports = model("Post", postSchema);
