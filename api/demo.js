const gql = require("graphql-tag");
const { ApolloServer } = require("apollo-server");

const typeDefs = gql`
  type User {
    email: String!
    avatar: String!
    shoes: [Shoe]!
  }

  interface Shoe {
    brand: String!
    size: Int!
    user: User!
  }

  type Sneaker implements Shoe {
    brand: String!
    size: Int!
    sport: String!
    user: User!
  }

  type Boot implements Shoe {
    brand: String!
    size: Int!
    isWaterproof: Boolean!
    user: User!
  }

  enum ShoeType {
    JORDAN
    NIKE
    ADIDAS
    FILA
    REDTAPE
  }

  input ShoesInput {
    brand: ShoeType
    size: Int
  }

  input NewShoeInput {
    brand: ShoeType!
    size: Int!
  }

  type Query {
    me: User!
    shoes(input: ShoesInput): [Shoe]!
  }

  type Mutation {
    newShoe(input: NewShoeInput!): Shoe!
  }
`;

const user = {
  id: 1,
  email: "test@test.com",
  avatar: "http://yoda.png",
  shoes: []
};

const shoes = [
  { brand: "ADIDAS", size: 12, sport: "TENNIS", user: 1 },
  { brand: "NIKE", size: 12, sport: "BASKETBALL", user: 1 },
  { brand: "REDTAPE", size: 11, isWaterproof: true, user: 1 }
];

const resolvers = {
  Query: {
    me() {
      return user;
    },
    shoes(_, { input }) {
      return shoes;
    }
  },
  Mutation: {
    newShoe(_, { input }) {
      return input;
    }
  },
  Shoe: {
    __resolveType(shoe) {
      if (shoe.sport) return "Sneaker";
      return "Boot";
    },
    user(shoe) {
      return user;
    }
  },
  User: {
    shoes(user) {
      return shoes;
    }
  },
  Sneaker: {
    user(shoe) {
      return user;
    }
  },
  Boot: {
    user(shoe) {
      return user;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(4000).then(() => console.log("On Port 4000"));
