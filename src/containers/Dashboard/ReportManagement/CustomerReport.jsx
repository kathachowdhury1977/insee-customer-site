import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import CustomerStatementReportHeader from "../../../components/CustomerReport/CustomerReportHeader";
import CustomerReportHeaderTh from '../../../components/CustomerReport/CustomerReportHeaderTh'
import CustomerReportTable from "../../../components/CustomerReport/CustomerReportTable";
import CustomerReportTableTh from "../../../components/CustomerReport/CustomerReportTableTH"
import Header from "../../../components/Header/Header";
import { reportActions } from "../../../_actions";
import Loading from '../../../components/Loader/Loading'
import moment from 'moment'
import 'moment-timezone'
function CustomerReport() {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);
    const [startIndex, setStartIndex] = React.useState(1);
    const [endIndex, setEndIndex] = React.useState(10);
    const [search, setSearch] = React.useState('');
    const [pleaseSelectTransDate, setPleaseSelectTransDate] = React.useState('YYYY-MM-DD');
    const [loading, setLoading] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    const countryCode = userData.countryCode;
    const [division, setDivision] = React.useState(countryCode === 'TH' ? 'Cement' :  'DryMix');

    const [fromDate, setFromDate] = React.useState('');
    const [toDate, setTodate] = React.useState('');
    const [fromDateDefault, setFromDateDefault] = React.useState('');
    const [toDateDefault, setToDateDefault] = React.useState('');

    

    const [fromDateTh, setfromDateTh] = React.useState(moment().subtract(12, 'months').format('MMMM YYYY'));
    const [toDateTh, settoDateTh] = React.useState(moment().subtract(1, 'months').format('MMMM YYYY'));
    const [objArray, setObjArray] = React.useState([]);
    
    useEffect(() => {
        if(countryCode === 'VN'){        
        getDefaultDates() 
        }else {
            getDefaultDatesTh()
        }
     
        
    },[])

    useEffect(() => {debugger
        if(countryCode === 'VN'){
            if (fromDate.length > 0 && toDate.length > 0) {
                dispatch(reportActions.getCustomerStatementReport(fromDate, toDate, startIndex, endIndex, division))
                // diff(fromDate, toDate)
            }
        }  
        else {
            // dispatch(reportActions.getCustomerStatementReportPdf(moment(fromDateTh).format('YYYY-MM-DD'), moment(toDateTh).endOf('month').format('YYYY-MM-DD'), division))
        }
        
    }, [ division])



   

    const handleTableSearch = () => {
        
        setStartIndex(1);
        setEndIndex(10);
        dispatch(reportActions.getCustomerStatementReport(fromDate, toDate, startIndex, endIndex, division));
        

    }

    const handleTableSearchTh= () => {debugger 
        // dispatch(reportActions.getCustomerStatementReportPdf(moment(fromDateTh).format('YYYY-MM-DD'), moment(toDateTh).endOf('month').format('YYYY-MM-DD'), division))
        getDateData(fromDateTh, toDateTh)
        

    }
    const handlePagnation = (start, end, pageNo) => {
        setStartIndex(start);
        setEndIndex(end);
        setPage(pageNo);
    }

    const handleDivision = (event) => {
        setStartIndex(1);
        setEndIndex(10);
        setPage(1);
        setDivision(event);
    }

    const getDefaultDates = (newdate) => {
        let df = moment(newdate).subtract(3, 'months').format('YYYY-MM-DD');
        let dt = moment(newdate).format('YYYY-MM-DD');
        let df1 = moment(newdate).subtract(3, 'months').format('YYYY-MM-DD');
        let dt1 = moment(newdate).format('YYYY-MM-DD');
        setFromDate(df);
        setTodate(dt);
        setFromDateDefault(df1);
        setToDateDefault(dt1);
    }

    const getDefaultDatesTh = (newdate) => {debugger
        let dfTh = moment(newdate).subtract(12, 'months').format('MMMM YYYY');
        let dtTh = moment(newdate).subtract(1, 'months').format('MMMM YYYY');
        let df1 = moment(newdate).subtract(12, 'months').startOf('month').format('YYYY-MM');
        let dt1 = moment(newdate).subtract(1, 'months').endOf('month').format('YYYY-MM');

       
      
        setFromDateDefault(df1);
        setToDateDefault(dt1);
        setfromDateTh(dfTh)
        settoDateTh(dtTh)
       
    }

    var monthNames = [ "January : มกราคม", "February : กุมภาพันธ์", "March : มีนาคม", "April : เมษายน", "May : พฤษภาคม", "June : มิถุนายน",
    "July : กรกฎาคม", "August : สิงหาคม", "September : กันยายน", "October : ตุลาคม", "November : พฤศจิกายน", "December : ธันวาคม" ];


const getDateData = (from, to) => {debugger
var datFrom = new Date('1 ' + from);
var datTo = new Date('1 ' + to);
var fromYear =  datFrom.getFullYear();
var toYear =  datTo.getFullYear();
var diffYear = (12 * (toYear - fromYear)) + datTo.getMonth();
while(objArray.length > 0) {
    objArray.pop();
}

for (var i = datFrom.getMonth(); i <= diffYear; i++) {
  var lastDateOfMonth =   new Date(Math.floor(fromYear+(i/12)), i%12 + 1, 0);
  var lastDateOfMonthFor = moment(lastDateOfMonth).format("DD-MM-YYYY")
  var obj = {}
  obj["year"] = Math.floor(fromYear+(i/12));
  obj["month"] = monthNames[i%12];;
  obj["endDateOfMonth"] = lastDateOfMonthFor;
 objArray.push(obj);
 
} 
setObjArray(objArray => [...objArray]);

}

useEffect(() => {debugger
    getDateData(fromDateTh, toDateTh)
}, [])


console.log(objArray, 'arr789')

console.log(fromDateTh, toDateTh, 'date----')

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
                <Header title="Customer Statement Report" />
                <div className={"row ipad_css "  + MyNewClass}>
                    <div className="mainScroll">
                        <div className="reports-landing-container">
                            
                            {
                                countryCode === 'VN' ? 
                                <>
                                <CustomerStatementReportHeader
                                onFromDateChange={event => setFromDate(event)}
                                onToDateChange={event => setTodate(event)}
                                division={division}
                                onChangeDivision={handleDivision}
                                fromDateDefault={fromDateDefault}
                                toDateDefault={toDateDefault}
                                onTableSearch={handleTableSearch}

                            />
                                <CustomerReportTable
                                onChangeStartAndEndIndex={handlePagnation}
                                page={page}
                                setIsLoading={setIsLoading}
                            />
                            </> :
                                <>
                                <CustomerReportHeaderTh
                                onFromDateChange={event => setfromDateTh(event)}
                                onToDateChange={event => settoDateTh(event)}
                                division={division}
                                onChangeDivision={handleDivision}
                                fromDateDefault={fromDateDefault}
                                toDateDefault={toDateDefault}
                                onTableSearch={handleTableSearchTh}

                            />
                                <CustomerReportTableTh
                                arrData = {objArray}
                                onChangeStartAndEndIndex={handlePagnation}
                                page={page}
                                countryCode={countryCode}
                                division={division}
                                setIsLoading={setIsLoading}
                            />
                            </>
                            }
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(CustomerReport);
