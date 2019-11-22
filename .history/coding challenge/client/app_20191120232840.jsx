import React from 'react';
import Card from './components/Card.jsx';

class App extends React.Component {
  state = {

  }


  render() {
    return (
      <div style={{margin: '5em'}}>
        <Card />
        <Card />
        <Card />
      </div>
    )
  }
}

export default App;