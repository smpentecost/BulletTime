import React from 'react';
import { Container, Divider, FormControlLabel, FormGroup, Paper, Switch } from '@material-ui/core';
import TrimController from './TrimController';

export default function BulletMenu(props) {

  return(
    <Paper elevation={6}>
      <Container>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={props.checked}
                onChange={(direction) => props.onGraberize(direction)}
              />
            }
            label="Graberize"
          />
          <Divider/>
          <TrimController
            onTrim={(arg) => props.onTrim(arg)}
          />
        </FormGroup>
      </Container>
    </Paper>
  );
}
