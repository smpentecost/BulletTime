import React from 'react';
import { EditorBlock } from 'draft-js';
import Ruler from './Ruler';

export default function Bullet(props) {
  return (
    <>
      <Ruler
        content={props.block.getText()}
        onChange={(width) => props.blockProps.onChange(props.block.getKey(), width)}
      />
      <EditorBlock {...props}/>
    </>
  );
}

