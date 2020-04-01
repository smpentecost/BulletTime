import React from 'react';
import Guide from './Guide';
import BulletArea from './BulletArea';
import { Paper } from '@material-ui/core';

export default function GuidedBulletArea(props) {
  return (
    <Paper elevation={6}>
      <div className="guided-bullet-area">
        <BulletArea
          bullets={props.bullets}
          disabled={props.disabled}
          onChange={event => props.onChange(event)}
        />
        <Guide
          position={props.guide}
        />
      </div>
    </Paper>
  );
}
