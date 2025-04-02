"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const federation_1 = require("@apollo/federation");
// Define the Product type and Query type using GraphQL schema language
const typeDefs = (0, server_1.gql) `
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
        getProduct: (_, { id }) => {
            return { id, name: 'Product A', price: 100.0 };
        },
    },
    Product: {
        __resolveReference(product) {
            return { id: product.id, name: 'Product A', price: 100.0 };
        },
    },
};
// Create and start the Apollo Server for this subgraph
const server = new server_1.ApolloServer({
    schema: (0, federation_1.buildSubgraphSchema)({ typeDefs, resolvers }),
});
server.listen(4002).then(({ url }) => {
    console.log(`Products Subgraph ready at ${url}`);
});
