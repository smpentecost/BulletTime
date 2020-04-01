import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});


export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >
      <List>
        <ListItem
          button
          component="a"
          href="https://github.com/smpentecost/BulletTime/tree/master"
          target="_blank"
        >
          <ListItemIcon><GitHubIcon /></ListItemIcon>
          <ListItemText primary='View Source' />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Drawer open={props.open} onClose={props.toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
