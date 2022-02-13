import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $name: String!
    $email: String!
    $password: String!
    $streetAddress1: String!
    $streetAddress2: String!
    $city: String!
    $state: String!
    $zipcode: String!
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
      streetAddress1: $streetAddress1
      streetAddress2: $streetAddress2
      city: $city
      state: $state
      zipcode: $zipcode
    ) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($email: String!) {
    deleteUser(email: $email) {
      email
    }
  }
`;
