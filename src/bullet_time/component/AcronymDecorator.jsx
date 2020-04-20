import React from 'react';

export default function  AcronymDecorator(props) {
    return(
      <span className="acronym" onClick="alert()">
        {props.children}
      </span>
    );
  };


