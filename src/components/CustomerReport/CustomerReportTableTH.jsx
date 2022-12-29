import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { reportActions } from "../../_actions";
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Axios, { AxiosResponse } from 'axios';
//import { process.env.REACT_APP_API_URL_PAYMENTOFFLINE } from '../../constant'
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Loading from '../Loader/Loading'
import '../../containers/Dashboard/ReportManagement/ReportManagement.scss'
import moment from 'moment'
import 'moment-timezone'

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
           
            padding: "10px !important",
        },
        "& td": {
           
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
function convertDate(dateString) {
    var p = dateString.split(/\D/g)
    return [p[2], p[1], p[0]].join("-")
}


function CustomerReportTableTh(props) {debugger
    const { t } = useTranslation();
    let dispatch = useDispatch();
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const [startIndex, setStartIndex] = React.useState(1);
    const [endIndex, setEndIndex] = React.useState(10);
    let userData = localStorage.getItem('userData')
    userData = JSON.parse(userData)
    let custmerNo = userData && userData.soldTo ? userData.soldTo[0] : 0
    console.log(props.division, 'rajeev789')
    const selectedLangCode = localStorage.getItem('lancode');
    const isPageLoading = useSelector((state) => state.getCustomerStatementReportPdf.loading)
    // const customerReportData = useSelector((state) => state.getCustomerStatementReportPdf.getCustomerStatementReportPdf);
    // console.log(customerReportData, 'customerReportData789')
    const downLoadInvoice = (date) => {debugger
        // setSetloading(true)
        props.setIsLoading(true)
        var getData =moment(date, 'DD-MM-YYYY')
        var month = getData.format('MM');
        var year  = getData.format('YYYY')
        Axios({
            method: "GET", url: process.env.REACT_APP_API_URL_PAYMENTOFFLINE + `/customerThDms?customercode=${custmerNo}&date=${year+month}&division=${props.division}`, responseType: 'arraybuffer', headers: {
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
                link.download = "Customer_" + year+month + ".pdf";
                link.click();
                // setIsLoadingDownload(false)
                return response.data;
            })
            setTimeout(() => {
                props.setIsLoading(false)
                  }, 2000);
    }

    // function handleChangePage(event, value) {
    //     let start = 1;
    //     let end = 10;
    //     if (value === 1) {
    //         setStartIndex(1)
    //         setEndIndex(10)
    //     }
    //     else {
    //         start = ((value - 1) * 10) + 1;
    //         end = value * 10;
    //         setStartIndex(((value - 1) * 10) + 1);
    //         setEndIndex(value * 10);
    //     }
    //     setPage(value);
    //     props.onChangeStartAndEndIndex(start, end,value);
    // }

    const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
   return (
        <>
           

            <div style={{
                marginLeft: "10px", marginRight: "10px", marginTop: '0'
            }}>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table className={classes.table}
                            aria-labelledby="tableTitle"
                            stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>
                                      { t("Year")}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>
                                      { t("Month")}
                                    </StyledTableCell>
                                    <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>
                                      { t("End Date of Month")}
                                    </StyledTableCell> 
                                    <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>
                                      
                                    </StyledTableCell>                               
                                 </TableRow>
                            </TableHead>
                            <TableBody> 
                                    
                                {
                                    
                                    props.arrData && props.arrData.length != 0 ?
                                    props.arrData && props.arrData ? props.arrData.map((item, i)=>(

                                       
                                            <StyledTableRow
                                            className={classes.tableBody}
                                        >
                                            <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>
                                                {item.year}
                                            </StyledTableCell>
                                            <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>
                                            {
                                        selectedLangCode === 'en' || selectedLangCode === null ?
                                        item.month.split(':')[0] : item.month.split(':')[1] 
                                      }
                                           
                                            </StyledTableCell>
                                            <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>
                                            {item.endDateOfMonth}
                                            </StyledTableCell>
                                            
                                               
                                                <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>
                                                <span style={{ cursor: 'pointer' }} onClick={() => downLoadInvoice(item.endDateOfMonth)}>
                                                        <i className="fa fa-download" style={{fontSize:`${SmallFontChanger}px`}}></i>
                                                    </span>
                                                    </StyledTableCell>
                                            
                                            

                                           
                                            
                                        </StyledTableRow>

                                        
                                       
                                           
                                        
                                )) : 'No Data' : 
                                <div className='loadingOne'>
                                    <Loading />
                                </div> 
                                
                                }                           
                               
                                            
                                   
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                

                {/* {
                    
                        <Pagination
                            count={Math.ceil(props.arrData && props.arrData.length / 10)}
                            page={props.page}
                            onChange={handleChangePage}
                        />
                       
                } */}
            </div>
        </>

    );
}
export default withTranslation()(CustomerReportTableTh);
