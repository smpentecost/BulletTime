import React from 'react';

export default function  AcronymDecorator(props) {
  const click = () => {
    console.log('click');
    alert();
  };
  
  return(
    <span className="acronym" onClick={click}>
      {props.children}
    </span>
  );
};


