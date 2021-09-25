const mongoose = require("mongoose");

const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./graphql/schema/index");
const resolvers = require("./graphql/resolvers/index");

const apolloServer = new ApolloServer({ typeDefs, resolvers });

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

// MongoClient.connect(uri, {}, (err, client) => {
//   if (err) console.log("Cannot connect to the database");

//   const db = client.db("jwt-auth");

//   db.collection("users").insertOne(
//     {
//       name: "Jon",
//       age: 24,
//     },
//     (err, res) => {
//       if (err) console.log("ERROR ADDING USER TO DB");
//       console.log("Adding user successfull");
//     }
//   );
// });
