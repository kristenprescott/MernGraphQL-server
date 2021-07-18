// const { ApolloServer, PubSub } = require("apollo-server");
const dotenv = require("dotenv");
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

const port = process.env.PORT || 5000;

// const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: ({ req }) => ({ req }),
  context: ({ req }) => ({ req, pubsub }),
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
    return server.listen(port, () => {
      console.log(`
    *----------------------------------*
    |----------------------------------|
    |-------- Server running: ---------|
    |---------- port: ${port} ------------|
    |----------------------------------|
    |----------------------------------|
    `);
    });
  })
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });
