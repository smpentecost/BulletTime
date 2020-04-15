import React from 'react';
import { Grid, Paper, FormGroup, Switch, FormControlLabel } from '@material-ui/core';
import BulletMenu from './BulletMenu';
import GuidedBulletArea from './GuidedBulletArea';

export default class BulletEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bullets: [], //Array(1).fill('- Develops threat radar models/simulations; drives US/Allied radar warning reprogramming & intel mission data feeds'), //[].
      widths: [],
      graberized: false,
      guide: 763,
      trim: 0,
    };
  }

  handleBulletChange(bullets) {
    if (!this.state.graberized) {
      this.setState({bullets: bullets});
    }
  }

  handleAutoSpace() {
    //If not currently graberized, that means it should now be
    //graberized

    var bullets = this.state.bullets;
    bullets.forEach((bullet, index) => {
      if (!this.state.graberized) {
        const guide = this.state.guide;
//        console.log('trigger width', this.state.widths[index]);
        bullets[index] = this.graberSpace(index, this.state.widths[index], guide);
      } else { //Remove graber spaces
        bullets[index] = bullet.replace(
          /[\u2004\u2006\u2007\u2009]/g,
          ' '
        );
      }
    }, this);

  this.setState({
    bullets: bullets,
    graberized: !this.state.graberized});
}

  handleWidthChange(index, width) {
    const guide = this.state.guide;
    let widths = this.state.widths;
    widths[index] = width;
    this.setState({widths: widths});
    if (this.state.graberized) {
      if (width < guide-6 || width > guide-1) {
        var bullets = this.state.bullets;
        bullets[index] = this.graberSpace(index, width, guide);
        this.setState({bullets: bullets});
      }
    }
  }

  handleGuideChange(arg) {
    const guide = 763+arg;
    this.setState({guide: guide});

    var bullets = this.state.bullets;
    bullets.forEach((bullet, index) => {
      if (this.state.graberized) {
//        console.log('trigger width', this.state.widths[index]);
        bullets[index] = this.graberSpace(index, this.state.widths[index], guide);
      }
    }, this);
    this.setState({bullets: bullets,});
  }

  graberSpace(index, width, guide) {
    /*
      The best way to do this is recursively, changing a single
      character at once and checking length as we go. That is because
      these spaces don't have specific pixel widths associated with
      them. Instead their widths are dynamic - based on font style,
      size and the other characters around them. So while it sucks
      that we need to use synchronous logic, atleast it only happens
      when the user toggles the spacing on.

      The whitespace unicode available for use with an OPR:
      2006:approx-2px(smallest), 2009:approx-1px(small),
      2004:approx+2px(big), 2007:approx+4px(biggest)
    */

    const promote = (ranks) => {
      let newRanks = ranks;
      // Intentionally slicing so that we don't change the first space
      var indexOfMinValue = ranks.slice(1).reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0) + 1;
      newRanks[indexOfMinValue]++;
      if (newRanks[indexOfMinValue] > 4) {
        newRanks[indexOfMinValue] = 4;
      }
      return(newRanks);
    };

    const demote = (ranks) => {
      let newRanks = ranks;
      // Intentionally slicing so that we don't change the first space
      var indexOfMaxValue = ranks.slice(1).reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0) + 1;
      newRanks[indexOfMaxValue]--;
      if (newRanks[indexOfMaxValue] < 0) {
        newRanks[indexOfMaxValue] = 0;
      }
      return(newRanks);
    };

    const isWhiteSpace = (element) => {
      switch(element) {
      case "\u2004": return true;
      case "\u2006": return true;
      case "\u2007": return true;
      case "\u2009": return true;
      case " ": return true;
      default: return false;
      }
    };

    const rank = ['\u2006', '\u2009', ' ', '\u2004', '\u2007'];
    var bullet = this.state.bullets[index];

    let spaces = [];
    let ranks = [];
    let bulletArray = bullet.split("");
    
    //Find all the white space character indexes
    let position = bulletArray.findIndex(isWhiteSpace);
    while (position !== -1) {
      spaces.push(position);
      ranks.push(rank.findIndex(elem => elem === bulletArray[position]));
      let subArrayPosition = bulletArray.slice(position + 1).findIndex(isWhiteSpace);
      if (subArrayPosition !== -1) {
        position = subArrayPosition + position + 1;
      } else {
        position = subArrayPosition;
      }
    }

    if (width > guide-1) {
      ranks = demote(ranks);
    } else if (width < guide-1) {
      ranks = promote(ranks);
    }

//    console.log(ranks);
//    console.log(width);

    spaces.forEach((position, index) => {
      bulletArray[position] = rank[ranks[index]];
    });

    return bulletArray.join('');
  }

  render() {
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs>
            <GuidedBulletArea
              bullets={this.state.bullets}
              guide={this.state.guide}
              disabled={this.state.graberized}
              onChange={bullets => this.handleBulletChange(bullets)}
              handleWidthChange={(index, width) => this.handleWidthChange(index, width)}
            />
          </Grid>
          <Grid item>
            <BulletMenu
              checked={this.state.graberized}
              onGraberize={() => this.handleAutoSpace()}
              onTrim={(arg) => this.handleGuideChange(arg)}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
