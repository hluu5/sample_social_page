const express = require('express');
const fs = require('fs');
const app = express();
const { promisify } = require('util');
const readFile= promisify(fs.readFile);
const graphqlHTTP = require('express-graphql');
const { schema } = require('../graphql_chema/schemaBuild');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const {Date, createEntries, getEntries} = require('../resolver/resolver');

//For the purpose of this project, I declare a globale in memory oject to store current position of pagination
//for real app, I could store in something like a session using redis.
// let currentPagination = {
//   first: 0,
//   offset: 0
// }

//this is just a placeholder function. Depends on which params are passed through request, this function will change

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: {
    Date: Date,
    getEntries: getEntries,
    createEntries: createEntries
  },
  graphiql: true
}))

const PORT = 4000;

app.listen(PORT, ()=> {
  console.log(`Now accepting connection on port ${PORT}`)
})