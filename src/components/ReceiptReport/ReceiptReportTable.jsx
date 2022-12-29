import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, withStyles, } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Loading from '../Loader/Loading'
import '../../containers/Dashboard/ReportManagement/ReportManagement.scss'
import { withTranslation, useTranslation } from "react-i18next";
import Axios, { AxiosResponse } from 'axios';
//import { process.env.REACT_APP_API_URL_CONFIRMPAYMENT } from '../../constant'
import moment from 'moment'
import 'moment-timezone'
const TableCells = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        minWidth: 140
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {},
}))(TableRow);



const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

function OpenItemReportTable(props) {
    const { t } = useTranslation();
    const classes = useStyles();

    const textColor = { color: "#7a7a79" };
   

    const [page, setPage] = React.useState(1);
    const [startIndex, setStartIndex] = React.useState(1);
    const [endIndex, setEndIndex] = React.useState(10);

    const isPageLoading = useSelector((state) => state.getReceiptReport.loading)
    const getReceiptReport = useSelector((state) => state.getReceiptReport);
    const [receiptData, setReceiptData] = useState([]);
    const selectedLangCode = localStorage.getItem('lancode');
    let userData = localStorage.getItem('userData')
    userData = JSON.parse(userData)
    let custmerNo = userData && userData.soldTo ? userData.soldTo[0] : 0

    const columns = [
        { id: 'download', label: t(''), minWidth: 80, color: "495057" },
        { id: 'receiptNumber', label: t('Receipt Number'), align: 'center', minWidth: 170, color: "495057" },
        { id: 'receiptDate', label: t('Receipt Date'),  align: 'center' ,minWidth: 100, color: "495057" },
        { id: 'valueDate', label: t('Value Date'),  align: 'center', minWidth: 100, color: "495057" },
        {
            id: 'paymentmode',
            label: t('label.description'),
            minWidth: 170,
            align: 'center',
            color: "495057"
        },
        {
            id: 'amount',
            label: t('amount.lable'),
            minWidth: 170,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
            color: "495057"
        },
        { id: 'currency', label: t('Currency'), minWidth: 100, color: "495057" },
       
    ];

    console.log(props.fromDateDefault,+'brack' + props.toDateDefault, 'Ram')

   

    function createData(receiptNumber, receiptDate, paymentmode, amount) {

        return { receiptNumber, receiptDate, paymentmode, amount };
    }

    function formatDate(date1) {
        const d = date1.split("-").reverse().join("-");
        return d;
    }

    const modifyDate = (curDate) => {debugger
        var b = [curDate.slice(0,2 ), "-",  curDate.slice(2, 4), "-",curDate.slice(4, 8)].join('');
        return b;
    }

    const handleChangePage=(event, value)=> {
        let start = 1;
        let end = 10;
        if (value === 1) {
            setStartIndex(1)
            setEndIndex(10)
        }
        else {
            start = ((value - 1) * 10) + 1;
            end = value * 10;
            setStartIndex(((value - 1) * 10) + 1);
            setEndIndex(value * 10);
        }
        setPage(value);
        props.onChangeStartAndEndIndex(start, end, value);
    }

    const decimalwithcoma = (num) => {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    };

    const downLoadInvoice = (Receipt_Doc) => {debugger
        props.setIsLoading(true)
        Axios({
            method: "GET", url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT + `/downloadRecipt?customernumber=${custmerNo}&invoicenumber=${Receipt_Doc}`, responseType: 'arraybuffer', headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
                'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
            }
        })
            // .then((res) => res.json())
            .then(async (response) => {
                //setSetloading(false)
                var link = document.createElement('a');
                const file = new Blob([response.data], { type: 'application/.pdf' });
                const fileURL = await URL.createObjectURL(file);
                link.href = window.URL.createObjectURL(file);
                link.download = "Receipt_Doc_" +Receipt_Doc + ".pdf";
                link.click();
                // setIsLoadingDownload(false)
                return response.data;
            })
            setTimeout(() => {
                props.setIsLoading(false)
                  }, 2000);
    }

    const downLoadPDFFile = (history = "history") => {debugger
        props.setIsLoading(true)
        var fromDateDownload = props.fromDate
        var toDateDateDownload = props.toDate
        var lang = selectedLangCode === 'th' ? true : false
        // setSetloading(true)
        Axios({
            method: "GET", url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT + '/credit/downloadSettledReport?customercode=' + localStorage.getItem('CustomerNumber') + '&division=' + props.division + '&fromdate=' + fromDateDownload + '&todate=' + toDateDateDownload + '&textTH=' + lang, responseType: 'arraybuffer', headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
                'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
            }
        })
            // .then((res) => res.json())
            .then(async (response) => {
                var link = document.createElement('a');
                const file = new Blob([response.data], { type: 'application/xlsx' });
                const fileURL = await URL.createObjectURL(file);

                const dateAndTime = moment().format("DD_MM_YYYY_HH_mm_ss");
                link.href = window.URL.createObjectURL(file);
                link.download = "ReceiptReport" + dateAndTime + ".xlsx";
                link.click();
                // setSetloading(false)
                return response.data;
            })
            setTimeout(() => {
                props.setIsLoading(false)
                  }, 2000);

    }

    const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
    const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)


    return (
        <>
            

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow >
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        <b style={{fontSize: `${SmallFontChanger}px`}}>{column.label}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!isPageLoading ? getReceiptReport && getReceiptReport.getReceiptReport ? (getReceiptReport && getReceiptReport.getReceiptReport.results.map((row, i) => {

                                return (
                                <StyledTableRow
                                    key={row.Receipt_Doc}
                                    className={classes.tableBody}
                                >
                                    <StyledTableCell align="center">
                                    <span style={{ cursor: 'pointer' }} onClick={() => downLoadInvoice(row.Receipt_Doc)}>
                                        <i className="fa fa-download" style={{fontSize: `${SmallFontChanger}px`}}></i>
                                    </span>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                    {row.Receipt_Doc}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                    {(row.Receipt_Date)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                    {(row.Value_Date)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                    {row.Description}
                                    </StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize: `${SmallFontChanger}px`}}>
                                    {decimalwithcoma(row.Amount_In_Doc_Currency)}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                    {selectedLangCode === 'en' || selectedLangCode === null ?
                                        row.Doc_Currency_Key :
                                        row.Doc_Currency_Key === 'THB' ? 'บาท' :
                                        row.Doc_Currency_Key === 'USD' ? 'ดอลลาร์': row.Doc_Currency_Key
                                            }
                                  
                                    </StyledTableCell>
                                </StyledTableRow>
                                );
                            }))
                            :
                                !(getReceiptReport.getReceiptReport && getReceiptReport.getReceiptReport.length > 0)
                                    ? <div className="no_record_table">{t("lable.norecordfound")}</div> : null :
                                <div className='loadingOne'>
                                    <Loading />
                                </div>
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <br></br>
            <div className="row ">
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12">
                {
                getReceiptReport.getReceiptReport && getReceiptReport.getReceiptReport.totalCount ?
                    <Pagination
                        count={Math.ceil(getReceiptReport.getReceiptReport.totalCount / 10)}
                        page={props.page} onChange={handleChangePage}
                    />
                    : null


                   
            }
                </div>
                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                </div>
                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                <button className="redButton" style={{fontSize: `${FontChange}px`}} onClick={() => downLoadPDFFile()}>{t("export")}</button>
                </div>
            </div>
            
        </>

    );
}
export default withTranslation()(OpenItemReportTable);
