import React from 'react';
import Header from './Header.jsx';
import Description from './Description.jsx';
import Stats from './Stats.jsx';
import '../../public/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShare, faEllipsisH } from '@fortawesome/free-solid-svg-icons';


export default class Card extends React.Component{
  render() {
    return (
      <div className='card'>
        <Header author={this.props.author} isTrending={this.props.isTrending} status={this.props.status}/>
        <Description title={this.props.title} description={this.props.description}/>
        <Stats
          thumbnail = {this.props.thumbnail}
          codeSubmissionTotal = {this.props.codeSubmissionTotal}
          pledgeTotal = {this.props.pledgeTotal}
          pledgeGoal = {this.props.pledgeGoal}
          pledgerCount = {this.props.pledgerCount}
          status = {this.props.status}
        />
        <div className="bottomNav">
          <div className='buttonNav'><FontAwesomeIcon icon={ faComment } /> Comments ({this.props.numComments})</div>
          <div className='buttonNav'><FontAwesomeIcon icon={ faShare } /> Share</div>
          <div className='dotNav'><FontAwesomeIcon icon={ faEllipsisH } /></div>
        </div>
      </div>
    )
  }
}