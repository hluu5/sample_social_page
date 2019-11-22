const graphql = require('graphql');

const { buildSchema } = graphql;

const schema = buildSchema(`
  scalar Status {
    _0
    _1
  }

  scalar DateTime

  type Author {
    name : String
    picture : String
    score : Float
  },

  type Entry {
    author: Author
    popularity: Float
    isTrending : Boolean
    date : DateTime
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
    date : DateTime
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
    createEntries(input: EntryInput): Entry
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)

module.exports = {
  schema
};