import React from 'react';
import '../../public/style.css';

export default function Stats (props) {
  return (
    <div style={{marginLeft: '2vw', marginRight: '2vw', paddingBottom:'2vw'}}>
      <div className="statsContainer">
        <div>
          <div className='thumbNailContainer'>
            <img className='thumbNailImg'src={props.thumbnail} alt='Not Available'></img>
          </div>
          <div className='statInfo'>
            <div style={{
              fontSize: '2vw', color:'#6AB6D9', marginBottom: '.5vw', fontWeight:'bold'
              }}>
                {props.pledgeTotal}
            </div>
            <div style={{fontSize: '1vw', color:'#BABFBF', marginBottom: '.5vw'}}>pledged total of {props.pledgeGoal} goal</div>
            <div style={{fontSize: '2vw', color:'#CACCCF', marginBottom: '.5vw', fontWeight:'bold'}}>{props.pledgerCount}</div>
            <div style={{fontSize: '1vw', color:'#CACCCF'}}>pledgers</div>
          </div>
          <div className='pledgeBTN'>
            { props.status === 1 ? (<button>Pledge</button>) : (<button>View Submission</button>)}
          </div>
        </div>
        <div className='bottomNav'>
          <div className='buttonNav'>View Source</div>
          <div className='buttonNav midButton'>{'</>'} Code Submissions</div>
          <div className='buttonNav lastButton'>Claim {props.pledgeTotal}</div>
        </div>
      </div>
    </div>
  )
}