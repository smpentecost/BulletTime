import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Welcome() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Guide to Bullet Time v1.0.0
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Bullet Time was created to ease the formatting burden that often accompanies Air Force style bullet writing. The application is not finished but new features are being added all the time. For now, Bullet Time offers the following:
          </Typography>
          <Typography gutterBottom>
            <h4>Auto-Spacing (Graberization)</h4>
            Bullet Time can automatically replace standard space characters with alternative whitespace characters in order to meet length requirements. These new characters are supported by PDF documents and will allow you to ensure your bullets fill an entire line exactly. Simply turn on "Graberization" and then copy and paste the bullets into your form. If you are working in a form with a different line width, change the Trim value in the Spacing Menu.
          </Typography>
          <Typography gutterBottom>
            <h4>Acronym/Abbreviation Replacement</h4>
            Bullet Time supports acronym/abbreviation recognition and replacement. As you write your bullet, if a word is <span className="acronym">highlighted green</span> you can right click it to get a list of approved replacements. Note: The list of approved replacements is not currently customizable but that feature is in the works.
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}
