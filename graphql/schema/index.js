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
    bye: String!
    anotherHello: String!
    users: [User!]!
    refreshToken: LoginResponse!
  }

  type Mutation {
    register(email: String!, password: String!): String!
    login(email: String!, password: String!): LoginResponse!
    revokeRefreshToken(userId: ID!): Boolean!
  }
`;

module.exports = typeDefs;
