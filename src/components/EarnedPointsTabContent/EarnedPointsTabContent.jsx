import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import EarnedPointsChildItem from "../EarnedPointsChildItem/EarnedPointsChildItem";
//import { process.env.REACT_APP_API_URL_LOYALTY } from "../../constant";
import Pagination from "@material-ui/lab/Pagination";
import FormSelect from "../FormSelectbox/FormSelect";
import Input from "../FormInput/Input";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Loading from "../../components/Loader/Loading";
import DatePickers from "../FormInput/DatePicker"
import FormSelectbox from "../FormSelectbox/FormSelectbox";
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



const Pstep = 10; // pagination step (amount of items per page)

function EarnedPointsTabContent() {
  const [loading, setloading] = useState(false);
  const classes = useStyles();
  const event = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [points, setPoints] = useState();

  const [indices, setIndices] = useState([1, Pstep]);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(moment().startOf('month').format('YYYY-MM-DD'));
  const [end, setEnd] = useState(moment().format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState('');
  const [activityType, setActivityType] = useState();
  const [activity, setActivity] = useState('');
  const [totalcount, setTotalcount] = useState('');

  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)

  var curruntData = moment().format('YYYY-MM-DD')
  var shoData = moment().format('YYYY-MM-DD')
  var dateFrom = moment().startOf('month').format('YYYY-MM-DD')

  console.log(userName, 'userName5555')
  const userRole = JSON.parse(localStorage.userData).userRole
  const selectedLangCode = localStorage.getItem('lancode');

  function paginate(e, v) {
    setIndices([(v - 1) * Pstep + 1, v * Pstep]);
    setPage(v);
  }

  function mappers(objARr) {debugger
    if (objARr) {
      return objARr.map(({ key }) => ({ id: key, name: key }));
    } else {
      return "";
    }
  }

  console.log(activityType, 'activityType---')

  const style = {
    border: '0px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
    marginTop: '73px',
    backgroundColor: 'transparent'
  };

  function clearAll() {
    setActivity('')
    setEnd(moment().format('YYYY-MM-DD'))
    setStart(moment().startOf('month').format('YYYY-MM-DD'))
  }

  function dateFormatting(input) {

    return input ? input.toString().split("/").join("-") : "";
  }

  useEffect(()=> {  debugger

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
        setActivityType(mappers(data.data))})
      .catch();
  },[])

  useEffect(() => {
    setloading (true)
    fetch(
      process.env.REACT_APP_API_URL_LOYALTY +
      "earnedPoints" +
      toParams({
        customerId: localStorage.CustomerNumber,
        isDealer: userRole === 'Retailer' ? false : true,
        fromIndex: indices[0],
        toIndex: indices[1],       
        startDate : start ? start : dateFrom,
        toDate : endDate? endDate : curruntData,
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
      .then(({ data: { totalCount, results } }) => {
        setPoints(results);
        setTotalcount(totalCount)
        setTotal(Math.ceil(totalCount / Pstep));
      })
      .catch(alert);
      setTimeout(()=>{
        setloading (false)
      },3000);
  }, [indices,endDate,activity,start]);


  const handleStartDate = (event) => {
    setStart(event.target.value)
  }

  const handleEndDate = (event) => {debugger
    setEnd(event.target.value)
    var endDateFormet = moment(event.target.value).format('YYYY-MM-DD')
    setEndDate (endDateFormet)
  }


  console.log('activityType---', activityType);

  return (
    <>
      <div className="row">
        <div className="col-sm-3 col-md-3 col-lg-3">
          <div className="form_section">
            <div className="inputBox">
              <label>{t("label.start_date")}</label>
              <DatePickers 
                  id="startdate"
                  onChange={handleStartDate}
                  defaultValue = {dateFrom}
                  value={start}
                />
              {/* <Input
                type="date"
                class="input"
                name="start"
                onChange={(e) => setStart(e)}
                label={t("eventname.label")}
              /> */}
            </div>
          </div>
        </div>
        <div className="col-sm-3 col-md-3 col-lg-3">
          <div className="form_section">
            <div className="inputBox">
              <label>{t("label.end_date")}</label>
              <DatePickers 
                id="enddate"
                defaultValue = {shoData}
                onChange={handleEndDate}
                value={end}
              />
              {/* <Input
                type="date"
                class="input"
                name="end"
                onChange={(e) => e && setEnd(e)}
                label={t("eventname.label")}
              /> */}
            </div>
          </div>
        </div>
        <div style={{ marginTop: '30px' }} className="col-sm-3 col-md-3 col-lg-2">
          <div className="form_section">
            <div className="inputBox">
            <FormSelectbox
                name="activity_type"
                class="input"
                onSelectChange={(e) => setActivity(e)}
                label={t("label.activity_type")}
                defaultValue={activity}
                data={activityType || "data"}
              />
              {/* <FormSelect
                name="businessegment"
                class="input"
                onSelectChange={(e) => setActivity(e)}
                label={t("label.activity_type")}
                data={activityType || "data"}
              /> */}
            </div>
          </div>
        </div>
        <div className="col-sm-3 col-md-3 col-lg-3">
          <button style={style} onClick={clearAll}>
            {t('selectshipment.clearall')}
          </button>
        </div>
      </div>
      <div className="redemption-history-container mb-3">
        <div className="row">
          {/* {points &&
            points.map((props) => (
              <div className="col-sm-6 col-md-6 col-lg-6">
                <EarnedPointsChildItem {...props} />
              </div>
            )) */}
            <div className="col-sm-12 col-md-12 col-lg-12">
              <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
               
                <StyledTableCell align="center">
                  {t("label.activity_type")}
                </StyledTableCell>
                {
                  userName && userName.userRole === "Retailer" ?
                  <>
                  <StyledTableCell align="right">
                  {t("label.dealerid")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {t("label.dealerName")}
                </StyledTableCell> 
                </>
                : ''
                }
                
                <StyledTableCell align="center">
                  {t("label.billing_number")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {t("label.billing_date")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {t("label.product_number")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {t("label.product_name")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {t("label.quantity_units")}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {t("label.point_recieved")}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {t("label.expiration_date")}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {t("Remarks")}
                </StyledTableCell>

               
                
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loading ?
            
              <div className="loadingLoaylty">              
          <Loading />
          </div> :
              totalcount && totalcount > 0 ?
            
            points && points ? points && points.map((row, index) => {
              return (
                <StyledTableRow
                  key={row.name}
                  className={classes.tableBody}>
                      <StyledTableCell align="center" component="th" scope="row">
                        {row.activityType}
                    </StyledTableCell>
                    {
                       userName && userName.userRole === "Retailer" ?
                       <>
                       <StyledTableCell align="center">
                        {row.customerId === 'default' ? '' : row.customerId.replace(/^0+/, '')}
                      </StyledTableCell>  
                      <StyledTableCell align="left">
                        {row.customerName === 'default' ? '' : row.customerName}
                      </StyledTableCell>  
                    
                       </> : ''
                    }
                    <StyledTableCell align="center">
                        {row.billingNumber}
                      </StyledTableCell>  
                    
                      
                      <StyledTableCell align="center">
                      
                        {dateFormatting(row.billingCreationDate)}
                      </StyledTableCell>  
                      <StyledTableCell align="right">
                        {row.productCode && row.productCode.replace(/^0+/, '') }
                      </StyledTableCell>  
                      <StyledTableCell align="left">
                      {
                        row.productName && row.productName != null ?
                        selectedLangCode === 'en' || selectedLangCode === null ?
                        
                        row.productName.split(':')[0] : row.productName.split(':')[1] 
                        : ''
                      }

                     
                      
                      </StyledTableCell>  
                      <StyledTableCell align="right">
                      {row.quantity === null ? null  : parseFloat(row.quantity).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </StyledTableCell>   

                       <StyledTableCell align="right">
                      {
                      row.activityType === "Point Deduction" ?  parseFloat('-' + row.totalPoints).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      :  parseFloat(row.totalPoints).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                     }
                      </StyledTableCell>  
                      <StyledTableCell align="center">
                      {
                          moment(row.expiryDate).format('DD-MM-YYYY')
                        }
                     
                      </StyledTableCell>  
                      <StyledTableCell align="center">
                      {row.remark}
                      </StyledTableCell>        
                    
                     
                </StyledTableRow>
              
               
              );
            })
          : null
          :  <StyledTableRow className={classes.tableBody}>
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

export default withTranslation()(EarnedPointsTabContent);