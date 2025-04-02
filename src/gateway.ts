import { ApolloServer } from '@apollo/server';
import { ApolloGateway } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'users', url: 'http://localhost:4001' },
    { name: 'products', url: 'http://localhost:4002' },
  ],
});




// Create the Apollo Server that uses the Apollo Gateway
const server = new ApolloServer({
    gateway,
    // Subscriptions are not supported in Apollo Gateway
  });
  
  // Start the server using startStandaloneServer
  const PORT = 4000;
  startStandaloneServer(server, {
    listen: { port: PORT },
  }).then(({ url }) => {
    console.log(`Gateway ready at ${url}`);
  });
