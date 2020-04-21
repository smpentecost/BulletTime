import React from 'react';
import { useEffect, useRef } from 'react';
import { EditorBlock } from 'draft-js';
import Ruler from './Ruler';


export default function Bullet(props) {
  const ref = useRef(null);

  useEffect(() => {
    let width = ref.current ? ref.current.offsetWidth: 0;
    props.blockProps.onChange(width);
  }, [props.block.getText()]);
  
  return (
    <>
      {/* <Ruler */}
      {/*   content={props.block.getText()} */}
      {/*   onChange={(width) => props.blockProps.onChange(props.block.getKey(), width)} */}
      {/* /> */}
      <span ref={ref}  className="ruler">
        {'- ' + props.block.getText()}
    </span>
      <span>
        {'- '}
      </span>
      <EditorBlock  {...props}/>
    </>
  );
}

