// 3rd party imports
import React from 'react';
import initSqlJs from "sql.js";
import { List } from 'immutable';
import { ContentBlock,
         ContentState,
         Editor,
         EditorChangeType,
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

  // static SQL_Search = "SELECT * FROM words;";
  
  // constructor(props){
  //   super(props);
  //   const compositeDecorator = new CompositeDecorator([
  //     {
  //       strategy: this.acronymStrategy,
  //       component:AcronymDecorator,
  //     },
  //   ]);
  //   this.state = {
  //     db: null,
  //     err: null,
  //     regexp: null,
  //     editorState: EditorState.createEmpty(compositeDecorator),
  //   };
  //   this.handleNewBullet = this.handleNewBullet.bind(this);
  //   this.onChange = this.onChange.bind(this);
  // }

  // acronymStrategy(contentBlock, callback, contentState) {
  //   const findWithRegex = (regex, contentBlock, callback) => {
  //     const text = contentBlock.getText();
  //     let matchArr, start;
  //     while ((matchArr = regex.exec(text)) !== null) {
  //       start = matchArr.index;
  //       callback(start, start + matchArr[0].length);
  //     }
  //   };
  //   findWithRegex(/this/g, contentBlock, callback);
  //   console.log(contentState);
  // }

  // componentDidMount() {
  //   // sql.js needs to fetch its wasm file, so we cannot immediately
  //   // instantiate the database without any configuration, initSqlJs
  //   // will fetch the wasm files directly from the same path as the js
  //   // see ../config-overrides.js
  //   initSqlJs()
  //     .then(SQL => {
  //       var xhr = new XMLHttpRequest();
  //       xhr.open('GET', AcronymList , true);
  //       xhr.responseType = 'arraybuffer';
  
  //       xhr.onload = e => {
  //         var uInt8Array = new Uint8Array(xhr.response);
  //         var db = new SQL.Database(uInt8Array);
  //         this.setState({ db: db }, this.getRegExp);
  //       };
  //       xhr.send();
  //     })
  //     .catch(err => this.setState({ err }));
  // }

  // getRegExp() {
  //   let result = this.state.db.exec("SELECT word FROM words;")[0].values;
  //   result = result.sort((a, b) => {return b[0].length-a[0].length;});
  
  //   let regexp_def = "\\b(" + result.join("|").replace(/[\\[.+*?%&(){^$]/g, "\\$&") + ")(?=(\\s|$))";
  //   regexp_def = regexp_def.replace(/\s/g, "\\s"); //Enable matches even after graberizing

  //   this.setState({regexp: new RegExp(regexp_def, "gi")});
  // }

  const handleNewBullet = () => {
    const newBlock = new ContentBlock({
      key: genKey(),
      type: 'unstyled',
      text: '- ',
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

  const handleWidthMeasurement = (key, width) => {
    console.log(key, width);
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
                                handleWidthMeasurement
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

