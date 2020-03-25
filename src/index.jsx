import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class PDFLine extends React.Component {
  onChange(event) {
    var newState = this.props.state;
    newState.value = event.target.value;
    this.props.updateState(newState);
  }
  
  render() {
    return (
      <textarea
        placeholder="Start a new bullet..."
        className="pdfline"
        value={this.props.state.value}
        onChange={event => this.onChange(event)}
      >
      </textarea>
    );
  }
}

class GraberToggle extends React.Component {
  onClick() {
    var newState = this.props.state;
    newState.graberized = !newState.graberized;

    if (newState.graberized) {
      newState.value = newState.value.replace(/ /g, "\u2003");
    } else {
      newState.value = newState.value.replace(/[\u2003]/g, " ");
    }

    this.props.updateState(newState);
  }
  
  render() {
    return(
      <div>
        <label className="toggle-label">
          Apply Auto-Spacing:
        </label>
        <label className="graber-toggle">
          <input
            type="checkbox"
            checked={this.props.state.graberized}
            onClick={() => this.onClick()}
          />
          <span className="slider round"></span>
        </label>
      </div>
    );
  }
}

class BulletEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null, //'- Develops threat radar models/simulations; drives US/Allied radar warning reprogramming & intel mission data feeds',
      graberized: false,
    };
  }

  updateState(newState) {
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <PDFLine
          state={this.state}
          updateState={newState => this.updateState(newState)}
        />
        <br/>
        <br/>
        <GraberToggle
          state={this.state}
          updateState={newState => this.updateState(newState)}
        />
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
