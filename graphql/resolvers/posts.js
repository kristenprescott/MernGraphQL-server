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

/*
{
  "data": {
    "getPosts": [
      {
        "id": "60ef1eb0eef01e124d52882c",
        "username": "aello",
        "title": "Yo Momma is Really Dumb",
        "body": "Yo mama's so dumb, she stared at a cup of orange juice for 12 hours because it said 'concentrate.'",
        "selectedFile": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.humanesociety.org%2Fresources%2Fcats-meow&psig=AOvVaw3N1YaWVusd1YCVUBOXJwg1&ust=1626326728003000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCJDYhKnp4fECFQAAAAAdAAAAABAK",
        "tags": [
          "yo momma",
          "jokes"
        ],
        "likes": [
          {
            "id": "60ef2273d3016613693535b1",
            "username": "aello",
            "createdAt": "2021-07-14T17:44:19.567Z"
          }
        ],
        "comments": [
          {
            "id": "60ef240b2a35a5138cfe94b2",
            "username": "aello",
            "body": "comment testing",
            "createdAt": "2021-07-14T17:51:07.620Z"
          }
        ],
        "likeCount": 1,
        "commentCount": 1,
        "createdAt": "2021-07-14T17:28:16.040Z"
      },
      {
        "id": "60ee7e2d97afd5fc75f2411c",
        "username": "aello",
        "title": "Yo Momma SO Fat",
        "body": "when she skips a meal, the stock market drops.",
        "selectedFile": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.humanesociety.org%2Fresources%2Fcats-meow&psig=AOvVaw3N1YaWVusd1YCVUBOXJwg1&ust=1626326728003000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCJDYhKnp4fECFQAAAAAdAAAAABAK",
        "tags": [
          "yo momma",
          "stonks"
        ],
        "likes": [],
        "comments": [
          {
            "id": "60ef1a511328e01132bc3123",
            "username": "aello",
            "body": "test comment",
            "createdAt": "2021-07-14T17:09:37.759Z"
          }
        ],
        "likeCount": 0,
        "commentCount": 1,
        "createdAt": "2021-07-14T06:03:25.618Z"
      },
      {
        "id": "60ee707e07f471f86bfad749",
        "username": "aello",
        "title": "Yo Momma SO Fat",
        "body": "when she skips a meal, the stock market drops.",
        "selectedFile": null,
        "tags": [],
        "likes": [],
        "comments": [
          {
            "id": "60ef3e6d0a21ab1e9c476da0",
            "username": "aello",
            "body": "blah blah blah",
            "createdAt": "2021-07-14T19:43:41.164Z"
          }
        ],
        "likeCount": 0,
        "commentCount": 1,
        "createdAt": "2021-07-14T05:05:02.284Z"
      },
      {
        "id": "60ee703607f471f86bfad747",
        "username": "aello",
        "title": "If I had a Million Dollars",
        "body": "*dabs*",
        "selectedFile": null,
        "tags": [],
        "likes": [],
        "comments": [
          {
            "id": "60ef3e8a0a21ab1e9c476da4",
            "username": "aello",
            "body": "blah blah blah",
            "createdAt": "2021-07-14T19:44:10.953Z"
          }
        ],
        "likeCount": 0,
        "commentCount": 1,
        "createdAt": "2021-07-14T05:03:50.184Z"
      },
      {
        "id": "60ee702507f471f86bfad745",
        "username": "aello",
        "title": "Moreover...",
        "body": "*dabs*",
        "selectedFile": null,
        "tags": [],
        "likes": [],
        "comments": [
          {
            "id": "60ef3e9d0a21ab1e9c476da8",
            "username": "aello",
            "body": "blah blah blah",
            "createdAt": "2021-07-14T19:44:29.144Z"
          }
        ],
        "likeCount": 0,
        "commentCount": 1,
        "createdAt": "2021-07-14T05:03:33.455Z"
      },
      {
        "id": "60ee700e07f471f86bfad743",
        "username": "aello",
        "title": "TestTitle",
        "body": "More than words, more than words...",
        "selectedFile": null,
        "tags": [],
        "likes": [],
        "comments": [
          {
            "id": "60ef3eae0a21ab1e9c476dac",
            "username": "aello",
            "body": "blah blah blah",
            "createdAt": "2021-07-14T19:44:46.022Z"
          }
        ],
        "likeCount": 0,
        "commentCount": 1,
        "createdAt": "2021-07-14T05:03:10.299Z"
      },
      {
        "id": "60ee6ff607f471f86bfad741",
        "username": "aello",
        "title": "HELLO",
        "body": "...world",
        "selectedFile": null,
        "tags": [],
        "likes": [],
        "comments": [
          {
            "id": "60ef3ebf0a21ab1e9c476db0",
            "username": "aello",
            "body": "blah blah blah",
            "createdAt": "2021-07-14T19:45:03.762Z"
          }
        ],
        "likeCount": 0,
        "commentCount": 1,
        "createdAt": "2021-07-14T05:02:46.011Z"
      }
    ]
  }
}

*/
