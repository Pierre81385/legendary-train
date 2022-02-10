const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User!
    userByEmail(userEmail: String!): User!
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth

    login(email: String!, password: String!): Auth

    deleteUser(email: String!): User
  }
`;

//ALERT: Make any changes here, and reinstall node modules in client

module.exports = typeDefs;
