import React from 'react';
import initSqlJs from "sql.js";
import AcronymList from '../data/acronyms.sqlite';
import { Editor, EditorState } from 'draft-js';
import '../style/BulletArea.css';

export default class BulletArea extends React.Component {

  static SQL_Search = "SELECT * FROM words;";
  
  constructor(props){
    super(props);
    this.state = {
      db: null,
      err: null,
      regexp: null,
      editorState: EditorState.createEmpty(),
    };
    this.handleNewBullet = this.handleNewBullet.bind(this);
    this.onChange = this.onChange.bind(this);
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
          this.setState({ db: db }, this.getRegExp);
        };
        xhr.send();
      })
      .catch(err => this.setState({ err }));
  }

  getRegExp() {
    let result = this.state.db.exec("SELECT word FROM words;")[0].values;
    result = result.sort((a, b) => {return b[0].length-a[0].length;});
    
    let regexp_def = "\\b(" + result.join("|").replace(/[\\[.+*?%&(){^$]/g, "\\$&") + ")(?=(\\s|$))";
    regexp_def = regexp_def.replace(/\s/g, "\\s"); //Enable matches even after graberizing

    this.setState({regexp: new RegExp(regexp_def, "gi")});
  }

  handleNewBullet() {
    let bullets = this.props.bullets;
    bullets.push("");
    this.props.onChange(bullets);
  }


  onChange(editorState) {
    this.props.onChange(editorState.getCurrentContent().getPlainText().split('\n'));
    this.setState({editorState});
  };


  render() {
    let { db, err, results } = this.state;
    if (!db) return <pre>Loading...</pre>;
    return(
      <div className={`bullet-container ${this.props.disabled ? "disabled" : ""}`}>
        <Editor editorState={this.state.editorState} onChange={this.onChange}/>
        <div id="tail" onClick={this.handleNewBullet}>
          - Start a new bullet...
        </div>
      </div>
    );
  }
}
