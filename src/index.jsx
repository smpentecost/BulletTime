import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Guide(props) {
  return(
    <div className="guide" style={props.style}></div>
  );
}


function BulletArea(props) {
  return (
    <textarea
      className="bullet-area"
      value={props.value}
      placeholder="Write your bullets here..."
      rows="10"
      onChange={event => props.onChange(event)}
    ></textarea>
  );
}


function GuidedBulletArea(props) {
  return (
    <div className="guided-bullet-area">
      <BulletArea
        value={props.value}
        onChange={event => props.onChange(event)}
      />
      <Guide
        style={props.guides[1]}
      />
    </div>
  );
}


function BulletTester(props) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  //Set the local state width any time the screen renders
  useEffect(() => {
    setWidth(ref.current ? ref.current.offsetWidth : 0);
  });

  //Set the parent width any time the local state width changes
  useEffect(() => {
    props.handleWidthChange(props.index, width);
  }, [width, props.value]);
  
  return (
    <div ref={ref} className="bullet-tester">
      {props.value}
    </div>
  );
}


function Toggle(props) {
  return(
    <div className="toggle-div">
    <label className="toggle-label">{props.label}</label>
      <label className="toggle">
        <input
          type="checkbox"
          checked={props.checked}
          onClick={() => props.onClick()}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}


class BulletEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bullets: [], //Array(1).fill('- Develops threat radar models/simulations; drives US/Allied radar warning reprogramming & intel mission data feeds'), //[].
      widths: [],
      graberized: false,
      guides: [{left: '600px'}, {left: '763px'}, {left: '800px'}],
    };
  }

  handleBulletChange(event) {
    if (!this.state.graberized) {
      var bullets = this.state.bullets;
      bullets = event.target.value.split("\n");
      this.setState({bullets: bullets});
    }
  }

  handleAutoSpace() {
    //If not currently graberized, that means it should now be
    //graberized

    var bullets = this.state.bullets;
    bullets.forEach((bullet, index) => {

      if (!this.state.graberized) {
        console.log('trigger width', this.state.widths[index]);
        bullets[index] = this.graberSpace(index, this.state.widths[index]);
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
    let widths = this.state.widths;
    widths[index] = width;
    this.setState({widths: widths});
    if (this.state.graberized) {
      if (width < 760 || width > 763) {
        var bullets = this.state.bullets;
        bullets[index] = this.graberSpace(index, width);
        this.setState({bullets: bullets});
      }
    }
  }

  graberSpace(index, width) {
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

    if (width > 762) {
      ranks = demote(ranks);
    } else if (width < 762) {
      ranks = promote(ranks);
    }

    console.log(ranks);
    console.log(width);

    spaces.forEach((position, index) => {
      bulletArray[position] = rank[ranks[index]];
    });

    return bulletArray.join('');
  }

  createBulletTesters() {
    var testers = [];
    var bullets = this.state.bullets;

    bullets.forEach(function(bullet, index) {
      testers.push(
        <BulletTester
          value={bullet}
          index={index}
          handleWidthChange={(index, width) => this.handleWidthChange(index, width)}
        />
      );
    }, this);

    return(testers);
  }

  render() {
    return (
      <div >
        <div id="editor_title">
          Bullet Editor
          <Toggle
            label="Apply Graber Spacing:"
            checked={this.state.graberized}
            onClick={() => this.handleAutoSpace()}
          />
        </div>
        <GuidedBulletArea
          value={this.state.bullets.join("\n")}
          guides={this.state.guides}
          onChange={event => this.handleBulletChange(event)}
        />
        {this.createBulletTesters()}
      </div>
    );
  }
}
      
class BulletTime extends React.Component {
  render() {
    return (
      <div className="app">
	<div className="game-board">
          <BulletEditor />
	</div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <BulletTime />,
  document.getElementById('root')

);
