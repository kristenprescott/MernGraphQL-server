const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  username: String,
  title: String,
  body: String,
  tags: [String],
  selectedFile: String,
  likeCount: Number,
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  commentCount: Number,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
      // TODO: figure out/finish adding commentComments & commentLikes
      // comments: [
      //   {
      //     body: String,
      //     username: String,
      //     createdAt: String,
      //   },
      // ],
      // likes: [
      //   {
      //     username: String,
      //     createdAt: String,
      //   },
      // ],
      // likeCount: Number,
      // commentCount: Number,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: String,
});

module.exports = model("Post", postSchema);
