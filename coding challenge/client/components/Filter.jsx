import React from 'react';
import '../../public/style.css';

export default class Filter extends React.Component {
  state = {}
  render() {
    return (
      <div style={{marginLeft: '2vw', marginRight: '2vw', marginTop: '0', display: 'flex'}}>
        <button>All</button>
        <button>Trending</button>
        <button>Open Task</button>
        <button>Completed Task</button>
      </div>
    )
  }
}