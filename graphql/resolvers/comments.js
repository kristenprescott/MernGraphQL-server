const { UserInputError } = require("apollo-server");
const checkAuth = require("../../utils/check-auth");

const Post = require("../../models/Post");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw UserInputError("Error: empty comment.", {
          errors: {
            body: "Did you forget to write something? Your comment is empty.",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found.");
      }
    },
    async likeComment(_, { commentId }, context) {
      const { username } = checkAuth(context);

      const comment = await Comment.findById(commentId);
      if (comment) {
        if (comment.likes.find((like) => like.username === username)) {
          // Comment already likes, unlike it:
          comment.likes = comment.likes.filter(
            (like) => like.username !== username
          );
        } else {
          // Not liked, like comment:
          comment.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await comment.save();
        return comment;
      } else throw new UserInputError("Comment not found.");
    },
  },
};
