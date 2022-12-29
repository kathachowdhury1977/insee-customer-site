import React, { useEffect, useState, useRef, useMemo } from 'react'
import { eventActions, masterActions } from '../../../_actions'

import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../components/Header/Header'
import { withTranslation, useTranslation } from 'react-i18next'
import UserProfileCard from '../../../components/UserProfileCard/UserProfileCard'
import FormInput from '../../../components/FormInput/FormInput'
import addMore from '../../../assets/img/plus.png'
import './VehicleManagement.scss'

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

const EditDialogContent = withStyles(() => ({
  root: {
    padding: '25px',
    textAlign: 'center',
    width: '100%',
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

function VehicleManagement() {
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const countryCode = userName ? userName.countryCode : 'TH'
  const inputRefs = useRef([])
  const [createVehicle, setCreateVehicle] = useState({
    capacity: '',
    countryCode: userName.countryCode,
    expireDate: '',
    licenseNumber: '',
    notes: '',
    ownership: '',
    retailerName: '',
    soldToNumber: localStorage.getItem('CustomerNumber'),
    vehicleId: '',
    vehicleStatus: '',
    vehicleType: '',
  })
  const [erropen, setErropen] = useState(false)
  const [editVehicles, setEditVehicles] = useState(false)
  const [vehicleId, setVehicleId] = useState('')
  const [errorLicenseNo, setErrorLicenseNo] = useState('')
  const [editinput, setEditTrue] = useState(false)
  const updateVehicle = useSelector((state) => state.updateVehicle)
  const getOwnership = useSelector((state) => state.getOwnership)
  const getVehicletypes = useSelector((state) => state.getVehicletypes)
  const deleteVehiclesByVehicleId = useSelector(
    (state) => state.deleteVehiclesByVehicleId
  )
  const getVehiclesDetailsById = useSelector(
    (state) => state.getVehiclesDetailsById
  )
  const createVehicleApi = useSelector((state) => state.createVehicle)
  const getVehicles = useSelector((state) => state.getVehicles)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  ///console.log('userName',userName);
  useEffect(() => {
    dispatch(masterActions.getOwnership())
    dispatch(
      masterActions.getVehicles(localStorage.getItem('CustomerNumber'), 'TRUCK')
    )
    dispatch(masterActions.vehicletypes(countryCode))
  }, [])
  
  console.log('userName', userName)
  const handleChange = (e) => {debugger
    var regex = /^[0-9A-Z-]\S*$/
    var regexCaps = /^[A-Za-z-]\S*$/
    ////console.log('event',e.target.name)
    setEditTrue(true)
    if(countryCode && countryCode === 'VN'){
      if(e.target.name === 'licenseNumber') {
        setCreateVehicle({
          ...createVehicle,
          [e.target.name]:
           '',
        })
        if(createVehicle.vehicleType === "TRUCK" || createVehicle.vehicleType === "TRAILER"){
          if(regex.test(e.target.value)){
            var licenseNumber = e.target.value.toUpperCase()
            setErrorLicenseNo("")
              setCreateVehicle({
                ...createVehicle,
                [e.target.name]:
                licenseNumber,
              })
            }
            else {
              setErrorLicenseNo("License No. should be start with number no space")
            }
            
          
        
        }
        else {
          if(createVehicle.vehicleType === "BARGE"){
          if(regexCaps.test(e.target.value)){
            var licenseNumberB = e.target.value.toUpperCase()
            setErrorLicenseNo("")
              setCreateVehicle({
                ...createVehicle,
                [e.target.name]:
                licenseNumberB,
              })
          }
          else {
            setErrorLicenseNo("License No. should be uppercase letters")
          }
          }
        }
       
      }
      else {
        setCreateVehicle({
          ...createVehicle,
          [e.target.name]:
            e.target.name == 'capacity'
              ? e.target.value.replace(/[^0-9\.]/g, '')
              : e.target.value,
        })
      }
    }
    else {
      setCreateVehicle({
        ...createVehicle,
        [e.target.name]:
          e.target.name == 'capacity'
            ? e.target.value.replace(/[^0-9\.]/g, '')
            : e.target.value,
      })
    } 
    
    
 
  }

  console.log(createVehicle, 'createVehicle12345')
  const handleSubmit = (e) => {
    e.preventDefault()
    ///console.log('createTruck',createVehicle);
    dispatch(masterActions.createVehicle(createVehicle))
    ///console.log('getCustomerBySoldTo',curentValue);
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
  const editVehiclesFun = async (vehicleId) => {
    console.log('vehicleId', vehicleId)
    setVehicleId(vehicleId)
    setEditVehicles(true)
    setErropen(true)
    dispatch(masterActions.getVehiclesDetailsById(vehicleId))
  }
  const deleteVehicles = (vehicleId) => {
    setEditVehicles(false)
    setVehicleId(vehicleId)
    setErropen(true)
  }
  const handleClose = () => {
    setErropen(false)
  }
  const confirmRemove = () => {
    setErropen(false)
    dispatch(masterActions.deleteVehiclesByVehicleId(vehicleId))
  }

  useEffect(() => {
    if (
      createVehicleApi.createVehicle !== undefined &&
      createVehicleApi.createVehicle.status == 200
    ) {
      dispatch(
        masterActions.getVehicles(
          localStorage.getItem('CustomerNumber'),
          'TRUCK'
        )
      )
      
      document.getElementById('deleteMessage').innerHTML =
        '<div class="alert alert-success"><button type="button" style="opacity: 1;" class="close" data-dismiss="alert" aria-label="Close"><span style="color: #fff" aria-hidden="true">&times;</span></button><strong>Success!</strong> Vehicle add successfully.</div>'
    } else {
      document.getElementById('lincenceErr').innerHTML =
        '' + createVehicleApi && createVehicleApi.createVehicle !== undefined
          ? createVehicleApi.createVehicle.message
          : '' + ''
    }
  }, [createVehicleApi.createVehicle])

  useEffect(() => {
    if (deleteVehiclesByVehicleId.deleteVehiclesById) {
      dispatch(
        masterActions.getVehicles(
          localStorage.getItem('CustomerNumber'),
          'TRUCK'
        )
      )
      document.getElementById('deleteMessage').innerHTML =
        '<div class="alert alert-success"><button type="button" style="opacity: 1;" class="close" data-dismiss="alert" aria-label="Close"><span style="color: #fff" aria-hidden="true">&times;</span></button><strong>Success!</strong> Vehicle delete successful.</div>'
    }
  }, [deleteVehiclesByVehicleId.deleteVehiclesById])
  //handleUpdate
  const handleUpdate = (e) => {
    e.preventDefault()
    const curentValue = inputRefs.current
    const updateVehicleData = {}

    for (let i = 0; i < curentValue.length; i++) {
      ///console.log('namenamename',curentValue[i]);
      if (curentValue[i] != null) {
        updateVehicleData[curentValue[i].name] = curentValue[i].value
        updateVehicleData['soldToNumber'] =
          localStorage.getItem('CustomerNumber')
      }
    }
    dispatch(masterActions.updateVehicle(updateVehicleData, vehicleId))
    console.log('updateVehicleData', updateVehicleData)
  }
  useEffect(() => {
    if (
      updateVehicle.updateVehicle !== undefined &&
      updateVehicle.updateVehicle.status == 200
    ) {
      dispatch(
        masterActions.getVehicles(
          localStorage.getItem('CustomerNumber'),
          'TRUCK'
        )
      )
      document.getElementById('deleteMessage').innerHTML =
        '<div class="alert alert-success"><strong>Success!</strong> Vehicle updated successfully.</div>'
    } else {
      document.getElementById('lincenceErr').innerHTML =
        '' + updateVehicle && updateVehicle.updateVehicle !== undefined
          ? updateVehicle.updateVehicle.message
          : '' + ''
    }
    setErropen(false)
  }, [updateVehicle.updateVehicle])
  console.log('getVehiclesDetailsById', createVehicle)
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)
  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
  return (
    <>
      <div className='content-wrapper vehicle_management_section'>
        <Header title = {t("Vehicle Management")} />
        <div className={"row ipad_css "  + MyNewClass}>
        <div style={{ width: '100%' }} id='deleteMessage'></div>
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <div className='mainScroll'>
              <div class='customer_profile'>
                <div className='main-heading'>
                  <h5 style={{fontSize: `${HeadingFontChange}px`}}>{t('VehicleManagement.heading')}</h5>
                </div>
                <div className='row mt-3'>
                <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                    <div className='form_section'>
                      <div className='inputBox '>
                        <label style={{fontSize: `${FontChange}px`}}>{t('Vehicle Type')}</label>
                        <select
                          required
                          className='input'
                          name='vehicleType'
                          onChange={handleChange}
                          style={{fontSize: `${FontChange}px`}}
                        >
                          <option value='' style={{fontSize: `${FontChange}px`}}>{t('Vehicle Type')}</option>
                          {getVehicletypes &&
                          getVehicletypes.getVehicletypes !== undefined
                            ? getVehicletypes.getVehicletypes.map((data) => {
                                return (
                                  <option value={data.key} style={{fontSize: `${FontChange}px`}}>
                                    {' '}
                                    {capitalize(data.value)}
                                  </option>
                                )
                              })
                            : ''}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                    <div className='form_section'>
                      <div className='inputBox '>
                        <label style={{fontSize: `${FontChange}px`}}>{t('Registered License No.')}</label>
                        <input
                          required
                          type='text'
                          name='licenseNumber'
                          placeholder={t('Registered License No.')}
                          onChange={handleChange}
                          className='input'
                          value={createVehicle['licenseNumber'].toUpperCase()}
                          style={{fontSize: `${FontChange}px`}}
                        />
                         <span id='lincenceErrd' style={{ color: 'red',fontSize: `${FontChange}px` }}>{errorLicenseNo}</span>
                        
                        <span id='lincenceErr' style={{ color: 'red' }}></span>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-4  col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                    <div className='form_section'>
                      <div className='inputBox '>
                        <label style={{fontSize: `${FontChange}px`}}>{t('Vehicle Capacity')}</label>
                        <input
                          required
                          type='text'
                          name='capacity'
                          placeholder={t('Vehicle Capacity')}
                          onChange={handleChange}
                          className='input'
                          value={createVehicle['capacity']}
                          style={{fontSize: `${FontChange}px`}}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                    <div className='form_section'>
                      <div className='inputBox '>
                        <label style={{fontSize: `${FontChange}px`}}>{t('Start Date')}</label>
                        <input
                          required
                          type='date'
                          name='documentDate'
                          placeholder={t('Document Date to')}
                          onChange={handleChange}
                          className='input'
                          value={createVehicle['documentDate']}
                          style={{fontSize: `${FontChange}px`}}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                    <div className='form_section'>
                      <div className='inputBox '>
                        <label style={{fontSize: `${FontChange}px`}}>{t('Expire Date')}</label>
                        <input
                          required
                          type='date'
                          name='expireDate'
                          placeholder={t('Document Date to')}
                          onChange={handleChange}
                          className='input'
                          value={createVehicle['expireDate']}
                          style={{fontSize: `${FontChange}px`}}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                    <div className='form_section'>
                      <div className='inputBox '>
                        <label style={{fontSize: `${FontChange}px`}}>{t('Retailer Name')}</label>
                        <input
                          type='text'
                          name='retailerName'
                          placeholder={t('Retailer Name')}
                          onChange={handleChange}
                          className='input'
                          value={createVehicle['retailerName']}
                          style={{fontSize: `${FontChange}px`}}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className='col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                    <div className='form_section'>
                      <div className='inputBox '>
                        <label style={{fontSize: `${FontChange}px`}}>{t('Ownership')}</label>
                        <select
                          
                          className='input'
                          name='ownership'
                          onChange={handleChange}
                          style={{fontSize: `${FontChange}px`}}
                        >
                          <option value='' style={{fontSize: `${FontChange}px`}}>{t('Vehicle Type')}</option>
                          {getOwnership &&
                          getOwnership.getOwnership !== undefined
                            ? getOwnership.getOwnership.map((data) => {
                                return (
                                  <option value={data.key} style={{fontSize: `${FontChange}px`}}>
                                    {' '}
                                    {capitalize(data.value)}
                                  </option>
                                )
                              })
                            : ''}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-8 col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                    <div className='form_section'>
                      <div className='inputBox '>
                        <label style={{fontSize: `${FontChange}px`}}>{t('Notes')}</label>
                        <textarea
                          style={{ overflow: 'hidden',fontSize: `${FontChange}px` }}
                          className='input'
                          name='notes'
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row' style={{ paddingBottom: '50px' }}>
                  <div className='col-12'>
                    <div className='form_section'>
                      <div className='vm_button_section'>
                        {/*<button type="button" className="add-more-btn"> {t("Add More")}</button>*/}
                        <button type='submit' className='save-btn' style={{fontSize: `${FontChange}px`}}>
                          {t('Save')}{' '}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row mt-10' style={{display: "initial"}}>
                <div className="col-12">
                <div class='table-responsive'>
                  
                  <table class='table'>
                    <thead>
                      <tr>
                        <th style={{fontSize: `${FontChange}px`}}>{t('Registered License No.')}</th>
                        <th style={{fontSize: `${FontChange}px`}}>{t('Vehicle Capacity')}</th>
                        <th style={{fontSize: `${FontChange}px`}}>{t('TYPE')}</th>
                        <th style={{fontSize: `${FontChange}px`}}>{t('Ownership')}</th>
                        <th style={{fontSize: `${FontChange}px`}}>{t('Retailer Name')}</th>
                        <th style={{fontSize: `${FontChange}px`}}>{t('Expire Date')}</th>
                        <th style={{fontSize: `${FontChange}px`}}>{t('Forbidden')}</th>
                        <th style={{fontSize: `${FontChange}px`}}>{t('Note')}</th>
                        <th style={{fontSize: `${FontChange}px`}}>{t('Actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getVehicles && getVehicles.getVehicles !== undefined
                        ? getVehicles.getVehicles.map((data) => {
                            return (
                              <tr>
                                <td style={{fontSize: `${FontChange}px`}}>{data.licenseNumber}</td>
                                <td style={{fontSize: `${FontChange}px`}}>{data.capacity}</td>
                                <td style={{fontSize: `${FontChange}px`}}>{data.vehicleType}</td>
                                <td style={{fontSize: `${FontChange}px`}}>{data.ownership}</td>
                                <td style={{fontSize: `${FontChange}px`}}>{data.retailerName}</td>
                                <td style={{fontSize: `${FontChange}px`}}>{data.expireDate}</td>
                                <td style={{fontSize: `${FontChange}px`}}>{data.documentDate}</td>
                                <td style={{fontSize: `${FontChange}px`}}>{data.notes}</td>
                                <td className='action'>
                                  <i
                                    onClick={() => {
                                      editVehiclesFun(data.vehicleId)
                                    }}
                                    class='fa fa-pencil'
                                    style={{fontSize: `${FontChange}px`}}
                                    aria-hidden='true'
                                  ></i>
                                  <i
                                    onClick={() => {
                                      deleteVehicles(data.vehicleId)
                                    }}
                                    class='fa fa-trash'
                                    style={{fontSize: `${FontChange}px`}}
                                    aria-hidden='true'
                                  ></i>
                                </td>
                              </tr>
                            )
                          })
                        : ''}
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Dialog
        style={{ borderRadius: '15px' }}
        aria-labelledby='customized-dialog-title'
        open={erropen}
      >
        {editVehicles ? (
          <>
            <DialogTitle id='customized-dialog-title' onClose={handleClose}>
              &nbsp;
            </DialogTitle>
            <EditDialogContent>
              {getVehiclesDetailsById &&
              getVehiclesDetailsById.editVehiclesById !== undefined ? (
                <form style={{ width: '100%' }} onSubmit={handleUpdate}>
                  <div className='row mt-3'>
                    <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                      <div className='form_section'>
                        <div className='inputBox '>
                          <label>{t('Registered License No.')}</label>
                          <input
                            disabled='disabled'
                            ref={(ref) => inputRefs.current.push(ref)}
                            required
                            type='text'
                            name='licenseNumber'
                            placeholder={t('Registered License No.')}
                            onChange={handleChange}
                            className='input'
                            defaultValue={
                              getVehiclesDetailsById.editVehiclesById
                                .licenseNumber
                            }
                          />
                          <span
                            id='lincenceErr'
                            style={{ color: 'red' }}
                          ></span>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                      <div className='form_section'>
                        <div className='inputBox '>
                          <label>{t('Vehicle Capacity')}</label>
                          <input
                            ref={(ref) => inputRefs.current.push(ref)}
                            required
                            type='text'
                            name='capacity'
                            placeholder={t('Vehicle Capacity')}
                            onChange={handleChange}
                            className='input'
                            value={
                              editinput
                                ? createVehicle['capacity']
                                : getVehiclesDetailsById.editVehiclesById
                                    .capacity
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                      <div className='form_section'>
                        <div className='inputBox '>
                          <label>{t('Document Date to')}</label>
                          <input
                            ref={(ref) => inputRefs.current.push(ref)}
                            required
                            type='date'
                            name='documentDate'
                            placeholder={t('Document Date to')}
                            onChange={handleChange}
                            className='input'
                            defaultValue={
                              getVehiclesDetailsById.editVehiclesById
                                .documentDate
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                      <div className='form_section'>
                        <div className='inputBox '>
                          <label>{t('Expire Date')}</label>
                          <input
                            ref={(ref) => inputRefs.current.push(ref)}
                            required
                            type='date'
                            name='expireDate'
                            placeholder={t('Document Date to')}
                            onChange={handleChange}
                            className='input'
                            defaultValue={
                              getVehiclesDetailsById.editVehiclesById.expireDate
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                      <div className='form_section'>
                        <div className='inputBox '>
                          <label>{t('Retailer Name')}</label>
                          <input
                            ref={(ref) => inputRefs.current.push(ref)}
                            type='text'
                            name='retailerName'
                            placeholder={t('Retailer Name')}
                            onChange={handleChange}
                            className='input'
                            defaultValue={
                              getVehiclesDetailsById.editVehiclesById
                                .retailerName
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                      <div className='form_section'>
                        <div className='inputBox '>
                          <label>{t('Vehicle Type')}</label>
                          <select
                            ref={(ref) => inputRefs.current.push(ref)}
                            required
                            className='input'
                            name='vehicleType'
                            onChange={handleChange}
                          >
                            <option value=''>Vehicle Type</option>
                            {getVehicletypes &&
                            getVehicletypes.getVehicletypes !== undefined
                              ? getVehicletypes.getVehicletypes.map((data) => {
                                  if (
                                    getVehiclesDetailsById.editVehiclesById
                                      .vehicleType == data.key
                                  ) {
                                    return (
                                      <option selected value={data.key}>
                                        {' '}
                                        {capitalize(data.value)}
                                      </option>
                                    )
                                  } else {
                                    return (
                                      <option value={data.key}>
                                        {' '}
                                        {capitalize(data.value)}
                                      </option>
                                    )
                                  }
                                })
                              : ''}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-4 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                      <div className='form_section'>
                        <div className='inputBox '>
                          <label>{t('Ownership')}</label>
                          <select
                            ref={(ref) => inputRefs.current.push(ref)}
                            className='input'
                            name='ownership'
                            onChange={handleChange}
                          >
                            <option value=''>Vehicle Type</option>
                            {getOwnership &&
                            getOwnership.getOwnership !== undefined
                              ? getOwnership.getOwnership.map((data) => {
                                  if (
                                    getVehiclesDetailsById.editVehiclesById
                                      .ownership == data.key
                                  ) {
                                    return (
                                      <option selected value={data.key}>
                                        {' '}
                                        {capitalize(data.value)}
                                      </option>
                                    )
                                  } else {
                                    return (
                                      <option value={data.key}>
                                        {' '}
                                        {capitalize(data.value)}
                                      </option>
                                    )
                                  }
                                })
                              : ''}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-8 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                      <div className='form_section'>
                        <div className='inputBox '>
                          <label>{t('Notes')}</label>
                          <textarea
                            ref={(ref) => inputRefs.current.push(ref)}
                            style={{ overflow: 'hidden' }}
                            className='input'
                            name='notes'
                            onChange={handleChange}
                          >
                            {getVehiclesDetailsById.editVehiclesById.notes}
                          </textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogActions>
                    <div className='create_link d-flex'>
                      <button
                        type='button'
                        className='create pl-5 pr-5'
                        onClick={handleClose}
                      >
                        {t("cancel.button")}
                      </button>
                      <button type='submit' className='create pl-5 pr-5'>
                        {t("submit")}
                      </button>
                    </div>
                  </DialogActions>
                </form>
              ) : (
                ''
              )}
            </EditDialogContent>
          </>
        ) : (
          <>
            <DialogTitle id='customized-dialog-title' onClose={handleClose}>
              Delete Vechile
            </DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete vechile number
              </Typography>
              <DialogActions>
                <div className='create_link d-flex'>
                  <button className='create pl-5 pr-5' onClick={handleClose}>
                    No
                  </button>
                  <button className='create pl-5 pr-5' onClick={confirmRemove}>
                    Yes
                  </button>
                </div>
              </DialogActions>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  )
}

export default withTranslation()(VehicleManagement)
