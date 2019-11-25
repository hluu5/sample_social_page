const express = require('express');
const fs = require('fs');
const app = express();
const { promisify } = require('util');
const readFile= promisify(fs.readFile);
const graphqlHTTP = require('express-graphql');
const { schema } = require('./graphql_chema/schemaBuild.js');
const bodyParser = require('body-parser');
const {DateTime, createEntries, getEntries} = require('./resolver/resolver');

//pull initial state from json file
const initialState = require('../entries.json').slice(0,5);

//import react modules;
const ReactDOMServer = require('react-dom/server');
const React = require('react');
import App from './client/app.jsx';
import path from 'path';
// console.log(App)
const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: {
    Date: DateTime,
    getEntries: getEntries,
    createEntries: createEntries
  },
  graphiql: true
}))

app.use('/app', (req,res)=> {
  res.send(require('./public/app.js'))
});

// const InitialState = initialState;
app.get('/', (req,res)=> {

  const component = ReactDOMServer.renderToString(<App listState={JSON.stringify(initialState)}/>)

  const html = `
    <!DOCTYPE html>
    <html>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <head>
      </head>
      <body>
        <div id="app">${component}</div>
        <script src="/app/app.js"></script>
      </body>
    </html>
  `
  res.send(html)
})


app.listen(PORT, ()=> {
  console.log(`Now accepting connection on port ${PORT}`)
})