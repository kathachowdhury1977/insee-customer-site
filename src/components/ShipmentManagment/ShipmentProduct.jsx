import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import ProductImag from "../../assets/img/insee.jfif";
import "../ShipmentManagment/ShipmentList.scss";


function ShipmentProduct(props) {
  const event = useSelector(state => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  

  console.log(event, "??????????")
  return (
    <>
      <div className="shipment_product">
        <div className="row">
          <div className="col-2">
            <img src={ProductImag} />
          </div>
          <div className="col-5">
            <div className="product">
              <h5 className="pro_name">{props.title}</h5>
              <span className="pro_number"> {props.number}</span>
            </div>
          </div>

          <div className="col-5 text-right prod_qty">
            <div className="qty_sec">
              <div className="qty">
                <span className="qty_value"> {props.value} {props.quantity}</span>
                <span className="qty_key"> {props.qty}</span>
              </div>
              {props.shipno === "shipping" ?

                <div className="qty">
                  <span className="qty_value">{props.shipingno}</span>
                  <span className="qty_key">{props.shipingvalue}</span>
                </div> : null

              }

              {
                props.type === "true" ?
                  <div>
                    <input id={props.chekboxID} class="checkbox-custom" name="checkbox-1" type="checkbox" />
                    <label for={props.selectCheckbox} class="checkbox-custom-label"></label>
                  </div> : null
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(ShipmentProduct);
