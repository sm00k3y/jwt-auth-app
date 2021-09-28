const mongoose = require("mongoose");
const express = require("express");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/schema/index");
const resolvers = require("./graphql/resolvers/index");

const isAuth = require("./middleware/isAuth");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return { req, res, auth: isAuth(req) };
  },
  cors: { origin: "http://localhost:3000", credentials: true },
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.646yw.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("\n\tConnected to MongoDB!");

    apolloServer.listen().then(() => {
      console.log(`
        Server is running!
        Listening on port 4000
      `);
    });
  })
  .catch((err) => {
    console.log(err);
  });
