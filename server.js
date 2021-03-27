const express = require('express')
const morgan = require('morgan')
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./models');
const app = express();

// Construct a schema, using GraphQL schema language
const typeDefs = require('./graphql/typeDefs');

// Provide resolver func for your schema fields
const resolvers = require('./graphql/resolvers')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'vash');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', require('./routes/index'));
 const server = new ApolloServer({ typeDefs, resolvers, context: ({ db }) })
 server.applyMiddleware({app});


app.listen(4200, ()=> console.log(`Server is running on http://localhost:4200${server.graphqlPath}`));