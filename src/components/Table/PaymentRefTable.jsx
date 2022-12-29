import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import "./table.scss";
import moment from "moment";
import Axios, { AxiosResponse } from 'axios';
//import { process.env.REACT_APP_API_URL_CONFIRMPAYMENT } from '../../constant'
import "moment-timezone";
import Loading from '../../components/Loader/Loading'
import {  useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
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

function createData(docname, doctype, pono, docdate, duedate, noofdueday, totalamount ) {
    return { docname, doctype, pono, docdate, duedate, noofdueday, totalamount };
}



const useStyles = makeStyles({
    loading : {
        textAlign: 'center',
        margin: '10px 0'
    },
    textRight : {
        textAlign: 'right !important'
    },
    table: {
        minWidth: 700,
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


const PaymentRefTable = (props) => {
    const classes = useStyles();
    const rows = props.paymentHistoryData && props.paymentHistoryData
    const [loading, setSetloading] = React.useState(false);
    const custNo = localStorage.getItem('CustomerNumber');
    const { t } = useTranslation();
    const selectedLangCode = localStorage.getItem('lancode');
    // const viewPdfFile = (invoiceDoc, custNo) => { debugger
    //     setSetloading(true)
    //         Axios({method: "GET",url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT+`/downloadRecipt?customernumber=${custNo}&invoicenumber=${invoiceDoc}`,responseType: 'arraybuffer',headers: { "Content-Type": "application/json",
    //         'X-AUTH-TOKEN':localStorage.getItem('x-auth-token') }})
    //         // .then((res) => res.json())
    //         .then(async(response) => {  
    //             setSetloading(false)
    //             var link=document.createElement('a');
    //             const file = new Blob([response.data], { type: 'application/pdf' });
    //             const fileURL = await URL.createObjectURL(file);
    //             link.href=window.URL.createObjectURL(file);
    //             link.download="Invoice_"+invoiceDoc+".pdf";
    //             link.click();    
    //             // setIsLoadingDownload(false)
    //             return response.data;                   
    //         })
           
    // }
    console.log(rows, 'rows789')

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

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                        <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}}>{t("Document No.")}</StyledTableCell>
                            <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right">{t("Document Type")}</StyledTableCell>
                            <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center">{t("PO Number/Cheque Number")}</StyledTableCell>
                            <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center">{t("Document Date")}</StyledTableCell>
                            <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center">{t('Due Date')}</StyledTableCell>
                            <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center">{t('Numbers of Due Days')}</StyledTableCell>
                            <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center"  className={classes.textRight}>{t('AmountForRefrence')} 
                            {' '}
                            {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${rows && rows.inoicesData.length > 0 ? rows && rows.inoicesData[0].docCurrency  : ''})`
                              : rows && rows.inoicesData[0].docCurrency === 'THB' ? '(บาท)' :
                              rows && rows.inoicesData[0].docCurrency === 'USD' ? '(ดอลล่าร์)' :  `(${rows && rows.inoicesData.length > 0 ? rows && rows.inoicesData[0].docCurrency  : ''})`
                                       
                             }
                            </StyledTableCell>
                            {/* <StyledTableCell align="right">{t('Actions')}</StyledTableCell> */}
                           
                           
                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {
                                rows && rows.inoicesData.length > 0 ?  rows && rows.inoicesData.map((row)=>{
                                    return (
                                        <StyledTableRow key={rows && rows.paymentRefNo}  className={classes.tableBody}>
                                        <StyledTableCell component="th" scope="row" style={{fontSize:`${SmallFontChanger}px`}}>
                                            {row && row.invoiceDoc}
                                        </StyledTableCell>
                                        <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right">
                                        {row.DocumentType === "C/N" ? "Credit Note" : ""} 
                                        {row.DocumentType === "INV" ? "Invoice" : ""} 
                                        {row.DocumentType === "D/N" ? "Debit Note" : ""}
                                        {row.DocumentType === "CQR" ? "Cheque returned": ""}
                                          
                                            
                                            </StyledTableCell>
                                        <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right">{row && row.customerPONumber}</StyledTableCell>
                                        <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right">{moment(row.documentDate).format('DD-MM-YYYY')}</StyledTableCell>
                                        
                                        <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right">{moment(row.DueDate).format('DD-MM-YYYY')}</StyledTableCell>
                                        <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right">{row && row.duedays}</StyledTableCell>
                                        <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right" className={classes.textRight}>{decimalwithcoma(row && row.amountDocCurrency)}</StyledTableCell>

                                        {/* <StyledTableCell align="right">
                                        <div className="receipt_action">
                                                {
                                                    row.status  === "Receipt" ? <Box className="actions">
                                                    <Box style={{cursor: "pointer", textDecoration: "underline"}} onClick={() => viewPdfFile(row.documentNo_FI, custNo)}>
                                                        <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                                                    </Box> 
                                               
                                                
                                                </Box>:   ''
                                                }
                                  
                                     </div>    
                                        </StyledTableCell> */}
                                 
                                    </StyledTableRow>
                                    )
                                })
                              
                            : 
                            <StyledTableRow className={classes.tableBody}>
                                    <div className={classes.loading}> <Loading /></div>
                            </StyledTableRow>
                            }
                             
                    </TableBody>
                </Table>
                <div className="col-12 total-payment">
                <div className="row">
                    <div className="col-6 text-left"><h5 style={{fontSize:`${SmallFontChanger}px`}}>{t('Total AmountForRefrence')}{' '}
                    {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${rows && rows.inoicesData.length > 0 ? rows && rows.inoicesData[0].docCurrency  : ''})`
                              : rows && rows.inoicesData[0].docCurrency === 'THB' ? '(บาท)' :
                              rows && rows.inoicesData[0].docCurrency === 'USD' ? '(ดอลล่าร์)' :  `(${rows && rows.inoicesData.length > 0 ? rows && rows.inoicesData[0].docCurrency  : ''})`
                                       
                             } {' '} 
                    </h5></div>
                    <div className="col-6 text-right"><h5 style={{fontSize:`${SmallFontChanger}px`}}> 
                    {
            
            Number(parseFloat(rows && rows.paymentamount).toFixed(2)).toLocaleString('en', {
              minimumFractionDigits: 2
          })
        }
                       </h5></div>
                </div>
                </div>
            </TableContainer>
        </div>
    );
}


export default withTranslation()(PaymentRefTable);