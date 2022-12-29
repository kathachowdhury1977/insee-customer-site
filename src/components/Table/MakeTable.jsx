import React, {useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import Loading from '../../components/Loader/Loading'
import { paymentofflineActions } from "../../_actions";
import { withTranslation, useTranslation } from "react-i18next";
import "./table.scss";
import moment from "moment";
import "moment-timezone";
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
    return { docname, doctype, pono, docdate, duedate, noofdueday, totalamount  };
}

// const rows = [
//     createData('0123456', 'Invoice', 'xyz', '10/12/2020', '21/04/2021', '21', '3,770.00', ''),
//     createData('0123456', 'Invoice', 'xyz', '10/12/2020', '21/04/2021', '21', '3,770.00', ''),
//     createData('0123456', 'Invoice', 'xyz', '10/12/2020', '21/04/2021', '21', '3,770.00', ''),
//     createData('0123456', 'Invoice', 'xyz', '10/12/2020', '21/04/2021', '21', '3,770.00', ''),
//     createData('0123456', 'Invoice', 'xyz', '10/12/2020', '21/04/2021', '21', '3,770.00', ''),
// ];

const useStyles = makeStyles({
    root: {
        width: "100%",
      },
    loading: {

    },
    containerTable: {
        //   maxHeight: 1000,
         },
    textRight : {
        textAlign: 'right !important'
    },
    SummaryTd: {
        background: '#ccc',
        '& th' : {
            fontSize: '12px !important',
            padding: '10px !important', 
        },
        '& td': {
            fontSize: '12px !important',
            padding: '10px !important', 
        }
    },
    tableBody : {
        '& th' : {
            fontSize: '12px !important',
            padding: '10px !important', 
        },
        '& td': {
            fontSize: '12px !important',
            padding: '10px !important', 
        }
    }
});


    const MakeTable = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    var storedNames = JSON.parse(localStorage.getItem("paymentid"));
    let custmerNo = localStorage.getItem('CustomerNumber');
    const selectedLangCode = localStorage.getItem('lancode');
    useEffect(() =>{

        dispatch(paymentofflineActions.getPendingPaymentStatus("check", custmerNo));
    },[]);

  

  const rows = props.makePaymentDataFinal
    console.log(rows, 'rows789')
    return (
        <div className="table-resp">
             <Paper className={classes.root}>
            <TableContainer  className={classes.containerTable}>
                <Table className={classes.table} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        <StyledTableCell>{t("Document No.")}</StyledTableCell>
                            <StyledTableCell align="right">{t("Document Type")}</StyledTableCell>
                            <StyledTableCell align="center">{t("PO Number/Cheque Number")}</StyledTableCell>
                            <StyledTableCell align="center">{t("Document Date")}</StyledTableCell>
                            <StyledTableCell align="center">{t('Due Date')}</StyledTableCell>
                            <StyledTableCell align="center">{t('Numbers of Due Days')}</StyledTableCell>
                            <StyledTableCell align="center"  className={classes.textRight}>{t('label.total_amount')} {' '}
                            {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${props.docCurrencyData})`
                              : props.docCurrencyData === 'THB' ? '(บาท)' :
                              props.docCurrencyData === 'USD' ? '(ดอลล่าร์)' :  `(${props.docCurrencyData})`
                                       
                             }
                            </StyledTableCell>
                            <StyledTableCell align="right">{t('Actions')}</StyledTableCell>
                            
                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.length > 0 && rows != undefined ? rows.map((row) => (
                            
                                row != undefined ?
                                <StyledTableRow key={row.name} className={row.soiNumber ? classes.SummaryTd : classes.tableBody}>
                                <StyledTableCell component="th" scope="row">
                                    {row.invoiceDoc}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.soiNumber ? "Summary" : `${row.DocumentType === "C/N" ? 'Credit Note' : ''} ${row.DocumentType === "INV" ? "Invoice" : ''} ${row.DocumentType === "D/N" ? "Debit Note" : ''}`}</StyledTableCell>
                                
                                <StyledTableCell align="right">{row.customerPONumber}</StyledTableCell>
                                <StyledTableCell align="right">{moment(row.documentDate).format('DD-MM-YYYY')}</StyledTableCell>
                                <StyledTableCell align="right">{moment(row.netDueDate).format('DD-MM-YYYY')}</StyledTableCell>
                                <StyledTableCell align="right">{row.duedays}</StyledTableCell>
                                <StyledTableCell align="right" className={classes.textRight}>
                                    {
                                        props.decimalwithcoma(row.amountDocCurrency)
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                {
                                
                                props.checkedValue && props.checkedValue.indexOf(row.invoiceDoc) != -1 ? 
                                <input type="checkbox"
                                id={row.invoiceDoc}
                                checked
                                value={row.total_amt}
                                type="checkbox"
                                class="checkbox-custom"
                                onChange={(e) => props.checkPaymentSummary(e, row, row.amountDocCurrency)} />
                                : 
                                <input type="checkbox"
                                id={row.invoiceDoc}
                                value={row.total_amt}
                                type="checkbox"
                                class="checkbox-custom"
                                onChange={(e) => props.checkPaymentSummary(e, row, row.amountDocCurrency)} /> 
                            } 
                                <label for={row.invoiceDoc} style={{ textTransform: 'uppercase' }} className="checkbox-custom-label"></label>
                                         
                                    
                                    </StyledTableCell>  

                            </StyledTableRow> : ""
                            
                            
                        ))
                        : 
                     <>
                        {
                            props.loading ?  <div className="loading"> <Loading /></div> :  <div className="loading">{t('No Invoice is Selected')}</div>
                        }
                        </>
                          
                      
                     
                        
                        
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            </Paper>
        </div>
    );
}


export default withTranslation()(MakeTable);