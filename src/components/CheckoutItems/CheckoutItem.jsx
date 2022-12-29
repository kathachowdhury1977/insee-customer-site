import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import IncreMent from "../../assets/img/inc.svg";
import DecreMent from "../../assets/img/dec.svg";
import { orderActions } from '../../_actions';
import "./CheckoutItem.scss";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CheckoutItem(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [count, setCount] = useState(props.quantity);
  const cartdata = useSelector((state) => state.cartdata);
  // const [quantity, setQuantity] = useState(props.quantity);

  localStorage.setItem('QUANTITY', props.quantity)
  console.log('HEREFGVVHVG===>>>> ', props.quantity);

 

  const handleIncrement = () => {
    // setCount(prevCount => prevCount + 1);
    const data = cartdata.cartdata
    ? cartdata.cartdata.map((element) => {
      return {
        "clearCart": element.clearCart,
        "contractId": element.contractId,
        "countryCode": element.countryCode,
        "customerId": element.customerId,
        "date": element.date,
        "divison": element.divison,
        "id": element.id,
        "matchedSalesAreaList": element.matchedSalesAreaList,
        "plantId": element.plantId,
        "productId": element.productId,
        "productImage": element.productImage,
        "productName": element.productName,
        "quantity": count,
        "shipToCode": element.shipToCode,
        "status": element.status,
        "subCategory": element.subCategory,
        "unitOfMeasure": element.unitOfMeasure
      };
    })
    : [

    ];
    console.log(data);
    if (count === "") {
      toast.dark('Please Enter Quantity.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    dispatch(orderActions.getSelectedOrderInCheckout(data));
  }

  // useEffect(() => {
  //   const data = cartdata.cartdata
  //     ? cartdata.cartdata.map((element) => {
  //       return {
  //         "clearCart": element.clearCart,
  //         "contractId": element.contractId,
  //         "countryCode": element.countryCode,
  //         "customerId": element.customerId,
  //         "date": element.date,
  //         "divison": element.divison,
  //         "id": element.id,
  //         "matchedSalesAreaList": element.matchedSalesAreaList,
  //         "plantId": element.plantId,
  //         "productId": element.productId,
  //         "productImage": element.productImage,
  //         "productName": element.productName,
  //         "quantity": count,
  //         "shipToCode": element.shipToCode,
  //         "status": element.status,
  //         "subCategory": element.subCategory,
  //         "unitOfMeasure": element.unitOfMeasure
  //       };
  //     })
  //     : [

  //     ];

  //   dispatch(orderActions.getSelectedOrderInCheckout(data));
  // }, [count])

  return (
    <>
      <div className={props.class}>
        <div className="checkout_items mb-3">
          <div className="row">
            <div className="col-4">
              {" "}
              <img className="item_img" src={props.productImage ? props.productImage : props.image} alt="" /> {" "}
            </div>
            <div className="col-8 pl-0">
              <div className="checkout_dtls">
                <i className="fa fa-pencil"></i>
                <h5>{props.title}</h5>
                <span className="item_id">{props.itemId}</span>
                {/* <div className="qty_type">
                  <img src={DecreMent} onClick={handleDecrement} />
                  <span className="count">{count}</span>
                  <img src={IncreMent} onClick={handleIncrement} />
                  <span className="inweight">{props.inWeight ? props.inWeight : 'TON'}</span>
                </div> */}
                <div className="item-qty-section">
                  <input placeholder="Qty" type="text" className="form-input-qty" value={count} name={"count"} onChange={event => setCount(event.target.value)} />
             &nbsp; &nbsp;
             <img src={IncreMent} alt="" onClick={handleIncrement} />
             &nbsp; &nbsp;
              <span className="item_weight">{props.inWeight ? props.inWeight : 'TON'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

     
    </>
  );
}
export default withTranslation()(CheckoutItem);
