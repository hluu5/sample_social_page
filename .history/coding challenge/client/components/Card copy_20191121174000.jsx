import React from 'react';
import '../../public/style.css';

export default class Card extends React.Component {
  state = {}
  render() {
    return (
      <div className='card'>
        <Header />
        <Description />
      </div>
    )
  }
}