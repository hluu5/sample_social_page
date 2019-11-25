const express = require('express');
const fs = require('fs');
const app = express();
const { promisify } = require('util');
const readFile= promisify(fs.readFile);
const graphqlHTTP = require('express-graphql');
const { schema } = require('../graphql_chema/schemaBuild');
const bodyParser = require('body-parser');
const {DateTime, createEntries, getEntries} = require('../resolver/resolver');

//pull initial state from json file
const initialState = require('../../entries.json').slice(0,5);

//import react modules;
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import React from 'react';
import { App } from '../client/app.jsx';

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

app.use('/static', express.static(path.resolve(__dirname, '../public')));

// const InitialState = initialState;
app.get('/', (req,res)=> {
  const component = ReactDOMServer.renderToString(<App />)

  const html = `
  <!doctype html>
    <html>
    <head>
      <script>window.__INITIAL__DATA__ = ${JSON.stringify({ name })}</script>
    </head>
    <body>
    <div id="root">${component}</div>
    <script src="/static/home.js"></script>
  </body>
  </html>`

<!DOCTYPE html>
<html>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <head>
  <head>
    <script>window._InitialState = ${JSON.stringify(initialState)}</script>
  </head>
  </head>
  <body>
    <div id='app'></div>
    <script src='./app.js'></script>
  </body>
</html>

  res.send(html)
})
// console.log(InitialState)

app.listen(PORT, ()=> {
  console.log(`Now accepting connection on port ${PORT}`)
})