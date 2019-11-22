import React from 'react';
import Header from './Header.jsx';
import Description from './Description.jsx';
import Stats from './Stats.jsx';
import '../../public/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShare, faEllipsisH } from '@fortawesome/free-solid-svg-icons';


export default class Card extends React.Component {
  state = {}
  render() {
    return (
      <div className='card'>
        <Header />
        <Description />
        <Stats />
        <div className="bottomNav">
          <div className='buttonNav'><FontAwesomeIcon icon={ faComment } /> Comments</div>
          <div className='buttonNav'><FontAwesomeIcon icon={ faShare } /> Share</div>
          <div className='dotNav'><FontAwesomeIcon icon={ faEllipsisH } /></div>
        </div>
      </div>
    )
  }
}