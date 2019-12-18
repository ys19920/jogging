const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
const config = require('./config');
const mongoose = require('mongoose');
const { typeDefs } = require('./graphql/types');
const { resolvers } = require('./graphql/resolver');
const jwt = require('express-jwt');
app.use(cors());

//mongodb
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.mongoURL, error => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
  console.log('Connected to MongoDB'); // eslint-disable-line
});

// auth middleware
const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
});
app.use(auth);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
});

server.applyMiddleware({
  app // app is from an existing express app
});

app.listen({ port: PORT }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
