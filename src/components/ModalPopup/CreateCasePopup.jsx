import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { useTranslation } from "react-i18next";

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

const DialogContent = withStyles(() => ({
  root: {
    padding: "25px",
    textAlign: "center",
    width: "517px"
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    // margin: 0,
    padding: theme.spacing(1),
    textAlign: "center",
    marginTop: "20px",
    display: "block"
  },
}))(MuiDialogActions);

export default function CreateCasePopup(props) {
  const [title, setTitle] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    props.handleOpenModel(false);
    
  };


  const handleOk = () => {
    setOpen(false);
    props.isCreateCase(true);
    props.handleOpenModel(false);
    
  };
  useEffect(() => {
    !!props.openModal && setOpen(true)
  }, [])

  const { t } = useTranslation();
  const caseDetails = useSelector((state) => state.createCase)
  const history = useHistory();

  return (
    <div>
      <Dialog onClose={() => {
        // history.push("/caseList");
      }} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => {
          setOpen(false)
          handleClose();
        }}>

        </DialogTitle>
        <DialogContent>
          <Typography>
            {title || <span>
              <strong>{t('Are you sure you want to Create the case')}</strong>
            </span>}
          </Typography>
          {!title && <DialogActions>
            <div className="create_link">
              <button className="create" onClick={handleOk} >{props.done} </button>

              <button onClick={handleClose} className="cancel">{props.cancel}</button>
            </div>
          </DialogActions>}

        </DialogContent>

      </Dialog>
    </div >
  );
}
