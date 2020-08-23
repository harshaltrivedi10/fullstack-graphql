const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    pets: [Pet]!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String!
    img: String
    owner: User!
  }

  input PetInput {
    name: String
    type: String
  }

  input CreatePetInput {
    name: String!
    type: String!
  }
  # Mutation to create a Pet using name and Type
  type Query {
    pets(input: PetInput): [Pet]!
    pet(input: PetInput): Pet
  }

  type Mutation {
    createNewPet(input: CreatePetInput!): Pet!
  }
`;

module.exports = typeDefs;
