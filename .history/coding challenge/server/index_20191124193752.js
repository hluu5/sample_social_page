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
const StyleContext = require('isomorphic-style-loader/StyleContext').StyleContext;
const ReactDOMServer = require('react-dom/server').ReactDOMServer;
const React = require('react');
const App = require('../client/app.jsx');

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

app.use('/static', express.static(__dirname + '../public/'));

// const InitialState = initialState;
app.get('/', (req,res)=> {

  const css = new Set() // CSS for all rendered React components

  const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))
  const component = ReactDOMServer.renderToString(
      <StyleContext.Provider value={{ insertCss }}>
        <App />
      </StyleContext.Provider>)
  const html = `
    <!DOCTYPE html>
    <html>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <head>
      <head>
        <script>window._InitialState = ${JSON.stringify(initialState)}</script>
      </head>
      </head>
      <body>
        <div id="app">${component}</div>
        <script src="./app.js"></script>
      </body>
    </html>
  `
  res.send(html)
})


app.listen(PORT, ()=> {
  console.log(`Now accepting connection on port ${PORT}`)
})