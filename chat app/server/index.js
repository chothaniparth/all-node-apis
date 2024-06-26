const express = require('express');
const qpp = express();
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    greeting: String,
    name: String
  }
`;

const resolvers = {
  Query: {
    greeting: () => 'Hello GraphQL world!👋',
    name: () => 'Parth'
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen({ port: 9000 })
  .then(({ url }) => console.log(`Server running at ${url}`));
