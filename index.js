const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
// mongoose: ORM library, Object Relational Mapper, which allows interface w MongoDB
const mongoose = require("mongoose");

const { MONGODB_URI } = require("./config.js");

// types for GraphQL:
const typeDefs = gql`
  type Query {
    # String! <--- ! means required
    sayHi: String!
  }
`;

// each query/mutation/subscription has a corresponding resolver
const resolvers = {
  Query: {
    sayHi: () => "Hello, world.",
  },
};

// set up Apollo server:
const server = new ApolloServer({
  // typeDefs & resolvers
  typeDefs,
  resolvers,
});

// chain our server to mongodb:
mongoose
  .connect(MONGODB_URI, {
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
    |----------------------------------|
    |---- ${res.url} ------|
    |----------------------------------|
    |----------------------------------|
    `);
  })
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
    process.exit(-1);
  });
/*
At localhost:5000 is the GraphQL playground, how cool is that?
*/
