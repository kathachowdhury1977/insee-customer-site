import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import ReceiptReportHeader from "../../../components/ReceiptReport/ReceiptReportHeader";
import ReceiptReportTable from "../../../components/ReceiptReport/ReceiptReportTable";
import Header from "../../../components/Header/Header";
import { reportActions } from "../../../_actions";
// import "../CaseReports";
import moment from 'moment'
import 'moment-timezone'
import Loading from '../../../components/Loader/Loading'
function ReceiptReport() {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(false);
    const [startIndex, setStartIndex] = React.useState(1);
    const [endIndex, setEndIndex] = React.useState(10);
    const [fromDateDefault, setFromDateDefault] = React.useState(fromDateDefault);
    const [toDateDefault, setToDateDefault] = React.useState(toDateDefault);
    const [page, setPage] = React.useState(1);
    const [fromDate, setFromDate] = React.useState('');
    const [toDate, setTodate] = React.useState('');
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    const countryCode = userData.countryCode;
    const [division, setDivision] = React.useState(countryCode === 'TH' ? 'Cement' :  'DryMix');

    useEffect(() => {

        dispatch(reportActions.getReceiptReport(fromDate, toDate, startIndex, endIndex, division));

    }, [1,startIndex, endIndex, division, fromDateDefault, toDateDefault])

    const getReceiptReport = useSelector((state) => state.getReceiptReport);

    useEffect(()=>{

        setFromDate(moment(fromDateDefault).format('DDMMYYYY'));
        setTodate(moment(toDateDefault).format('DDMMYYYY'));

    },[fromDateDefault,toDateDefault])
    useEffect(() => {
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        let newdate = year + "/" + month + "/" + day;
        getDefaultDates(newdate);
    }, [])

    const getDefaultDates = (newdate) => {
        let df = moment(newdate).subtract(3, 'months').format('DD/MM/YYYY');
        let dt = moment(newdate).format('DD/MM/YYYY');


        let df1 = moment(newdate).subtract(3, 'months').format('YYYY-MM-DD');
        let dt1 = moment(newdate).format('YYYY-MM-DD');
        setFromDate(ChangeFormateDate(df));
        setTodate(ChangeFormateDate(dt));
        setFromDateDefault(df1);
        setToDateDefault(dt1);
    }

    const handlePagnation = (start, end, pageNo) => {
        setStartIndex(start);
        setEndIndex(end);
        setPage(pageNo);
    }
    const handleDivision = (event) => {
        setStartIndex(1);
        setEndIndex(10);
        setDivision(event);
    }
    const handleTableSearch = () => {
        setStartIndex(1);
        setEndIndex(10);
        setPage(1);
        dispatch(reportActions.getReceiptReport(fromDate, toDate, startIndex, endIndex, division));

    }
    const ChangeFormateDate = (oldDate) => {
        return oldDate.toString().split("/").join("");
    }

    const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
    
    return (
        <>
            <div className="content-wrapper">
            {
                isLoading ? 
                <div className="firstLoading">
                <div className="progressLoding">
                <Loading />
                </div>
                
            </div> : ''
            }
                <Header title="Receipt Report" />
                <div className={"row ipad_css "  + MyNewClass}>
                    <div className="mainScroll">
                        <div className="reports-landing-container">
                            <ReceiptReportHeader
                                onFromDateChange={event => setFromDate(event)}
                                onToDateChange={event => setTodate(event)}
                                onChangeDivision={handleDivision}
                                division={division}
                                onTableSearch={handleTableSearch}
                                fromDateDefault={fromDateDefault}
                                toDateDefault={toDateDefault}
                            />
                            <ReceiptReportTable
                                onChangeStartAndEndIndex={handlePagnation}
                                page={page}
                                division={division}
                                fromDate={fromDate}
                                toDate={toDate}
                                fromDateDefault={fromDateDefault}
                                toDateDefault={toDateDefault}
                                setIsLoading={setIsLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(ReceiptReport);
