import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { caseActions, masterActions } from '../../_actions'
import { useDispatch, useSelector } from "react-redux";
import TotalBox from "../TotalBox/TotalBox";
import AllocateVolumeHistoryHeader from "../AllocateVolumeHistoryHeader/AllocateVolumeHistoryHeader";
import AllocateHistoryChildItem from "../AllocateHistoryChildItem/AllocateHistoryChildItem";
//import { process.env.REACT_APP_API_URL_LOYALTY } from "../../constant";
import Pagination from "@material-ui/lab/Pagination";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Loading from "../../components/Loader/Loading";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#ffe6e6',
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: 14
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
  containerTable: {
    //   maxHeight: 1000,
  },

  table: {
    minWidth: 700,
  },
  tableBody: {
    "& th": {
      fontSize: "14px !important",
      padding: "10px !important",
    },
    "& td": {
      fontSize: "14px !important",
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
// function toParams(obj) {
//   let params = [];
//   for (let [k, v] of Object.entries(obj))
//     params.push(String(k) + "=" + String(v));
//   console.log('history params', params);
//   return "?" + params.join("&");
// }

// function mapper(objArr) {
//   if (objArr) {
//     return objArr.map(
//       ({ company, billingMonth, subDealer, subDealerName, sumAllocated }) => {
//         let [billing_month, billing_year] = billingMonth.split("-"),
//           allocated = sumAllocated,
//           sub_dealer_number = subDealer,
//           sub_dealer_name = subDealerName;
//         return {
//           company,
//           billing_month,
//           billing_year,
//           sub_dealer_name,
//           sub_dealer_number,
//           allocated,
//         };
//       }
//     );
//   } else {
//     return "";
//   }
// }

function sum(arr) {
  let count = 0;
  for (let i of arr) count += i;
  return count;
}

const Pstep = 10; // pagination step (amount of items per page)

function AllocateHistoryTabContent({ }) {
  const classes = useStyles();

  const event = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [search, setSearch] = useState();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const selectedLangCode = localStorage.getItem('lancode');
  const [selectedRetailer, setSelectedRetailer] = useState("");

  const [selectedRetailerDefault, setSelectedRetailerDefault] = useState("");

  const customerId = localStorage.CustomerNumber

  const allocateVolumeHistoryData = useSelector(
    (state) => state.allocateVolumeHistory.allocateVolumeHistory
  )

  let startIndex = allocateVolumeHistoryData && allocateVolumeHistoryData.startIndex ? allocateVolumeHistoryData.startIndex : 1;
  let endIndex = allocateVolumeHistoryData && allocateVolumeHistoryData.endIndex ? allocateVolumeHistoryData.endIndex : 10;



  const [indices, setIndices] = useState([1, Pstep]);
  const [total, setTotal] = useState(1);
  const [page, setPage] = React.useState(1);



  const onMonthSlect = (e) => {
    setSelectedMonth(e)
  }

  console.log(selectedCompany, 'selectedMonth')

  const onYearSlect = (e) => {
    setSelectedYear(e)
  }

  const onCompanySlect = (e) => {
    setSelectedCompany(e)
  }
  const onChangeRetailer = async (_, value) => {
    setSelectedRetailerDefault(value)
    setSelectedRetailer(value && value ? value.retailerCode : '')
  }





  useEffect(() => { debugger
    setloading(true)
    dispatch(caseActions.allocateVolumeHistory(customerId, 1, 10,
      selectedCompany ? selectedCompany : '',
      selectedMonth ? selectedMonth : '',
      selectedYear ? selectedYear : currentYear,
      selectedRetailer ? selectedRetailer : ''))
    setTimeout(() => {
      setloading(false)
    }, 1000);
  }, [selectedCompany, selectedMonth, selectedRetailer, selectedYear])

  const handleChangePage = async (event, value) => {
    await dispatch(masterActions.paginationValue(value));
    if (value === 1) {
      startIndex = 1;
      endIndex = 10;
    } else {
      startIndex = (value - 1) * 10 + 1;
      endIndex = value * 10;
    }
    setPage(value);
    dispatch(caseActions.allocateVolumeHistory(customerId, startIndex, endIndex,
      selectedCompany ? selectedCompany : '',
      selectedMonth ? selectedMonth : '',
      selectedYear ? selectedYear : currentYear,
      selectedRetailer ? selectedRetailer : ''))
  };

  console.log(selectedRetailer, 'selectedRetailer')


  function clearAll() {
    setSelectedMonth("")
    setSelectedYear('')
    setSelectedCompany('')
    setSelectedRetailer("")
    setSelectedRetailerDefault("")
  }

  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  return (
    <>
      <div className="allocatevolume-tab-content">
        <AllocateVolumeHistoryHeader searchValue={(e) => setSearch(e)} 
        onMonthSlect={onMonthSlect} 
        onYearSlect={onYearSlect}
        onCompanySlect={onCompanySlect}
        onChangeRetailer={onChangeRetailer}
        currentYear = {currentYear}
        clearAll={clearAll}
        selectedCompany = {selectedCompany}
        selectedRetailer = {selectedRetailer}
        selectedMonth = {selectedMonth}
        selectedRetailerDefault={selectedRetailerDefault}
        />

        <div className="row">
          {
            // history.map((props) => {
            //   return (
            //     <>
            //       <div className="col-sm-6 col-md-6 col-lg-6">
            //         {/* <AllocateHistoryChildItem {...props} /> */}
            //       </div>
            //     </>
            //   );
            // })
            <div className="col-sm-12 col-md-12 col-lg-12">
              <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>{t("label.company")}</StyledTableCell>
                <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                  {t("label.billing_month")}
                </StyledTableCell>
                <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                  {t("label.billing_year")}
                </StyledTableCell>
                <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                  {t("label.sub_dealer_number")}
                </StyledTableCell>
                <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                  {t("label.sub_dealer_name")}
                </StyledTableCell>
                <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                  {t("label.allocated")}
                </StyledTableCell>
                
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loading ?
             
              <div className='loadingOne'>
              <Loading />
              </div>
              
         
             : allocateVolumeHistoryData && allocateVolumeHistoryData.totalCount ? allocateVolumeHistoryData && allocateVolumeHistoryData.results ? allocateVolumeHistoryData.results.map((row) => {
              return (
                <StyledTableRow
                  key={row.name}
                  className={classes.tableBody}>
                      <StyledTableCell align="center" component="th" scope="row" style={{fontSize: `${SmallFontChanger}px`}}>
                        {row.company}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                        {row.billingMonth.split('-')[0]}
                      </StyledTableCell>  
                      <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                      {row.billingMonth.split('-')[1]}
                      </StyledTableCell>  
                      <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                        {row.subDealer}
                      </StyledTableCell>

                      <StyledTableCell align="center" style={{fontSize: `${SmallFontChanger}px`}}>
                        {
                        selectedLangCode && selectedLangCode === 'en' ? row.subDealerName
                        : row.retailerNameInLocal
                        }
                      </StyledTableCell>

                      <StyledTableCell align="right" style={{fontSize: `${SmallFontChanger}px`}}>
                        {parseFloat(row.selectedQuantity).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </StyledTableCell>  
                      
                     
                </StyledTableRow>
              
               
              );
            }) : null
          :   <StyledTableRow className={classes.tableBody}>
          <div className='noBankFound'>{t("Data not available")}</div>
          
        </StyledTableRow>
            }
            
           
          </TableBody>
        </Table>
      </TableContainer>
      <div className="col-md-12 text-right mt-4">
      {
            <Pagination
              count={Math.ceil(allocateVolumeHistoryData && allocateVolumeHistoryData && allocateVolumeHistoryData.totalCount / 10)}
              page={page}
              onChange={handleChangePage}
            />
          }
      </div>
    </Paper>
              
            </div>
          }


          {/* {allocateVolumeHistoryData && allocateVolumeHistoryData.results && (
            <Pagination count={total} page={page} onChange={paginate} />
          )} */}
        </div>

        <div className="redbox-container">
          <TotalBox
            // total={
            //   allocateVolumeHistoryData && allocateVolumeHistoryData.results &&
            //   sum(
            //     allocateVolumeHistoryData && allocateVolumeHistoryData.results.map((details) =>
            //       Number(details.sumAllocated.replace(",", ""))
            //     )
            //   )
            // }
            total={
              allocateVolumeHistoryData && allocateVolumeHistoryData && allocateVolumeHistoryData.totalAllocatedPoints
              
            }
          />
        </div>
      </div>
    </>
  );
}

export default withTranslation()(AllocateHistoryTabContent);

/*
  <div className="col-sm-6 col-md-6 col-lg-6">
    <AllocateHistoryChildItem
      company="SCCC"
      billing_month="12-2020"
      billing_year="2020"
      sub_dealer_number="83098303083"
      sub_dealer_name="Rajat"
      allocated="60,000"
    />
  </div>
</div>


  {/* <TotalBox total="18,000" /> */
