import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
}));


export default function Trim(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({trim: 0});

  const onTrim = (arg) => (event) => {
    let trim = state.trim;
    if (typeof arg === "string") {
      if (arg === "left") {
        trim--;
      } else if (arg === "right") {
        trim++;
      }
    }
    setState({trim: trim});
    props.onTrim(trim);
  };

  
  return(
    <div className={classes.root}>
      <IconButton color="secondary">
        <ArrowLeft
          onClick={onTrim("left")}
          color="primary"
        ></ArrowLeft>
      </IconButton>
      <TextField
        style={{width: 80}}
        value={state.trim}
        size="small"
        label="Trim"
        variant="outlined"
        color="secondary"
        InputProps={{
          endAdornment: <InputAdornment position="end">px</InputAdornment>,
        }}
      />
      <IconButton color="secondary">
        <ArrowRight
          onClick={onTrim("right")}
          color="primary"
        ></ArrowRight>
      </IconButton>
    </div>
  );
}
