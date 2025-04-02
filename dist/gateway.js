"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const gateway_1 = require("@apollo/gateway");
const gateway = new gateway_1.ApolloGateway({
    serviceList: [
        { name: 'users', url: 'http://localhost:4001' },
        { name: 'products', url: 'http://localhost:4002' },
    ],
});
// Create the Apollo Server that uses the Apollo Gateway
const server = new server_1.ApolloServer({
    gateway,
    subscriptions: false, // Disable subscriptions for simplicity
});
server.listen(4000).then(({ url }) => {
    console.log(`Gateway ready at ${url}`);
});
