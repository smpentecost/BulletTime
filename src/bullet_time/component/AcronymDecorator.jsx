import React from 'react';

export default function  AcronymDecorator(props) {
    return(
      <span className="acronym">
        {props.children}
      </span>
    );
  };


