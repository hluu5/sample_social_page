const express = require('express');
const fs = require('fs');
const app = express();
const { promisify } = require('util');
const readFile= promisify(fs.readFile);
const graphqlHTTP = require('express-graphql');
const { schema } = require('../graphql_chema/schemaBuild');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const {DateTime, createEntries, getEntries} = require('../resolver/resolver');

const PORT = 4000;

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: {
    Date: DateTime,
    getEntries: getEntries,
    createEntries: createEntries
  },
  graphiql: true
}))

app.use(express.static('./public/index.html'));

app.listen(PORT, ()=> {
  console.log(`Now accepting connection on port ${PORT}`)
})