import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { reportActions } from "../../_actions";
import { makeStyles } from '@material-ui/core/styles';
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


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});
function convertDate(dateString) {
    var p = dateString.split(/\D/g)
    return [p[2], p[1], p[0]].join("-")
}

function CustomerReportTable(props) {
    const { t } = useTranslation();
    let dispatch = useDispatch();
    const classes = useStyles();
   
    const [page, setPage] = React.useState(1);
    const [startIndex, setStartIndex] = React.useState(1);
    const [endIndex, setEndIndex] = React.useState(10);

    const isPageLoading = useSelector((state) => state.getCustomerStatementReport.loading)
    const customerReportData = useSelector((state) => state.getCustomerStatementReport);
    
    const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
    const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)

    const columns = [
        { id: 'PostingDate', label: t('Date'), minWidth: 170 },

        { id: 'FIDocumentNumber', label: t('Doc'), minWidth: 100 },
        {
            id: 'DocumentType',
            label: t('label.type'),
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'ReferenceNumber',
            label: t('Ref.No.'),
            minWidth: 170,
            align: 'right',
        },

        {
            id: 'Description',
            label: t('label.description'),
            minWidth: 170,
            align: 'left',
        },

        {
            id: 'DueDate',
            label: t('Due Date'),
            minWidth: 170,
            align: 'right',
        },

        {
            id: 'DebitAmount',
            label: t('Debit Amount'),
            minWidth: 170,
            align: 'right',
        },
        {
            id: 'CreditAmount',
            label: t('Credit Amount'),
            minWidth: 170,
            align: 'right',
        }
    ];

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
        props.onChangeStartAndEndIndex(start, end,value);
    }

    const decimalwithcoma = (num) => {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    };

    
    
    const textColor = { color: "#7a7a79", 
                 fontSize: `${SmallFontChanger}px`
                };
    return (
        <>
            <div className="row mt-3 report_table"
                style={{
                    backgroundColor: "#e9ecef",
                    borderRadius: "10px", padding: "15px", marginLeft: "10px", marginRight: "10px", marginTop: "10px"
                }}>
                <div className="col-xl-5 col-lg-4 col-md-6 col-sm-12" >
                    <h6 style={textColor}><b> {t("OUT STANDING BALANCE")}</b></h6>
                    <h6><b>{customerReportData.getCustomerStatementReport && customerReportData.getCustomerStatementReport.object ?
                        customerReportData.getCustomerStatementReport.object.OutstandingBalance : ""} </b></h6>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" >
                    <h6 style={textColor}><b>{t("OPENING BALANCE")}</b></h6>
                    <h6><b>{customerReportData.getCustomerStatementReport && customerReportData.getCustomerStatementReport.object ?
                        customerReportData.getCustomerStatementReport.object.OpeningBalance : ""} </b></h6>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" >
                    <h6 style={textColor}><b>{t("CLOSING BALANCE")}</b></h6>
                    <h6><b style={{fontSize: `${SmallFontChanger}px`}}>{customerReportData.getCustomerStatementReport && customerReportData.getCustomerStatementReport.object ?
                        customerReportData.getCustomerStatementReport.object.ClosingBalance : ""} </b></h6>
                </div>


            </div>
            <div className="row report_table"
                style={{
                    backgroundColor: "white", border: "2px solid rgba(0, 0, 0, 0.05)",
                    borderRadius: "10px", padding: "15px", marginLeft: "10px", marginRight: "10px", marginBottom: "10px", marginTop: "-5px"
                }}>

                <div className="col-xl-5 col-lg-4 col-md-6 col-sm-12" >
                    <h6 style={textColor}><b>{t("Total")}</b></h6>
                    <h6><b style={{fontSize: `${SmallFontChanger}px`}}>{customerReportData.getCustomerStatementReport && customerReportData.getCustomerStatementReport.object ?
                        customerReportData.getCustomerStatementReport.object.TotalCredit : ""} </b></h6>
                </div>
                {/* <div className="col-xl-5 col-lg-3 col-md-6 col-sm-12" >
                </div> */}
                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12" >
                    <h6 style={textColor}><b>{t("TOTAL DEBT")}</b></h6>
                    <h6><b style={{fontSize: `${SmallFontChanger}px`}}>{customerReportData.getCustomerStatementReport && customerReportData.getCustomerStatementReport.object ?
                        customerReportData.getCustomerStatementReport.object.TotalDebit : ""} </b></h6>
                </div>
            </div>

            <div style={{
                marginLeft: "10px", marginRight: "10px"
            }}>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column, index) => (
                                        <TableCell
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            <b style={{fontSize: `${SmallFontChanger}px`}}> {column.label}</b>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!isPageLoading ? (customerReportData.getCustomerStatementReport && customerReportData.getCustomerStatementReport.listdata ?
                                    customerReportData.getCustomerStatementReport.listdata.map((row) => {

                                        return (
                                            <TableRow tabIndex={-1} >
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell align={column.align} style={{fontSize: `${SmallFontChanger}px`}}>
                                                            {column.id == "PostingDate" || column.id == "DueDate" ? convertDate(value) : (column.id == "DebitAmount" || column.id == "CreditAmount" ? decimalwithcoma(value) : value)}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    }) : null) : <div className='loading'>
                                    <Loading />
                                </div>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                {
                    customerReportData && customerReportData.getCustomerStatementReport &&
                        customerReportData.getCustomerStatementReport.totalCount ?
                        <Pagination
                            count={Math.ceil(customerReportData.getCustomerStatementReport.totalCount / 10)}
                            page={props.page}
                            onChange={handleChangePage}
                        />
                        : null
                }
            </div>
        </>

    );
}
export default withTranslation()(CustomerReportTable);
