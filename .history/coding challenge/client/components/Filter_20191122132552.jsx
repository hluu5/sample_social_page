import React from 'react';
import '../../public/style.css';

export default class Filter extends React.Component {
  state = {};

  handleFilter(e) {
    this.props.changeFilterState(e)
  }

  handleSort(e) {
    this.props.changeSortCritState(e)
  }

  render() {
    console.log(this.props);
    return (
      <div className='filterBar'>
        <div className="flexButtonContainer textFilter">Filter By:</div>
        <div className="flexButtonContainer" onClick={()=>{
          this.handleFilter(null);
          this.handleSort('date')
        }}><button>All</button></div>
        <div className="flexButtonContainer" onClick={()=>{
          this.handleFilter('trending');
          this.handleSort('popularity')
        }}><button>Trending</button></div>
        <div className="flexButtonContainer" onClick={()=>{
          this.handleFilter('openTasks');
          this.handleSort('date')
        }}><button>Open Task</button></div>
        <div className="flexButtonContainer" onClick={()=>{
          this.handleFilter('completedTasks');
          this.handleSort('date')
        }}><button>Completed Task</button></div>
      </div>
    )
  }
}