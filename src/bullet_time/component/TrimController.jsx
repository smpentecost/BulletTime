import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));


export default function Trim(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({trim: 0});

  const onTrim = (arg) => (event) => {
    const re = /^-?[0-9]*$/;
    let trim = state.trim;
    if (typeof arg === "string") {
      if (arg === "left") {
        trim--;
      } else if (arg === "right") {
        trim++;
      }
      setState({trim: trim});
      props.onTrim(trim);
    } else {
      let input = event.target.value;
      if (re.test(input)) {
        setState({trim: input});
        if (!isNaN(input)) {
          props.onTrim(parseInt(input, 10));
        } else {
          props.onTrim(0);
        }
      }
    }
  };

  return(
    <Container>
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Grid item>
        <IconButton
          color="secondary"
          onClick={onTrim("left")}
        >
          <ChevronLeft
            color="primary"
          ></ChevronLeft>
        </IconButton>
      </Grid>
      <Grid item>
        <TextField
          style={{width: 80}}
          value={state.trim}
          size="small"
          label="Trim"
          variant="outlined"
          color="secondary"
          onChange={onTrim()}
          onBlur={(event) => (
            event.target.value === "" || event.target.value === "-" ? setState({trim: 0}):0
          )}
          InputProps={{
            endAdornment: <InputAdornment position="end">px</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item>
        <IconButton
          color="secondary"
          onClick={onTrim("right")}
        >
          <ChevronRight
            color="primary"
          ></ChevronRight>
        </IconButton>
      </Grid>
    </Grid>
    </Container>
  );
}
