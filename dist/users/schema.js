"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const server_2 = require("@apollo/server");
const federation_1 = require("@apollo/federation");
const standalone_1 = require("@apollo/server/standalone");
// Define the User type and Query type using GraphQL schema language
const typeDefs = (0, server_1.gql) `
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
        getUser: (_, { id }) => {
            return { id, name: 'John Doe', email: 'john@example.com' };
        },
    },
    User: {
        __resolveReference(user) {
            return { id: user.id, name: 'John Doe', email: 'john@example.com' };
        },
    },
};
// Create the Apollo Server for this subgraph
const server = new server_2.ApolloServer({
    schema: (0, federation_1.buildSubgraphSchema)({ typeDefs, resolvers }),
});
// Start the server using startStandaloneServer
const PORT = 4001;
(0, standalone_1.startStandaloneServer)(server, {
    listen: { port: PORT },
}).then(({ url }) => {
    console.log(`Users Subgraph ready at ${url}`);
});
