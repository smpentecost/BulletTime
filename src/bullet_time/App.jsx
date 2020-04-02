import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import BulletEditor from './component/BulletEditor';
import AppBar from './component/AppBar';
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
            <BulletEditor />
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}
