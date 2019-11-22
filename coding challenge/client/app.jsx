import React from 'react';
import Card from './components/Card.jsx';
import Filter from './components/Filter.jsx';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

const myLink = new createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  link: myLink,
  cache: new InMemoryCache()
})

const getEntries = gql`
  query ($first: Int, $sortby: String, $filter: String) {
    getEntries(input: {first: $first, sortby: $sortby, filter: $filter, offset: 5}) {
      author {
        name
        picture
        score
      }
      popularity
      isTrending
      date
      title
      description
      numComments
      thumbnail
      codeSubmissionTotal
      pledgeTotal
      pledgeGoal
      pledgerCount
      status
    }
  }
`;

class App extends React.Component {
  constructor(props)  {
    super(props);
    this.state= {
      filter: null,
      sortby : null,
      offset: null,
      first: null,
    };
    this.changeFilterState = this.changeFilterState.bind(this);
    this.changeSortCritState = this.changeSortCritState.bind(this);
    this.submitChange = this.submitChange.bind(this)
  }

  changeFilterState(e) {
    this.setState({
      filter: e,
      first: 0
    })
  }

  changeSortCritState(e) {
    this.setState({
      sortby: e,
      first: 0
    })
  }

  submitChange() {
    this.props.getEntries({
      variables: {
        filter: this.state.filter,
        sortBy: this.state.sortBy,
        first: this.state.first
      }
    })
  }

  displayEntries() {
    let data = this.props.data;
    if (data.loading) {
      return (<div>Loading...</div>)
    } else {
      console.log(data)
    }
  }

  render() {
    console.log(this.state)
    return (
      <ApolloProvider client={client}>
        <div style={{margin: '5em'}}>
          <Filter changeFilterState={this.changeFilterState}
                  changeSortCritState={this.changeSortCritState}
                  submitChange = {this.submitChange}
                  />
          <Card />
        </div>
      </ApolloProvider>
    )
  }
}

export default (App);