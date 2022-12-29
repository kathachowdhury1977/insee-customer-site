import React, { useEffect } from "react";
import { eventActions } from "../../../../_actions";
import ShipmentList from "../../../../components/ShipmentManagment/ShipmentList";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import "./ShipMent.scss";

function ShipmentItem(props) {
  const event = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const productShipment = props.productShipment;
  return (
    <>
      
        <div className="row mt-2">
                <div className="col-xl-12 col-xl-12 col-md-12 col-sm-12 col-xs-12 p-0">
                <ShipmentList productSubCategoryValue={props.productSubCategoryValue} setSelectproductId={props.setSelectproductId} selectProduct={props.selectProduct}/>
              </div>
        </div>
      
    </>
  );
}

export default withTranslation()(ShipmentItem);