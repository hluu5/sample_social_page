import React from 'react';
import '../../public/style.css';

export default function Description ( props ) {
    return (
      <div style={{marginLeft: '2vw', marginRight: '2vw', marginTop: '0', paddingBottom:'2vw', overflowWrap: 'break-word', overflow: 'hidden'}}>
        <div style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '.5vw'}}>{props.title}</div>
        <div style={{fontSize: '20px'}}>{props.description}</div>
      </div>
    )
}