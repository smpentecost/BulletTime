import React from 'react';
import { Container, FormControlLabel, FormGroup, Paper, Switch } from '@material-ui/core';

export default function BulletMenu(props) {

  return(
    <Paper elevation={6}>
      <Container>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={props.checked}
                onChange={() => props.onChange()}
              />
            }
            label="Graberize"
          />
        </FormGroup>
      </Container>
    </Paper>
  );
}
