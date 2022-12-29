import React, { useEffect, useState } from 'react'
import { withTranslation, useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { orderActions } from '../../_actions'
// import ReadMore from '../ReadMore/ReadMore'
import './Stepper.scss'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import ItemImag from '../../assets/img/insee.jfif'
import ProductImg from '../../../src/assets/img/inseeLogo.png'
import moment from 'moment'
import { API_URL_ORDER } from '../../constant'
import Axios from 'axios'
import { commaFormatter } from '../../_constant'

function CartItemProduct(props) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cartdata = useSelector((state) => state.cartdata)
  const [count, setCount] = useState(props.quantity ? props.quantity : 0)
  const [disable, setDisable] = useState(true)
  let userName = localStorage.getItem('userData')
  let category = localStorage.getItem('CATEGORY')
  userName = JSON.parse(userName)
  const [cardQuantity, setCartQuantity] = useState({});
  // let todayDate = moment().format('YYYY-MM-DD')
  const cartItems = props.item
  const selectedLangCode = localStorage.getItem('lancode');

  const productNameEng = props.title.split(':')[1];
  const productNameTh = props.title.split(':')[0];
  var customerNo = localStorage.getItem('CustomerNumber')
  const contractNo = props?.item?.contractId

  const editQuantity = (index) => {
    setDisable(false)
    localStorage.setItem('QuantityEditFlag', 'YES')
  }

  const saveQuantity = (item, index) => {
    setDisable(true)
    localStorage.setItem('QuantitySaveFlag', 'YES')
    localStorage.setItem('QuantityEditFlag', 'NO')
    localStorage.setItem('savequantity', 'YES')
    const savequantity = cartdata.cartdata
      ? cartdata.cartdata.map((element, i) => {
          if (index === i) {
            element.quantity = Number(count)
            return element
          } else {
            return element
          }
        })
      : []

    let data = {
      clearCart: false,
      countryCode: userName.countryCode,
      customerId: localStorage.getItem('CustomerNumber'),
      date: cartItems.date,
      userId: userName.userId,
      productId: cartItems.productId,
      matchedSalesAreaList:
        cartItems.matchedSalesAreaList === null
          ? []
          : cartItems.matchedSalesAreaList,
      quantity: parseFloat(count),
      productImage: cartItems.productImage,
      productName: cartItems.productName,
      unitOfMeasure: cartItems.unitOfMeasure,
      subCategory: localStorage.getItem('SUBCATEGORY'),
      shipToCode: localStorage.getItem('SHIPTOCODE'),
      plantId: localStorage.getItem('PLANTCODE'),
      contractId: cartItems.contractId,
    }
    dispatch(orderActions.addToCart(data))
    dispatch(orderActions.getSelectedOrderInCheckout(savequantity))
  }
 
  const removeQuantity = (index) => {
    dispatch(
      orderActions.deleteProductFormCart(localStorage.getItem('CustomerNumber'), index.productId)
    )
    
    setTimeout(async () => {
      dispatch(orderActions.getCartData(customerNo, contractNo))
      toast.success(t('productRemove'), {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }, 1000)
  }

  const handleImg = (e) => {
    e.target.src = ProductImg
  }

  const getEnteredQuantity = (e) => {
    if (category === 'CONWOOD') {
      if (
        e.target.value === null ||
        e.target.value === undefined ||
        e.target.value === ''
      ) {
        setCount('0')
        return
      }
      if (!e.target.validity.badInput) {
        const value = e.target.value.replace(/[^\d]/, '')
        let qty = parseInt(value)
        let result = qty - Math.floor(qty) !== 0
        setCount(qty)
      }
    } else {
      setCount(e.target.value.replace(/(\.\d{3})\d+/g, '$1'))
      let myInput = document.getElementById(e.target.id)
      myInput.addEventListener('keyup', function () {
        myInput.value = myInput.value.replace(/(\.\d{3})\d+/g, '$1')
      })
    }
  }

  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);

  const isQuantityAvailable = (remaingqty, targetqty) => { 
    // console.log("hello", remaingqty, targetqty, count);
    // let remainingQty = !remaingqty ? 0 : remaingqty;
    return parseInt(remaingqty) > parseInt(targetqty);
 }

 const productId = props.itemId;

 let contractNumber = localStorage.getItem('CONTRACTNUMBER');

 async function getcheckoutData() {
  const customerID = localStorage.getItem('CustomerNumber');

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
      "X-SOLD-TO-ID": localStorage.getItem("CustomerNumber"),
    },
  };

  const api = `/cart/remainingQty?ContractNumber=${contractNo}&SoldTonumber=${customerID}`

  return contractNo ? fetch(
    process.env.REACT_APP_API_URL_ORDER + api , requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      const resultData = data.data.Item;
      const dataItem = resultData.find((item) =>{
        return item.MaterialNumber === productId
      })
      setCartQuantity(dataItem)
      // console.log("hello", dataItem)
    })
    .catch((error)=> {
      console.log(error);
    }) : ""
}

// (contractNo) && getcheckoutData()

useEffect(()=>{
  getcheckoutData()
},[contractNo])

  

  // console.log('hello', {contractNo}, props, {contractNumber})

  return (
    <>
      <div className='row cart-item-container mt-2 mb-2'>
        <div className='col-3'>
          <img
            className='card logoImg'
            onError={handleImg}
            src={props.productImage}
            alt=''
            width='50%'
          />{' '} 
        </div>
        <div className='col-9 mt-2'>
          <div className='row'>
            <div className='col-6'>
              <span className='item-heading' style={{fontSize: `${FontChange}px`}}>{selectedLangCode === 'en' || selectedLangCode === null  ?  productNameEng : productNameTh}</span>
              {
                (contractNo || contractNumber) && (
                  <>
                    <p className='h6'>Remaining Qty: {cardQuantity.RemainingQty? commaFormatter(cardQuantity.RemainingQty, 3) : "0.000"} {props.item?.unitOfMeasure}</p>
                    <p className='h6'>Contract Qty: {cardQuantity.TargetQuantity? commaFormatter(cardQuantity.TargetQuantity, 3) : "0.000"} {props.item?.unitOfMeasure}</p>
                  </>
                )
              }
            </div>
            <div className='col-6 text-right'>
              <span className='item-heading text-red' style={{fontSize: `${FontChange}px`}}>
              {t('Productcode')} {props.itemId.replace(/^0+/, '')}
              </span>
            </div>
            <div className='order_detail_sec'>
                
            </div>
          
            <div className='col-12 mt-2'>
              <input
                placeholder='Qty'
                type='text'
                disabled={disable}
                onkeypress={
                  category === 'CONWOOD'
                    ? 'return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57'
                    : ''
                }
                style={{
                  width: '80px',
                  border: 'none',
                  borderBottom: '1px solid #989898',
                  fontSize: `${FontChange}px`
                }}
                id='qty-input'
                value={count}
                name={'count'}
                onChange={getEnteredQuantity}
              />
              &nbsp;
              <span style={{fontSize: `${FontChange}px`}}>
              {selectedLangCode === 'en' || selectedLangCode === null ?
                props.inWeight :
                  selectedLangCode === 'vt' ? 
                  props.inWeight  === "TON" ? "tấn"  :
                  props.inWeight === "Each" ? "ชิ้น" :
                  props.inWeight:
                  props.inWeight  === "TON" ? "ตัน" :
                  props.inWeight  === "Each" ? "ชิ้น" :
                  props.inWeight
                 }                
               </span>
               {contractNo && count > parseInt(cardQuantity.RemainingQty) && (
                <p className="text-danger mb-0">
                  {selectedLangCode === "en" ? "Remaining Quantity is not enough." : "ยอดคงเหลือไม่เพียงพอ"}
                </p>
              )}
            </div>
            <div className='col-12 pt-4 p-md-0 mt-3'>
              <button
                className='create_btn ml-0'
                onClick={() => editQuantity(props.index)}
                style={{fontSize: `${FontChange}px`,
                backgroundColor: `${
                  (isQuantityAvailable(cardQuantity.RemainingQty, cardQuantity.TargetQuantity) && contractNo) ?
                  "#f5f5f5" : ""
                }`
              }}
                disabled={(contractNo && isQuantityAvailable(cardQuantity.RemainingQty, cardQuantity.TargetQuantity)) ? true : false}
              >
                {t('Edit QTY.')}
              </button>
              &nbsp;&nbsp;
              <button
                className='create_btn ml-0'
                onClick={() => saveQuantity(props.item, props.index)}
                style={{fontSize: `${FontChange}px`,
                  backgroundColor: `${
                    (contractNo && count > parseInt(cardQuantity.RemainingQty)) ?
                    "#f5f5f5" : ""
                  }`
                }}
                disabled={contractNo && count > parseInt(cardQuantity.RemainingQty) ? true : false}
              >
                {t('Save')}
              </button>
              &nbsp;&nbsp;
              <button
                className='create_btn ml-0'
                onClick={() => removeQuantity(props.item)}
                style={{fontSize: `${FontChange}px`}}
              >
                {t('Remove')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default withTranslation()(CartItemProduct)
