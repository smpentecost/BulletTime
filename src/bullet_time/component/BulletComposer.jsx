import React from 'react';
import { Grid } from '@material-ui/core';
import { EditorState } from 'draft-js';
import BulletMenu from './BulletMenu';
//import BulletTester from './BulletTester';
import BulletRange from './BulletRange';


export default class BulletComposer extends React.Component {

  static GUIDE_DEFAULT=763; //px
  
  constructor(props) {
    super(props);
    this.state = {
//      bullets: [], //Array(1).fill('- Develops threat radar models/simulations; drives US/Allied radar warning reprogramming & intel mission data feeds'), //[].
      //      widths: [],
      editorState: EditorState.createEmpty(),
      graberized: false,
      guide: this.GUIDE_DEFAULT,
    };
  }

//   handleBulletChange(bullets) {
//     if (!this.state.graberized) {
// //      this.setState({bullets: bullets});
//     }
//   }

//   handleAutoSpace() {
//     var bullets = this.state.bullets;
//     bullets.forEach((bullet, index) => {
//       if (!this.state.graberized) {
//         const guide = this.state.guide;
//         console.log('trigger width', this.state.widths[index]);
//         bullets[index] = this.graberSpace(index, this.state.widths[index], guide);
//       } else { //Remove graber spaces
//         bullets[index] = bullet.replace(
//           /[\u2004\u2006\u2007\u2009]/g,
//           ' '
//         );
//       }
//     }, this);

//   this.setState({
//     bullets: bullets,
//     graberized: !this.state.graberized});
// }

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
    this.setState({guide: guide});

    // var bullets = this.state.bullets;
    // bullets.forEach((bullet, index) => {
    //   if (this.state.graberized) {
    //     console.log('trigger width', this.state.widths[index]);
    //     bullets[index] = this.graberSpace(index, this.state.widths[index], guide);
    //   }
    // }, this);
    // this.setState({bullets: bullets,});
  }

//   createBulletTesters() {
//     var testers = [];
//     var bullets = this.state.bullets;

//     bullets.forEach(function(bullet, index) {
//       testers.push(
//         <BulletTester
//           value={bullet}
//           index={index}
//           handleWidthChange={(index, width) => this.handleWidthChange(index, width)}
//         />
//       );
//     }, this);

//     return(testers);
//   }

  render() {
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs>
            <BulletRange
              editorState={this.state.editorState}
              guide={this.state.guide}
              disabled={this.state.graberized}
//              onChange={bullets => this.handleBulletChange(bullets)}
            />
          </Grid>
          <Grid item>
            <BulletMenu
              graberized={this.state.graberized}
              onGraberize={() => this.handleAutoSpace()}
              onTrim={(arg) => this.handleTrim(arg)}
            />
          </Grid>
        </Grid>
        {/* this.createBulletTesters() */}
      </div>
    );
  }
}
