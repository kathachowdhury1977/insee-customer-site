import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AllocateVolumeChildBox from "../AllocateVolumeChildBox/AllocateVolumeChildBox";
import AllocateVolumeHeader from "../AllocateVolumeHeader/AllocateVolumeHeader";
//import { process.env.REACT_APP_API_URL_LOYALTY, process.env.REACT_APP_MASTER_API_URL } from "../../constant";
import Pagination from "@material-ui/lab/Pagination";
import Button from "@material-ui/core/Button";
import { alternatives } from "joi";
import axios from 'axios';
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import FormSelectbox from "../FormSelectbox/FormSelectbox";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    borderBottom: '1px solid rgba(196, 196, 196, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(() => ({
  root: {
    padding: '25px',
    textAlign: 'center',
    width: '417px',
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    // margin: 0,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginTop: '20px',
    display: 'block',
  },
}))(MuiDialogActions)

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
const [str, load] = [JSON.stringify, JSON.parse];

function toParams(obj) {
  let params = [];
  for (let [k, v] of Object.entries(obj)) k === 'search' ? !!v && params.push(`${k}=${v}`) : params.push(`${k}=${v}`)
  console.log("params", params);
  return "?" + params.join("&");
}

function mapper(objArr) {
  if (objArr) {
    return objArr.map(
      ({
        billingMonth: billing_month,
        productCode: material_code,
        billingQuantity: billing_qty,
        productName: material_name,
        remainingQuantity: remaining_qty,
        autoAllocated: auto_allocated,
        manuallyAllocated: manual_allocated,
        sumAllocated: sum_allocated,
        expiration,
        pointsReceived: point_recieved,
        ...props
      }) => ({
        billing_month,
        material_code,
        material_name,
        billing_qty,
        remaining_qty,
        auto_allocated,
        manual_allocated,
        sum_allocated,
        point_recieved,
        expiration,
        ...props,
      })
    );
  } else {
    return "";
  }
}




const Pstep = 10; // pagination step (amount of items per page)


function mappers(objARr) {

  if (objARr) {
    return objARr.map(({ key, value }) => ({ id: value, name: key }));
  } else {
    return "";
  }
}

function AllocateVolumeTabContent() {
  const selectedLangCode = localStorage.getItem('lancode');
  const classes = useStyles();
  const event = useSelector((state) => state.getRetailerBySoldToNumberUsingGET);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const soldToNo = JSON.parse(localStorage.userData).soldTo[0];

  const [volume, setVolume] = useState([]);
  const [details, setDetails] = useState({ date: "", company: "", searchValue: "" });
  const [subd, setSubd] = useState([]);
  const [retailercodes, SetRetailerCodes] = useState([])
  var results


  const [allocateVolume, setAllocateVolume] = useState([])



  const [retailer, SetRetailer] = React.useState("");
  const [volumes, setVolumes] = useState([]);

  const [date, setDate] = useState();
  const [company, setCompany] = useState()
  const [search, setSearch] = useState()

  const [showButton, setShowButton] = useState(false)

  const [indices, setIndices] = useState([1, Pstep]);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const [selectedvalue, setSelectedvalue] = useState('')
  

  function paginate(e, v) {
    setIndices([(v - 1) * Pstep + 1, v * Pstep]);
    setPage(v);
  }

  function clearAll() {
    // window.location.reload();
    setDate('')
    setCompany('')
    SetRetailer("");
    

  }
  function values(date, company, search) {
    setDate(date);
    setCompany(company)
    setSearch(search)
  }

  console.log(retailer, 'retailer---')


  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
  ]

  const defaultProps = {
    options: retailercodes,
    getOptionLabel: (retailercodes) => selectedLangCode === 'en' || selectedLangCode === null ? 
                                        retailercodes.retailerCode + '-' + retailercodes.retailerName : 
                                        retailercodes.retailerCode + '-' + retailercodes.retailerNameInLocal,
  };

  function getData() {
    fetch(
      process.env.REACT_APP_API_URL_LOYALTY +
      "billingData" +
      toParams({
        billingDate: !details.searchValue ? date : '',
        companyCode: !details.searchValue ? company : '',
        countryCode: load(localStorage.userData).countryCode || "TH",
        customerId: localStorage.CustomerNumber,
        fromIndex: indices[0],
        subDelearCode: '', // code, // 123
        toIndex: indices[1],
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
      .then(({ data: { results, totalCount } }) => {
        setVolume([]);
        if (results && results.length) {
          // (details.date);
          setTotal(Math.ceil((total + totalCount) / Pstep));
          // setVolume([...volume, ...mapper(results)]);
          setVolume(mapper(results));
          // setVolume(mapper(results))
          console.log("-----------results", results);
        }
      })
      .catch(alert)
  }

  useEffect(() => {
    // console.log('before retailer')
    // // if(retailer)
    // // {
    //   // console.log('after retailer',retailer.retailerCode)
    //   getData();
    // // }
    fetch(
      process.env.REACT_APP_API_URL_LOYALTY +
      "billingData" +
      toParams({
        billingDate: !details.searchValue ? date : '',
        companyCode: !details.searchValue ? company : '',
        countryCode: load(localStorage.userData).countryCode || "TH",
        customerId: localStorage.CustomerNumber,
        fromIndex: indices[0],
        subDelearCode: '', // code, // 123
        toIndex: indices[1],
      })
      ,
      {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
          'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
        },
      }
    )
      .then((resp) => resp.json())
      .then(({ data: { results, totalCount } }) => {
        setVolume([]);
        if (results && results.length) {
          // (details.date);
          setTotal(Math.ceil((total + totalCount) / Pstep));
          // setVolume([...volume, ...mapper(results)]);
          setVolume(mapper(results));
          // setVolume(mapper(results))
          console.log("-----------results", results);
        }
      })
      .catch(alert)
  },[retailer,indices,date,company])


  useEffect(() => {
    fetch(
      process.env.REACT_APP_MASTER_API_URL + `/retailer/retailer/search?fromIndex=1&needInactive=${false}&soldToNumber=${soldToNo}&toIndex=100`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
          'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
        }
      }
    )
      .then((resp) => resp.json())
      .then(({ data: { results } }) => {
        console.log('----', results);
        SetRetailerCodes(results);
        let _results = results
          .map(({ retailerCode }) => retailerCode)
          .filter((i) => i);
        // setTotal(_results.length);
        console.log("_results", _results);
        return _results;
      })
  }, [])


  // function increase(key, value) { debugger;
  //   console.log(key,value.length, 'value');
  //   if(value.length > 0) {
  //     setShowButton(key)
  //   }
  //   else {
  //     setShowButton('')
  //   }
   
    
  //   console.log(volume[key].selectedQuantity);

  //   if(volume[key].selectedQuantity == null )
  //     {
  //       volume[key].selectedQuantity = value;
  //       volume[key].subDealerName = retailer.retailerName;
  //       setVolumes(volumes.concat(volume[key]));
  //     }
  //   else 
  //     volume[key].selectedQuantity = value

  //   setVolume(
  //     volume.map((i) =>
  //      i.key == key
  //         ? {
  //           ...i,
  //           selectedQuantity: value,
  //         }
  //         : i
  //     )
  //   );
  // }

  function increase(key, value) {
    debugger;
    console.log(key, value.length, 'value');
    if (value.length > 0) {
      setShowButton(true)
    }
    else {
      setShowButton(false)
    }

    if (volumes.length > 0 && value.length >= 0) {
      if(value.length === 0){
        for (var j = 0; j < volumes.length; j++) {
          if(volumes[j].id === volume[key].id){
            volumes.splice(volumes.indexOf(key), 1)
          }
          
        }
        return;
      }
      else {
        for (var j = 0; j < volumes.length; j++) {
          if(volumes[j].id === volume[key].id){
            volumes.splice(volumes.indexOf(key), 1)
          }
         
        }
  
        if (volume[key].selectedQuantity || volume[key].selectedQuantity === '' || volume[key].selectedQuantity === null) {
          setSelectedvalue(value)
          volume[key].selectedQuantity = value;
          volume[key].subDealerName = retailer.retailerName;
          volume[key].subDealer = retailer.retailerCode;
          setVolumes(volumes.concat(volume[key]));
        }
        else {
          volume[key].selectedQuantity = value
          setSelectedvalue(value)
          setVolume(
            volume.map((i) =>
              i.key == key
                ? {
                  ...i,
                  selectedQuantity: value,
                }
                : i
            )
          );
        }
      }
      
    }
    else {
      if (volume[key].selectedQuantity || volume[key].selectedQuantity === '' || volume[key].selectedQuantity === null) {
        setSelectedvalue(value)
        volume[key].selectedQuantity = value;
        volume[key].subDealerName = retailer.retailerName;
        volume[key].subDealer = retailer.retailerCode;
        setVolumes(volumes.concat(volume[key]));
      }
      else {
        setSelectedvalue(value)
        volume[key].selectedQuantity = value
        setVolume(
          volume.map((i) =>
            i.key == key
              ? {
                ...i,
                selectedQuantity: value,
              }
              : i
          )
        );
      }

    }

  }



  const allocateVolumeData = (filterData) => {
    debugger
    while(allocateVolume.length > 0) {
      allocateVolume.pop();
  }
    if (allocateVolume === null || allocateVolume.length === 0) {
      setAllocateVolume([...allocateVolume, filterData]);
    }
    else if (allocateVolume != null && allocateVolume.length > 0) {
      for (var i = 0; i < allocateVolume.length; i++) {
        if (filterData[i].productCode === allocateVolume[i].productCode) {
          return allocateVolume[i].pointsReceived = filterData[i].pointsReceived

        }

      }
      setAllocateVolume([...allocateVolume, filterData]);

    }

  }

 const onClickShow = (material_code) => {
  setOpen(true);

 }

 const handleClose = () => {
  setOpen(false);
 
}

  function Allocate() {
    debugger;

    const body = str({
      allocationVolume:
        volumes.map(
          ({
            //"allocatedPointsOfQuantity": null,
            billing_month: billingMonth,
            material_code: productCode,
            billing_qty: billingQuantity,
            material_name: productName,
            remaining_qty: remainingQuantity,
            auto_allocated: autoAllocated,
            manual_allocated: manuallyAllocated,
            sum_allocated: sumAllocated,
            point_recieved: pointsReceived,
            selectedQuantity: selectedQuantity,
            ...props
          }) => ({
            billingMonth,
            productCode,
            billingQuantity,
            productName,
            remainingQuantity,
            autoAllocated,
            manuallyAllocated,
            sumAllocated,
            pointsReceived,
            selectedQuantity,
            ...props,
          })
        ),
    })


    console.log('----', body);

    console.log("volume", volumes);
    const convertedObject = volumes && Object.values(volumes);
    console.log("volume", convertedObject);
    fetch(process.env.REACT_APP_API_URL_LOYALTY + "allocateVolume", {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      },
      method: "POST",
      body:
        str({
          allocationVolume:
            volumes.map(
              ({
                //"allocatedPointsOfQuantity": null,
                billing_month: billingMonth,
                material_code: productCode,
                billing_qty: billingQuantity,
                material_name: productName,
                remaining_qty: remainingQuantity,
                auto_allocated: autoAllocated,
                manual_allocated: manuallyAllocated,
                sum_allocated: sumAllocated,
                point_recieved: pointsReceived,
                selectedQuantity: selectedQuantity,
                ...props
              }) => ({
                billingMonth,
                productCode,
                billingQuantity,
                productName,
                remainingQuantity,
                autoAllocated,
                manuallyAllocated,
                sumAllocated,
                pointsReceived,
                selectedQuantity,
                ...props,
              })
            ),
        }),
    })
      .then((resp) => resp.json())

      .then((data) => {
        if (data.status === 420) {
          const error = data.message
          toast.error(data.message, {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          return;
        }
        if (data != null && data.data != null) {
          allocateVolumeData(data.data)
         
          // allocateVolume.push(dataStore(data));
          // setAllocateVolume([...allocateVolume, data]);       

          console.log("-----------results", data);
        }
      })
      
      .then(
        setTimeout(()=>{
          getData()
        },2000)     
        
        )
      .catch();
    setShowButton(false)
    setOpen(false)
    while(volumes.length > 0) {
      volumes.pop();
  }
   

  }

  function dateFormatting(input) {

    return input ? input.toString().split("-").reverse().join("-") : "";
  }

  console.log("volume4897", volumes);
console.log('allocateVolume789', allocateVolume)
  const yr = new Date().getFullYear();

  const [dates, setDates] = useState();
  const [totalcount, setTotalcount] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [companies, setCompanies] = useState();

 
  console.log(companies, 'companies')

  function inputSearch(e) {
    setSearchValue(e)
  }

  const months =
    "January|February|March|April|May|June|July|August|September|October|November|December"
      .split("|")
      .map((i) => ({ id: i, name: i }));

  const years = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((i) => ({
    id: yr + i,
    name: yr + i,
  }));

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL_LOYALTY + "dateMaster", {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      },
    })
      .then((resp) => resp.json())
      .then((data) => setDates(mappers(data.data)))
      .catch();

    fetch(process.env.REACT_APP_API_URL_LOYALTY + "companyType", {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      },
    })
      .then((resp) => resp.json())
      .then((data) =>
        setCompanies(mappers(data.data)

        ))
      .catch(console.log);
  }, []);

  // useEffect(() => {
  //   if (date && company || searchValue) {
  //     setter({ date, company,searchValue });
  //     values(date, company,searchValue);
  //   }
  // }, [date,company,searchValue]);

  const handelSlectDate = (e) => {
    var selectDate = e
    selectDate = selectDate.replace(/\s+/g, '-')
    setDate(selectDate)
  }


  const onChangeRetailer = async (_, value) => {
    SetRetailer(value);
    setAllocateVolume([])
   }
   


  console.log(retailer, 'retailer-----789')

  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)

  const style = {
    border: '0px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
    marginTop: '42px',
    marginLeft: '25px',
    backgroundColor: 'transparent',
    fontSize : `${FontChange}px`
  };

  return (
    <>
      <div className="allocatevolume-tab-content">
        <div className="row mb-3">
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6">
            <div className="form_section">
              <div className="inputBox">
                <FormSelectbox
                  name="Date"
                  class="input"
                  defaultValue={date}
                  onSelectChange={(e) => handelSlectDate(e)}
                  label={t("Date")}
                  data={dates || "data"}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6">
            <div className="form_section">
              <div className="inputBox">
                <FormSelectbox
                  name="company"
                  class="input"
                  defaultValue={company}
                  onSelectChange={(e) => setCompany(e)}
                  label={t("label.company")}
                  data={companies || "data"}
                />
              </div>
            </div>
          </div>


          {/* <div className='col-8'>
        <AllocateVolumeHeader clearAll={clearAll} search={(e)=>setSearch(e)} values={(date,company,search)=>{values(date,company,search)}} setter={setDetails} />
      </div> */}
          <div style={{ marginTop: '18px' }} className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6'>
          <Autocomplete          
            {...defaultProps}
            id="tags-outlined"
            loading
            noOptionsText={t('lable.norecordfound')}
           value={retailer || null}
            onChange={onChangeRetailer}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} variant="outlined" placeholder={t('Select Retailer')} />
            )}
          />
           
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6 text-right">
            <button style={style} onClick={clearAll}>
              {t('selectshipment.clearall')}
            </button>
          </div>
        </div>

        <div className="row">




          <div className="col-sm-12 col-md-12 col-lg-12">
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell style={{fontSize: `${SmallFontChanger}px`}}>{t("label.billing_month")}</StyledTableCell>
                      <StyledTableCell align="right"  style={{fontSize: `${SmallFontChanger}px`}}>
                        {t("label.material_code")}
                      </StyledTableCell>
                      <StyledTableCell align="center"  style={{fontSize: `${SmallFontChanger}px`}}>
                        {t("label.material_name")}
                      </StyledTableCell>
                      <StyledTableCell align="center"  style={{fontSize: `${SmallFontChanger}px`}}>
                        {t("label.billing_qty")}
                      </StyledTableCell>
                      <StyledTableCell align="center"  style={{fontSize: `${SmallFontChanger}px`}}>
                        {t("label.remaining_qty")}
                      </StyledTableCell>
                      <StyledTableCell align="center"  style={{fontSize: `${SmallFontChanger}px`}}>
                        {t("label.auto_allocated")}
                      </StyledTableCell>
                      <StyledTableCell align="center"  style={{fontSize: `${SmallFontChanger}px`}}>
                        {t("label.manual_allocated")}
                      </StyledTableCell>
                      <StyledTableCell align="center"  style={{fontSize: `${SmallFontChanger}px`}}>
                        {t("label.sum_allocated")}
                      </StyledTableCell>
                      {
                        retailer && retailer.retailerCode != undefined && retailer.retailerCode ?
                          <>
                            <StyledTableCell align="center"  style={{fontSize: `${SmallFontChanger}px`}}>
                              {t("label.point_recieved")}
                            </StyledTableCell>
                            <StyledTableCell align="center"  style={{fontSize: `${SmallFontChanger}px`}}>
                              {t("label.quantity")}
                            </StyledTableCell>
                          </> : ''
                      }

                      <StyledTableCell align="center"  style={{fontSize: `${SmallFontChanger}px`}}>
                        {t("label.expiration_date")}
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {volume && volume ? volume && volume.map((row, index) => {
                      return (
                        <StyledTableRow
                          key={row.name}
                          className={classes.tableBody}>
                          <StyledTableCell component="th" scope="row"  style={{fontSize: `${SmallFontChanger}px`}}>
                            {row.billing_month}
                          </StyledTableCell>
                          <StyledTableCell align="right"  style={{fontSize: `${SmallFontChanger}px`}}>
                            {row.material_code.replace(/^0+/, '')}
                          </StyledTableCell>
                          <StyledTableCell align="left"  style={{fontSize: `${SmallFontChanger}px`}}>
                            {
                              row.material_name ?
                                selectedLangCode === 'en' || selectedLangCode === null ?
                                  row.material_name.split(':')[0] : row.material_name.split(':')[1]
                                : ''
                            }
                          </StyledTableCell>
                          <StyledTableCell align="right"  style={{fontSize: `${SmallFontChanger}px`}}>
                            {parseFloat(row.billing_qty).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </StyledTableCell>
                          <StyledTableCell align="right"  style={{fontSize: `${SmallFontChanger}px`}}>
                            {parseFloat(row.remaining_qty).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </StyledTableCell>
                          <StyledTableCell align="right"  style={{fontSize: `${SmallFontChanger}px`}}>
                            {parseFloat(row.auto_allocated).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </StyledTableCell>
                          <StyledTableCell align="right"  style={{fontSize: `${SmallFontChanger}px`}}>
                            {parseFloat(row.manual_allocated).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </StyledTableCell>
                          <StyledTableCell align="right"  style={{fontSize: `${SmallFontChanger}px`}}>
                            {parseFloat(row.sum_allocated).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </StyledTableCell>
                          {
                            retailer && retailer.retailerCode != undefined && retailer.retailerCode ?
                              <>
                                <StyledTableCell align="right"  style={{fontSize: `${SmallFontChanger}px`}}>
                                  {

                                    allocateVolume && allocateVolume.length > 0 ? allocateVolume[0].map((item) => {

                                      if (row.material_code === item.productCode) {
                                        return (
                                          parseFloat(item.pointsReceived).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        )
                                      }
                                      else {
                                        return ''
                                      }

                                    }) : '0'

                                    // allocateVolume && allocateVolume.length > 0 ? allocateVolume.map((item) => { 

                                    //   if(row.id === item.rowId)  {
                                    //     return (
                                    //       parseFloat(item.pointsReceived).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
                                    //       )
                                    //   } 
                                    //   else {
                                    //     return ''
                                    //   }                      

                                    // }): '0' 
                                  }
                                  {/* {parseFloat(row.point_recieved).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                                </StyledTableCell>
                                <StyledTableCell align="right"  style={{fontSize: `${SmallFontChanger}px`}}>
                                  <input maxlength={5} style={{ width: '50px' }} onChange={(e) => increase(index, e.target.value)} type="text" />
                                  {/* {
                                    showButton === index ? <button className="showBtn" to="/" onClick={e => onClickShow(row.material_code)}>
                                      {" "}
                                      {t("show.label")}
                                    </button> : ''
                                  } */}

                                </StyledTableCell>
                              </> : ''
                          }

                          <StyledTableCell align="right" style={{fontSize: `${SmallFontChanger}px`}}>
                            {dateFormatting(row.expiration)}
                          </StyledTableCell>

                        </StyledTableRow>


                      );
                    })
                      :
                      <StyledTableRow className={classes.tableBody}>
                        <div className='noBankFound'>{t("Data not available")}</div>

                      </StyledTableRow>
                    }
                  </TableBody>
                </Table>
              </TableContainer>

            </Paper>


          </div>

          {/* }
            )} */}
        </div>
        {/* {
            <Pagination
              count={Math.ceil(total / 10)}
              page={page}
              onChange={handleChangePage}
            />
          } */}
        <Pagination count={Math.ceil(total / 10)} page={page} onChange={paginate} />
        <div className="row mt-3">
          <div className="col-sm-12 col-md-12 col-lg-12">
            {
              volumes.length > 0 ? 
              <button className="create_btn" to="/" style={{fontSize: `${FontChange}`}} onClick={onClickShow}>
              {" "}
              {t("SUBMIT ALL")}
            </button> : ''
            }
           
            {/* <Link className="cancel_btn" to="/">
              {" "}
              {t("cancel.button")}
            </Link> */}
          </div>
        </div>
      </div>
      <div className='select_shipment_boxes'>
      <Dialog style={{borderRadius:"15px"}}
					onClose={handleClose}
					aria-labelledby="customized-dialog-title"
					open={open}
				>
          {/* <DialogTitle
						id="customized-dialog-title"
						onClose={handleClose}
            style={{textAlign: 'center'}}
					>{t('')}</DialogTitle> */}
					<DialogContent>
						<Typography>
             
              {
                selectedLangCode === 'en' || selectedLangCode === null ? 
                `Please confirm that your allocation to subdealer ${retailer.retailerName != undefined ? retailer.retailerName : ''} is correct? This cannot be reverted back.`
                : `กรุณายืนยันการบันทึกยอดขายสินค้า สำหรับร้านค้าช่วง ${retailer.retailerNameInLocal != undefined ? retailer.retailerNameInLocal : ''} การทำรายการนี้ไม่สามารถเปลี่ยนแปลงภายหลัง`
              }
						</Typography>
						<DialogActions>
							<div className="create_link d-flex">
              <button className="create pl-5 pr-5" onClick={Allocate}>
                  {t("Confirm")}
                </button>
              <button className="cancel_btn pl-5 pr-5" onClick={handleClose}>
              {t("cancel.button")}
                </button>
							</div>
						</DialogActions>
					</DialogContent>
				</Dialog>

        
      </div>
    </>
    
  );
}



export default withTranslation()(AllocateVolumeTabContent);


