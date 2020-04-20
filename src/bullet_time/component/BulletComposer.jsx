import React from 'react';
import { Grid } from '@material-ui/core';
import { ContentState, EditorState } from 'draft-js';
import BulletMenu from './BulletMenu';
import BulletRange from './BulletRange';


export default class BulletComposer extends React.Component {

  GUIDE_DEFAULT = 763;

  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      graberized: false,
      guide: this.GUIDE_DEFAULT, //px
    };
  }

//   handleBulletChange(bullets) {
//     if (!this.state.graberized) {
// //      this.setState({bullets: bullets});
//     }
//   }

  handleGraberize() {
    // var bullets = this.state.bullets;
    // bullets.forEach((bullet, index) => {
    //   if (!this.state.graberized) {
    //     const guide = this.state.guide;
    //     console.log('trigger width', this.state.widths[index]);
    //     bullets[index] = this.graberSpace(index, this.state.widths[index], guide);
    //   } else { Remove graber spaces
    //     bullets[index] = bullet.replace(
    //       /[\u2004\u2006\u2007\u2009]/g,
    //       ' '
    //     );
    //   }
    // }, this);

    this.setState({graberized: !this.state.graberized});
  }

//   handleWidthChange(index, width) {
//     const guide = this.state.guide;
//     let widths = this.state.widths;
//     widths[index] = width;
//     this.setState({widths: widths});
//     if (this.state.graberized) {
//       if (width < guide-6 || width > guide-1) {
//         var bullets = this.state.bullets;
//         bullets[index] = this.graberSpace(index, width, guide);
//         this.setState({bullets: bullets});
//       }
//     }
//   }

  handleTrim(arg) {
    const guide = this.GUIDE_DEFAULT + arg;
    this.setState({guide});

    // var bullets = this.state.bullets;
    // bullets.forEach((bullet, index) => {
    //   if (this.state.graberized) {
    //     console.log('trigger width', this.state.widths[index]);
    //     bullets[index] = this.graberSpace(index, this.state.widths[index], guide);
    //   }
    // }, this);
    // this.setState({bullets: bullets,});
  }

  // createBulletTesters() {
  //   var testers = [];
  //   var bullets = this.state.bullets;

  //   bullets.forEach(function(bullet, index) {
  //     testers.push(
  //       <BulletTester
  //         value={bullet}
  //         index={index}
  //         handleWidthChange={(index, width) => this.handleWidthChange(index, width)}
  //       />
  //     );
  //   }, this);

  //   return(testers);
  //   }

  handleEditorChange(editorState) {
    this.setState({editorState});
    const content = editorState.getCurrentContent();
    const blockArray = content.getBlocksAsArray();
  };


  render() {
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs>
            <BulletRange
              editorState={this.state.editorState}
              guide={this.state.guide}
              disabled={this.state.graberized}
              onChange={editorState => this.handleEditorChange(editorState)}
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
        {/* this.createBulletTesters() */}
      </div>
    );
  }
}
