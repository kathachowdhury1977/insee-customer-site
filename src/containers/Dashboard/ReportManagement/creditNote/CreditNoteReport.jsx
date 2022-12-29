import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import CreditNoteReportHeader from "../../../../components/CreditNoteReport/CreditNoteReportHeader";
import CreditNoteReportTable from "../../../../components/CreditNoteReport/CreditNoteReportTable";
import Header from "../../../../components/Header/Header";
import { reportActions } from "../../../../_actions";
import moment from 'moment'
import 'moment-timezone'
import Loading from '../../../../components/Loader/Loading'
function CreditNoteReport() {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    const countryCode = userData.countryCode;
    const [filterData, setFilterData] = React.useState("");
    const [dateRange, setDateRange] = React.useState('')
    const [pleaseSelectTransDate, setPleaseSelectTransDate] = React.useState('DD-MM-YYYY');
    const [isLoading, setIsLoading] = React.useState(false);

    const [page, setPage] = React.useState(1);
    const [startIndex, setStartIndex] = React.useState('');
    const [endIndex, setEndIndex] = React.useState('');
    const [fromDate, setFromDate] = React.useState('');
    const [toDate, setTodate] = React.useState('');
    const [fromDateDefault, setFromDateDefault] = React.useState('');
    const [toDateDefault, setToDateDefault] = React.useState('');

    const [contract, setContract] = React.useState('');
    const [material, setMaterial] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [isExport, setIsExport] = React.useState(false);
    const [isSearch, setIsSearch] = React.useState(false);
    const [division, setDivision] = React.useState(countryCode === 'TH' ? 'Cement' :  'DryMix');
    const [statusFilter, setStatusFilter] = React.useState('');
    const contractbyAcc = useSelector((state) => state.getCreditNoteReport);
    useEffect(() => {
        if (fromDate.length > 0 && toDate.length > 0) {
            dispatch(reportActions.getCreditNoteReport(fromDate, toDate, startIndex, endIndex, search, division, statusFilter));
        }
    }, [ division,fromDateDefault, toDateDefault])

    useEffect(() => {
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        let newdate = year + "/" + month + "/" + day;
        getDefaultDates(newdate);
    }, [])
    const handlePagnation = (start, end) => {
        setStartIndex(start);
        setEndIndex(end);
    }


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
    const handleDivision = (event) => {
        setStartIndex(1);
        setEndIndex(10);
        setDivision(event);
    }
    const handleStatus = (event) => {
        setStatusFilter(event);
    }
    const handleTableSearch = () => {
        setStartIndex(1);
        setEndIndex(10);
        dispatch(reportActions.getCreditNoteReport(fromDate, toDate, startIndex, endIndex, search, division, statusFilter));

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
                <Header title="CreditNote Report" contractbyAcc={contractbyAcc.error}/>
                <div className={"row ipad_css "  + MyNewClass}>
                    <div className="mainScroll">
                        <div className="reports-landing-container">
                            <CreditNoteReportHeader
                                onSearchChange={event => setSearch(event)}
                                onFromDateChange={event => setFromDate(event)}
                                onToDateChange={event => setTodate(event)}
                                onMaterialChange={event => setMaterial(event)}
                                onContractChange={event => setContract(event)}
                                onChangeDivision={handleDivision}
                                onStatusChange={handleStatus}
                                onTableSearch={handleTableSearch}
                                fromDateDefault={fromDateDefault}
                                toDateDefault={toDateDefault}

                            />
                            <CreditNoteReportTable
                                onFromIndexChange={event => setStartIndex(event)}
                                onChangeEndIndex={event => setEndIndex(event)}
                                // onSearchChange={event => setIsSearch(event)}
                                onChangeStartAndEndIndex={handlePagnation}
                                fromDate={fromDate}
                                toDate={toDate}
                                division={division}
                                setIsLoading={setIsLoading}
                                search={search}
                                statusFilter={statusFilter}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(CreditNoteReport);
