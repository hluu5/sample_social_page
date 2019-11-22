const graphql = require('graphql');

const { buildSchema } = graphql;

const schema = buildSchema(`
  scalar Status {
    _0
    _1
  }

  scalar Date 
  
  type author {
    name : String
    picture : String
    score : Float
  },

  type Entry {
    author: author
    popularity: Float
    isTrending : Boolean
    date : Date
    title : String
    description : String
    numComments : Int
    thumbnail : String
    codeSubmissionTotal : Int
    pledgeTotal : Float
    pledgeGoal : Float
    pledgerCount : Int
    status : Status
  }

  input AuthorInput {
    name : String
    picture : String
    score : Float
  }

  input EntryInput {
    author: AuthorInput
    popularity: Float
    isTrending : Boolean
    date : Date
    title : String
    description : String
    numComments : Int
    thumbnail : String
    codeSubmissionTotal : Int
    pledgeTotal : Float
    pledgeGoal : Float
    pledgerCount : Int
    status : Status
  }

  enum SortByInput {
    date
    popularity
  }

  input PaginationInput {
    offset: Int
    sortby: SortByInput
  }

  type RootQuery {
    getEntries(input: PaginationInput): [Entry]
  }

  type RootMutation {
    createEntries(input: EntryInput): String
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)

module.exports = {
  schema
};