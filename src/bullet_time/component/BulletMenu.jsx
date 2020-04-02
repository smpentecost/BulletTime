import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, Divider, FormControlLabel, FormGroup, Grid, Paper, Switch, Toolbar, Typography } from '@material-ui/core';
import TrimController from './TrimController';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function BulletMenu(props) {
  const classes = useStyles();
  
  return(
    <Paper elevation={6}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            className={classes.title}
          >
            Spacing Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <TrimController
          onTrim={(arg) => props.onTrim(arg)}
      />
        <Divider/>
        <FormControlLabel
          control=
            {<Switch
               checked={props.checked}
               onChange={() => props.onGraberize()}
             />}
          label="Graberize"
        />
          </Container>
    </Paper>
  );
}
