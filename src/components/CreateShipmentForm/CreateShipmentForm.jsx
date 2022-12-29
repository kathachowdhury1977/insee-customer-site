import React, { useEffect,useState } from "react";
import { format } from 'date-fns';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { masterActions,eventActions } from "../../_actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory,useLocation,Redirect } from 'react-router-dom';
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from "../FormSelectbox/FormSelectbox";
import FormInput from "../FormInput/FormInput";
import "./CreateShipmentForm.scss";
import CreatePickupPopup from "../../components/ModalPopup/CreatePickupSchdulePopup";
import { Link } from "react-router-dom";
import Timepicker from '../../components/Timepicker/Timepicker';
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
    borderBottom:"1px solid rgba(196, 196, 196, 0.5)"
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%"
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	back_button: {
		backgroundColor: "#000 !important",
		color: "#fff !important",
		marginRight: "8px !important"
	},
	actionsContainer: {
		marginBottom: theme.spacing(2)
	},
	resetContainer: {
		padding: theme.spacing(3)
	}
}));

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose,hideCloseButton, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose && !hideCloseButton ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles(() => ({
	root: {
		padding: "25px",
		textAlign: "center",
		width: "417px",
    
	}
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		// margin: 0,
		padding: theme.spacing(1),
		textAlign: "center",
		marginTop: "20px",
		display: "block"
	}
}))(MuiDialogActions);


function CreateShipmentForm(props) {
  let userName = localStorage.getItem('userData');
  let currentDtae = new Date();
  const selectedLangCode = localStorage.getItem('lancode');
  let currentHour=currentDtae.getHours();
  let currentMinut=currentDtae.getMinutes();
  let history = useHistory();
  userName = JSON.parse(userName);
  // const[subdealerData,setSubdealerData]=useState([]);
  // const[vehicletypesData,setVehicletypesData]=useState([]);
  // const[provinceSData,setProvinceData]=useState([]);
  const countryCode=userName?userName.countryCode:'TH';
  const soldToNumber=userName?userName.soldTo[0]:0;
  const preftrucktype = useSelector((state) => state.preftrucktype);
  const getprovince = useSelector((state) => state.getprovince);
  const getdistrictLsit = useSelector((state) => state.getdistrict);
  const createpickup=useSelector((state) => state.createpickup);
  const getSubdealer=useSelector((state) => state.getSubdealer);
  const getVehicletypes=useSelector((state) => state.getVehicletypes);

  const getVehicles=useSelector((state) => state.getVehicles);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const[]=useState('');
  const[open,setOpen]=useState(false);
  const [expected_arrival_date, setExpectedArrivalDate] = useState('');
  const [expected_arrival_time, setExpectedArrivalTime] = useState(currentHour+':'+currentMinut);
  const [track_licence_no, setTrackLicenceNo] = useState('');
  const [track_capacity, setTrackCapacity] = useState(0);
  const [vehicleId, setVehicleId] = useState('');
  const [confirmpickupData, setConfirmpickupData] = useState();
  const[errors,setError]=useState({});
  const [track_type, setTrackType] = useState('');
  const[confirmpickup,setConfirmPickup]=useState(false);
  const [driver_name, setDriverName] = useState('');
  const [driver_license_no, setDriverLicenseNo] = useState('');
  const [driver_mobile_no, setDriverMobileNo] = useState('');
  const [frequency, setFrequency] = useState(1);
  const [trailerId, setTrailerId] = useState('');

 
  const [sub_delaer, setSubDelaer] = useState('');
  const [provience, setProvience] = useState('');
  const [district, setDistrict] = useState('');
  const [retailerCode,setRetailerCode]=useState('');
  const[CapacityError,setCapacityError]=useState("");
  const[disabled,setDisabled]=useState(countryCode=="TH"?"disabled":"");
  const[erropen,setErropen]=useState(false);
  const[remark,setRemark]=useState('');
  const[showMinimumChar,setShowMinimumChar]=useState('');
  const selectedShipTiId = props.shipToId
  const selectedShippingTypeKey = props.ShippingType
  let ShippingTypeObj=[{"key":"S1","value":"10.20","shipingTYpe":"Truck 6W (10Tons)"},{"key":"S2","value":"17.00","shipingTYpe":"Truck 10W (17Tons)"},{"key":"S3","value":"37.00","shipingTYpe":"Truck 18W (28-35Tons)"},{"key":"S4","value":"22.00","shipingTYpe":"Bulk 10W (18Tons)"},{"key":"S5","value":"36.00","shipingTYpe":"Bulk 18W (30-32Tons)"},{"key":"S6","value":"4.00","shipingTYpe":"Truck 4W (3Tons)"}];

  const productSubCategoryValue  = useSelector((state) => state.getShipCatValue.getShipCatValue)
  const selectedSubCat = productSubCategoryValue && productSubCategoryValue === "Bag CMT %26 Mortar" || productSubCategoryValue === undefined ? 'BAG' : 'BULK';
  let capacityerr=[];
  const [isCheckedWeight, setIsCheckedWeight] = useState(false);

  //checkForSpecialChar
  // let specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  // const checkForSpecialChar = function(string){
  //   for(let i = 0; i < specialChars.length;i++){
  //     if(string.indexOf(specialChars[i]) > -1){
  //         return true
  //      }
  //   }
  //   return false;
  //  }

   useEffect(() => {
    if(userName && userName.countryCode === 'VN'){
      dispatch(masterActions.getVehicles(soldToNumber));
    }
    
   }, [0])
   
  function onSelectChange(event, name) {
    switch(name)
    {
      case "track_type":
        setTrackType(event);
        dispatch(masterActions.getVehicles(soldToNumber,event));
      break;
      case "sub_delaer":
      setSubDelaer(event);
      //  const filterSubDilorData=getSubdealer && getSubdealer.getSubdealer!==undefined && getSubdealer.getSubdealer!==null?getSubdealer.getSubdealer.results.find((data)=>data.retailerName===event):'';
      //  setRetailerCode(filterSubDilorData!==undefined || null?filterSubDilorData.retailerCode:'');
      const filterSubDilorData=getSubdealer && getSubdealer.getSubdealer!==undefined && getSubdealer.getSubdealer!==null?getSubdealer.getSubdealer.find((data)=> (selectedLangCode === 'en' || selectedLangCode === null || selectedLangCode === undefined ? data.subDealerNameEN : data.subDealerNameTH)===event):'';
       setRetailerCode(filterSubDilorData!==undefined || null?filterSubDilorData.subDealerNumber:'');
      break;
      case "provience":
        setProvience(event);
        dispatch(masterActions.getDistrict(countryCode,event));
        break; 
        case "district":
          setDistrict(event);  
          break;
    }
  }

  const onSelectChangeTruckLic = (event, value) => {
    setTrackLicenceNo(value.name);
    const getCapacity=getVehicles && getVehicles.getVehicles.find((data)=>data.licenseNumber===value.name);
    setTrackCapacity(getCapacity!==undefined?getCapacity.capacity:0);
    setVehicleId(getCapacity!==undefined?getCapacity.vehicleId:0);
  }
  const handleClose = () => {
		setOpen(false);
    setErropen(false);
	};
  useEffect(() => {
   
    dispatch(masterActions.prefaredTruckType(countryCode, selectedShippingTypeKey, selectedShipTiId, selectedSubCat));
  }, []);
  useEffect(()=>{
    dispatch(masterActions.vehicletypes(countryCode));
  },[])
  useEffect(()=>{
    ///soldToNumber
    dispatch(masterActions.Subdealer(soldToNumber))
  },[]);
  useEffect(() => {
    dispatch(masterActions.getProvince(countryCode));
  }, []);

  function handleChange(event, name) {
    switch (name) {
      case "expected_arrival_date":
        setExpectedArrivalDate(event);
        break;
      case "expected_arrival_time":
        setExpectedArrivalTime(event);
        break;
    }
  }

  const IsAlphaNumeric=(e)=>{
    let words = e.target.value.length;
    if(parseInt(words-1)<100)
    { 
      setShowMinimumChar(parseInt(100-(words))+" character remaining");
      setRemark(e.target.value.replace(/[\/\\,'"]/g,'').slice(0, 100));
    }else
    {
      setShowMinimumChar("");
    }
    
  }
  
  const isNumberVal = (event) => {
    switch (event.target.name) {
      case "driver_name":
        setDriverName(event.target.value);
        break;
      case "driver_license_no":
        setDriverLicenseNo(event.target.value);
        break;
      case "driver_mobile_no":
        setDriverMobileNo(event.target.value.replace(/[^\d]/g, ""));
        break;
      case "frequency":
        setFrequency(event.target.value.replace(/[^\d]/g, ""));
        break;

      case "trailer_id":
        setTrailerId(event.target.value);
        break;
    }
  };
  
  const handleSubmit=(e)=>{
    e.preventDefault();
  let shipToProduct=props.productData;
  let shipToProductArr=[];
  let QuentityTotal=0;
  let total_quantity=0;
  let selectedQuantity=0;
  // let phoneno = /^\d{10}$/;
  // let selectedQuantityQ=document.querySelector('.selected_quantity_section');
  let selectedQuantityTQ = document.querySelectorAll(".selectedQty");
  let selectedQuantityErr=[];
  for(let df=0;df<selectedQuantityTQ.length;df++)
    {
      if(selectedQuantityTQ[df].value>0)
      {
        selectedQuantityErr.push(true);
        ///setCapacityError("Quantity should not be greater than truck capacity");
      }else
      {
        selectedQuantityErr.push(false);
      }
      
    }
    document.getElementById("TrackCapacity").innerHTML='';
    document.getElementById("selectedQtyMessage").style.display = "none";
    if(selectedQuantityErr.indexOf(false)!==-1)
    {
      document.getElementById("selectedQtyMessage").style.display = "block";
      setError({"default_quantity":t("Please enter a valid quantity")})
      document.getElementById("TrackCapacity").innerHTML = t("Please enter a valid quantity");  
    }else if(expected_arrival_date===''){
    setError({"expected_arrival_date":t("Please select arrivel date")})
    ////errors["expected_arrival_date"] = "Cannot be empty";
  }else if(expected_arrival_time===''){
    setError({"expected_arrival_time":t("Please select arrivel time")})
  }else if(track_type==='' &&  userName && userName.countryCode !== 'VN'){
    setError({"track_type":"Please select truck type"})
  }else if(track_licence_no===''){
    setError({"track_licence_no":t("Please select track license no")})
  }else if(track_capacity===''){
    setError({"track_capacity":"Please enter track capacity"})
  }else if(provience==='' &&  userName && userName.countryCode !== 'VN'){
    setError({"provience":"Please select transport zone"})
  }else if(district==='' &&  userName && userName.countryCode !== 'VN'){
    setError({"district":"Please select District"})
  }
  else
  {
    capacityerr=[];
    // let selectedQuantityTQArgs=[]; 
    let selectedQuantityTQObj={};
    for(let qt=0;qt<selectedQuantityTQ.length;qt++)
    {
      selectedQuantityTQObj[selectedQuantityTQ[qt].name]=selectedQuantityTQ[qt].value;
    }
    for(let i=0;i<shipToProduct.length;i++)
     {
    let prodObj={};
    prodObj['poReferenceNumber']=shipToProduct[i].header1.ponumber;
    let itemArr=[];
    let items=shipToProduct[i].items;
    for(let k=0;k<items.length;k++)
    {
      
      if(props.productIds.indexOf(items[k].soLineNo)!==-1)
      {
        let itemObj={}; itemObj['plantCode']=items[k].Plant;
        itemObj['productId']=items[k].MaterialNumber;
        itemObj['productImage']=items[k].MaterialImage;
        itemObj['productName']=items[k].MaterialName;
        itemObj['remainingQuantity']=items[k].ItemRemainingQuantity;
        itemObj['selectedQuantity']=selectedQuantityTQObj['selectedQuantity-'+shipToProduct[i].id+'-'+k]!==''?selectedQuantityTQObj['selectedQuantity-'+shipToProduct[i].id+'-'+k]:items[k].ItemRemainingQuantity;
        selectedQuantity=parseFloat(selectedQuantity)+parseFloat(selectedQuantityTQObj['selectedQuantity-'+shipToProduct[i].id+'-'+k]);
        total_quantity=parseFloat(total_quantity)+parseFloat(items[k].OrderQuantity);
        itemObj['totalQuantity']=items[k].OrderQuantity;
        itemObj['soLineNo']=items[k].soLineNo;
        itemObj['unitOfMeasure']=items[k].UnitOfMeasure;
        itemArr.push(itemObj);
      }
    }
      prodObj['productList']=itemArr;
      prodObj['shippingCondition']=shipToProduct[i].header1.shippingCondition;
      prodObj['division']=shipToProduct[i].header1.division;
      prodObj['shippingType']=userName && userName.countryCode === 'VN' ? shipToProduct[i].header1.shippingType : '';
      prodObj['soId']=shipToProduct[i].orderListObject.ccrz__OrderId__c;
      prodObj['totalQuantity']=shipToProduct[i].header1.totalQuantity;
      QuentityTotal=parseFloat(QuentityTotal)+parseFloat(shipToProduct[i].header1.totalQuantity);
      prodObj['totalRemainingQuantity']=shipToProduct[i].header1.totalRemainingQuantity;
      prodObj['shipToId']=  userName && userName.countryCode === 'VN' ? shipToProduct[i].partnerFunction.shipToNumber : '';
      shipToProductArr.push(prodObj);
    }
    const shipData={
      "countryCode": countryCode,
      "customerId": soldToNumber,
      "deliveryDTO": {
        "contact": {
          "name": "",
          "number": ""
        },
        "loadPerRequest":  '' ,
        "remarks": "",
        "specialProjectType": "",
        "transporter": "",
        "truckType": "",
        "isLoadPerRequest": isCheckedWeight && isCheckedWeight === true ? 'N' : ''
      },
      "doNumber": "",
      "expectedDate": format(new Date(expected_arrival_date), 'yyyy-MM-dd'),
      "expectedTime": expected_arrival_time,
      "inseePlusUID": "",
      "pickUpDTO": {
        "driver": {
          "licenseNo": driver_license_no,
          "mobileNo": driver_mobile_no,
          "name": driver_name
        },
        "frequency": frequency !==''?parseInt(frequency):1,
        "remarks": remark,
        "subDealerName": sub_delaer,
        "subDealerCode": retailerCode,
        "transport": {
          "district":district,
          "province":provience
        },
        "truck": {
          "capacityInTons": track_capacity,
          "licenseNo": track_licence_no,
          "trailerId": userName && userName.countryCode === 'VN' ? trailerId : '',
          "truckTypeId": track_type,
          "truckId": vehicleId
        }
      },
      "quantity": QuentityTotal,
      "salesOrderList":shipToProductArr,
      "shipToId": userName && userName.countryCode === 'VN' ? '' : props.shipToId,
      "shippingCondition": "PickUp",
      "userId":  userName && userName.userId
    }
    if(parseFloat(selectedQuantity)>parseFloat(track_capacity)){
      setCapacityError("Quantity should not be greater than truck capacity");
      setErropen(true);
      setError({});
      }else if((parseFloat(selectedQuantity).toFixed(2)*parseInt(frequency !== ''?frequency:1))>parseFloat(QuentityTotal)){
           setCapacityError("Please decrease some frequency");
           setError({});
           setErropen(true);
      }else
      {
          setError({});
          setOpen(true);
          dispatch(eventActions.CreatePickup(countryCode,shipData)); 
          setConfirmpickupData(shipData);
       }
    
      }
  }
  const confirmPickup=()=>{
    history.push('/MyShipments');
 }

  const provinceData = getprovince.getprovince!==undefined
  ? getprovince.getprovince.map((Data) => {
      return {
        id: Data.provinceCode,
        name: Data.province,
      };
    })
  : [
      {
        id: "0",
        name: "Data is not available",
      },
    ];
    
   
    const getDistData=getdistrictLsit && getdistrictLsit.getdistrict!==undefined?getdistrictLsit.getdistrict.map((data)=>{
      return {
        id: data.disctrictCode,
        name: data.district,
      };
    }):[
      {
        id: "0",
        name: "Data is not available",
      },
    ];

    const subDelerData=getSubdealer && getSubdealer.getSubdealer!==undefined && getSubdealer.getSubdealer !==null && getSubdealer.getSubdealer.length>0 ? getSubdealer.getSubdealer.map((data)=>{
      if( selectedLangCode === 'en' || selectedLangCode === null || selectedLangCode === undefined  ){
        return {
          id: data.subDealerNameEN,
          name: data.subDealerNameEN,
        };
      }else {
        return {
          id: data.subDealerNameTH,
          name: data.subDealerNameTH,
        };
      }
   
  }):[
    {
      id: "0",
      name: "Data is not available",
    },
  ];
 const getVehicletypesData=getVehicletypes && getVehicletypes.getVehicletypes!==undefined?
 getVehicletypes.getVehicletypes.map((data)=>{

  return {
    id: data.key,
    name: data.value,
  };
 }):[
  {
    id: "0",
    name: "Data is not available",
  },
];
  const getVehiclesData=getVehicles && getVehicles.getVehicles!==undefined ?
  getVehicles.getVehicles.map((data)=>{
    return {
      id: data.licenseNumber ? data.licenseNumber : '',
      name: data.licenseNumber ? data.licenseNumber : '',
    };
  }):[
  {
    id: "0",
    name: "Data is not available",
  },
];

const handleChangeCheckBox = (e) => {
  setIsCheckedWeight(!isCheckedWeight);
  
}
  
  return (
    <>
      <div className="select_shipment">
        {createpickup && createpickup.loading?<Loader type="Loader" color="#00BFFF"  height={30} width={100}/>:''}
        <form onSubmit={handleSubmit}>
        <div className="form_section">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label>{t("pickupform.expected_arrival_date")} <spam style={{color:"red"}}>*</spam></label>
                <FormInput
                  type={"date"}
                  required="required"
                  class={"input"}
                  name={"expected_arrival_date"}
                  onChange={handleChange}
                  label={t("eventname.label")}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors && errors['expected_arrival_date']?<span style={{color: "red"}}>{errors['expected_arrival_date']}</span>:''}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label>{t("pickupform.expected_arrival_time")} <spam style={{color:"red"}}>*</spam></label>
                <Timepicker setExpectedArrivalTime={setExpectedArrivalTime}/>
                {/*
                  <FormInput
                  type={"time"} 
                  required="required"
                  class={"input"}
                  name={"expected_arrival_time"}
                  id="expected_arrival_time"
                  onChange={handleChange}
                  label={t("eventname.label")}
                />
                */}
                
                {errors && errors['expected_arrival_time']?<span style={{color: "red"}}>{errors['expected_arrival_time']}</span>:''}
              </div>
            </div>
            {
              userName && userName.countryCode === 'VN' ? '' : 
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label>{t("Truck Type")} <spam style={{color:"red"}}>*</spam></label> 
                <FormSelectbox
                  name={"track_type"}
                  class={"input"}
                  onSelectChange={onSelectChange}
                  label={t("Please select truck type")}
                  data={getVehicletypesData}
                />
                {errors && errors['track_type']?<span style={{color: "red"}}>{errors['track_type']}</span>:''}
              </div>
            </div>
            }
            

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label>{t("Truck License No.")} <spam style={{color:"red"}}>*</spam></label>
                <Autocomplete
                    id='contract'
                    options={getVehiclesData}
                    noOptionsText={t('lable.norecordfound')}
                    onChange={onSelectChangeTruckLic}
                    getOptionLabel={(option) => option.name}                        
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t('Please select license no')}
                        variant='outlined'
                      />
                    )}
                  />
                {/* <FormSelectbox
                  class={"input"}
                  name={"track_licence_no"}
                  onSelectChange={onSelectChange}
                  label={t("Please select license no")}
                  data={getVehiclesData}
                /> */}
                {errors && errors['track_licence_no']?<span style={{color: "red"}}>{errors['track_licence_no']}</span>:''}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label>{t("pickupform.track_capacity")}</label>
                <input type="text" name="track_capacity" className="input" readOnly value={track_capacity}/>
                {errors && errors['track_capacity']?<span style={{color: "red"}}>{errors['track_capacity']}</span>:''}
              </div>
            </div>
            {
              userName && userName.countryCode === 'VN' ? 
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label>{t("pickupform.Trailer_Id")}</label>
                <input  placeholder={t("Please input Trailer Id")} className="input" onChange={isNumberVal} type="text" name="trailer_id" value={trailerId}/>
                {errors && errors['trailer_id']?<span style={{color: "red"}}>{errors['trailer_id']}</span>:''}
              </div>
            </div>
              : ''
            }
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label>{t("pickupform.driver_name")}</label>
                <input disabled={disabled} placeholder={t("Please input driver name (if have)")} className="input" onChange={isNumberVal} type="text" name="driver_name" value={driver_name}/>
                {errors && errors['driver_name']?<span style={{color: "red"}}>{errors['driver_name']}</span>:''}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label>{t("pickupform.driver_license_no")}</label>
                <input disabled={disabled} placeholder={t("Please input driver license no (if have)")} className="input" onChange={isNumberVal} type="text" name="driver_license_no" value={driver_license_no}/>
                {errors && errors['driver_license_no']?<span style={{color: "red"}}>{errors['driver_license_no']}</span>:''}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label>{t("pickupform.driver_mobile_no")}</label>
                <input disabled={disabled} placeholder={t("Please input driver mobile no (if have)")} className="input" onChange={isNumberVal} type="text" name="driver_mobile_no" value={driver_mobile_no}/>
                {errors && errors['driver_mobile_no']?<span style={{color: "red"}}>{errors['driver_mobile_no']}</span>:''}
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label>{t("pickupform.frequency")}</label>
                <input placeholder={t("Please input number")} className="input" onChange={isNumberVal} type="text" name="frequency" value={frequency}/>
                {errors && errors['frequency']?<span style={{color: "red"}}>{errors['frequency']}</span>:''}
              </div>
            </div>
            {
                userName && userName.countryCode === 'VN' ? '' :
                <>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label>{t("Sub dealer")}</label>
                <FormSelectbox
                  name={"sub_delaer"}
                  class={"input"}
                  onSelectChange={onSelectChange}
                  label={t("Please select sub dealer (if have)")}
                  data={subDelerData}
                />
                {errors && errors['sub_delaer']?<span style={{color: "red"}}>{errors['sub_delaer']}</span>:''}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label>{t("Transport zone")} <spam style={{color:"red"}}>*</spam></label>
                <FormSelectbox
                  name={"provience"}
                  class={"input"}
                  onSelectChange={onSelectChange}
                  label={t("Please select tarnsport zone")}
                  data={provinceData}
                />
                {errors && errors['provience']?<span style={{color: "red"}}>{errors['provience']}</span>:''}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
              <label>{t("District")} <spam style={{color:"red"}}>*</spam></label>
                <FormSelectbox
                  name={"district"}
                  class={"input"}
                  onSelectChange={onSelectChange}
                  label={t("Please select district")}
                  data={getDistData}
                />
                {errors && errors['district']?<span style={{color: "red"}}>{errors['district']}</span>:''}
              </div>
            </div>
            </>
            }
            
              {
                userName && userName.countryCode === 'VN' ? '' :
                productSubCategoryValue  ==='Bulk CMT' ?
              <div className="col-12">
              <div className="inputBox">
              <input
                

                  type="checkbox"
                  id="topping"
                  name="topping"
                  class="checkbox-custom"
                  value=""
                  checked={isCheckedWeight}
                  onChange={handleChangeCheckBox}
                />
                <label
                for={"hello"}
                style={{ textTransform: "uppercase", position:'relative', left: 0 }}
                className="checkbox-custom-label"
              >
                {t("Load Exact Weight")}
              </label>
              </div>
            
            </div> : ''
              }
            

            <div className="col-12">
              <div className="inputBox">
              <spam style={{color:"red",float:"right"}}>{t("100 Words")}</spam>
                <label>{t("pickupform.remark")}</label>
                <input type="text" name="remark" className="input" onChange={IsAlphaNumeric} placeholder={t("COMMENTS")} value={remark}/>
                {showMinimumChar!==''?<span style={{color: "red"}}>{showMinimumChar}</span>:''}
              </div>
              {errors && Object.keys(errors).length >0 ?<span style={{color: "red"}}>{t("Please fill required fields")}</span>:''}
            </div>

            
            <div className="create_link createPickupBtn">
                <CreatePickupPopup 
                  modal={t("pickupform.cancelbtn")}
                  forpickup="cancle-pickup"
                  cancel={t("pickupform.no")}
                  done={t("pickupform.yes")}
                  url="/ShipmentManagement"
                />
              {/*<Link to="#/ShipmentDetails-Pickup">*/}
                <button type="submit" className="create">{t("pickupform.createbtn")}</button>
              {/*</Link>*/}
            </div>
          </div>
        </div>
        </form>
      </div>
      <div className="select_shipment_boxes">
				<Dialog style={{borderRadius:"15px"}}
					onClose={handleClose}
					aria-labelledby="customized-dialog-title"
					open={open}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
				>
          <DialogTitle
						id="customized-dialog-title"
						onClose={handleClose}
            hideCloseButton={true}
					>{t('createpickup.heading')}</DialogTitle>
					<DialogContent>
						<Typography>
             {createpickup && createpickup.error!==undefined?<p style={{color:"red"}}>
             {
                selectedLangCode === 'en' || selectedLangCode === null ?
                createpickup.error.split('-')[0] : createpickup.error.split('-')[1] 
              }
             
             </p>:""} 
            {createpickup && createpickup.createpickup!==undefined?
            userName && userName.countryCode === 'VN' ? 
            <p style={{color:"green"}}>{t('Shipment request submitted')}</p> 
            :
            <p style={{color:"green"}}>{t('Pickup created successfully')}</p>
            
            :
            ''}
						</Typography>
						<DialogActions>
							<div className="create_link d-flex">
              {createpickup && createpickup.error!==undefined?'':
								<button className="create pl-5 pr-5" onClick={confirmPickup}>OK</button>
              }
							</div>
						</DialogActions>
					</DialogContent>
				</Dialog>
			</div>
      <Dialog style={{borderRadius:"15px"}}
					onClose={handleClose}
					aria-labelledby="customized-dialog-title"
					open={erropen}
				>
					<DialogTitle
						id="customized-dialog-title"
						onClose={handleClose}
					>Error</DialogTitle>
					<DialogContent>
						<Typography>
               {CapacityError}
						</Typography>
					</DialogContent>
				</Dialog>
    </>
  );
}
export default withTranslation()(CreateShipmentForm);