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

function bulletRenderer(contentBlock, onChange) {
  return {
    component: Bullet,
    props: {
      onChange: (key, width) => onChange(key, width),
    },
  };
}

export default function BulletRange(props) {

  const handleNewBullet = () => {
    const newBlock = new ContentBlock({
      text: '- ',
      key: genKey(),
      type: 'unstyled',
    });

    const content = props.editorState.getCurrentContent();
    let blockMap = content.getBlockMap();
    if (content.hasText()) {
      blockMap = blockMap.set(newBlock.key, newBlock);
    } else {
      blockMap = blockMap.clear().set(newBlock.key, newBlock);
    }
    const newContentState = ContentState.createFromBlockArray(blockMap.toArray());

    const editorState = EditorState.moveFocusToEnd(
      EditorState.push(
        props.editorState,
        newContentState,
        'insert-characters'
      )
    );
    props.onChange(editorState);
  };

  // let { db, err, results } = this.state;
  // if (!db) return <pre>Loading...</pre>;

  return(
    <Paper elevation={6}>
      <div className="guided-range">
        <div className={`bullet-range ${props.disabled ? "disabled" : ""}`}>
          {props.editorState.getCurrentContent().hasText() &&
           <Editor
             editorState={props.editorState}
             readOnly={props.disabled}
             onChange={editorState => props.onChange(editorState)}
             blockRendererFn={contentBlock =>
                              bulletRenderer(
                                contentBlock,
                                props.onWidthMeasurement
                              )}
           />
          }
          <div
            id="tail"
            onClick={handleNewBullet}
          >
            - Start a new bullet...
          </div>
        </div>
        <Guide
          position={props.guide}
        />
      </div>
    </Paper>

    
  );
}

