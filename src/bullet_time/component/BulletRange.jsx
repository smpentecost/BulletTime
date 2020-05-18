// 3rd party imports
import React from 'react';
import { ContentBlock,
         ContentState,
         Editor,
         EditorState,
         genKey
       } from 'draft-js';
import { Paper } from '@material-ui/core';

// Components
import Bullet from './Bullet';
import Guide from './Guide';

// Style
import '../style/BulletRange.css';

function bulletRenderer(contentBlock) {
  return {
    component: Bullet,
  };
}

function bulletBlockStyle(contentBlock) {
  return 'bullet-block';
}

export default function BulletRange(props) {

  const handleFocus = () => {
    console.log('focus');
    const editorState = props.editorState;
    const newEditorState = EditorState.moveFocusToEnd(editorState);
    props.onChange(newEditorState);
  };
    

  const handleNewBullet = () => {
    const editorState = props.editorState;
    const newBlock = new ContentBlock({
      text: '',
      key: genKey(),
      type: 'unstyled',
    });

    const content = props.editorState.getCurrentContent();
    let blockMap = content.getBlockMap().set(newBlock.key, newBlock);
    const newContentState = ContentState.createFromBlockArray(blockMap.toArray());

    const newEditorState = EditorState.moveFocusToEnd(
      EditorState.push(
        editorState,
        newContentState,
        'insert-characters'
      )
    );
    props.onChange(newEditorState);
  };

  return(
    <Paper elevation={6}>
      <div className="guided-range">
        <div className={`bullet-range ${props.disabled ? "disabled" : ""}`}>
           <Editor
             editorState={props.editorState}
             readOnly={props.disabled}
             onChange={editorState => props.onChange(editorState)}
             blockRendererFn={bulletRenderer}
             blockStyleFn={bulletBlockStyle}
             onBlur={() => console.log('blur')}
             onFocus={handleFocus}
           />
          <div
            id="tail"
            onClick={handleNewBullet}
          >
            - Start a new bullet...
          </div>
        </div>
        <Guide position={props.guide}/>
      </div>
    </Paper>
  );
}

