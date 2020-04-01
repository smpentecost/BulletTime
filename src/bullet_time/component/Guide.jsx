import React from 'react';

export default function Guide(props) {
  return(
    <div
      className="guide"
      style={{left: props.position+"px"}}
    ></div>
  );
}
