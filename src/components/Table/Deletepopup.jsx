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
import Axios, { AxiosResponse } from 'axios';
import Box from '@material-ui/core/Box';
//import {process.env.REACT_APP_API_URL_CONFIRMPAYMENT } from '../../constant'

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

function deletePayment(props) {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };



    return (
        <div>
           
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>

                </DialogTitle>
                <DialogContent>
                    <Typography>
                       <p className="mb-0">{t("label.payment_text_popup")}</p>
                       <p className="mb-0 text-secondary">Are you sure</p>
                       
                 </Typography>
                    <DialogActions>
                        <div className="create_link d-flex pull-center">
                            <button className="create p-2 pl-3 pr-3">
                                Delete
                            </button>   
                            <button className="create p-2 pl-3 pr-3">
                            cancel
                            </button>   
                        </div>
                        
                    </DialogActions>
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default withTranslation()(deletePayment);
