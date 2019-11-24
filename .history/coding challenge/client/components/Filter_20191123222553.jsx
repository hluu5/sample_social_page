import React from 'react';
import '../../public/style.css';

export default function Filter (props) {

  const handleFilter = (e) => {
    props.changeFilterState(e)
  }

  const handleSort = (e) => {
    props.changeSortCritState(e)
  }

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