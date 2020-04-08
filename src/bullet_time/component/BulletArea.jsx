import React from 'react';
import initSqlJs from "sql.js";
import HighlightedTextarea from './HighlightedTextarea';
import AcronymList from '../data/acronyms.sqlite';

export default class BulletArea extends React.Component {

  static SQL_Search = "SELECT * FROM words;";
  
  constructor(props){
    super(props);
    this.state = { db: null, err: null, results: null };
  }

  componentDidMount() {
    // sql.js needs to fetch its wasm file, so we cannot immediately
    // instantiate the database without any configuration, initSqlJs
    // will fetch the wasm files directly from the same path as the js
    // see ../config-overrides.js
    initSqlJs()
      .then(SQL => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', AcronymList , true);
        xhr.responseType = 'arraybuffer';
    
        xhr.onload = e => {
          var uInt8Array = new Uint8Array(xhr.response);
          var db = new SQL.Database(uInt8Array);
          this.setState({ db: db });
        };
        xhr.send();
      })
      .catch(err => this.setState({ err }));
  }

  highlight(input) {
    let words = new Set(input.split(" ")); // Come back to this and include everything that isn't alphaneumeric or specifically allowed symbols
    let marks = [];
    words.forEach((word) => {
      let result = this.state.db.exec("SELECT * FROM words WHERE word LIKE :str ;", {':str':word});
      if (result.length > 0) {
        const start = input.indexOf(word);
        const end = start + word.length;
        const location = new Array(start, end);
        marks.push(location);
      }
    }, this);
    return marks;
  }
  
  render() {
    let { db, err, results } = this.state;
    if (!db) return <pre>Loading...</pre>;
    return(
    <HighlightedTextarea
      value={this.props.bullets.join('\n')}
      disabled={this.props.disabled}
      onChange={event => this.props.onChange(event)}
      highlight={input => this.highlight(input)}
    />
    );
  }
}
