import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import RedemptionHistoryChildItem from "../RedemptionHistoryChildItem/RedemptionHistoryChildItem";
//import { process.env.REACT_APP_API_URL_LOYALTY } from "../../constant";
import Pagination from "@material-ui/lab/Pagination";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Input from "../FormInput/Input";
import InputSearch from "../InputSearch/InputSearch";
import FormSelect from "../FormSelectbox/FormSelect";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Loading from "../../components/Loader/Loading";
import moment from 'moment'
import 'moment-timezone'
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#ffe6e6',
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: 14,
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

function toParams(obj) {
  let params = [];
  for (let [k, v] of Object.entries(obj))
    params.push(String(k) + "=" + String(v));
  return "?" + params.join("&");
}

function mapper(objArr) {
  return objArr.map(
    ({
      redeemPoints: points_redeemed,
      transactionNo: redemption_order,
      productName: product_name,
      quantity,
      remarks: delivery_status,
      transactionDate: redemption_date,
    }) => ({
      redemption_order,
      redemption_date,
      product_name,
      quantity,
      points_redeemed,
      delivery_status,
    })
  );
}




const Pstep = 10; // pagination step (amount of items per page)

function RedemptionHistoryTabContent() {
  const selectedLangCode = localStorage.getItem('lancode');
  const [loading, setloading] = useState(false);
  const classes = useStyles();
  const event = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [redeems, setRedeems] = useState();
  const [totalcount, setTotalcount] = useState('');
  const [indices, setIndices] = useState([1, Pstep]);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const [activityType, setActivityType] = useState();
  const [activity, setActivity] = useState('');

const accountNumber = localStorage.getItem('CustomerNumber')


  function paginate(e, v) {
    setIndices([(v - 1) * Pstep + 1, v * Pstep]);
    setPage(v);
  }
  useEffect(() => {
    setloading (true)
    fetch(
      process.env.REACT_APP_API_URL_LOYALTY +
        "redeem/history" +
        toParams({
          customerId: localStorage.CustomerNumber,
          fromIndex: indices[0],
          toIndex: indices[1],
          fromDate:start,
          toDate: end,
          activityType: activity
        }),
      {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
          'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
        },
      }
    )
      .then((resp) => resp.json())
      .then(( { data: 
        { totalCount, results } } ) => {
        setRedeems(results);
        setTotalcount(totalCount)
        setTotal(Math.ceil(totalCount / Pstep));
      })
      .catch(alert);
      setTimeout(()=>{
        setloading (false)
      },3000);
  }, [indices, start, end, activity]);

  useEffect(()=> { 

    fetch(
      process.env.REACT_APP_API_URL_LOYALTY +
      "activityType",
      {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
          'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
        },
      }
    )
      .then((resp) => resp.json())
      .then(data => {
        console.log('data',data);
        setActivityType(data.data)})
      .catch(alert);
  },[])

  // function dateFormatting(input) {

  //   return input ? input.toString().split(" ").reverse().join(" ") : "";
  // }

  const style = {
    border: '0px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
    marginTop: '73px',
    backgroundColor: 'transparent'
  };

  function clearAll() {
    window.location.reload();
  }

 

  const onChangeSearch = (e) => {
    
    var searchText = e;

    //setFilterData(searchText);
  };


  const handleEndDate = (e) => { debugger;
    var endDateFormet = moment(e).format('YYYY-MM-DD')
    setEnd(endDateFormet)
  }
  


  const handleLocusRequest = (transactionNo, productCode, accountNumber) => {debugger
    window.open(`http://52.76.122.250/insee-loyalty-admin-frontend/reward-tracking/${transactionNo}/${accountNumber}/${productCode}`);

  }

  return (
    <>
    <div className="row">
    {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" >
    
          <div className="form_section">
            <div className="inputBox">
            <label>{t("label.activity_type")}</label>
              <FormSelect
                name="businessegment"
                class="input"
                onSelectChange={(e) => setActivity(e)}
                label={t("label.activity_type")}
                data={activityType ? activityType : 'data'}
              />
            </div>
          </div>
      
                <InputSearch searchHandler={searchHandler}/>
                <div className="inputBox" style={{ marginTop:"40px" }}>
                      <label style={{marginBottom: 4, fontSize: 12, fontWeight: 600}}>{t("Search")}</label>                     
                      <InputSearch onChangeSearch={onChangeSearch}  placeholder={t('Search')}/>
                  </div>

                <div className="form-group has-search" style={{ marginTop:"64px" }}>
                  <span className="fa fa-search form-control-feedback"></span>
                  <input type="text" className="form-control"  placeholder={t("Search")}></input>
                </div>
        </div> */}
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div className="form_section">
            <div className="inputBox">
              <label>{t("label.start_date")}</label>
              <Input
                type="date"
                class="input"
                name="start"
                onChange={(e) => setStart(e)}
                label={t("eventname.label")}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div className="form_section">
            <div className="inputBox">
              <label>{t("label.end_date")}</label>
              <Input
                type="date"
                class="input"
                name="end"
                onChange={(e) => handleEndDate(e)}
                label={t("eventname.label")}
              />
            </div>
          </div>
        </div>
       
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 text-right">
          <button style={style} onClick={clearAll}>
            {t('selectshipment.clearall')}
          </button>
        </div>
      </div>
      <div className="redemption-history-container mb-3">
        <div className="row">
          {/* {redeems &&
            redeems.map((props) => ( */}
              {/* // <div className="col-sm-6 col-md-6 col-lg-6">
              //   <RedemptionHistoryChildItem {...props} />
              // </div> */}
              <div className="col-sm-12 col-md-12 col-lg-12">
              <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            {/* <StyledTableCell align="center">
                  {t("label.activity_type")}
                </StyledTableCell> */}
               
                <StyledTableCell align="center">
                  {t("label.redemption_order")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {t("label.redemption_date")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {t("label.product_name")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {t("label.quantity_units")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {t("label.points_redeemed")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {t("label.delivery_status")}
                </StyledTableCell>
                {/* <StyledTableCell align="center">
                  {t("Action")}
                </StyledTableCell> */}
                
            </TableRow>
          </TableHead>
          <TableBody>
            {

          loading ?
                      
          <div className="loadingLoaylty">              
          <Loading />
          </div> :
             totalcount && totalcount > 0 ?
            
            redeems && redeems ? redeems && redeems.map((row, index) => {
              return (
                
                <StyledTableRow
                  key={row.name}
                  className={classes.tableBody}>
                      {/* <StyledTableCell align="center" component="th" scope="row">
                        {row.activityType}
                    </StyledTableCell> */}
                      <StyledTableCell align="center" component="th" scope="row">
                        {row.transactionNo}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        {moment(row.transactionDate.split(' ')[0]).format("DD-MM-YYYY")}
                      </StyledTableCell>  
                      <StyledTableCell align="center">
                      { 
                      // row.productName ? 
                      //   selectedLangCode === 'en' || selectedLangCode === null ?                        
                      //   row.productName.split(':')[0] : row.productName.split(':')[1]
                      //   : ''
                      row.productName
                      }
                      
                      </StyledTableCell>  
                      <StyledTableCell align="right">
                        {row.quantity ? parseFloat(row.quantity).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null }
                      </StyledTableCell>  
                      <StyledTableCell align="right">
                      {row.redeemPoints ? parseFloat(row.redeemPoints).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","): null}
                      </StyledTableCell>  
                      {/* <StyledTableCell align="center">
                      {row.remarks}
                      </StyledTableCell> */}

                      <StyledTableCell align="center">
                      <span onClick={() => handleLocusRequest(row.transactionNo, row.productCode, accountNumber)} style={{color:"#007bff", cursor: "pointer"}}>Click Link</span>
                      </StyledTableCell>         
                      
                     
                </StyledTableRow>
              
               
              );
            })
          : null
          :
          <StyledTableRow className={classes.tableBody}>
          <div className='noBankFound'>{t("Data not available")}</div>
          
        </StyledTableRow>
          }
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
    <Pagination style={{marginTop: '20px'}} count={total} page={page} onChange={paginate} />
             
            </div>


         
        </div>
      </div>
    </>
  );
}

export default withTranslation()(RedemptionHistoryTabContent);

/* <div className="col-sm-6 col-md-6 col-lg-6">
  <RedemptionHistoryChildItem
    redemption_order="5"
    redemption_date="23-12-2020"
    product_name="Cement"
    quantity="20 Ton"
    points_redeemed="77"
    delivery_status="Arriving before 7 Jan"
  />
</div> */
