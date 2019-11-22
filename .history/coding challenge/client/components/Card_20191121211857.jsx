import React from 'react';
import Header from './Header.jsx';
import Description from './Description.jsx';
import Stats from './Stats.jsx';
import '../../public/style.css';

export default class Card extends React.Component {
  state = {}
  render() {
    return (
      <div className='card'>
        <Header />
        <Description />
        <Stats />
        <div className="bottomNav"></div>
      </div>
    )
  }
}