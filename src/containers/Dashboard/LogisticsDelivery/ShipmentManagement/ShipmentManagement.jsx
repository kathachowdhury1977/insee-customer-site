import React, { useEffect, useState,useRef } from 'react'
import Pagination from '@material-ui/lab/Pagination'

import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { masterActions, orderActions, eventActions } from '../../../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
///import Loader from "react-loader-spinner";
import Loading from '../../../../components/Loader/Loading'
import { useHistory } from 'react-router-dom'
import Header from '../../../../components/Header/Header'
import { withTranslation, useTranslation } from 'react-i18next'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import './ShipMent.scss'
import ShipmentItem from './ShipmentItem'
import InputSearch from '../../../../components/InputSearch/InputSearch'
import SelectShipment from '../../../../components/SelectShipment/SelectShipment'
import FormControlLabelPlacement from '../../../../components/RadioButtonGroup/RadioButtonGroup'
import ShipMentHeadingSection from '../../../../components/ShipMentHeadingSection/ShipMentHeadingSection'
import { Link } from 'react-router-dom'
import picupIcon from '../../../../assets/img/pickup-icon.png'
import picupSelectIcon from '../../../../assets/img/pickup-truck.png'
import deleveryIcone from '../../../../assets/img/delevery-icon.png'
import deleverySelectIcone from '../../../../assets/img/delevery-select-icon.png'
import { prod } from 'mathjs'

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
}))(MuiDialogActions);

function usePrevious(data){
  const ref = useRef();
  useEffect(()=>{
    ref.current = data
  }, [data])
  return ref.current
}

function ShipmentManagement(props) {
  let userName = localStorage.getItem('userData')
  let history = useHistory()
  const event = useSelector((state) => state)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const prevFilterarray = useRef();
  userName = JSON.parse(userName)
  console.log('userName', userName)
  const soldToNumber = localStorage.getItem('CustomerNumber')
    ? localStorage.getItem('CustomerNumber')
    : '0110000039';
  let countryCode=userName?userName.countryCode:'TH';  
  const productCategory = useSelector(
    (state) => state.getProductCatForShipment.getProductCatForShipment
  )
  const productSubCategoryValue  = useSelector((state) => state.getShipCatValue.getShipCatValue)
  console.log(productSubCategoryValue, 'productSubCategoryValue111111')
  const defaultValueproductCategory = 'Bag CMT %26 Mortar'
  const productCategoryValue =
    productCategory === undefined
      ? defaultValueproductCategory
      : productCategory
  const plantIdShipmentValue = useSelector(
    (state) => state.getPlantIdForShipment.getPlantIdForShipment
  )
  const plantIdShipment =
    plantIdShipmentValue === undefined ? '' : plantIdShipmentValue
  const productIdShipmentValue = useSelector(
    (state) => state.getProductForShipment.getProductForShipment
  )
  const productIdShipment =
    productIdShipmentValue === undefined ? '' : productIdShipmentValue
  const shipToShipmentValue = useSelector(
    (state) => state.getShipToForShipment.getShipToForShipment
  )
  const productShipToId =
    shipToShipmentValue === undefined ? '' : shipToShipmentValue;
  const [shipingCondition, setShipingCondition] = useState(0)
  const [page, setPage] = React.useState(1)
  const [shipToId, setShipToId] = useState('')
  const [selectPlant, setSelectPlant] = useState('')
  const [category, setCategory] = useState('Bag CMT %26 Mortar')
  const [erropen, setErropen] = useState(false)
  const [error, setError] = useState('');
  const [inputSearchVal, setInputSearch] = useState('');
  const [selectProduct,setSelectproductId]=useState([]);
  const [province, setProvince] = useState('')
  const [filterarray,setFilterarray]=useState({
    deliveryType: '',
    fromIndex:1,
    orderId: '',
    plantId: '',
    productCategory:'Bag CMT %26 Mortar',
    productCode: '',
    shipingCondition: "PickUp",
    shipTo: userName.countryCode === "VN" ? '' : localStorage.getItem('CustomerNumber'),
    shipType: '',
    toIndex: 150
});
  const handleClose = () => {
    setErropen(false)
  }
  console.log(shipToId, 'shipToId--')
  const previlterarrayData = usePrevious(filterarray);
  useEffect(()=>{
       let filterData = [{orderId:filterarray['orderId']},{productCategory: filterarray['productCategory']},{shippingCondition:filterarray['shipingCondition']}];
       let filterDataProduct = [{orderId:filterarray['orderId']},{productCategory: filterarray['productCategory']},{shippingCondition:filterarray['shipingCondition']}
      , {toIndex:filterarray['toIndex']}, {fromIndex:filterarray['fromIndex']}];
      userName.countryCode === "VN" ? 
      dispatch(
        masterActions.plantbyCountryForVN(
          userName.soldTo[0],
          filterarray.shipTo
          
        )
      )
      :
       dispatch(
        masterActions.plantbyCountry(
          userName.countryCode,
          ''
        )
      )
      //  dispatch(masterActions.plantNameForShipment(soldToNumber))
       dispatch(masterActions.shipToForShipment(soldToNumber, filterData))
       dispatch(masterActions.productForShipment(soldToNumber,filterDataProduct));
       dispatch(masterActions.getShippingTypeMyOrder(countryCode))
       dispatch(
          eventActions.ShipmentManagment(
            soldToNumber,
            filterarray
          )
        );
  },[]);

  useEffect(() => {
    ///console.log('filterarrayfilterarray',filterarray);
    if (JSON.stringify(filterarray) !== JSON.stringify(prevFilterarray.current)) {
      prevFilterarray.current = filterarray;
      let filterData = [{orderId:filterarray['orderId']},{productCategory: filterarray['productCategory']},{shippingCondition:filterarray['shipingCondition']}];
      let filterDataProduct = [{orderId:filterarray['orderId']},{productCategory: filterarray['productCategory']},{shippingCondition:filterarray['shipingCondition']}
      , {toIndex:filterarray['toIndex']}, {fromIndex:filterarray['fromIndex']}];
      dispatch(masterActions.productForShipment(soldToNumber,filterDataProduct));
      dispatch(masterActions.shipToForShipment(soldToNumber, filterData));
      dispatch(
         eventActions.ShipmentManagment(
           soldToNumber,
           filterarray
         )
       );
       ///console.log('working');
    } else {
      
    }
  }, [filterarray['shipingCondition'], filterarray['productCategory']]);

  const serchOrderHandle = () => {
    if (JSON.stringify(filterarray) !== JSON.stringify(prevFilterarray.current)) {
      prevFilterarray.current = filterarray;
      let filterData = [{orderId:filterarray['orderId']},{productCategory: filterarray['productCategory']},{shippingCondition:filterarray['shipingCondition']}];
      let filterDataProduct = [{orderId:filterarray['orderId']},{productCategory: filterarray['productCategory']},{shippingCondition:filterarray['shipingCondition']}
      , {toIndex:filterarray['toIndex']}, {fromIndex:filterarray['fromIndex']}];
      dispatch(masterActions.productForShipment(soldToNumber,filterDataProduct));
      dispatch(masterActions.shipToForShipment(soldToNumber, filterData));
      dispatch(
         eventActions.ShipmentManagment(
           soldToNumber,
           filterarray
         )
       );
       ///console.log('working');
    } else {
      
    }
  }

  const inputSearch = (val) => {
    setFilterarray({ ...filterarray, ["orderId"]: val});
  }

  console.log(event.shipmentmanagment.shipmentmanagment, 'jhbjhvcjsahxvb788')
  const handleshipingCondition = (k) => {
   
    dispatch(masterActions.getProvince(countryCode));
    dispatch(masterActions.getDistrict(countryCode,''));
   
    setShipingCondition(k);
    const shipingConditionValue = k === 0 ? 'PickUp' : 'Delivery'
    let shipToNumber=k === 0 ?soldToNumber:'';
    if(userName.countryCode === "VN") {
      setFilterarray({ ...filterarray, ["shipingCondition"]: shipingConditionValue, ["shipTo"]: shipToNumber, ["shipType"]: 'M4'},)
    }
    else {
      if(shipingConditionValue === 'PickUp'){
        setFilterarray({ ...filterarray, ["shipingCondition"]: shipingConditionValue, ["shipTo"]: shipToNumber, ["shipType"]: '', ["deliveryType"]: ''},) 
      }
      else {
        setFilterarray({ ...filterarray, ["shipingCondition"]: shipingConditionValue, ["shipTo"]: shipToNumber, ["shipType"]: 'S1'},) 
      }
      
    }  
   
    setShipToId(k===0?soldToNumber:'');
    ///console.log('shipingConditionValue',document.getElementById("shipType"));
    ///console.log('shipToNumbershipToNumber',shipToNumber);
    ///setFilterarray({ ...filterarray, ["shipTo"]:shipToNumber});
  }
  let startIndex =
    event.shipmentmanagment.shipmentmanagment &&
    event.shipmentmanagment.shipmentmanagment.startIndex
  let endIndex =
    event.shipmentmanagment.shipmentmanagment &&
    event.shipmentmanagment.shipmentmanagment.endIndex
  const handleChangePage = (event, value) => {
    ///console.log('pagevaluevalue',value);
    if (value === 1) {
      startIndex = 1
      endIndex = 100
    } else {
      startIndex = (value - 1) * 100 + 1
      endIndex = value * 100
    }
    ///console.log(startIndex+'===========startIndex'+startIndex);
    setPage(value)
    ///setFilterarray({fromIndex:startIndex,toIndex:endIndex});
    setFilterarray({ ...filterarray,["fromIndex"]:startIndex,["toIndex"]:endIndex});
  }
  const createPickup = () => {
    const productId = []
    const shipMentId = []
    let selectedShipMent = document.querySelector(
      '.react-tabs__tab-panel--selected'
    )
    var checkBoxesSelected = selectedShipMent.querySelectorAll(
      'input[type="checkbox"]:checked'
    )
    if (filterarray['plantId'] == '') {
      setError('Please Select Plant Name')
      setErropen(true)
    }else {
      if (checkBoxesSelected && checkBoxesSelected.length > 0) {
        for (let i = 0; i < checkBoxesSelected.length; i++) {
          productId.push(checkBoxesSelected[i].getAttribute('product-id'))
          shipMentId.push(checkBoxesSelected[i].getAttribute('shipment-id'))
        }
        var unShipMentId = [...new Set(shipMentId)].filter(function (el) {
          return el != null
        })
        let selectProd =
          event.shipmentmanagment.shipmentmanagment &&
          event.shipmentmanagment.shipmentmanagment.results.filter((prod) => {
            if (unShipMentId.indexOf(prod.id) != -1) {
              return prod
            }
          })

        history.push('/createPickup', {
          productData: selectProd,
          productIds: productId,
          shipToId: filterarray['shipTo'],
          unShipMentId:unShipMentId,
          ShippingType:filterarray['shipType']
        })
        ///console.log('shipMentId',selectProd,'===unShipMentId',productId);
      } else {
        setError('Please select a product')
        setErropen(true)
      }
    }
  }
  const createDelivery = () => { debugger
    const productId = []
    const shipMentId = []
    const selectedProductCode = []
    let selectedShipMent = document.querySelector(
      '.react-tabs__tab-panel--selected'
    )
    var checkBoxesSelected = selectedShipMent.querySelectorAll(
      'input[type="checkbox"]:checked'
    )
    if (filterarray['plantId'] == '') {
      setError('Please Select Plant Name')
      setErropen(true)
    }else if (shipToId == '') {
      setError('Please select Ship To')
      setErropen(true)
    } 
    else if (userName.countryCode === "VN" && filterarray['shipType'] == '') {
      setError('Please select Shipping Type')
      setErropen(true)
    } 
    
    else {
      if (checkBoxesSelected && checkBoxesSelected.length > 0) {
        for (let i = 0; i < checkBoxesSelected.length; i++) {
          productId.push(checkBoxesSelected[i].getAttribute('product-id'))
          shipMentId.push(checkBoxesSelected[i].getAttribute('shipment-id'))
        }
        var unShipMentId = [...new Set(shipMentId)].filter(function (el) {
          return el != null
        })
        let selectProd =
          event.shipmentmanagment.shipmentmanagment &&
          event.shipmentmanagment.shipmentmanagment.results.filter((prod) => {
            if (unShipMentId.indexOf(prod.id) != -1) {
              return prod
            }
          })


          let selectProdCode =
          selectProd &&
          selectProd.map((item) => {
            var selectedProdCode = item.items
            var k = 0;
            for (k; k < selectedProdCode.length; k++) { 
              selectedProductCode.push(selectedProdCode[k].MaterialNumber)
            }
            
          })
      
    
        history.push('/CreateDelivery', {
          selectedProductsCode: selectedProductCode,
          productData: selectProd,
          productIds: productId,
          shipToId: userName.countryCode === "VN" ? filterarray.shipTo[0] : filterarray['shipTo'],
          unShipMentId:unShipMentId,
          ShippingType:filterarray['shipType']
        })
      } else {
        setError('Please select a product')
        setErropen(true)
      }
    }
  }
  ////console.log('selectProductselectProduct',selectProduct);

  
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);


  return (
    <>
      <div className='content-wrapper'>
        <Header title={t('shipmanagement.heading')} />
        <div className={"row ipad_css "  + MyNewClass}>
          <div className='mainScroll'>
            <div className='Shipment_managment'>
              <ShipMentHeadingSection title={t('shipmanagement.heading')} />
            
              <div className='col-12'>
                <Tabs
                  activeKey={shipingCondition}
                  onSelect={(k) => handleshipingCondition(k)}
                >
                  <TabList>
                    <Tab eventKey='PickUp' style={{fontSize: `${HeadingFontChange}px`}}>
                      <img
                        className=''
                        src={
                          shipingCondition == 0 ? picupIcon : picupSelectIcon
                        }
                      />{' '}
                      {t('shipmanagement.pickuptab')}
                    </Tab>
                    <Tab eventKey='Delivery' style={{fontSize: `${HeadingFontChange}px`}}>
                      {t('shipmanagement.deliverytab')}{' '}
                      <img
                        className=''
                        src={
                          shipingCondition == 0
                            ? deleveryIcone
                            : deleverySelectIcone
                        }
                      />
                    </Tab>
                  </TabList>
                
                  <div className='row' style={{paddingRight:"15px",paddingLeft:"15px",paddingBottom:"15px"}}>
                  <div className='col-12 search_with_radio'>
                      <div className="row">
                      <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                      <FormControlLabelPlacement
                      filterarray={filterarray}
                      setFilterarray={setFilterarray}
                      setSelectproductId = {setSelectproductId}
                      selectProduct={selectProduct}
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12'>
                      <InputSearch
                        placeholder={t('Search by PO No.,SO')}
                        onChangeSearch={inputSearch}
                      />
                    </div>
                      </div>
                  </div>  
                  </div>
                  <SelectShipment
                   setProvince={setProvince}
                   province={province}
                    setShipToId={setShipToId}
                    filterarray={filterarray}
                    setFilterarray={setFilterarray}
                    serchOrderHandle={serchOrderHandle}
                  />
                  
                  <TabPanel>
                    <div className="shipMentLsit">
                    {event.shipmentmanagment.loading &&
                    event.shipmentmanagment.loading ? (
                      <div style={{ textAlign: 'center', paddingTop: '180px' }}>
                        <Loading />
                      </div>
                    ) : (
                      <ShipmentItem productSubCategoryValue={productSubCategoryValue} setSelectproductId={setSelectproductId} selectProduct={selectProduct}/>
                    )}
                    </div>
                    <div className='row createShipmentBtn'>
                      <div className='col-12 mb-4'>
                        <button
                          className='create_btn mb-3'
                          onClick={createPickup}
                        >
                          {' '}
                          {t('shipmanagement.createpickup_btn')}
                        </button>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    {event.shipmentmanagment.loading &&
                    event.shipmentmanagment.loading ? (
                      <div style={{ textAlign: 'center', paddingTop: '180px' }}>
                        <Loading />
                      </div>
                    ) : (
                      <ShipmentItem productSubCategoryValue={productSubCategoryValue} setSelectproductId={setSelectproductId} selectProduct={selectProduct}/>
                    )}
                    <div className='row createShipmentBtn'>
                      <div className='col-12 mb-4'>
                        <button
                          className='create_btn mb-3'
                          onClick={createDelivery}
                        >
                          {' '}
                          {t('shipmanagement.createdelivery_btn')}
                        </button>
                      </div>
                      <div className='col-12 mb-4'></div>
                    </div>
                  </TabPanel>
                  {/* <div className='row'>
                    <div className='col-12 mb-4'>
                      <Pagination
                        count={Math.ceil(
                          event.shipmentmanagment.shipmentmanagment &&
                            event.shipmentmanagment.shipmentmanagment
                              .totalCount / 100
                        )}
                        page={page}
                        onChange={handleChangePage}
                      />
                    </div>
                  </div> */}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        style={{ borderRadius: '15px' }}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={erropen}
      >
        <DialogTitle id='customized-dialog-title' onClose={handleClose}>
          &nbsp;
        </DialogTitle>
        <DialogContent>
          <Typography>{t(error)}</Typography>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default withTranslation()(ShipmentManagement)