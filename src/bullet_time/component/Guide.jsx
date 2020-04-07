import React from 'react';
import '../style/Guide.css';

export default function Guide(props) {
  return(
    <div
      className="guide"
      style={{left: props.position+"px"}}
    ></div>
  );
}
