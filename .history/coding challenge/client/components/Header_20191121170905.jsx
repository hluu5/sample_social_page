import React from 'react';
import '../../public/style.css';

export default class Header extends React.Component {
  state = {}
  render() {
    return (
      <div className='container'>
        <div className='displayImage'>
          <div className="avatar">
            <img  src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"></img>
          </div>
        </div>

        <div className='displayHeader'>
          <h1 className='top'>Abbsda ASdw</h1>
          <h3 className='bottom'>sdaopudpaosu</h3>
        </div>

          <button className='buttonTopRight' >DSAHDKALSHD:</button>

      </div>
    )
  }
}