const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type User {
    id: String
    name: String
    email: String
    role: String
    password: String
  }
  type AuthData {
    userId: String!
    token: String!
    tokentExpiration: String!
  }
  type Query {
    users: [User]
    user(id: String): User
  }
  type Mutation {
    signup(name: String!, email: String!, password: String!, role: String!): String
    login(email: String!, password: String!): AuthData

    addUser(name: String, email: String, password: String, role: String): User
    updateUser(id: String, name: String, email: String, password: String, role: String): User
    removeUser(id: String): User
  }
`;
module.exports = { typeDefs };
