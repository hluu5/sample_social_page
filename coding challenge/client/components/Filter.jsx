import React from 'react';
import '../../public/style.css';

export default class Filter extends React.Component {
  state = {}
  render() {
    return (
      <div className='filterBar'>
        <div className="flexButtonContainer textFilter">Filter By:</div>
        <div className="flexButtonContainer"><button>All</button></div>
        <div className="flexButtonContainer"><button>Trending</button></div>
        <div className="flexButtonContainer"><button>Open Task</button></div>
        <div className="flexButtonContainer"><button>Completed Task</button></div>
      </div>
    )
  }
}