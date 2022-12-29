import React, { useEffect, useState } from 'react'
import { eventActions, masterActions } from '../../_actions'

import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import moment from 'moment'
////import TimePicker from '../../components/Timepicker/Timepicker';
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import Rectangle from '../../assets/img/Mask Group 1 1.png'
import FormSelectbox from '../FormSelectbox/FormSelectbox'
import FormInput from '../FormInput/FormInput'
import './ShipmentDetailForm.scss'
import { Link } from 'react-router-dom'
////import { import } from "mathjs";
import Timepicker from '../../components/Timepicker/Timepicker'
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  back_button: {
    backgroundColor: '#000 !important',
    color: '#fff !important',
    marginRight: '8px !important',
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}))

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
export function useQuery() {
  return new URLSearchParams(useLocation().search)
}
function ShipmentDetailFormPickup(props) {
  const query = useQuery()
  const inseeplusUID = query.get('inseeplusUID')
  let userName = localStorage.getItem('userData')
  let history = useHistory()
  userName = JSON.parse(userName)
  console.log('userName', userName)
  const countryCode = userName ? userName.countryCode : 'TH'
  const soldToNumber = userName ? userName.soldTo[0] : 0
  let shipData = props.data
  console.log('shipData', shipData)

  const [expected_arrival_date, setExpectedArrivalDate] = useState('')
  const [expected_arrival_time, setExpectedArrivalTime] = useState('')
  const [track_licence_no, setTrackLicenceNo] = useState('')
  const [track_capacity, setTrackCapacity] = useState(0)
  const [confirmpickupData, setConfirmpickupData] = useState()
  const [errors, setError] = useState('')
  const [track_type, setTrackType] = useState('')
  const [confirmpickup, setConfirmPickup] = useState(false)
  const [driver_name, setDriverName] = useState('')
  const [driver_license_no, setDriverLicenseNo] = useState('')
  const [driver_mobile_no, setDriverMobileNo] = useState('')
  const [frequency, setFrequency] = useState(1)
  const [trailerId, setTrailerId] = useState('');
  const [sub_delaer, setSubDelaer] = useState('')
  const [provience, setProvience] = useState('')
  const [district, setDistrict] = useState('')
  const [retailerCode, setRetailerCode] = useState('')
  // const [updateship, setUpdateShip] = useState(false)
  const [remark, setRemark] = useState('')
  const [showMinimumChar, setShowMinimumChar] = useState('')
  const [mesopen, setMesopen] = useState(false)
  // const [disabled, setDisabled] = useState('disabled')
  const [disableddr, setDrDisabled] = useState(
    countryCode == 'TH' ? 'disabled' : ''
  )
  const [updateMessage, setUpdateMessage] = useState('')
  const [errorsCapacity, setErrorsCapacity] = useState('')
  const deliveryUpdate = useSelector((state) => state.deliveryUpdate)
  const cancelShipment = useSelector((state) => state.cancelShipment)
  const getVehicletypes = useSelector((state) => state.getVehicletypes)
  const getVehicles = useSelector((state) => state.getVehicles)
  const getSubdealer = useSelector((state) => state.getSubdealer)
  const getprovince = useSelector((state) => state.getprovince)
  const getdistrictLsit = useSelector((state) => state.getdistrict)
  const getFilterStatus = useSelector((state) => state.shipmentStatusFilterList.shipmentFilter);
  const selectedLangCode = localStorage.getItem('lancode');
  console.log(expected_arrival_time, 'expected_arrival_time');

  useEffect(() => {
    dispatch(masterActions.vehicletypes(countryCode))
    dispatch(
      masterActions.getVehicles(
        soldToNumber,
        shipData.truckId !== undefined ? shipData.truckId : 'TRUCK'
      )
    )
  }, [])
  useEffect(() => {
    dispatch(masterActions.Subdealer(soldToNumber))
  }, [])
  useEffect(() => {
    dispatch(masterActions.getProvince(countryCode))
    dispatch(masterActions.getDistrict(countryCode, shipData.provinceCode))
  }, [])
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  function onSelectChange(event) {
    console.log(event)
  }

  const handleChange = (e) => {
    //setNewvalue(event, name)
    switch (e.target.name) {
      case 'expected_arrival_date':
        setExpectedArrivalDate(e.target.value)
        break
      case 'expected_arrival_time':
        setExpectedArrivalTime(e.target.value)
        break
      case 'driver_name':
        setDriverName(e.target.value)
        break
      case 'driver_license_no':
        setDriverLicenseNo(e.target.value)
        break
      case 'driver_mobile_no':
        console.log('e.target.value', e.target.value)
        setDriverMobileNo(e.target.value.replace(/[^\d]/g, ''))
        break
      case 'frequency':
        setFrequency(e.target.value)
        break
      case 'trailer_id':
        setTrailerId(e.target.value)
        break
      case 'remark':
        let words = e.target.value.length
        if (parseInt(words - 1) < 100) {
          setShowMinimumChar(parseInt(100 - words) + ' character remaining')
          setRemark(e.target.value.replace(/[\/\\,'"]/g, '').slice(0, 100))
        } else {
          setShowMinimumChar('')
        }
        break
    }
  }

  const addMoreTruck = () => {
    history.push('/VehicleManagement');

  }

  const onSelectChangeTruckLic = (event, value) => {
    debugger
    // if(e.target.value=='add-more')
    // {
    //   history.push('/VehicleManagement');
    // }
    setTrackLicenceNo(value?.name);
    const getCapacity =
      getVehicles &&
      getVehicles.getVehicles.find(
        (data) => data.licenseNumber === value?.name
      )
    if (
      getCapacity !== undefined &&
      getCapacity.capacity >= props.totalSelectedQty
    ) {
      setTrackCapacity(getCapacity.capacity)
      setErrorsCapacity('')
    } else {
      setTrackCapacity(getCapacity !== undefined ? getCapacity.capacity : '');

      setErrorsCapacity(
        'Truck capacity should not less than ' + props.totalSelectedQty
      )
    }

  }

  const handleonSelectChange = (e) => {
    switch (e.target.name) {
      case 'track_type':
        setTrackType(e.target.value)
        dispatch(masterActions.getVehicles(soldToNumber, e.target.value))
        break
      case 'track_licence_no':
        if (e.target.value == 'add-more') {
          history.push('/VehicleManagement');
        }
        setTrackLicenceNo(e.target.value)
        ////console.log('getVehiclesgetVehicles',getVehicles && getVehicles.getVehicles);
        const getCapacity =
          getVehicles &&
          getVehicles.getVehicles.find(
            (data) => data.licenseNumber === e.target.value
          )
        ////console.log('getCapacity',getCapacity.capacity,'**********',shipData.truckCapacity);
        if (
          getCapacity !== undefined &&
          getCapacity.capacity >= props.totalSelectedQty
        ) {
          setTrackCapacity(getCapacity.capacity)
          setErrorsCapacity('')
        } else {
          setTrackCapacity(getCapacity !== undefined ? getCapacity.capacity : '');

          setErrorsCapacity(
            'Truck capacity should not less than ' + props.totalSelectedQty
          )
        }
        break
      case 'sub_delaer':
        setSubDelaer(e.target.value)
        const filterSubDilorData =
          getSubdealer &&
          getSubdealer.getSubdealer.results.find(
            (data) => data.retailerName === e.target.value
          )
        setRetailerCode(
          typeof filterSubDilorData.retailerCode != 'undefined'
            ? filterSubDilorData.retailerCode
            : ''
        )
        ////console.log('filterSubDilorData',typeof filterSubDilorData.retailerCode!='undefined');
        break
      case 'provience':
        setProvience(e.target.value)
        dispatch(masterActions.getDistrict(countryCode, e.target.value))
        break
      case 'district':
        setDistrict(e.target.value)
        break
    }
  }
  // const shipmentEdit = async () => {
  //   ///console.log('shipmentEdit');
  //   setUpdateShip(true)
  //   setDisabled('')
  // }
  console.log(shipData, 'shipData.products')




  const shipUpdate = async () => {
    debugger
    let trackCapacity = track_capacity == 0 ? shipData.truckCapacity : track_capacity;

    setShowMinimumChar('')
    var shipToProductArr = []
    const productArgs = []

    const productData = shipData.products
    if (productData !== undefined) {
      if (trackCapacity >= props.totalSelectedQty) {


        for (let i = 0; i < productData.length; i++) {
          let prodObj = {};
          prodObj['poReferenceNumber'] = productData[i].poNumber

          var checker = false;

          if (shipToProductArr.length > 0) {

            for (let n = 0; n < shipToProductArr.length; n++) {
              if (shipToProductArr[n].poReferenceNumber === productData[i].poNumber) {
                checker = true
              }
            }
          }

          if (checker === true) {

          } else {


            let itemArr = [];
            let items = productData;
            let unitOfMeasure = '';
            for (let k = 0; k < items.length; k++) {

              if (items[k].soNo != -1 && (items[k].poNumber === productData[i].poNumber)) {
                let itemObj = {};
                ////console.log(track_capacity,'kkkkkkk',selectedQuantityTQObj['selectedQuantity-'+shipToProduct[i].id+'-'+k],'id',shipToProduct[i].id);
                itemObj['doNumber'] = items[k].doNumber
                itemObj['inseePlusUID'] = items[k].inseePlusUID
                itemObj['plantCode'] = ''
                itemObj['productId'] = items[k].productId
                itemObj['productImage'] = items[k].productImage
                itemObj['productName'] = items[k].productName
                itemObj['remainingQuantity'] = items[k].remainingQuantity
                if (countryCode === 'VN') {
                  itemObj['selectedQuantity'] = items[k].selectedQuantity
                  for (var x = 0; x < props.selectedQty.length; x++) {
                    if (items[k].inseePlusUID === props.selectedQty[x].poNumber) {
                      itemObj['selectedQuantity'] = props.selectedQty[x].selectedQty && props.selectedQty[x].selectedQty != '' ? props.selectedQty[x].selectedQty : items[k].selectedQuantity
                    }

                  }



                }
                else {
                  itemObj['selectedQuantity'] = items[k].selectedQuantity
                }

                itemObj['soLineNo'] = items[k].soNo
                itemObj['totalQuantity'] = items[k].totalQuantity
                itemObj['unitOfMeasure'] = items[k].unitOfMeasure
                itemArr.push(itemObj);
              }
            }

            prodObj['productList'] = itemArr;
            prodObj['shippingCondition'] = productData[i].shippingCondition;
            prodObj['shippingType'] = "";
            prodObj['soId'] = productData[i].soNo;
            prodObj['totalQuantity'] = "";

            shipToProductArr.push(prodObj);

          }

        }


        // <= shipData.truckCapacity


        const updateData = {
          countryCode: countryCode,
          customerId: soldToNumber,
          deliveryDTO: {
            contact: {
              name: '',
              number: '',
            },
            delivery_Date: '',
            delivery_Number: '',
            deliveryTime: '',
            loadPerRequest: false,
            remarks: '',
            route: '',
            specialProjectType: '',
            transporter: '',
            truckType: '',
          },
          doNumber: '',
          expectedDate:
            expected_arrival_date != ''
              ? expected_arrival_date
              : shipData.expectedDate,
          expectedTime:
            expected_arrival_time != ''
              ? expected_arrival_time
              : shipData.expectedTime,
          inseePlusUID: inseeplusUID,
          pickUpDTO: {
            driver: {
              licenseNo: '',
              mobileNo:
                driver_mobile_no != ''
                  ? driver_mobile_no
                  : shipData.driverMobileNumber,
              name: driver_name != '' ? driver_name : shipData.driverName,
            },
            frequency: 1,
            remarks: remark != '' ? remark : shipData.remarks,
            subDealerName: sub_delaer != '' ? sub_delaer : shipData.subDealer,
            subDealerCode: '',
            transport: {
              district: district != '' ? district : shipData.districtCode,
              province: provience != '' ? provience : shipData.provinceCode,
            },
            truck: {
              capacityInTons:
                track_capacity != '' && track_capacity
                  ? track_capacity
                  : shipData.truckCapacity,
              licenseNo:
                track_licence_no != ''
                  ? track_licence_no
                  : shipData.truckLicenseNo,
              trailerId: userName && userName.countryCode === 'VN' ? trailerId != '' ? trailerId : shipData.trailerId : '',
              truckId: '',
              truckTypeId: track_type != '' ? track_type : shipData.truckId,
            },
          },
          quantity: '',
          salesOrderList: shipToProductArr,
          shipToId: shipData.shipTo.shipToCode,
          shippingCondition: 'pickup',
        }
        console.log('updateData', updateData)
        await dispatch(eventActions.deliveryUpdate(countryCode, updateData))
      } else {
        setErrorsCapacity(
          'Truck capacity should not less than ' + props.totalSelectedQty
        )
      }
    } else {
      ////alert('hhhhh');
      ///setMesopen(true);
    }
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleMessageClose = () => {
    setMesopen(false)
  }
  const cancelShipmentFun = async () => {
    ////console.log('hhhhhh',shipData.shipmentNumber,shipData.doNumbers[0]);
    await dispatch(eventActions.cancelShipment(countryCode, inseeplusUID))
    ////history.push('/MyShipments');
  }
  useEffect(() => {
    if (
      (deliveryUpdate && deliveryUpdate.deliveryUpdate !== undefined) ||
      null
    ) {
      if (deliveryUpdate.deliveryUpdate.status == 200) {
        setMesopen(true)
        props.setUpdateShip(false)
        props.setDisabled('disabled')
        setError(
          `<div class="alert alert-success" role="alert">${t('Update successfully completed')}</div>`
        )
      } else {
        setMesopen(true)
        props.setUpdateShip(false)
        props.setDisabled('disabled')
        setError(
          selectedLangCode === 'en' || selectedLangCode === null ?
            '<div class="alert alert-danger" role="alert">' +
            deliveryUpdate.deliveryUpdate.message.split('=')[0] +

            '</div>' :
            selectedLangCode === 'vt' ? deliveryUpdate.deliveryUpdate.message.split('=')[0] :

              '<div class="alert alert-danger" role="alert">' +
              deliveryUpdate.deliveryUpdate.message.split('=')[1] +

              '</div>'

        )
      }
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }, [deliveryUpdate.deliveryUpdate])
  const cancelShipmentOk = () => {
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const selectPickupTime = (time) => {
    let picupTime = time != undefined || null ? String(time).split(' ') : ''
    return picupTime[1] !== undefined ? picupTime[1] : ''
  }
  const cancelUpdate = () => {
    props.setUpdateShip(false)
    props.setDisabled('disabled')
    window.location.reload()
  }


  const getVehiclesData = getVehicles && getVehicles.getVehicles !== undefined ?
    getVehicles.getVehicles.map((data) => {
      return {
        id: data.licenseNumber ? data.licenseNumber : '',
        name: data.licenseNumber ? data.licenseNumber : '',
      };
    }) : [
      {
        id: "0",
        name: "Data is not available",
      },
    ];

  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)
  return (
    <>
      <div className='select_shipment'>
        <div className='form_section'>
          <div className='row'>
            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12'>
              <div className='inputBox'>
                <label style={{ fontSize: `${FontChange}px` }}>{t('pickupform.expected_arrival_date')}</label>
                {props.updateship ? (
                  <span className='float-right'>
                    <i class='fa fa-pencil' aria-hidden='true'></i>
                  </span>
                ) : (
                  ''
                )}
                <input
                  disabled={props.enable === true ? "disabled" : props.disabled}
                  type='date'
                  name='expected_arrival_date'
                  onChange={handleChange}
                  className='input'
                  defaultValue={shipData.expectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  style={{ fontSize: `${FontChange}px` }}
                />
              </div>
            </div>

            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12'>
              <div className='inputBox'>
                <label style={{ fontSize: `${FontChange}px` }}>{t("Expected Arrival time")}</label>
                {props.updateship ? (
                  <span className='float-right'>
                    <i class='fa fa-pencil' aria-hidden='true'></i>
                  </span>
                ) : (
                  ''
                )}
                {props.updateship ? (
                  <Timepicker
                    defaultTime={shipData.expectedTime}
                    setExpectedArrivalTime={setExpectedArrivalTime}
                  />
                ) : (
                  <input
                    disabled={props.enable === true ? "disabled" : props.disabled}
                    type='text'
                    name='expected_arrival_time'
                    onChange={handleChange}
                    className='input'
                    value={shipData.expectedTime}
                    style={{ fontSize: `${FontChange}px` }}
                  />
                )}
              </div>
            </div>
            {
              userName && userName.countryCode === 'VN' ? '' :
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12'>
                  <div className='inputBox'>
                    <label style={{ fontSize: `${FontChange}px` }}>{t('Preferred Truck type')}</label>
                    {props.updateship ? (
                      <span className='float-right'>
                        <i class='fa fa-pencil' aria-hidden='true'></i>
                      </span>
                    ) : (
                      ''
                    )}
                    <select
                      disabled={props.enable === true ? "disabled" : props.disabled}
                      className='input'
                      name='track_type'
                      onChange={handleonSelectChange}
                      style={{ fontSize: `${FontChange}px` }}
                    >
                      <option value='' style={{ fontSize: `${FontChange}px` }}>{t("Please select truck type")}</option>
                      {getVehicletypes && getVehicletypes.getVehicletypes
                        ? getVehicletypes.getVehicletypes.map((data) => {
                          if (data.key === shipData.truckId) {
                            return (
                              <option selected value={data.key} style={{ fontSize: `${FontChange}px` }}>
                                {data.value}
                              </option>
                            )
                          } else {
                            return <option value={data.key} style={{ fontSize: `${FontChange}px` }}>{data.value}</option>
                          }
                        })
                        : ''}
                    </select>
                  </div>
                </div>

            }


            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12'>
              <div className='inputBox'>
                <label style={{ fontSize: `${FontChange}px` }}>{t('pickupform.truck_licence_no')}</label>
                {
                      props.enable && <span className='float-right'>
                        <Link to='/VehicleManagement'>
                          <i class='fa fa-pencil' aria-hidden='true'></i>
                        </Link>
                      </span> 
                    }
                {props.updateShip===true ? props.updateShip : props.updateShipmentBtn ? (
                  <>
                    <span className='float-right'>
                      <Link to='/VehicleManagement'>
                        <i class='fa fa-pencil' aria-hidden='true'></i>
                      </Link>
                    </span>
                    <Autocomplete
                      id='contract'
                      options={getVehiclesData}
                      noOptionsText={t('lable.norecordfound')}
                      onChange={onSelectChangeTruckLic}
                      getOptionLabel={(option) => option.name}
                      // disabled={props.disabled}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={t('Please select license no')}
                          variant='outlined'
                        />
                      )}
                    />
                    <span style={{ cursor: 'pointer' }} onClick={addMoreTruck}>Add More</span>
                  </>

                ) : (
                  
                  <select
                    disabled={props.disabled}
                    className='input'
                    name='track_licence_no'
                    onChange={handleonSelectChange}
                    style={{ fontSize: `${FontChange}px` }}
                  >
                    <option value='' style={{ fontSize: `${FontChange}px` }}>{t("Please select license no")}</option>
                    <option selected value={shipData.truckLicenseNo}>
                      {shipData.truckLicenseNo}
                    </option>
                    {getVehicles && getVehicles.getVehicles
                      ? getVehicles.getVehicles.map((data) => {
                        if (data.licenseNumber == shipData.truckLicenseNo) {
                          return (
                            <option selected value={data.licenseNumber} style={{ fontSize: `${FontChange}px` }}>
                              {data.licenseNumber}
                            </option>
                          )
                        } else {
                          return (
                            <option value={data.licenseNumber} style={{ fontSize: `${FontChange}px` }}>
                              {data.licenseNumber}
                            </option>
                          )
                        }
                      })
                      : ''}
                    <option value='add-more' style={{ fontSize: `${FontChange}px` }}>Add More</option>
                  </select>
                )}

              </div>
            </div>

            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12'>
              <div className='inputBox'>
                <label style={{ fontSize: `${FontChange}px` }}>{t('pickupform.track_capacity')}</label>
                <input
                  readOnly
                  type='text'
                  name='track_capacity'
                  onChange={handleChange}
                  className='input'
                  style={{ fontSize: `${FontChange}px` }}
                  value={
                    track_capacity != ''
                      ? track_capacity
                      : shipData.truckCapacity
                  }
                />
                <span style={{ color: 'red', fontSize: `${FontChange}px` }}>{errorsCapacity}</span>
              </div>
            </div>
            {
              userName && userName.countryCode === 'VN' ?
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                  <div className="inputBox">
                    <label style={{ fontSize: `${FontChange}px` }}>{t("pickupform.Trailer_Id")}</label>
                    {props.updateship ? (
                      <span className='float-right'>
                        <i class='fa fa-pencil' aria-hidden='true'></i>
                      </span>
                    ) : (
                      ''
                    )}
                    <input className="input"
                      onChange={handleChange}
                      type="text"
                      name="trailer_id"
                      // value={trailerId}
                      value={trailerId != '' ? trailerId : shipData.trailerId}
                      style={{ fontSize: `${FontChange}px` }}
                    />

                  </div>
                </div>
                : ''
            }
            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12'>
              <div className='inputBox'>
                <label style={{ fontSize: `${FontChange}px` }}>{t('pickupform.driver_name')}</label>
                {props.updateship ? (
                  <span className='float-right'>
                    <i class='fa fa-pencil' aria-hidden='true'></i>
                  </span>
                ) : (
                  ''
                )}
                <input
                  placeholder={t('Please input driver name (if have)')}
                  disabled={props.enable === true ? "disabled" : disableddr}
                  type='text'
                  name='driver_name'
                  onChange={handleChange}
                  className='input'
                  value={driver_name != '' ? driver_name : shipData.driverName}
                  style={{ fontSize: `${FontChange}px` }}
                />

              </div>
            </div>
            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12'>
              <div className='inputBox'>
                <label style={{ fontSize: `${FontChange}px` }}>{t('pickupform.driver_mobile_no')}</label>
                {props.updateship ? (
                  <span className='float-right'>
                    <i class='fa fa-pencil' aria-hidden='true'></i>
                  </span>
                ) : (
                  ''
                )}
                <input
                  placeholder={t('Please input driver mobile no (if have)')}
                  disabled={props.enable === true ? "disabled" : disableddr}
                  type='text'
                  name='driver_mobile_no'
                  onChange={handleChange}
                  className='input'
                  style={{ fontSize: `${FontChange}px` }}
                  value={
                    driver_mobile_no != ''
                      ? driver_mobile_no
                      : shipData.driverMobileNumber
                  }
                />
              </div>
            </div>
            {
              userName && userName.countryCode === 'VN' ?
                ''
                :
                <>
                  <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12'>
                    <div className='inputBox'>
                      <label style={{ fontSize: `${FontChange}px` }}>{t('label.sub_dealer')}</label>
                      <select
                        disabled={props.enable === true ? "disabled" : props.disabled}
                        className='input'
                        name='sub_delaer'
                        onChange={handleonSelectChange}
                        style={{ fontSize: `${FontChange}px` }}
                      >
                        <option value='' style={{ fontSize: `${FontChange}px` }}>
                          {t('Please select sub dealer (if have)')}
                        </option>
                        {getSubdealer && getSubdealer.getSubdealer && Array.isArray(getSubdealer.getSubdealer) && getSubdealer.getSubdealer.length>0
                          ? getSubdealer.getSubdealer.map((data) => {
                            if (data.retailerName === shipData.subDealer) {
                              return (
                                <option selected value={data.retailerName} style={{ fontSize: `${FontChange}px` }}>
                                  {data.retailerCode + '-' + data.retailerName}
                                </option>
                              )
                            } else {
                              return (
                                <option value={data.retailerName} style={{ fontSize: `${FontChange}px` }}>
                                  {data.retailerCode + '-' + data.retailerName}
                                </option>
                              )
                            }
                          })
                          : ''}
                      </select>
                    </div>
                  </div>
                  <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12'>
                    <div className='inputBox'>
                      <label style={{ fontSize: `${FontChange}px` }}>{t('Transport zone')}</label>
                      <select
                        disabled={props.enable === true ? "disabled" : props.disabled}
                        className='input'
                        name='provience'
                        onChange={handleonSelectChange}
                      >
                        <option value='' style={{ fontSize: `${FontChange}px` }}>{t('Please select tarnsport zone')}</option>
                        {getprovince && getprovince.getprovince
                          ? getprovince.getprovince.map((data) => {
                            if (data.provinceCode === shipData.provinceCode) {
                              return (
                                <option selected value={data.provinceCode} style={{ fontSize: `${FontChange}px` }}>
                                  {data.province}
                                </option>
                              )
                            } else {
                              return (
                                <option value={data.provinceCode} style={{ fontSize: `${FontChange}px` }}>
                                  {data.province}
                                </option>
                              )
                            }
                          })
                          : ''}
                      </select>
                    </div>
                  </div>
                  <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12'>
                    <div className='inputBox'>
                      <label style={{ fontSize: `${FontChange}px` }}>{t('District')}</label>
                      <select
                        disabled={props.enable === true ? "disabled" : props.disabled}
                        className='input'
                        name='district'
                        onChange={handleonSelectChange}
                        style={{ fontSize: `${FontChange}px` }}
                      >
                        <option value='' style={{ fontSize: `${FontChange}px` }}>{t('Please select district')}</option>
                        {getdistrictLsit && getdistrictLsit.getdistrict
                          ? getdistrictLsit.getdistrict.map((data) => {
                            if (data.disctrictCode == shipData.districtCode) {
                              return (
                                <option selected value={data.disctrictCode} style={{ fontSize: `${FontChange}px` }}>
                                  {data.district}
                                </option>
                              )
                            } else {
                              return (
                                <option value={data.disctrictCode} style={{ fontSize: `${FontChange}px` }}>
                                  {data.district}
                                </option>
                              )
                            }
                          })
                          : ''}
                      </select>
                    </div>
                  </div>
                </>
            }

            <div className='col-8'>
              <div className='inputBox'>
                <spam style={{ color: 'red', float: 'right', fontSize: `${FontChange}px` }}>{t("100 Words")}</spam>
                <label style={{ fontSize: `${FontChange}px` }}>{t('label.remark')}</label>
                {props.updateship ? (
                  <span className='float-right'>
                    <i class='fa fa-pencil' aria-hidden='true'></i>
                  </span>
                ) : (
                  ''
                )}
                <input
                  disabled={props.enable === true ? "disabled" : props.disabled}
                  type='text'
                  name='remark'
                  className='input'
                  onChange={handleChange}
                  placeholder={t('COMMENTS')}
                  style={{ fontSize: `${FontChange}px` }}
                  value={remark != '' ? remark : shipData.remarks}
                />
                {showMinimumChar != '' ? (
                  <span style={{ color: 'red', fontSize: `${FontChange}px` }}>{showMinimumChar}</span>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className='create_link ShipmentDetailsBtn'>
              {(props.updateShipmentBtn ? props.updateShipmentBtn : props.updateship) ? (
                <button onClick={cancelUpdate} className='create_btn' style={{ fontSize: `${FontChange}px` }}>
                  {t('cancel.button')}
                </button>
              ) : (
                ''
              )}
              <button onClick={() => setOpen(true)} className='create_btn' disabled={props.shipmentFilterStatus==="Cancel" ||props.shipmentFilterStatus=== "Check In" || props.shipmentFilterStatus==="In Plant" || props.shipmentFilterStatus==="Dispatched" || props.shipmentFilterStatus==="Delivered" ? "disabled" :""} style={{ fontSize: `${FontChange}px` }}>
                {t('shipmentdetail.cancelshipment_btn')}
              </button>
              {(props.updateShipmentBtn ? props.updateShipmentBtn :props.updateship) ? (
                ''
              ) : (
                <button onClick={props.shipmentEdit} className='create_btn' disabled={props.shipmentFilterStatus==="Cancel" ||props.shipmentFilterStatus=== "Check In" || props.shipmentFilterStatus==="In Plant" || props.shipmentFilterStatus==="Dispatched" || props.shipmentFilterStatus==="Delivered"? "disabled" :""} style={{ fontSize: `${FontChange}px` }}>
                  {t("Edit")}
                </button>
              )}
              {(props.updateShipmentBtn ? props.updateShipmentBtn : props.updateship) ? (
                <button onClick={shipUpdate} className='create_btn ' style={{ fontSize: `${FontChange}px` }}>
                  {t('pickupform.updatebtn')}
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='select_shipment_boxes'>
        <Dialog
          style={{ borderRadius: '15px' }}
          aria-labelledby='customized-dialog-title'
          open={open}
        >
          <DialogTitle id='customized-dialog-title' n>
            {/* {t('Cancel Pickup')} */}
          </DialogTitle>
          {cancelShipment && cancelShipment.cancelShipment !== undefined ? (
            cancelShipment.cancelShipment.status == 200 ? (
              <DialogContent>
                <h6 style={{ color: 'green' }}>

                  {selectedLangCode === 'en' || selectedLangCode === null ? cancelShipment.cancelShipment.message.split('=')[0] : cancelShipment.cancelShipment.message.split('=')[1]}
                </h6>
                <div className='create_link d-flex'>
                  <button
                    className='create pl-5 pr-5'
                    onClick={cancelShipmentOk}
                  >
                    {t('ok')}
                  </button>
                </div>
              </DialogContent>
            ) : (
              <DialogContent>
                <h6 style={{ color: 'red' }}>
                  {selectedLangCode === 'en' || selectedLangCode === null ? cancelShipment.cancelShipment.message.split('=')[0] : cancelShipment.cancelShipment.message.split('=')[1]}
                  {/* {t('You can not cancel at this stage')} */}
                </h6>
                <div className='create_link d-flex'>
                  <button
                    className='create pl-5 pr-5'
                    onClick={cancelShipmentOk}
                  >
                    {t('ok')}
                  </button>
                </div>
              </DialogContent>
            )
          ) : (
            <DialogContent>
              <Typography>
                <p>{t('Are you sure to cancel the pickup')}</p>
              </Typography>
              <DialogActions>
                <div className='create_link d-flex'>
                  <button className='create pl-5 pr-5' onClick={handleClose}>
                    {t('pickupform.no')}
                  </button>
                  <button
                    className='create pl-5 pr-5'
                    onClick={cancelShipmentFun}
                  >
                    {t('pickupform.yes')}
                  </button>
                </div>
              </DialogActions>
            </DialogContent>
          )}
        </Dialog>
      </div>

      <Dialog
        style={{ borderRadius: '15px' }}
        aria-labelledby='customized-dialog-title'
        open={mesopen}
      >
        <DialogTitle id='customized-dialog-title'>{t('Update Pickup')}</DialogTitle>
        <DialogContent>
          <Typography>
            <div dangerouslySetInnerHTML={{ __html: errors }} />
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default withTranslation()(ShipmentDetailFormPickup)