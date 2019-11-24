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
        handleFilter(null);
        handleSort('date')
      }}><button>All</button></div>
      <div className="flexButtonContainer" onClick={()=>{
        handleFilter('trending');
        handleSort('popularity')
      }}><button>Trending</button></div>
      <div className="flexButtonContainer" onClick={()=>{
        handleFilter('openTasks');
        handleSort('date')
      }}><button>Open Task</button></div>
      <div className="flexButtonContainer" onClick={()=>{
        handleFilter('completedTasks');
        handleSort('date')
      }}><button>Completed Task</button></div>
    </div>
  )
}