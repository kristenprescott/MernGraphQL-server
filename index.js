const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");

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

// start server:
server.listen({ port: 5000 }).then((res) => {
  console.log(`
    *----------------------------------*
    |----------------------------------|
    |-------- Server running: ---------|
    |----------------------------------|
    |---- ${res.url} ------|
    |----------------------------------|
    |----------------------------------|
    `);
});
/*
At localhost:5000 is the GraphQL playground, how cool is that?
*/
