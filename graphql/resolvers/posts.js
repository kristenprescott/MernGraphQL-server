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

      context.pubsub.publish("NEW_POST", {
        newPost: post,
      });

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return `Success! Post has been deleted.`;
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
/*
Getting started with your first subscription
To begin with GraphQL subscriptions, start by defining a GraphQL Subscription type in your schema:

```
type Subscription {
    somethingChanged: Result
}

type Result {
    id: String
}
Next, add the Subscription type to your schema definition:

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
```

Now, let's create a simple PubSub instance - it is a simple pubsub implementation, based on EventEmitter. Alternative EventEmitter implementations can be passed by an options object to the PubSub constructor.

```
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();
```

Now, implement your Subscriptions type resolver, using the pubsub.asyncIterator to map the event you need:

```
const SOMETHING_CHANGED_TOPIC = 'something_changed';

export const resolvers = {
  Subscription: {
    somethingChanged: {
      subscribe: () => pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC),
    },
  },
}
```

Subscriptions resolvers are not a function, but an object with subscribe method, that returns AsyncIterable.

Now, the GraphQL engine knows that somethingChanged is a subscription, and every time we use pubsub.publish over this topic - it will publish it using the transport we use:

```
pubsub.publish(SOMETHING_CHANGED_TOPIC, { somethingChanged: { id: "123" }});
```

**Note** that the default PubSub implementation is intended for demo purposes. It only works if you have a single instance of your server and doesn't scale beyond a couple of connections. For production usage you'll want to use one of the PubSub implementations backed by an external store. (e.g. Redis)



*/
