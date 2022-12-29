import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation, useTranslation } from "react-i18next";
import Dialog from '@material-ui/core/Dialog';
import { paymentofflineActions } from "../../_actions";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Axios, { AxiosResponse } from 'axios';
import Box from '@material-ui/core/Box';
import Loading from '../../components/Loader/Loading'
//import {process.env.REACT_APP_API_URL_CONFIRMPAYMENT } from '../../constant'
import moment from 'moment'
import 'moment-timezone'
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

function PaymentModal(props) {
    let history = useHistory()
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const [loading, setSetloading] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
 

    


const goBackPayment = () => {
    history.push({
        pathname: '/Payment',
    
      })
  }
    return (
        <div>
           
            <Dialog aria-labelledby="customized-dialog-title" open={props.open}>
                <DialogTitle id="customized-dialog-title">

                </DialogTitle>
                <DialogContent>
                    <Typography>
                    {
                        props.confirmPaymentError && props.confirmPaymentError
                    }
                       
          </Typography>
                    <DialogActions>
                       
                             <div className="create_link d-flex pull-center">
                                <button className="create p-2 pl-3 pr-3" onClick={goBackPayment}>
                                    {t("ok")}
                                </button>   
                            </div>
                       
                        
                        
                    </DialogActions>
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default withTranslation()(PaymentModal);
