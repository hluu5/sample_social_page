import React from 'react';
import '../../public/style.css';

export default function Header (props){
  let buttonClass = null;
  props.isTrending === true ? buttonClass = 'buttonTopRight' : props.status === 1 ? buttonClass = 'buttonOpen' : buttonClass ='buttonCompleted'
  return (
    <div className='container'>
      <div className='displayImage'>
        <div className="avatar">
          <img  src={props.author.picture} onError="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';"></img>
        </div>
      </div>

      <div className='displayHeader'>
      <h1 className='top'>{props.author.name}</h1>
        <h3 className='bottom'>Front End Developer</h3>
      </div>
      <button className={buttonClass}>{
        props.isTrending === true ? 'Trending' : props.status === 1 ? 'Open Tasks' : 'Completed Tasks'
      }</button>
    </div>
  )
}