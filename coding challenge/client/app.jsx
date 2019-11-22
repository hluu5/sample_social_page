import React from 'react';
import Card from './components/Card.jsx';
import Filter from './components/Filter.jsx';

class App extends React.Component {
  state = {

  }


  render() {
    return (
      <div style={{margin: '5em'}}>
        <Filter />
        <Card />
        <Card />
        <Card />
      </div>
    )
  }
}

export default App;