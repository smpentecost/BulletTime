// 3rd party imports
import React from 'react';
import initSqlJs from "sql.js";
import { ContentBlock,
         ContentState,
         Editor,
         EditorState,
         genKey
       } from 'draft-js';
import { Paper } from '@material-ui/core';

// Components
import AcronymDecorator from './AcronymDecorator';
import Bullet from './Bullet';
import Guide from './Guide';

// Data
import AcronymList from '../data/acronyms.sqlite';

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

  // let { db, err, results } = this.state;
  // if (!db) return <pre>Loading...</pre>;

 //         {//props.editorState.getCurrentContent().hasText() &&
//           props.editorState.getSelection().getHasFocus() &&

  
  return(
    <Paper elevation={6}>
      <div className="guided-range">
        <div className={`bullet-range ${props.disabled ? "disabled" : ""}`}>
          {console.log('render')}
           <Editor
             editorState={props.editorState}
             readOnly={props.disabled}
             onChange={editorState => props.onChange(editorState)}
             blockRendererFn={bulletRenderer}
             blockStyleFn={bulletBlockStyle}
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

