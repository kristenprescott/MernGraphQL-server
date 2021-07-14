const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    username: String!
    tags: [String]!
    selectedFile: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
  }
  # type Tag {
  #   body: String!
  #   createdAt: String!
  # }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
    likes: [Like]!
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
      tags: [String]!
      selectedFile: String
    ): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    likeComment(commentId: ID!): Comment!
    tagPost(postId: ID!, body: String!): Post!
  }
`;
