import React from 'react';
import '../../public/style.css';

export default class Stats extends React.Component {
  state = {}
  render() {
    return (
      <div style={{marginLeft: '2vw', marginRight: '2vw', marginTop: '0', paddingBottom:'2vw', overflowWrap: 'break-word'}}>
        <div className="statsContainer">
          <div>Sihdasoihdaoishdoaidh</div>
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