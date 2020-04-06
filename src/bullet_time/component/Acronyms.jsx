import React from "react";
import initSqlJs from "sql.js";
import AcronymList from '../data/acronyms.db';
import test from './test.txt';


export default class Acronyms extends React.Component {

  constructor() {
    super();
    this.state = { db: null, err: null, results: null };
  }

  componentDidMount() {
    // sql.js needs to fetch its wasm file, so we cannot immediately
    // instantiate the database without any configuration, initSqlJs
    // will fetch the wasm files directly from the same path as the js
    // see ../config-overrides.js

    // initSqlJs({
    // }).then(SQL => {
    //   fetch(test).then(function(response) {
    //     return response.blob();
    //   }).then(function(data) {
    //     var reader = new FileReader();
    //     reader.onload = (function(e) {
    //       console.log(e.target.result);
    //     });
    //     reader.readAsText(data);
    //   });
    // var db;
    // initSqlJs({
    // }).then(SQL => {
    //   fetch(AcronymList).then(function(response) {
    //     return response.arrayBuffer();
    //   }).then(function(data) {
    //     //        var reader = new FileReader();
    //     //      reader.onload = function() {
    //     console.log(data);
    //     var Uints = new Uint8Array(data);
    //     console.log(Uints);
    //     db = new SQL.Database(Uints);
    //   });

    //   this.setState({ db: db });
    // });
    //      .catch(err => this.setState({ err }));

    var xhr = new XMLHttpRequest();
    // For example: https://github.com/lerocha/chinook-database/raw/master/ChinookDatabase/DataSources/Chinook_Sqlite.sqlite
    xhr.open('GET', AcronymList , true);
    xhr.responseType = 'arraybuffer';
    
    xhr.onload = e => {
      var uInt8Array = new Uint8Array(xhr.response);
      var db = new SQL.Database(uInt8Array);
    };
    xhr.send();
  }

  exec(sql) {
    let results = null, err = null;
    try {
      // The sql is executed synchronously on the UI thread. 
      // You may want to use a web worker
      results = this.state.db.exec(sql); // an array of objects is returned
    } catch (e) {
      // exec throws an error when the SQL statement is invalid
      err = e;
    }
    this.setState({ results, err });
  }

  /**
   * Renders a single value of the array returned by db.exec(...) as a table
   */
  renderResult({ columns, values }) {
    return (
      <table>
        <thead>
          <tr>
            {columns.map(columnName =>
              <td>{columnName}</td>
            )}
          </tr>
        </thead>

        <tbody>
          {values.map(row => // values is an array of arrays representing the results of the query
            <tr>
              {row.map(value =>
                <td>{value}</td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let { db, err, results } = this.state;
    if (!db) return <pre>Loading...</pre>;
    return (
      <div className="App">

        <h1>React SQL interpreter</h1>

        <textarea
          onChange={e => this.exec(e.target.value)}
          placeholder="Enter some SQL. No inpiration ? Try “select sqlite_version()”"
        ></textarea>

        <pre className="error">{(err || "").toString()}</pre>

        <pre>{results
          ? results.map(this.renderResult) // results contains one object per select statement in the query
          : ""
        }</pre>

      </div>
    );
  }

}
