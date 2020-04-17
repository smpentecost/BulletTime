import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import AppBar from './component/AppBar';
import BulletComposer from './component/BulletComposer';

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
            <BulletComposer />
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}
