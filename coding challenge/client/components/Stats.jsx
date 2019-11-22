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
            <div style={{padding: '1vw'}}>View Source</div>
            <div style={{padding: '1vw',flexGrow: '2'}}> Code Submissions</div>
            <div style={{padding: '1vw', backgroundColor: 'rgb(158, 201, 247)', color: 'white'}}>Claim $5000</div>
          </div>
        </div>
      </div>
    )
  }
}