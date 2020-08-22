const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
  type User {
    email: String!
    avatar: String!
    friends: [User]!
  }

  type Shoe {
    brand: String!
    size: Int!
  }

  input ShoesInput {
    brand: String
    size: Int
  }

  input NewShoeInput {
    brand: String!
    size: Int!
  }

  type Query {
    me: User!
    friends: [User]!
    shoes(input: ShoesInput): [Shoe]!
  }

  type Mutation {
    newShoe(input: NewShoeInput!): Shoe!
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        email: "test@test.com",
        avatar: "http://yoda.png",
        friends: []
      };
    },
    shoes(_, { input }) {
      return [
        { brand: "adidas", size: 12 },
        { brand: "nike", size: 11 }
      ].filter((shoe) => shoe.brand === input.brand);
    }
  },
  Mutation: {
    newShoe(_, { input }) {
      return input;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4000).then(() => console.log("On Port 4000"));
