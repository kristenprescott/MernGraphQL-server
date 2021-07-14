const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    username: String!
    tags: [String]
    selectedFile: String
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
    # TODO: figure out/finish adding commentComments & commentLikes
    # likes: [Like]!
    # comments: [Comment]!
    # likeCount: Int!
    # commentCount: Int!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(
      title: String!
      body: String!
      tags: [String]
      selectedFile: String
    ): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likeComment(commentId: ID!): Comment!
    commentComment(commentId: ID!): Comment!
  }
  type Subscription {
    newPost: Post!
  }
`;

// https://www.npmjs.com/package/graphql-subscriptions#pubsub-implementations (helps to ctrl + F "const pubsub")
