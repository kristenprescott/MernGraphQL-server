require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

const port = process.env.PORT || 5000;

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
  })
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
    process.exit(-1);
  });
