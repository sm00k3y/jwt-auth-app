const { gql } = require("apollo-server");

const typeDefs = gql`
  type LoginResponse {
    accessToken: String!
  }

  type User {
    _id: ID!
    email: String!
  }

  type Query {
    hello: String!
    anotherHello: String!
    users: [User!]!
  }

  type Mutation {
    register(email: String!, password: String!): String!
    login(email: String!, password: String!): LoginResponse!
  }
`;

module.exports = typeDefs;

// const typeDefs = gql`
//   type Launch {
//     id: ID!
//     site: String
//     mission: Mission
//     rocket: Rocket
//     isBooked: Boolean!
//   }

//   type Rocket {
//     id: ID!
//     name: String
//     type: String
//   }

//   type User {
//     id: ID!
//     email: String!
//     trips: [Launch]!
//     token: String
//   }

//   type Mission {
//     name: String
//     missionPatch(size: PatchSize): String
//   }

//   enum PatchSize {
//     SMALL
//     LARGE
//   }

//   type Query {
//     launches: [Launch]!
//     launch(id: ID!): Launch
//     me: User
//   }

//   type Mutation {
//     bookTrips(launchIds: [ID]!): TripUpdateResponse!
//     cancelTrip(launchId: ID!): TripUpdateResponse!
//     login(email: String): User
//   }

//   type TripUpdateResponse {
//     success: Boolean!
//     message: String
//     launches: [Launch]
//   }
// `;

// module.exports = typeDefs;
