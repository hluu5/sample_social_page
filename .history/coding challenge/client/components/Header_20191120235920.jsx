import React from 'react';
import '../../public/style.css';

export default class Header extends React.Component {
  state = {}
  render() {
    return (
      <div>
        <div className='displayHeader'>
          <div className="avatar">
            <img  src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"></img>
          </div>
        </div>
        <div className='displayHeader'>
          <h1 id='top'>SAHDSAIOAIHD</h1>
          <h3 id='bottom'>sdaopudpaosu</h3>
        </div>

        <button style={{display: 'inline-block'}}>DSAHDKALSHD:</button>
      </div>
    )
  }
}