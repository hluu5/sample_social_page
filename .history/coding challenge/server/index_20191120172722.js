const express = require('express');
const fs = require('fs');
const app = express();
const { promisify } = require('util');
const readFile= promisify(fs.readFile);
const graphqlHTTP = require('express-graphql');
const { schema } = require('../graphql_chema/schemaBuild');

let currentPagination = {
  first: 0,
  offset: 0
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: {
    getEntries: (args)=> {
      return readFile('../../Nougit Coding Challenge/entries.json','utf8')
      .then(data=>JSON.parse(data))
      .then((parsed)=> {
        let sortFunction = null;
        if (args.input.sortby === 'date') {
          sortFunction = (a,b)=>{
            if (new Date(a.date) > new Date(b.date)) return -1;
            else return 1;
          };
        } else if (args.input.sortby === 'popularity') {
          sortFunction = (a,b)=>{
            if (a.popularity > b.popularity) return -1;
            else return 1;
          };
        }
        const sorted = parsed.sort(sortFunction);
        let paginated = sorted.slice(currentPagination.first, currentPagination.first+currentPagination.offset);
        // update pagination
        currentPagination.first += currentPagination.offset;
        return paginated;
      })
      .catch((err)=>{
        if (err) console.log(err);
      })
    },

    createEntries: (args) => {
      const entry = {
        author: args.author,
        popularity: args.popularity,
        isTrending : args.isTrending,
        date : new Date().toISOString(),
        title : args.title,
        description : args.description,
        numComments : args.numComments,
        thumbnail : args.thumbnail,
        codeSubmissionTotal : args.codeSubmissionTotal,
        pledgeTotal : args.pledgeTotal,
        pledgeGoal : args.pledgeGoal,
        pledgerCount : args.pledgerCount,
        status : args.status,
      };
      return fs.writeFile('../../Nougit Coding Challenge/entries.json', entry, (err) => {
        if (err) throw err;
        console.log('Data written to file');
        return entry
      });
    }
  },
  graphiql: true
}))

const PORT = 4000;

app.listen(PORT, ()=> {
  console.log(`Now accepting connection on port ${PORT}`)
})