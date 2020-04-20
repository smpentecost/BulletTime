import React from 'react';
import { EditorBlock } from 'draft-js';
import { useEffect, useRef, useState } from 'react';

export default function Bullet(props) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  // Set the local state width any time the screen renders
  useEffect(() => {
    console.log(width);
    setWidth(ref.current ? ref.current.offsetWidth : 0);
  });

  //   //Set the parent width any time the local state width changes
  // useEffect(() => {
  //   props.handleWidthChange(props.index, width);
  // }, [width, props.value]);
  
  return (
    <span ref={ref}>
      <EditorBlock {...props}/>
    </span>
  );
}
