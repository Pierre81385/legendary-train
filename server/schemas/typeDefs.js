const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    streetAddress1: String!
    streetAddress2: String
    city: String!
    state: String!
    zipcode: String!
    products: [Product!]!
  }

  type Product {
    _id: ID!
    image: String
    name: String!
    desc: String!
    price: Int!
    quantity: Int!
    user: User!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User!
    userByEmail(userEmail: String!): User!
    products: [Product]!
    product(productId: ID!): Product!
  }

  type Mutation {
    addUser(
      name: String!
      email: String!
      password: String!
      streetAddress1: String!
      streetAddress2: String!
      city: String!
      state: String!
      zipcode: String!
    ): Auth

    addProduct(
      image: String
      name: String!
      desc: String!
      price: String!
      quantity: String!
      user: String!
    ): Product

    login(email: String!, password: String!): Auth

    deleteUser(email: String!): User
  }
`;

//ALERT: Make any changes here, and reinstall node modules in client

module.exports = typeDefs;
