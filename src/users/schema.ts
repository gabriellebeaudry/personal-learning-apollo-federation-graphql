import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/federation';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag'; // Correct import for gql



// Define the User type and Query type using GraphQL schema language
const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    getUser(id: ID!): User
  }
`;

// Define resolvers for the User and Query types
const resolvers = {
  Query: {
    getUser: (_: any, { id }: { id: string }) => {
      return { id, name: 'John Doe', email: 'john@example.com' };
    },
  },
  User: {
    __resolveReference(user: { id: string }) {
      return { id: user.id, name: 'John Doe', email: 'john@example.com' };
    },
  },
};


// Create the Apollo Server for this subgraph
const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
  });
  
  // Start the server using startStandaloneServer
  const PORT = 4001;
  startStandaloneServer(server, {
    listen: { port: PORT },
  }).then(({ url }) => {
    console.log(`Users Subgraph ready at ${url}`);
  });