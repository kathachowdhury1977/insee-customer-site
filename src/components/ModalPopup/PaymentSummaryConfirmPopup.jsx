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

function PaymentSummaryConfirmPopup(props) {
    let history = useHistory()
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const [loading, setSetloading] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    let userName = localStorage.getItem('userData');
    userName = JSON.parse(userName);
    const soldToNo = userName.soldTo[0]
    const transationdateFormet =  moment(props.paymentDate).format('DD-MM-YYYY')

    const viewPdfFile = (paymentRefNo, transationdate, history= "history") => { 
        setSetloading(true)
        Axios({method: "GET",url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT+`/download?date=${transationdate}&refno=${paymentRefNo}&type=${history}`,responseType: 'arraybuffer',  headers: { "Content-Type": "application/json",
        'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
    }})
        // .then((res) => res.json())
        .then(async(response) => {  
            var link=document.createElement('a');
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = await URL.createObjectURL(file);
            link.href=window.URL.createObjectURL(file);
            link.download="Invoice_"+paymentRefNo+".pdf";
            link.click();    
            setSetloading(false)
            return response.data;                   
        })
       
}

const viewdetailsPayment = () => {
    dispatch(
        paymentofflineActions.loadcacheData(soldToNo)
     );
    history.push({
        pathname: '/PaymentHistory',
    
      })
}

    return (
        <div>
           
            <Dialog aria-labelledby="customized-dialog-title" open={props.open}>
                <DialogTitle id="customized-dialog-title">

                </DialogTitle>
                <DialogContent>
                    <Typography>
                       <p className="mb-0">{t("label.payment_text_popup")}</p>
                       <p className="mb-0 text-secondary">{t("Payment Ref No")} : {props.paymentrefno && props.paymentrefno}</p>
                       <div className="row mt-3">
                            <div className="col-12">
                            {loading ? <div className="loading1"> <Loading /> </div> : ''}
                            <Box style={{cursor: "pointer", textDecoration: "underline"}} onClick={() => viewPdfFile(props.paymentrefno, transationdateFormet)}>
                                    {t("label.download_bill")}
                            </Box>
                             
                            </div>
                        </div>
          </Typography>
                    <DialogActions>
                        <div className="create_link d-flex pull-center">
                            <button className="create p-2 pl-3 pr-3" onClick={viewdetailsPayment}>
                                {t("viewdetails.button")}
                            </button>   
                        </div>
                        
                    </DialogActions>
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default withTranslation()(PaymentSummaryConfirmPopup);
