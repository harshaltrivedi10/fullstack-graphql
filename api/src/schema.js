const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String!
  }

  input PetInput {
    name: String
    type: String
  }
  #  Filter pets by type
  #  query named Pet that returns only one pet. Filter by name or id
  type Query {
    pets(input: PetInput): [Pet]!
    pet(input: PetInput): Pet
  }
`;

module.exports = typeDefs;
