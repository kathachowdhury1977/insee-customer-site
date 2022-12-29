import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation, useTranslation } from "react-i18next";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
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

function ConfirmOrderPopup(props) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <span onClick={handleClickOpen}>
       {props.modal}
      </span>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
         
        </DialogTitle>
        <DialogContent>
          <Typography>
             Your Order is Complete    
          </Typography>
          <DialogActions>
             <div className="create_link d-flex" style = {{paddingLeft: "70px"}}>
            
                  <button className="create p-2">
                    <Link className="text-white" to="/PlaceOrder">{t("createneworder.button")}</Link>
                  </button>
                  <button className="create p-2">
                    <Link className="text-white" to="/CheckoutProcess">{t("viewmyorder.button")}</Link>
                  </button>
              </div>
        </DialogActions>
        </DialogContent>
        
      </Dialog>
    </div>
  );
}

export default withTranslation()(ConfirmOrderPopup);
