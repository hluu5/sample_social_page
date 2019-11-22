import React from 'react';
import Header from './Header';
import '../../public/style.css';

export default class Card extends React.Component {
  state = {}
  render() {
    return (
      <div className='card'>
        <Header />

      </div>
    )
  }
}