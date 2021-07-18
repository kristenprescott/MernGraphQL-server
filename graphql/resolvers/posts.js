const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      console.log("getPosts");
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        // TODO: fix error--->>
        /*
i have error when "Post body must not be empty" 
show me this message : "Unhandled Rejection (Error): GraphQL error: Post body must not be empty"
any solution ??

=====>>

I believe I got this error in my posts validator file, I changed the error to a string ('Post not found') instead of passing the error itself
        */
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      console.log("getPost");
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
      console.log("createPosts");
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error(
          "You didn't write anything in your post - the post cannot be empty."
        );
      }

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

      context.pubsub.publish("NEW_POST", {
        newPost: post,
      });

      return post;
    },
    async deletePost(_, { postId }, context) {
      console.log("deletePost");

      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      console.log("likePost");

      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already likes, unlike it:
          post.likes = post.likes.filter((like) => like.username !== username);
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
  },
  Subscription: {
    newPost: {
      // NEW_POST == EventEmitter, convention says ALL CAPS NAMES
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};
