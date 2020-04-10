import React from 'react';
import '../style/HighlightedTextarea.css';

export default class HighlightedTextarea extends React.Component {

  static OPEN_MARK = '<span class=acronym>';
  static CLOSE_MARK = '</span>';

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.getHighlights = this.getHighlights.bind(this);
  }

  handleScroll(event) {
    const scrollTop = event.target.scrollTop;
    this.refs.backdrop.scrollTop = scrollTop;
  }

  openMark(id) {
    console.log(id.replace(/\s/g, "-"));
    return '<span id=' + id.replace(/\s/g, "-") +' class=acronym>';
  }

  getHighlights() {
    let highlightMarks = this.props.value;

    // escape HTML
    highlightMarks = highlightMarks.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    highlightMarks = highlightMarks.replace(this.props.regexp, HighlightedTextarea.OPEN_MARK + '$1' + HighlightedTextarea.CLOSE_MARK);

    // this keeps scrolling aligned when input ends with a newline
    highlightMarks = highlightMarks.replace(new RegExp('\\n(' + HighlightedTextarea.CLOSE_MARK + ')?$'), '\n\n$1');

    return highlightMarks;
  }

  handleClick(event){
    event.preventDefault();
    let x = event.clientX;
    let y = event.clientY;
    console.log(event.target);
  }

  render() {
    return (
      <div className="hwt-container">
        <div
          className={`hwt-backdrop ${this.props.disabled ? "disabled" : ""}`}
          ref="backdrop"
        >
          <div
            className="hwt-highlights hwt-content"
            dangerouslySetInnerHTML={{__html: this.getHighlights()}}
          />
        </div>
        <textarea
          className="hwt-input hwt-content"
          onChange={event => this.props.onChange(event)}
          onScroll={this.handleScroll}
          value={this.props.value}
          placeholder="Write your bullets here..."
          rows="20"
          autofocus="true"
          onContextMenu={this.handleClick}
        />
      </div>
    );
  }
}
