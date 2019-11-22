
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { promisify } = require('util');
const fs = require('fs');
const readFile= promisify(fs.readFile);
const writeFile= promisify(fs.writeFile);

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
    //this is just a placeholder function. Depends on which params are passed through request, this function will change
    let sortFunction = null;
    currentPagination.offset = args.input.offset;

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
};

const createEntries =  (args) => {
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
  return readFile('../../Nougit Coding Challenge/entries.json','utf8')
  .then(data=>{
    const parsed = JSON.parse(data);
    // console.log(parsed.length)
    return parsed;
  })
  // .then((parsed)=> {
  //   let newJson = parsed.push(parsed);
  //   console.log(newJson);
  //   return writeFile('../../Nougit Coding Challenge/entries.json', newJson, (err) => {
  //     if (err) throw err;
  //     console.log('Data written to file');
  //     return newJson
  //   });
  // })
  .catch(err=>console.log(err))
}

module.exports = {
  DateTime,
  getEntries,
  createEntries
}
