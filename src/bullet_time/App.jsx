import React from 'react';
import initSqlJs from "sql.js";
import { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

// Components
import AppBar from './component/AppBar';
import BulletComposer from './component/BulletComposer';

// Data
import AcronymList from './data/acronyms.sqlite';

// Style
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0d0811',
    },
    secondary: {
      main: '#08ff11',
    },
  },
});
      
export default class BulletTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acronymDb: null,
      err: null,
      acronymRegExp: null,
    };
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
          this.setState({ acronymDb: db }, this.getRegExp);
        };
        xhr.send();
      })
      .catch(err => this.setState({ err }));
  }

  getRegExp() {
    let db = this.state.acronymDb;
    let result = db.exec("SELECT word FROM words;")[0].values;
    result = result.sort((a, b) => {return b[0].length-a[0].length;});
    result = result.filter(x => x[0].length > 1);
  
    let regexp_def = "\\b(" + result.join("|").replace(/[\\[.+*?%&(){^$]/g, "\\$&") + ")(?=([\\s;\\.]|$))";
    regexp_def = regexp_def.replace(/\s/g, "\\s"); //Enable matches even after graberizing

    this.setState({acronymRegExp: new RegExp(regexp_def, "gi")});
  }

  renderComposer() {
    let regexp = this.state.acronymRegExp;
    if (!regexp) return <pre>Loading...</pre>;

    return <BulletComposer
             regexp={this.state.acronymRegExp}
             db={this.state.acronymDb}
           />;
  }
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Grid
          container
          direction="column"
          spacing={1}
        >
          <Grid item>
            <AppBar />
          </Grid>
          <Grid item>
            {this.renderComposer()}
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}
