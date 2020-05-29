// 3rd party imports
import React from 'react';
import { Grid } from '@material-ui/core';
import { CompositeDecorator,
         ContentBlock,
         ContentState,
         EditorState,
         Modifier,
         SelectionState,
         genKey
       } from 'draft-js';

//Components
import AcronymDecorator from './AcronymDecorator';
import BulletMenu from './BulletMenu';
import { BulletRange } from './BulletRange';
import Ruler from './Ruler';

//Logic
import { graberSpace } from '../logic/GraberUtils.js';
import { findWithRegex } from '../logic/Utils.js';


/* This component holds the editor and menus associated with the
 * bullets. For now, it is essentially the top level component,
 * ignoring the header and app drawer.
 */
export default class BulletComposer extends React.Component {

  GUIDE_DEFAULT = 763;

  constructor(props) {
    super(props);

    const  acronymStrategy = (contentBlock, callback, contentState) =>{
      findWithRegex(props.regexp, contentBlock, callback);
    };

    this.compositeDecorator = new CompositeDecorator([
      {
        strategy:acronymStrategy,
        component:AcronymDecorator,
        props:{
          db: props.db,
          onChange: contentState =>
            this.handleContentChange(contentState)
        }
      },
    ]);

    this.state = {
      editorState: EditorState.createEmpty(this.compositeDecorator),
      bulletWidths: new Map(),
      graberized: false,
      guide: this.GUIDE_DEFAULT, //px
      regexp: this.props.regexp,
      replacement: false
    };

    this.editorRef = React.createRef();
    this.cachedSelection = null;
  }

  renderRulers() {
    let rulers = [];
    const blockArray = this.state.editorState
          .getCurrentContent()
          .getBlocksAsArray();

    blockArray.forEach((block) => {
      rulers.push(
        <Ruler
          onChange={(width) => this.handleWidthMeasurement(block.getKey(), width)}
          content={block.getText()}
        />
      );
    }, this);

    return(rulers);
  }

  graberizeContent(forceReview=false) {
    const graberize = this.state.graberized;
    let editorState = this.state.editorState;
    let content = editorState.getCurrentContent();
    let blockMap = content.getBlockMap(); //resetting
    let bulletWidths = this.state.bulletWidths;
    for (const entry of bulletWidths.entries()) {
      const key = entry[0];
      const width = entry[1][0];
      const finished = entry[1][1];
      const block = content.getBlockForKey(key);
      if (block) {
        if (!finished || forceReview) {
          let result = [];
          if (graberize) {
            const guide = this.state.guide;
            result = graberSpace(block.getText(), width, guide);
          } else {
            result = [block.getText().replace(/[\u2004\u2006\u2007\u2009]/g,' '), true];
          }
          const newBlock = new ContentBlock({
            text: result[0],
            key: key,
            type: 'unstyled',
          });
          
          blockMap = blockMap.set(key, newBlock);
          bulletWidths.set(key, [width, result[1]]);
        }
      } else {
        bulletWidths.delete(key);
      }
    }
    const newContentState = ContentState.createFromBlockArray(blockMap.toArray());
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    );
    this.setState({editorState: newEditorState,
                   bulletWidths: bulletWidths});
  }

  handleGraberize() {
    const graberize = !this.state.graberized;
    this.setState({graberized: graberize}, () => this.graberizeContent(true));
  }

  handleEditorChange(editorState, cb=null) {
    console.log(editorState.getSelection().serialize());
    this.setState({editorState}, cb);
    // if (!anchor && this.cachedSelection) {
    //   let newEditorState = EditorState.forceSelection(
    //     editorState,
    //     this.cachedSelection
    //   );
    //   this.cachedSelection = null;
    //   this.setState({editorState: newEditorState});
      
    // } else {

//    }
  };

  handleContentChange(contentState) {
    const editorState = this.state.editorState;
    // if (!this.cachedSelection) {
    //   this.cachedSelection = editorState.getSelection();
    // }
    let newEditorState = EditorState.createWithContent(
      contentState,
      this.compositeDecorator
    );
    const cb = () => {
      this.editorRef.current.blur();
    };
    this.handleEditorChange(newEditorState, cb);
  };

  handleWidthMeasurement(key, width) {
    let bulletWidths = this.state.bulletWidths;
    const guide = this.state.guide;
    bulletWidths.set(key, [width, !(width-guide)]);
    this.setState({bulletWidths});
    this.graberizeContent();
  }

  handleTrim(arg) {
    const guide = this.GUIDE_DEFAULT + arg;
    this.setState({guide});
    this.graberizeContent(true);
  }

  render() {
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs>
            <BulletRange
              ref={this.editorRef}
              replacementFlag={this.state.replacement}
              editorState={this.state.editorState}
              guide={this.state.guide}
              disabled={this.state.graberized}
              onChange={editorState => this.handleEditorChange(editorState)}
              onWidthMeasurement={(key, width) => this.handleWidthMeasurement(key, width)}
            />
          </Grid>
          <Grid item>
            <BulletMenu
              graberized={this.state.graberized}
              onGraberize={() => this.handleGraberize()}
              onTrim={(arg) => this.handleTrim(arg)}
            />
          </Grid>
        </Grid>
        {this.state.graberized && this.renderRulers()}
      </div>
    );
  }
}
