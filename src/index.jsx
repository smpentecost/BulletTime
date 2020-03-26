import React, { useEffect, useRef } from 'react';
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
  
  useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth : 0;
    console.log('width', width);
  });
  
  return (
    <div ref={ref} className="bullet-tester">
      {props.value}
    </div>
  );
}

function Toggle(props) {
  return(
    <div>
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
      bullets: Array(1).fill(null), //'- Develops threat radar models/simulations; drives US/Allied radar warning reprogramming & intel mission data feeds',
      graberized: false,
      guides: [{left: '600px'}, {left: '763px'}, {left: '800px'}],
      test_string: null,
    };
  }

  handleBulletChange(event) {
    var bullets = this.state.bullets;
    bullets = event.target.value.split("\n");
    this.setState({bullets: bullets});
  }

  handleAutoSpace() {
    var bullets = this.state.bullets;

    bullets.forEach(function(bullet, index) {
      if (!this.state.graberized) {
        bullets[index] = bullet.replace(/ /g, "\u200A");
      } else {
        bullets[index] = bullet.replace(
          /[\u2002\u2003\u2004\u2006\u2007\u2009\u200A]/g,
          " "
        );
      }
    }, this);
    this.setState({bullets: bullets,
                   graberized: !this.state.graberized
                  });
  }

  createBulletTesters() {
    var testers = [];
    var bullets = this.state.bullets;

    bullets.forEach(function(bullet, index) {
      testers.push(
        <BulletTester
          value={bullet}
        />
      );
    });

    return(testers);
  }


  render() {
    return (
      <div>
        <Toggle
          label="Apply Auto-Spacing:"
          checked={this.state.graberized}
          onClick={() => this.handleAutoSpace()}
        />
        <br/>
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
