import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Axios, { AxiosResponse } from 'axios';
import RefreshIcon from '../../assets/img/refreshIcon.png'
//import { process.env.REACT_APP_API_URL_CONFIRMPAYMENT } from '../../constant'
import { paymentofflineActions, masterActions } from "../../_actions";
import Pagination from '@material-ui/lab/Pagination';
import Loading from '../../components/Loader/Loading'
import moment from "moment";
import "moment-timezone";
import "./table.scss";
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

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {

    },
}))(TableRow);

function createData(docname, doctype, pono, docdate, duedate, noofdueday, totalamount, status ) {
    return { docname, doctype, pono, docdate, duedate, noofdueday, totalamount, status };
}



const useStyles = makeStyles({
    refreshButton : {
        background : '#ffffff',
        border: '0px'
    },
    loadingOne: {
        textAlign: 'center',
        margin: '5px 0'
    },
    table: {
        minWidth: 700,
    },
    textRight : {
        textAlign: 'right !important'
    },
    tableBody : {
        '& th' : {
           
            padding: '10px !important', 
        },
        '& td': {
           
            padding: '10px !important', 
        }
    }
});

export default function PaymentHistoryTable(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const custNo = localStorage.getItem('CustomerNumber');
    const rows = props.paymentHistory &&  props.paymentHistory
    const rowsData = props.paymentHistory &&  props.paymentHistory
    let userName = localStorage.getItem("userData");
    const [loading, setSetloading] = React.useState(false);
    let page = props.page
    const selectedLangCode = localStorage.getItem('lancode');
	userName = JSON.parse(userName);
    const viewPdfFile = (paymentRefNo, transationdate, statusType, reciptnumber, history= "history") => {
        if(statusType === "Receipt") {
            setSetloading(true)
            Axios({method: "GET",url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT+`/downloadRecipt?customernumber=${custNo}&invoicenumber=${reciptnumber}`,responseType: 'arraybuffer',headers: { "Content-Type": "application/json",
            'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
            'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
        }})
            // .then((res) => res.json())
            .then(async(response) => {  
                setSetloading(false)
                var link=document.createElement('a');
                const file = new Blob([response.data], { type: 'application/pdf' });
                const fileURL = await URL.createObjectURL(file);
                link.href=window.URL.createObjectURL(file);
                link.download="Invoice_"+reciptnumber+".pdf";
                link.click();    
                // setIsLoadingDownload(false)
                return response.data;                   
            })
        }
        else {
            var transationdateFormat = moment(transationdate).format('DD-MM-YYYY')
            setSetloading(true)
                Axios({method: "GET",url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT+`/download?date=${transationdateFormat}&refno=${paymentRefNo}&type=${history}`,responseType: 'arraybuffer',headers: { "Content-Type": "application/json",
                'X-AUTH-TOKEN':localStorage.getItem('x-auth-token'),
                'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
             }})
                // .then((res) => res.json())
                .then(async(response) => {  
                    setSetloading(false)
                    var link=document.createElement('a');
                    const file = new Blob([response.data], { type: 'application/pdf' });
                    const fileURL = await URL.createObjectURL(file);
                    link.href=window.URL.createObjectURL(file);
                    link.download="Invoice_"+paymentRefNo+".pdf";
                    link.click();    
                    // setIsLoadingDownload(false)
                    return response.data;                   
                }) 
        }
      
           
    }
    const  decimalwithcoma = (num) => 
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)
  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);

    return (
        <div className="table-resp">
            <div className="col-md-12 text-right mb-2">
                <button className={classes.refreshButton} onClick={props.refresPendingData}>
                    <img src={RefreshIcon} />
                </button>
            </div>
            {
                loading ? <div className={classes.loadingOne}> <Loading /> </div> : ''
            }
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}}>{t("label.payment_ref_no")}</StyledTableCell>
                            <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right">{t("Document Type")}</StyledTableCell>
                            <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center">{t("label.bankname")}</StyledTableCell>
                            <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center">{t('Transaction date')}</StyledTableCell> 
                            <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center"  className={classes.textRight}>{t('label.total_amount')} 
                            {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${rows && rows.results.length > 0 ? rows && rows.results[0].invoiceid[0].docCurrency  : ''})`
                              :rows && rows.results.length > 0 ? rows && rows.results[0].invoiceid[0].docCurrency === 'THB' ? '(บาท)' : '' :
                              rows && rows.results.length > 0 ? rows && rows.results[0].invoiceid[0].docCurrency === 'USD' ? '(ดอลล่าร์)': '' :  `(${rows && rows.results.length > 0 ? rows && rows.results[0].invoiceid[0].docCurrency  : ''})`
                                       
                             }
                           </StyledTableCell>
                            <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center">{t('Status')}</StyledTableCell>
                            <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right">{t('Actions')}</StyledTableCell>

                         
                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.totalCount > 0 ? rows && rows.results.map((row) => (
                            <StyledTableRow key={row.name} className={classes.tableBody}>
                                <StyledTableCell component="th" scope="row" style={{fontSize:`${SmallFontChanger}px`}}>
                                    <Link to={{pathname: "/PaymentRefrence" , state: {id: row.id}, }}>{row.paymentRefNo}</Link>
                                </StyledTableCell>
                                <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right">{row.paymenttype && row.paymenttype === "DirectDebit" ? "Online Direct Debit" :  row.paymenttype}</StyledTableCell>
                                <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right">{row.paymentbank}</StyledTableCell>
                                <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right">{moment(row.transationdate).format('DD-MM-YYYY')}</StyledTableCell>
                                <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right"  className={classes.textRight}>{decimalwithcoma(row.paymentamount)}</StyledTableCell>
                                <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right"><span className="sattled-color">{row.paymentstatus && row.paymentstatus === "Suspicious." ? "Failed" : row.paymentstatus}</span></StyledTableCell>  
                                  <StyledTableCell align="right">
                                     <div className="receipt_action" style={{fontSize:`${SmallFontChanger}px`}}>
                                    {
                                        row.paymenttype === 'DirectDebit' && row.paymentstatus === "In-Progress" ? '' :
                                        row.paymentstatus === "Cancelled" ||  row.paymentstatus === "Processing" || row.paymentstatus && row.paymentstatus === "Failed" ||  row.paymentstatus === "Fail" || row.paymentstatus === "Failure" || row.paymentstatus && row.paymentstatus === "Suspicious." ? '' :  
                                        <Box className="actions">
                                        {
                                            
                                               <Box style={{cursor: "pointer", textDecoration: "underline"}} onClick={() => viewPdfFile(row.paymentRefNo, row.transationdate, row.paymentstatus, row.reciptnumber)}>
                                                    <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                                                </Box>
                                        }
                                      
                                       {
                                           
                                           row.paymentstatus === "Receipt"  ? '' : 
                                            row.paymenttype === 'DirectDebit' && row.paymentstatus === "In-Progress" ? '' :
                                           <Box style={{cursor: "pointer", textDecoration: "underline"}} onClick={() => props.handleOpen(row.id)}>
                                           <i className="fa fa-trash"></i>
                                        </Box>
                                       }
                                       
                                    </Box> 
                                    }
                                  
                                     </div>
                                    </StyledTableCell>  

                            </StyledTableRow>
                        )) :   <StyledTableRow className={classes.tableBody}>
                        <div className="noBankFound">{t('Data not available')}</div>
                   </StyledTableRow>
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
                <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>

                </DialogTitle>
                <DialogContent>
                    <Typography>
                       <p className="mb-0">{t("Are you sure want to remove this payment history?")}</p>
                       {/* <p className="mb-0 text-secondary">Are you sure</p> */}
                       
                 </Typography>
                    <DialogActions>
                        <div className="create_link d-flex pull-center">
                            <button className="create p-2 pl-3 pr-3" onClick={props.deleteData}>
                            {t("pickupform.yes")}
                            </button>   
                            <button className="create p-2 pl-3 pr-3" onClick={props.handleClose}>
                            {t("pickupform.no")}
                            </button>   
                        </div>
                        
                    </DialogActions>
                </DialogContent>

            </Dialog>
            <div className="col-md-12 text-right mt-4 mb-4">
                     {
                       
                       <Pagination count={Math.ceil(rows && rows.totalCount/10)} page={page} onChange={props.handleChangePage} />
                   }
                   
                </div>
        </div>
        
    );
}
