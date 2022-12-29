import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { paymentofflineActions, masterActions } from "../../_actions";
import Pagination from '@material-ui/lab/Pagination';
import "./table.scss";
import moment from "moment";
import { withTranslation, useTranslation } from "react-i18next";
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

function createData(docname, doctype, pono, docdate, duedate, noofdueday, totalamount, status ) {
    return { docname, doctype, pono, docdate, duedate, noofdueday, totalamount, status };
}


const useStyles = makeStyles({
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

const SattledTable = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);
    const [open, setOpen] = React.useState(false);
    let custmerNo = localStorage.getItem('CustomerNumber');
    const tabelTypeData = useSelector((state) => state.offlinegetPaymentStatus.offlinegetPaymentStatus);
    const getSettledPaymentTableRow = props.getSettledPaymentTable;
    let startIndex = getSettledPaymentTableRow && getSettledPaymentTableRow.startIndex;
    const { t } = useTranslation();
    let endIndex = getSettledPaymentTableRow && getSettledPaymentTableRow.endIndex;
    const handleChangePage = async(event, value) => { 
        await dispatch(masterActions.paginationValue(value));
        if (value === 1) {
            startIndex = 1;
            endIndex = 10
        }
        else {
            startIndex = ((value-1)*10)+1;
            endIndex = value*10;
        }
        setPage(value);
       dispatch(paymentofflineActions.getSettledPayment("setllednew", startIndex, endIndex, custmerNo));

        
      
    };
    console.log(tabelTypeData, 'getSettledPaymentTableRow88')
    const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
    const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)
    return (
        <div className="table-resp">

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>{t("Document No.")}</StyledTableCell>
                            <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>{t("Document Type")}</StyledTableCell>
                            <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>{t("PO Number/Cheque Number")}</StyledTableCell>
                            <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>{t("Document Date")}</StyledTableCell>
                            <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>{t('Due Date')}</StyledTableCell>
                            <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>{t('Numbers of Due Days')}</StyledTableCell>
                            <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}  className={classes.textRight}>{t('label.total_amount')} ({getSettledPaymentTableRow && getSettledPaymentTableRow.results.length > 0 ? getSettledPaymentTableRow && getSettledPaymentTableRow.results[0].docCurrency : ''})</StyledTableCell>
                            <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>{t('Status')}</StyledTableCell>
 

                           
                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getSettledPaymentTableRow && getSettledPaymentTableRow.results.length > 0 ? getSettledPaymentTableRow && getSettledPaymentTableRow.results.map((row) => (
                            <StyledTableRow key={row.name} className={classes.tableBody}>
                              {/* <StyledTableCell component="th" scope="row" align="center" style={{fontSize:`${SmallFontChanger}px`}}>
                                    {row.soiNumber ? row.soiNumber : row.invoiceDoc}
                                </StyledTableCell> */}
                                <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center">{row.soiNumber ? row.soiNumber : row.invoiceDoc}</StyledTableCell>
                                <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center">{row.DocumentType === "C/N" ? 'Credit Note' : ''}{row.DocumentType === "INV" ? "Invoice" : ''} {row.DocumentType === "D/N" ? "Debit Note" : ''}</StyledTableCell>
                                <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center">{row.customerPONumber}</StyledTableCell>
                                <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center">{moment(row.documentDate).format('DD-MM-YYYY')}</StyledTableCell>
                                <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center">{moment(row.netDueDate).format('DD-MM-YYYY')}</StyledTableCell>
                                <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center">{row.overdueDays}</StyledTableCell>
                                <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right" className={classes.textRight}>{row.amountDocCurrency}</StyledTableCell>
                                <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right"><span className="sattled-color">{row.status}</span></StyledTableCell>  

                            </StyledTableRow>
                        )) :   <StyledTableRow  colSpan={7} className={classes.tableBody}>
                                    <div className="noBankFound">{t('Data not available')}</div>
                            </StyledTableRow>
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="col-md-12 text-right mt-4 mb-4">
                    {
                       
                        <Pagination count={parseInt(getSettledPaymentTableRow && getSettledPaymentTableRow.totalCount/10)} page={props.page} onChange={props.handleChangePageSattled} />
                    }
                </div>
        </div>
    );
}


export default withTranslation()(SattledTable);