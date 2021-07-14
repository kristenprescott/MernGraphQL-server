require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const Post = require("./models/Post");
const { MONGODB } = require("./config.js");

const port = process.env.PORT || 5000;

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Connected to MongoDB - live is goood B^D`);
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`
    *----------------------------------*
    |----------------------------------|
    |-------- Server running: ---------|
    |---------- port: ${port} ------------|
    |---- ${res.url} ------|
    |----------------------------------|
    |----------------------------------|
    `);
  });
//   .catch((err) => {
//     console.log(`DB Connection Error: ${err.message}`);
//     process.exit(-1);
//   });
/*
At localhost:5000 is the GraphQL playground, how cool is that?
*/
