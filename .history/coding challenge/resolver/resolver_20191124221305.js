
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { promisify } = require('util');
const fs = require('fs');
const readFile= promisify(fs.readFile);
const writeFile= promisify(fs.writeFile);
const _ = require('lodash');

//For the purpose of this project, I declare a globale in memory oject to store current position of pagination
//for real app, I could store in something like a session using redis.
let currentPagination = {
  first: 0,
  offset: 0
}

//custom scalar DateTime type
const DateTime =  new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.getTime();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    return null;
  },
});

const getEntries = (args)=> {
  return readFile('../../Nougit Coding Challenge/entries.json','utf8')
  .then(data=>{
    const parsed = JSON.parse(data);
    return parsed
  })
  .then((parsed)=> {
    let filterFunction = (e)=>{return e};

    //this is just a placeholder function. Depends on which params are passed through request, this function will change
    let sortFunction = null;

    //set pagination offset
    currentPagination.offset = args.input.offset;

    //filter by trending;
    if (args.input.filter==='trending') {
      filterFunction = (e) => { return e.isTrending === true }
    }

    //filter by trending;
    if (args.input.filter==='openTasks') {
      filterFunction=(e)=>{return e.status === 1}
    }

    //filter by trending;
    if (args.input.filter==='completedTasks') {
      filterFunction=(e)=>{return e.status === 0}
    }

    //filter our result:
    let filtered = _.filter(parsed, filterFunction)
    //reset pagination
    if (args.input.first!==undefined) {
      currentPagination.first = args.input.first;
    }

    //sort by date
    if (args.input.sortby === 'date') {
      sortFunction = (a,b)=>{
        if (new Date(a.date) > new Date(b.date)) return -1;
        else return 1;
      };
      //sort by popularity
    } else if (args.input.sortby === 'popularity') {
      sortFunction = (a,b)=>{
        if (a.popularity > b.popularity) return -1;
        else return 1;
      };
    }
    const sorted = filtered.sort(sortFunction);
    // console.log(currentPagination.first)

    let paginated = sorted.slice(currentPagination.first, currentPagination.first+currentPagination.offset);
    // update pagination
    currentPagination.first += currentPagination.offset;
    return paginated;
  })
  .catch((err)=>{
    if (err) console.log(err);
  })
};

const createEntries =  (args) => {
  const entry = {
    author: {
      name: args.input.author.name,
      picture: args.input.author.picture,
      score: args.input.author.score
    },
    popularity: args.input.popularity,
    isTrending : args.input.isTrending,
    date : new Date().toISOString(),
    title : args.input.title,
    description : args.input.description,
    numComments : args.input.numComments,
    thumbnail : args.input.thumbnail,
    codeSubmissionTotal : args.input.codeSubmissionTotal,
    pledgeTotal : args.input.pledgeTotal,
    pledgeGoal : args.input.pledgeGoal,
    pledgerCount : args.input.pledgerCount,
    status : args.input.status,
  };
  return readFile('../../Nougit Coding Challenge/entries.json','utf8')
  .then(data=>{
    const parsed = JSON.parse(data);
    return parsed;
  })
  .then((parsed)=> {
    let jsonArr = parsed;
    jsonArr.push(entry);
    return writeFile('../../Nougit Coding Challenge/entries.json', JSON.stringify(jsonArr,null,4))
      .then(()=>{
        console.log('Data written to file');
        return entry
      })
      .catch((err) => {throw err;})
  })
  .catch(err=>console.log(err));
}

module.exports = {
  DateTime,
  getEntries,
  createEntries
}
