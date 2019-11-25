const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const { schema } = require('../graphql_chema/schemaBuild');
const bodyParser = require('body-parser');
const {DateTime, createEntries, getEntries} = require('../resolver/resolver');

const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/graphql', function (req, res, next) {
  console.log(req);
  next();
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: {
    Date: DateTime,
    getEntries: getEntries,
    createEntries: createEntries
  },
  graphiql: true
}))

app.use(express.static('./public'));

app.listen(PORT, ()=> {
  console.log(`Now accepting connection on port ${PORT}`)
})