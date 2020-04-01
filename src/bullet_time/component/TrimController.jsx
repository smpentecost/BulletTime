import React from 'react';
import { IconButton } from '@material-ui/core';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';

export default function Trim(props) {
  return(
    <div className="title-object">
      <IconButton
        disableRipple="true"
      >
        <ArrowLeft
          onClick={() => props.onTrim("left")}
        ></ArrowLeft>
      </IconButton>
      Trim
      <IconButton>
        <ArrowRight
          onClick={() => props.onTrim("right")}
        ></ArrowRight>
      </IconButton>
    </div>
  );
}
