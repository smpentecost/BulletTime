import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel,
         Switch,
       } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  track: {
    backgroundColor: '#FFFFFF',
  }
}));

export default function StateSaver(props) {
  const classes = useStyles();

  return(
    <FormControlLabel
      control=
        {<Switch
           checked={props.autosave}
           onChange={() => props.handleClick()} 
         />}
      label="Auto-Save"
    />
  );
}
