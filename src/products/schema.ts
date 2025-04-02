
import { ApolloServer} from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/federation';
import gql from 'graphql-tag';

// Define the Product type and Query type using GraphQL schema language
const typeDefs = gql`
  type Product @key(fields: "id") {
    id: ID!
    name: String!
    price: Float!
  }

  type Query {
    getProduct(id: ID!): Product
  }
`;

// Define resolvers for the Product and Query types
const resolvers = {
  Query: {
    getProduct: (_: any, { id }: { id: string }) => {
      return { id, name: 'Product A', price: 100.0 };
    },
  },
  Product: {
    __resolveReference(product: { id: string }) {
      return { id: product.id, name: 'Product A', price: 100.0 };
    },
  },
};

// Create the Apollo Server for this subgraph
const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });
  
  // Start the server using startStandaloneServer
  const PORT = 4002;
  startStandaloneServer(server, {
    listen: { port: PORT },
  }).then(({ url }) => {
    console.log(`Products Subgraph ready at ${url}`);
  });

