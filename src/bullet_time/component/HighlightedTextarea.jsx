import React from 'react';
import '../style/HighlightedTextarea.css';

export default class HighlightedTextarea extends React.Component {

  static OPEN_MARK = '<span class=acronym>';
  static CLOSE_MARK = '</span>';

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll(event) {
    const scrollTop = event.target.scrollTop;
    this.refs.backdrop.scrollTop = scrollTop;
  }

  handleRegexHighlight(input, payload) {
    return input.replace(payload, HighlightedTextarea.OPEN_MARK + '$&' + HighlightedTextarea.CLOSE_MARK);
  }

  handleArrayHighlight(input, payload) {
    let offset = 0;
    payload.forEach(function(element) {

      // insert open tag
      var open = element[0] + offset;

      if(element[2]) {
        const OPEN_MARK_WITH_CLASS = '<mark class="' + element[2] + '">';
        input = input.slice(0, open) + OPEN_MARK_WITH_CLASS + input.slice(open);
        offset += OPEN_MARK_WITH_CLASS.length;
      } else {
        input = input.slice(0, open) + HighlightedTextarea.OPEN_MARK + input.slice(open);
        offset += HighlightedTextarea.OPEN_MARK.length;
      }

      // insert close tag
      var close = element[1] + offset;

      input = input.slice(0, close) + HighlightedTextarea.CLOSE_MARK + input.slice(close);
      offset += HighlightedTextarea.CLOSE_MARK.length;

    }, this);
    return input;
  }

  getHighlights() {
    let highlightMarks = this.props.value;
    const payload = this.props.highlight(highlightMarks);

    // escape HTML
    highlightMarks = highlightMarks.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    if (payload) {
      switch (payload.constructor.name) {
        case 'Array':
          highlightMarks = this.handleArrayHighlight(highlightMarks, payload);
          break;
        case 'RegExp':
          highlightMarks = this.handleRegexHighlight(highlightMarks, payload);
          break;
        default:
          throw 'Unrecognized payload type!';
      }
    }

    // this keeps scrolling aligned when input ends with a newline
    highlightMarks = highlightMarks.replace(new RegExp('\\n(' + HighlightedTextarea.CLOSE_MARK + ')?$'), '\n\n$1');

    // highlightMarks = highlightMarks.replace(new RegExp(HighlightedTextarea.OPEN_MARK, 'g'), '<mark>');
    // highlightMarks = highlightMarks.replace(new RegExp(HighlightedTextarea.CLOSE_MARK, 'g'), '</mark>');

    return highlightMarks;
  }

  render() {
    return (
      <div className="hwt-container">
        <div className="hwt-backdrop" ref="backdrop">
          <div
            className="hwt-highlights hwt-content"
            dangerouslySetInnerHTML={{__html: this.getHighlights()}}
          />
        </div>
        <textarea
          className={
            `hwt-input hwt-content ${this.props.disabled ? "disabled" : ""}`
          }
          onChange={event => this.props.onChange(event)}
          onScroll={this.handleScroll}
          value={this.props.value}
          placeholder="Write your bullets here..."
          rows="20"
          autofocus="true"
        />
      </div>
    );
  }
}
