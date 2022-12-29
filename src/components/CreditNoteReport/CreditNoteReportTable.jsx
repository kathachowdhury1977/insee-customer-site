import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import EyeLogo from "../../assets/img/eyeIcon.png";
import moment from "moment";
import { withTranslation, useTranslation } from "react-i18next";
import "moment-timezone";
import '../../containers/Dashboard/ReportManagement/ReportManagement.scss'
import { withStyles, makeStyles } from "@material-ui/core/styles";
import "../Table/table.scss";
import { useDispatch, useSelector } from 'react-redux'
//import { process.env.REACT_APP_API_URL_CONFIRMPAYMENT } from "../../constant";
import Axios, { AxiosResponse } from 'axios';
import Loading from '../Loader/Loading';
//import { process.env.REACT_APP_API_URL_PAYMENTOFFLINE } from '../../constant'

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

function createData(
    docname,
    doctype,
    pono,
    docdate,
    duedate,
    noofdueday,
    totalamount,
    status,
    action
) {
    return {
        docname,
        doctype,
        pono,
        docdate,
        duedate,
        noofdueday,
        totalamount,
        status,
        action,
    };
}

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: "calc(90vh - 160px)",
    },

    table: {
        minWidth: 700,
    },
    tableBody: {
        "& th": {
            fontSize: "12px !important",
            padding: "10px !important",
        },
        "& td": {
            fontSize: "12px !important",
            padding: "10px !important",
        },
    },
    textRight: {
        textAlign: "right !important",
    },
    childtableBody: {
        background: "#ccc",
        "& th": {
            fontSize: "12px !important",
            padding: "10px !important",
        },

        "& td": {
            fontSize: "12px !important",
            padding: "10px !important",
        },
        ".text-right": {
            textAlign: "center",
        },
    },
});

function CreditNoteTable(props) {
    const { t } = useTranslation();
    const classes = useStyles();

    const selectedLangCode = localStorage.getItem("lancode");
    const tablePending = props.Pending;
    const [page, setPage] = React.useState(1);
    const [startIndex, setStartIndex] = React.useState(1);
    const [endIndex, setEndIndex] = React.useState(10);

    const isPageLoading = useSelector((state) => state.getCreditNoteReport.loading)
    const getCreditNoteReportData = useSelector((state) => state.getCreditNoteReport);
    let displayableList = [];
    const [reportList, setReportList] = React.useState([]);
    
    const [summaryOpen, setSummaryOpen] = useState({});

    const [selectedDocumentNo, setSelectedDocumentNo] = useState('');
    let pendingresultData = tablePending && tablePending.results
    let modifiedData = [];

    let userData = localStorage.getItem('userData')
    userData = JSON.parse(userData)
    let custmerNo = userData && userData.soldTo ? userData.soldTo[0] : 0

    const totalAmountForSummary = (totalSummaryAmount, currentValue) => {
        return Number(
            parseFloat(totalSummaryAmount) +
            parseFloat(currentValue.amountDocCurrency)
        ).toFixed(2);
    };

    const summaryOpenToggle = (id, doc) => {
        if (summaryOpen[`childTable${id}`]) {
            setSelectedDocumentNo(doc);
            setSummaryOpen({ ...summaryOpen, [`childTable${id}`]: false });
        } else {
            setSelectedDocumentNo(doc);
            setSummaryOpen({ ...summaryOpen, [`childTable${id}`]: true });
        }
    };
    const decimalwithcoma = (num) => {
        if (num && parseInt(num) <= 0) {
            return num;
        } else {
            var num_parts = num.toString().split(".");
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return num_parts.join(".");
        }
    };

    const decimalwithcomaForWHT = (num) => {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        num_parts.join(".");
        let b = '-'.concat(num_parts.replace('-', ''));
        return b;
    };

    console.log(getCreditNoteReportData.getCreditNoteReport && getCreditNoteReportData.getCreditNoteReport.RES_Records, 'selectedLangCode')

    useEffect(() => {
        displayableList = [];

        if (getCreditNoteReportData.getCreditNoteReport && getCreditNoteReportData.getCreditNoteReport.RES_Records) {
            getCreditNoteReportData.getCreditNoteReport.RES_Records.map((report) => {
                let item = {
                    CompanyCode: "",
                    documentNumber: "",
                    date: "",
                    netDueDate: "",
                    description: "",
                    amount: "",
                    wht: "",
                    netAmount: "",
                    status: "",
                    taxInvoiceNo: "",
                    taxInvoiceList: [],
                    month: "",
                    material: "",
                    materialCondition: "",
                    taxRate: "",
                    FIDocument: "",
                    DocumentType : "",
                    accurals: ""
                }

                item.CompanyCode = report.CompanyCode;
                item.documentNumber = report.DocumentNo;
                item.date = report.PostingDate;
                item.netDueDate = report.NetDueDate;
                item.description = report.Description;
                item.amount = report.DocAmount;
                item.wht = report.WithholdingTaxDocAmtCur;
                item.netAmount = report.NetAmount;
                item.status =   report.StatusEN + '-'+ report.StatusTH 
                item.FIDocument = report.FIDocument
                item.DocumentType = report.DocumentType

                if (report.TaxInvoice && report.TaxInvoice.length) {
                    item.taxInvoiceList = report.TaxInvoice;
                }
                displayableList.push(item);
            })
        }
        setReportList(displayableList);
    }, [getCreditNoteReportData])

    const downLoadPDFFile = (history = "history") => {
        props.setIsLoading(true)
        var thText = selectedLangCode && selectedLangCode === 'th' ? 'TH' : 'EN'
        // setSetloading(true)
        Axios({
            method: "GET", url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT + '/credit/downloadCreditNoteReport?customercode=' + localStorage.getItem('CustomerNumber') + '&division=' + props.division + '&doctype=&fromdate=' + props.fromDate + '&todate='  + props.toDate + '&language=' + thText + '&statusfilter=' + props.statusFilter+ '&search=' + props.search, responseType: 'arraybuffer', headers: {
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
                link.href = window.URL.createObjectURL(file);
                link.download = "CreditNoteReport.xlsx";
                link.click();
                // setSetloading(false)
                return response.data;
            })
            setTimeout(() => {
                props.setIsLoading(false)
                  }, 2000);
    }



    function handleChangePage(event, value) {
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
        props.onChangeStartAndEndIndex(start, end);
    }

    function modifyDate(curDate) {
        var b = [curDate.slice(0, 2), "-", curDate.slice(2, 4), "-", curDate.slice(4, 8)].join('');
        return b;
    }

    function modifyMonth(curDate1) {
        const curDate = curDate1.toString();
        var b = [curDate.slice(4, 6), "-", curDate.slice(0, 4)].join('');
        return b;
    }
    function modifyNumber(number) {

        if (number && parseInt(number) == 0) {
            var str = number.toString().split(".");
            str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            str.join(".");
            var str1 = str.join(".")
            return str1.toString().replace('-', '');
        } else {
            var str = number.toString().split(".");
            str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            str.join(".");
            var str1 = str.join(".")
            return '-' + str1.toString().replace('-', '');
        }

    }

    const modifyDecimal = (myNumber) => {
        if (myNumber.length > 0) {
            const n = parseFloat(myNumber).toFixed(3);
            return n;
        } else {
            return "";
        }

    }


    function modifyMaterialNumber(number) {
        var n = number = (number * 1).toString();
        return n;
    }



    const downLoadInvoice = (documentNo, docType, date) => {debugger
        // setSetloading(true)
        props.setIsLoading(true)
        var getData =moment(date, 'DD-MM-YYYY')
       
   
        var year  = getData.format('YYYY')
        Axios({
            method: "GET", url: process.env.REACT_APP_API_URL_PAYMENTOFFLINE + `/creditNoteDms?customercode=${custmerNo}&division=${props.division}&docType=${docType}&document=${documentNo}&year=${year}`, responseType: 'arraybuffer', headers: {
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
                link.download = "Credit_note_" + documentNo + ".pdf";
                link.click();
                // setIsLoadingDownload(false)
                return response.data;
            })
            setTimeout(() => {
                props.setIsLoading(false)
                  }, 4000);
    }

    const decimalwithcomaReports = (num) => {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
      };

      const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
      const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
      const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)

    return (
        <>
            <div className="table-resp">
                
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table className={classes.table}
                            aria-labelledby="tableTitle"
                            stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">
                                       
                                    </StyledTableCell>

                               

                                    <StyledTableCell component="th" scope="row" minWidth="270" style={{ position: "sticky", left: "0", zIndex: "999", fontSize: `${SmallFontChanger}px` }} >
                                        {t("Document No.")}</StyledTableCell>
                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                        {t("Date")}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                        {t("net_due_date")}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{ minWidth: "370px", fontSize: `${SmallFontChanger}px` }} >
                                        {t("label.description")}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                        {t("amount.lable")}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                        {t("wht")}
                                    </StyledTableCell>

                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                        {t("Net Amount")}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                        {t("Status")}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                        {t("Tax Invoice Number")}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                        {t("Month")}
                                    </StyledTableCell>

                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                        {t("Product No.")}
                                    </StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize: `${SmallFontChanger}px`}}>
                                        {t("Cond Base Value")}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                    {t("Rate")}
                                        </StyledTableCell>
                                    
                                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                        {t("Accurals")}
                                    </StyledTableCell>
                                    <StyledTableCell align="right" style={{fontSize: `${SmallFontChanger}px`}}>{
                                    // t("Actions")
                                    }
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!isPageLoading ? (reportList && reportList.length > 0 ? (
                                    reportList.map((row, i) => (
                                        <>
                                            <StyledTableRow
                                                key={row.name}
                                                className={classes.tableBody}
                                            >

                                                <StyledTableCell align="center">
                                                    <span style={{ cursor: 'pointer' }} onClick={() => downLoadInvoice(row.FIDocument, row.DocumentType, row.date)}>
                                                        <i className="fa fa-download" style={{fontSize: `${SmallFontChanger}px`}}></i>
                                                    </span>
                                                </StyledTableCell>
                                                
                                                <StyledTableCell component="th" scope="row" style={{fontSize: `${SmallFontChanger}px`, position: "sticky", left: "0", background: "white" }}>
                                                    {row.documentNumber}
                                                </StyledTableCell>

                                                <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                                    {row.date && row.date.length > 0 ? modifyDate(row.date) : ""}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                                    {moment(row.netDueDate).format("DD-MM-YYYY")}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" style={{ fontSize: `${SmallFontChanger}px`, minWidth: "370px", textAlign: "left" }} >
                                                    {row.description}
                                                </StyledTableCell>
                                                <StyledTableCell style={{ textAlign: "right", fontSize: `${SmallFontChanger}px` }}>
                                                    {decimalwithcoma(row.amount)}
                                                </StyledTableCell>

                                                <StyledTableCell style={{ textAlign: "right", fontSize: `${SmallFontChanger}px` }}>
                                                    {modifyNumber(row.wht)}
                                                </StyledTableCell>
                                                <StyledTableCell style={{ textAlign: "right", fontSize: `${SmallFontChanger}px` }}>
                                                    {decimalwithcoma(row.netAmount)}
                                                </StyledTableCell>
                                                <StyledTableCell align="right" style={{fontSize: `${SmallFontChanger}px`}}>
                                                    {row.status}
                                                </StyledTableCell>
                                                <StyledTableCell align="right" style={{fontSize: `${SmallFontChanger}px`}}>
                                                    {row.taxInvoiceNo}
                                                </StyledTableCell>

                                                <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                                    {row.month}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                                    {row.material}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                                    {row.materialCondition}
                                                </StyledTableCell>

                                                <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                                    {row.taxRate}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                                    {row.accurals}
                                                </StyledTableCell>

                                                <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                                                    <>
                                                        {row.taxInvoiceList && row.taxInvoiceList.length ? <span
                                                            style={{ color: "#0089ff" }}
                                                            onClick={(e) => summaryOpenToggle(row.taxInvoiceList, row.documentNumber)}
                                                            class="checkbox-custom-label"
                                                        >
                                                            {t("Summary")}{" "}
                                                            <img style={{ width: "14px" }} src={EyeLogo} />
                                                        </span> : ""}
                                                    </>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            {summaryOpen[`childTable${row.taxInvoiceList}`]
                                                ? row && row.documentNumber == selectedDocumentNo &&
                                                row.taxInvoiceList.map((item, index) => {
                                                    return (
                                                        <StyledTableRow
                                                            key={row.documentNo_FI}
                                                            className={classes.childtableBody}
                                                        >
                                                             <StyledTableCell component="th" scope="row" style={{ position: "sticky", left: "0" }}>
                                                                
                                                            </StyledTableCell>
                                                            <StyledTableCell  component="th" scope="row" style={{ position: "sticky", left: "0", fontSize: `${SmallFontChanger}px` }}>
                                                                {item.documentNumber}
                                                            </StyledTableCell>

                                                            <StyledTableCell align="center" style ={{fontSize: `${SmallFontChanger}px`}}>
                                                                {item.date && item.date.length > 0 ? modifyDate(row.date) : ""}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center" style ={{fontSize: `${SmallFontChanger}px`}}>
                                                                {item.netDueDate ? (moment(item.netDueDate).format("DD-MM-YYYY")) : ""}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center" style={{ minWidth: "370px", fontSize: `${SmallFontChanger}px` }}>
                                                                {item.description}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="right" style ={{fontSize: `${SmallFontChanger}px`}}>
                                                                {item.amount ? decimalwithcoma(item.amount) : ""}
                                                            </StyledTableCell>

                                                            <StyledTableCell align="center" style ={{fontSize: `${SmallFontChanger}px`}}>
                                                                {item.wht ? modifyNumber(item.wht) : ""}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="right" style ={{fontSize: `${SmallFontChanger}px`}}>
                                                                {item.netAmount ? decimalwithcoma(item.netAmount) : ""}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center" style ={{fontSize: `${SmallFontChanger}px`}}>
                                                                {item.status}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center" style ={{fontSize: `${SmallFontChanger}px`}}>
                                                                {item.TaxInvoiceNumber ? item.TaxInvoiceNumber[0] : ""}
                                                            </StyledTableCell>

                                                            <StyledTableCell align="center" style ={{fontSize: `${SmallFontChanger}px`}}>
                                                                {modifyMonth(item.Month)}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center" style ={{fontSize: `${SmallFontChanger}px`}}>
                                                                {modifyMaterialNumber(item.Material)}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="right" style ={{fontSize: `${SmallFontChanger}px`}}>
                                                            {item.CondBaseValue.toString().includes('-')
                                                            ?  '-' + decimalwithcoma(
                                                               parseFloat(item.CondBaseValue.substring(0, item.CondBaseValue.length - 1)).toFixed(3)
                                                            ) :
                                                             decimalwithcoma(parseFloat(item.CondBaseValue).toFixed(3))
                                                            
                                                            }
                                                              
                                                            </StyledTableCell>

                                                            
                                                            <StyledTableCell align="right" style ={{fontSize: `${SmallFontChanger}px`}}>
                                                            {item.Rate ? (item.Rate) : ""}
                                                            </StyledTableCell>

                                                            <StyledTableCell align="right" style ={{fontSize: `${SmallFontChanger}px`}}>
                                                            {item.RebateAccrualsValue.toString().includes('-')
                                                            ?  '-' + decimalwithcoma(
                                                               item.RebateAccrualsValue.substring(0, item.RebateAccrualsValue.length - 1) 
                                                            ) :
                                                             decimalwithcoma(item.RebateAccrualsValue)
                                                            
                                                            }
                                                            </StyledTableCell>

                                                        </StyledTableRow>
                                                    );
                                                })
                                                : ""
                                            }
                                        </>
                                    ))
                                ) : <StyledTableRow className={classes.tableBody}>
                                    <div className="noBankFound">{t("Data not available")}</div>
                                </StyledTableRow>
                                ) : <div className='loadingOne'>
                                    <Loading />
                                </div>}
                                
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
            <br></br>
            <div className="row ">

                <div className="col-xl-10 col-lg-8 col-md-6 col-sm-12">
                    <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12">
                        {getCreditNoteReportData.RES_Records ? <Pagination count={getCreditNoteReportData && getCreditNoteReportData.paginationdto && getCreditNoteReportData.paginationdto.totalCount ? parseInt(getCreditNoteReportData.paginationdto.totalCount / 10) : 1} page={page} onChange={handleChangePage} />
                            : null}</div>

                </div>
                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                    {
                        reportList && reportList.length > 0 ?
                        <button className="redButton" style ={{fontSize: `${FontChange}px`}} onClick={() => downLoadPDFFile()}>{t("export")}</button>
                        : ''
                    }
                    

                </div>

            </div>
        </>
    );
}
export default withTranslation()(CreditNoteTable);