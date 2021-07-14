const { AuthenticationError, UserInputError } = require("apollo-server");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        // show all posts in descending order:
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found.");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { title, body, tags, selectedFile }, context) {
      const user = checkAuth(context);
      console.log("user: ", user);

      // there is def a user here at this point
      const newPost = new Post({
        title,
        body,
        tags,
        selectedFile,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return `Success! Post has been deleted, ${user.username}.`;
        } else {
          throw new AuthenticationError("Action not allowed.");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.usernam === username)) {
          // Post already likes, unlike it:
          post.likes = post.likes.filter((like) => likes.username !== user);
        } else {
          // Not liked, like post:
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError("Post not found.");
    },
    // async tagPost(_, { postId }) {
    //   const post = await Post.findBeId(postId);
    //   cont newTag = await

    //   if (post) {
    //     post.tags.push({

    //     });

    //     await post.save();
    //     return post;
    //   } else throw new UserInputError("Post not found.");
    // },
  },
};
