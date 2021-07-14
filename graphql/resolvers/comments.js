const { UserInputError } = require("apollo-server");

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
        post.comments.unshit({
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
  },
};
