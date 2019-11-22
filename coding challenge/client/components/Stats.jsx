import React from 'react';
import '../../public/style.css';

export default class Stats extends React.Component {
  state = {}
  render() {
    return (
      <div style={{marginLeft: '2vw', marginRight: '2vw', paddingBottom:'2vw'}}>
        <div className="statsContainer">
          <div>
            <div className='thumbNailContainer'>
              <img className='thumbNailImg'src="https://www.bluleadz.com/hs-fs/hubfs/Brand%20Logos/BPLogo.jpg?width=534&name=BPLogo.jpg"></img>
            </div>
            <div className='statInfo'>
              <div style={{
                fontSize: '2vw', color:'#6AB6D9', marginBottom: '.5vw', fontWeight:'bold'
                }}>
                  $5000
              </div>
              <div style={{fontSize: '1vw', color:'#BABFBF', marginBottom: '.5vw'}}>pledged total of {'$'} goal</div>
              <div style={{fontSize: '2vw', color:'#CACCCF', marginBottom: '.5vw', fontWeight:'bold'}}>400</div>
              <div style={{fontSize: '1vw', color:'#CACCCF'}}>pledgers</div>
            </div>
            <div className='pledgeBTN'>
              <button>Pledge</button>
            </div>
          </div>
          <div className='bottomNav'>
            <div className='buttonNav'>View Source</div>
            <div className='buttonNav midButton'>{'</>'} Code Submissions</div>
            <div className='buttonNav lastButton'>Claim $5000</div>
          </div>
        </div>
      </div>
    )
  }
}