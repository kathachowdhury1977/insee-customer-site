import React, { useEffect, useState } from "react";
import { eventActions,masterActions } from "../../_actions";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import locationImage from '../../assets/img/map-dummy.png';
import { useHistory,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import FormSelectbox from "../FormSelectbox/FormSelectbox";
import FormInput from "../FormInput/FormInput";
import "./ShipmentDetailForm.scss";
import { Link } from "react-router-dom";
import Timepicker from '../../components/Timepicker/Timepicker';

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
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
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

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ShipmentDetailFormDelivery(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let history = useHistory();
  const query = useQuery();
  const inseeplusUID=query.get('inseeplusUID');
  let userName = localStorage.getItem('userData');
  userName = JSON.parse(userName);
  console.log('userName',userName);
  const countryCode=userName?userName.countryCode:'TH';
  const soldToNumber=userName?userName.soldTo[0]:0;
  const deleveryData=props.data;
  const [updateship,setUpdateShip]=useState(false);
  const [disabled,setDisabled]=useState("disabled");
  const cancelShipment = useSelector(state => state.cancelShipment);
  const deliveryUpdate = useSelector(state => state.deliveryUpdate);
  const preftrucktype = useSelector((state) => state.preftrucktype);
  const chooseTransporter = useSelector((state) => state.chooseTransporter);
  const getSubdealer=useSelector((state) => state.getSubdealer);
  const specialpro = useSelector((state) => state.specialpro);

  const [expected_arrival_date, setExpectedArrivalDate] = useState(deleveryData.expectedDate);
  const [expected_arrival_time, setExpectedArrivalTime] = useState(deleveryData.expectedTime);
  const [track_licence_no, setTrackLicenceNo] = useState('');
  const [choosetransporter, setChoosetransporter] = useState('');
  const [preferedTrucktype, setPreferedTrucktype] = useState('');
  const[errors,setError]=useState({});
  const [SpecialProject, setSpecialProject] = useState('');
  const[confirmpickup,setConfirmPickup]=useState(false);
  const [contact_name, setContactName] = useState(deleveryData.contactName);
  const [contact_number, contactNumber] = useState(deleveryData.contactMobileNumber);
  const [driver_mobile_no, setDriverMobileNo] = useState('');
  const [frequency, setFrequency] = useState(1);
  const [sub_delaer, setSubDelaer] = useState('');
  const [provience, setProvience] = useState('');
  const [district, setDistrict] = useState('');
  const [retailerCode,setRetailerCode]=useState('');

  const [mesopen,setMesopen]=useState(false);
  const[showMinimumChar,setShowMinimumChar]=useState('');
  const[remark,setRemark]=useState('');
  const[enable,setEnable]=useState({});

  const[open,setOpen]=useState();
  const handleMessageClose=()=>{
    setMesopen(false);
  }
  function onSelectChange(e) {
    switch(e.target.name)
    {
      case "preferedTrucktype":
        setPreferedTrucktype(e.target.value);
        break;
      case "SpecialProject":
        setSpecialProject(e.target.value);
        break;
      case "choosetransporter":
        setChoosetransporter(e.target.value);
      break;
      case 'sub_delaer':
        setSubDelaer(e.target.value);
        let index = e.target.selectedIndex;
        let optionElement = e.target.childNodes[index]
        let option =  optionElement.getAttribute('retailer-code');
        setRetailerCode(option);
        break
    }
  }
  useEffect(() => {
    dispatch(masterActions.prefaredTruckType(countryCode));
    dispatch(masterActions.Subdealer(soldToNumber))
  }, []);
  useEffect(() => {
    dispatch(masterActions.chooseTransporter(countryCode,soldToNumber));
  }, []);
  useEffect(() => {
    dispatch(masterActions.specialProject(countryCode));
  }, []);

  const handleClose=()=>
  {
    setOpen(false);
  }
  const cancelShipmentFun=async()=>{
    console.log('deleveryData',deleveryData);
    await dispatch(eventActions.cancelShipment(countryCode,inseeplusUID));
    ///history.push('/MyShipments');
  }
  console.log('cancelShipment',cancelShipment);
  const handleChange=(e)=> {
    //setNewvalue(event, name)
    switch(e.target.name)
    {
      case "expected_arrival_date":
        setExpectedArrivalDate(e.target.value);
        break;
      case "expected_arrival_time":
        setExpectedArrivalTime(e.target.value);
        break;
      case "contact_name":
        setContactName(e.target.value);
      break;
      case "contact_number":
        contactNumber(e.target.value);  
      break;
      case "remark":
        let words = e.target.value.length;
        if(parseInt(words-1)<100)
        { 
          setShowMinimumChar(parseInt(100-(words))+" character remaining");
          setRemark(e.target.value.replace(/[\/\\,'"]/g,'').slice(0, 100));
        }else
        {
          setShowMinimumChar("");
        }
      break;
    }
  }

  const shipmentEdit=async()=>{
    ///console.log('shipmentEdit');
    setUpdateShip(true);
    setDisabled("");
  }

  const shipUpdate=async ()=>{
    const productArgs=[];
    const productData=deleveryData.products;
    setShowMinimumChar("");
    for(let k=0;k<productData.length;k++)
    {
      let prodDataObj={};
      prodDataObj["doNumber"]= productData[k].doNumber;
      prodDataObj["inseePlusUID"]=productData[k].inseePlusUID;
      prodDataObj["plantCode"]="";
      prodDataObj["productId"]=productData[k].productId
      prodDataObj["productImage"]=productData[k].productImage
      prodDataObj["productName"]=productData[k].productName
      prodDataObj["remainingQuantity"]=productData[k].remainingQuantity
      prodDataObj["selectedQuantity"]=productData[k].selectedQuantity
      prodDataObj["soLineNo"]=productData[k].soNo
      prodDataObj["totalQuantity"]=productData[k].totalQuantity
      prodDataObj["unitOfMeasure"]=productData[k].unitOfMeasure
      productArgs.push(prodDataObj);

    }
    const updateData={
      "countryCode": countryCode,
      "customerId": soldToNumber,
      "deliveryDTO": {
        "contact": {
          "name": contact_name,
          "number": contact_number
        },
        "delivery_Date": expected_arrival_date,
        "delivery_Number": "",
        "deliveryTime": "",
        "loadPerRequest": false,
        "remarks": remark,
        "route": "",
        "specialProjectType": SpecialProject!=''?SpecialProject:deleveryData.specialProject,
        "subDealerCode": retailerCode!=''?retailerCode:deleveryData.subDealerCode,
        "subDealerName": sub_delaer!=''?sub_delaer:deleveryData.subDealer,
        "transporter": choosetransporter!=''?choosetransporter:deleveryData.transporterName,
        "truckType":preferedTrucktype!=''?preferedTrucktype:deleveryData.prefferedTruckType
      },
      "doNumber": "",
      "expectedDate": expected_arrival_date,
      "expectedTime": expected_arrival_time,
      "inseePlusUID": inseeplusUID,
      "pickUpDTO": {
        "driver": {
          "licenseNo": "",
          "mobileNo": "",
          "name": ""
        },
        "frequency": 1,
        "remarks": "",
        "subDealerName": "",
        "subDealerCode": "",
        "transport": {
          "district": "",
          "province": ""
        },
        "truck": {
          "capacityInTons": "",
          "licenseNo": "",
          "trailerId": "",
          "truckId": "",
          "truckTypeId": ""
        }
      },
      "quantity": "",
      "salesOrderList": [
        {
          "poReferenceNumber": deleveryData.poNumber,
          "productList": productArgs,
          "shippingCondition": "DELIVERY",
          "shippingType": "",
          "soId": "",
          "totalQuantity": "",
          "totalRemainingQuantity": "",
          "unitOfMeasure": ""
        }
      ],
      "shipToId": deleveryData.shipTo.shipToCode,
      "shippingCondition": "Delivery"
    };
    await dispatch(eventActions.deliveryUpdate(countryCode,updateData));
  }
  useEffect(()=>{
    if(deliveryUpdate && deliveryUpdate.deliveryUpdate!==undefined || null)
    {
      setMesopen(true);
      setUpdateShip(false);
      setDisabled("disabled");
      if(deliveryUpdate.deliveryUpdate.status==200)
      {
        setError('<div class="alert alert-success" role="alert">Update successfully completed</div>')
      }else
      {
        setError('<div class="alert alert-danger" role="alert">'+deliveryUpdate.deliveryUpdate.message+'</div>')
      }
      setTimeout(()=>{
        window.location.reload();
      },1080);
    }
    ///console.log('deliveryUpdate.deliveryUpdate',deliveryUpdate.deliveryUpdate);
  },[deliveryUpdate.deliveryUpdate])
  console.log('deleveryDatadeleveryData',deleveryData);

  const subDelerData=getSubdealer && getSubdealer.getSubdealer!==undefined?getSubdealer.getSubdealer.results.map((data)=>{
    return {
      id: data.retailerName,
      retailerCode:data.retailerCode,
      name: data.retailerCode+'-'+data.retailerName,
    };
  }):[
    {
      id: "0",
      name: "Data is not available",
    },
  ];
  const cancelShipmentOk=()=>{
    setTimeout(()=>{
      window.location.reload();
    },1080);
  }
 
  const selectPickupTime=(time)=>{
    let picupTime=time!=undefined || null?String(time).split(" "):'';
    return picupTime[1]!==undefined?picupTime[1]:'';
  }
  const cancelUpdate=()=>{
    setUpdateShip(false);
    window.location.reload();
  }
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  return (
    <>
      <div className="select_shipment">
        <div className="form_section">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label style={{fontSize: `${FontChange}px`}}>{t("Expected delivery time")}</label>
                {updateship?<span className="float-right"><i class="fa fa-pencil" aria-hidden="true"></i></span>:''}
                <input style={{fontSize: `${FontChange}px`}} disabled={disabled} type="date" name="expected_arrival_date" onChange={handleChange} className="input" value={expected_arrival_date}/>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label style={{fontSize: `${FontChange}px`}}>{t("Expected Delivery Time")}</label>
                
                {updateship?<span className="float-right"><i class="fa fa-pencil" aria-hidden="true"></i></span>:''}
                {updateship?<Timepicker defaultTime={deleveryData.expectedTime} setExpectedArrivalTime={setExpectedArrivalTime}/>:
                <input style={{fontSize: `${FontChange}px`}} disabled={disabled} type="text" name="expected_arrival_time" onChange={handleChange} className="input" value={expected_arrival_time}/>
                }
              </div>
            </div>
              {
                userName && userName.countryCode === 'VN' ? '' : 
                <>
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label style={{fontSize: `${FontChange}px`}}>{t("Choose Transportor")}</label>
                <select disabled={disabled} className="input" name="choosetransporter" onChange={onSelectChange} style={{fontSize: `${FontChange}px`}}>
                <option value="" style={{fontSize: `${FontChange}px`}}>{t("Please select Transportor")}</option>
                {chooseTransporter.chooseTransporter ? (
                    chooseTransporter.chooseTransporter.map((transporter) => {
                      if(transporter.transporterCode===deleveryData.transporterName)
                      {
                        return (
                          <option selected value={transporter.transporterCode} style={{fontSize: `${FontChange}px`}}>
                            {transporter.customerName}
                          </option>
                        );
                      }else
                      {
                        return (
                          <option value={transporter.transporterCode} style={{fontSize: `${FontChange}px`}}>
                            {transporter.customerName}
                          </option>
                        );
                      }
                      
                    })
                  ) : (
                    <option value={0} style={{fontSize: `${FontChange}px`}}>No Data available</option>
                  )}
                </select>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label style={{fontSize: `${FontChange}px`}}>{t("Preferred Truck Type")}</label>
                <select disabled={disabled} className="input" name="preferedTrucktype" onChange={onSelectChange}>
                <option value="" style={{fontSize: `${FontChange}px`}}>{t("Please select Preferred Truck Type")}</option>
                  {preftrucktype.preftrucktype ? (
                    preftrucktype.preftrucktype.map((preftrucktype) => {
                      if(preftrucktype.value===deleveryData.prefferedTruckType)
                      {
                        return (
                          <option selected value={preftrucktype.id} style={{fontSize: `${FontChange}px`}}>
                          {preftrucktype.value === "Full Trailer" ? "รถบรรทุกพ่วง - Full Trailer" : ""}
                          {preftrucktype.value === "Semi Trailer" ? "รถบรรทุกกึ่งพ่วง - Semi Trailer" : ""}
                          {preftrucktype.value === "Caged" ? "รถบรรทุกคอก - Caged" : ""}
                          {preftrucktype.value === "Flat bed" ? "รถบรรทุกพื้นเรียบ - Flat bed" : ""}
                        </option>
                        
                        );
                      }else
                      {
                        return (
                          <option value={preftrucktype.id} style={{fontSize: `${FontChange}px`}}>
                          {preftrucktype.value === "Full Trailer" ? "รถบรรทุกพ่วง - Full Trailer" : ""}
                          {preftrucktype.value === "Semi Trailer" ? "รถบรรทุกกึ่งพ่วง - Semi Trailer" : ""}
                          {preftrucktype.value === "Caged" ? "รถบรรทุกคอก - Caged" : ""}
                          {preftrucktype.value === "Flat bed" ? "รถบรรทุกพื้นเรียบ - Flat bed" : ""}
                        </option>
                        );
                      }
                      
                    })
                  ) : (
                    <option value={0} style={{fontSize: `${FontChange}px`}}>No Data available</option>
                  )}
                </select>
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label style={{fontSize: `${FontChange}px`}}>{t("Special Project")}</label>
                <select disabled={disabled} className="input" name="SpecialProject" onChange={onSelectChange}>
                <option value="" style={{fontSize: `${FontChange}px`}}>{t("Please select Special Project")}</option>
                  {specialpro.specialpro ? (
                    specialpro.specialpro.map((specialpro) => {
                      if(specialpro.id===deleveryData.specialProject)
                      {
                        return (
                          <option selected value={specialpro.value} style={{fontSize: `${FontChange}px`}}>
                            {specialpro.value}
                          </option>
                        );
                      }else
                      {
                        return (
                          <option value={specialpro.value} style={{fontSize: `${FontChange}px`}}>
                            {specialpro.value}
                          </option>
                        );
                      }
                    })
                  ) : (
                    <option value={0} style={{fontSize: `${FontChange}px`}}>No Data available</option>
                  )}
                </select>
              </div>
            </div>

            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12'>
                <div className='inputBox'>
                <label style={{fontSize: `${FontChange}px`}}>{t("Sub dealer")}</label>
                <select disabled={disabled}
                    className='input'
                    name='sub_delaer'
                    onChange={onSelectChange}
                  >
                    <option value='' style={{fontSize: `${FontChange}px`}}>{t('Please select sub dealer (if have)')}</option>
                    {subDelerData ? (
                      subDelerData.map((data) => {
                        ///console.log('datadata',data);
                        if(data.retailerCode===deleveryData.subDealerCode)
                         {
                          return (
                            <option selected="selected" retailer-code={data.retailerCode} value={data.id} style={{fontSize: `${FontChange}px`}}>
                              {data.name}
                            </option>
                          );
                         }else 
                         {
                            return (
                              <option retailer-code={data.retailerCode} value={data.id} style={{fontSize: `${FontChange}px`}}>
                                {data.name}
                              </option>
                            );
                         }
                      })
                    ) : (
                      <option value={0} style={{fontSize: `${FontChange}px`}}>No Data available</option>
                    )}
                  </select>
                
                </div>
              </div>
                </>
              }
            

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label style={{fontSize: `${FontChange}px`}}>{t("Contact Name")}</label>
                {updateship?<span className="float-right"><i class="fa fa-pencil" aria-hidden="true"></i></span>:''}
                <input style={{fontSize: `${FontChange}px`}} placeholder={t("Please input Contact Name (if have)")} disabled={disabled} type="text" name="contact_name" onChange={handleChange} className="input" value={contact_name}/>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="inputBox">
                <label style={{fontSize: `${FontChange}px`}}>{t("Contact Number")}</label>
                {updateship?<span className="float-right"><i class="fa fa-pencil" aria-hidden="true"></i></span>:''}
                <input style={{fontSize: `${FontChange}px`}} placeholder={t("Please input Contact Number (if have)")} disabled={disabled} type="text" name="contact_number" onChange={handleChange} className="input" value={contact_number}/>
              </div>
            </div>
            <div className="col-12">
              <div className="inputBox">
              <spam style={{color:"red",float:"right", fontSize: `${FontChange}px`}}>{t("100 Words")}</spam>
                <label style={{fontSize: `${FontChange}px`}}>{t("pickupform.remark")}</label>
                {updateship?<span className="float-right"><i class="fa fa-pencil" aria-hidden="true"></i></span>:''}
                <inpu style={{fontSize: `${FontChange}px`}}t disabled={disabled} type="text" name="remark" className="input" onChange={handleChange} placeholder={t("COMMENTS")} value={remark!=''?remark:deleveryData.remarks}/>
                {showMinimumChar!=''?<span style={{color: "red"}}>{showMinimumChar}</span>:''}
              </div>
              <p style={{color:"red"}}>{deliveryUpdate && deliveryUpdate.loading?"Loading...":""}</p>
            </div>
            <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <p className="blue-text" style={{fontSize: `${FontChange}px`}}>{t('Delivery by INSEE')} {props.plantName}</p>
                <img style={{display:"none"}} alt="location" src={locationImage} />
             </div>
            {/* <div className="create_link ShipmentDetailsBtn">
                 {updateship?<button onClick={cancelUpdate} className="update">{t("Cancel")}</button>:''}
                 <button onClick={()=>setOpen(true)} className="cancel">{t("Cancel Shipment")}</button>
                 {updateship?'':<button onClick={shipmentEdit} className="update"> {t("Update")}</button>}
                 {updateship?<button onClick={shipUpdate} className="update">{t("Update")}</button>:''}
              </div> */}

          </div>
        </div>
      </div>
      <div className="select_shipment_boxes">
				<Dialog style={{borderRadius:"15px"}}
					onClose={handleClose}
					aria-labelledby="customized-dialog-title"
					open={open}
				>
					<DialogTitle
						id="customized-dialog-title"
						onClose={handleClose}
					>{t('Cancel Delivery')}</DialogTitle>
          {cancelShipment && cancelShipment.cancelShipment!==undefined && cancelShipment.cancelShipment.status==420?
              cancelShipment.cancelShipment.status==200?
              <DialogContent>
              <h6 style={{color:"green"}}>{cancelShipment.cancelShipment.message}</h6>
              <div className="create_link d-flex">
              <button className="create pl-5 pr-5" onClick={cancelShipmentOk}>
									{t('ok')}
								</button>
              </div>
              </DialogContent>
              :
              <DialogContent>
              <h6 style={{color:"red"}}>{cancelShipment.cancelShipment.message}</h6>
              <div className="create_link d-flex">
              <button className="create pl-5 pr-5" onClick={cancelShipmentOk}>
              {t('ok')}
								</button>
              </div>
              </DialogContent>
              :
              <DialogContent>
            <Typography>
              <p>{t('Are you sure to cancel the delivery')}</p>
						</Typography>
						<DialogActions>
            <div className="create_link d-flex">
								<button className="create pl-5 pr-5" onClick={handleClose}>
									{t('pickupform.no')}
								</button>
								<button className="create pl-5 pr-5" onClick={cancelShipmentFun}>
									{t('pickupform.yes')}
								</button>
							</div>
						</DialogActions>
					</DialogContent>
              
          }
				</Dialog>
			</div>
      <Dialog style={{borderRadius:"15px"}}
					aria-labelledby="customized-dialog-title"
					open={mesopen}
				>
					<DialogTitle
						id="customized-dialog-title"
					>Update Delevery</DialogTitle>
					<DialogContent>
						<Typography>
              <div dangerouslySetInnerHTML={{__html: errors}} />
						</Typography>
						
					</DialogContent>
				</Dialog>
       
    </>
  )
}

export default withTranslation()(ShipmentDetailFormDelivery);