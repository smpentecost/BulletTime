import React from 'react';
import { useEffect, useRef, useState } from 'react';
import '../style/BulletTester.css';


export default function Bullet(props) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  //Set the local state width any time the screen renders
  useEffect(() => {
    setWidth(ref.current ? ref.current.offsetWidth : 0);
  });

  //Set the parent width any time the local state width changes
  useEffect(() => {
    props.handleWidthChange(props.index, width);
  }, [width, props.value]);
  
  return (
    <div ref={ref} className="bullet">
      {props.value}
    </div>
  );
}
