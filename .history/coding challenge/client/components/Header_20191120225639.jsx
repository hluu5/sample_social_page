import React from 'react';
import '../../public/style.css';

export default class Header extends React.Component {
  state = {}
  render() {
    return (
      <div>
        <div style={{margin: '10px'}}>
          <img className="avatar" src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"></img>
        </div>
      </div>
    )
  }
}