import React, { useState, useEffect } from "react";
import { masterActions } from "../../_actions";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";

function ShippingForm(props) {
  const shipToDetails = useSelector((state) => state.getShipToDetails);
  let shippingDone = localStorage.getItem('Shipping-Done');
  let shipCond = localStorage.getItem('shipping-condition');
  let shiptype = localStorage.getItem('shipping-type');
  let specialShipCond = localStorage.getItem('special-shipping-condition');
  let shipremark = localStorage.getItem('remark');
  let ordertypes = localStorage.getItem('order-type');
  let porefnumber = localStorage.getItem('porefnumber');
  // console.log(shippingDone)
  const event = useSelector((state) => state);
  const shippingCondition = useSelector((state) => state.shippingcondition);
  const ordertype = useSelector((state) => state.ordertype);
  const shippingtype = useSelector((state) => state.shippingtype);
  const spclshippingcondition = useSelector((state) => state.spclshippingcondition);
  // console.log(shipCond && shipCond ? 'HELLLLLLOOOOOOO' : "BYEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
  const [shipCondition, setShipConditions] = useState((shippingDone === 'YES') ? shipCond : '');
  const [shipType, setShipTypes] = useState((shippingDone === 'YES') ? shiptype : '');
  const [specialShipCondition, setpecialShipConditions] = useState((shippingDone === 'YES') ? specialShipCond : '');
  const [remark, setRemarks] = useState((shippingDone === 'YES') ? shipremark : '');
  const [poRefNumber, setPoRefNumbers] = useState((shippingDone === 'YES') ? porefnumber : '');
  const [orderType, setOrderTypes] = useState((shippingDone === 'YES') ? ordertypes : '');
  const [disable, setDisable] = useState(true);
  const [disableShippingType, setDisableShippingType] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let countryCode = localStorage.getItem('userData');
  countryCode = JSON.parse(countryCode);



  function handleChange(e) {
    let shipingcond = e.target.value;

    setShipConditions(e.target.value);
    localStorage.setItem('shipping-condition', e.target.value);
    if (shipingcond === "P1") {
      setDisable(true);
      setDisableShippingType(true);
      setpecialShipConditions("");
      setShipTypes("");
      localStorage.setItem('shipping-type', "");
    }
    else if (shipingcond === "P2") {
      setDisable(false);
      setDisableShippingType(true);
      setShipTypes("");
      localStorage.setItem('shipping-type', "");
      dispatch(masterActions.getSpecialShippingCondition(countryCode.countryCode, shipingcond));
    }
    else if (shipingcond === "D1" || shipingcond === "D2") {
      setDisable(true);
      setpecialShipConditions("");
      setDisableShippingType(false);
      dispatch(masterActions.getShippingType(countryCode.countryCode, {
        "customerNumber": countryCode.soldTo[0],
        "matchedSalesArea": [localStorage.getItem('matchedSalesArea')],
        "productCategory": localStorage.getItem('CATEGORY'),
        "shipToCode": localStorage.getItem('SHIPTOCODE'),
        "shippingCondition": localStorage.getItem('shipping-condition'),
        "subCategory": localStorage.getItem('SUBCATEGORY')
      }));
    }
    else if (shipingcond === "D3") {
      setDisable(false);
      setDisableShippingType(false);
      dispatch(masterActions.getSpecialShippingCondition(countryCode.countryCode, shipingcond));
      dispatch(masterActions.getShippingType(countryCode.countryCode, {
        "customerNumber": countryCode.soldTo[0],
        "matchedSalesArea": [localStorage.getItem('matchedSalesArea')],
        "productCategory": localStorage.getItem('CATEGORY'),
        "shipToCode": localStorage.getItem('SHIPTOCODE'),
        "shippingCondition": localStorage.getItem('shipping-condition'),
        "subCategory": localStorage.getItem('SUBCATEGORY')
      }));
    }

  }

  function setShipingCondition(e) {
    setpecialShipConditions(e.target.value)
    // console.log(specialShipCondition);
    localStorage.setItem('special-shipping-condition', e.target.value);
  }

  function setShippingType(e) {
    setShipTypes(e.target.value);
    // console.log(shipType);
    localStorage.setItem('shipping-type', e.target.value);
  }

  function setRemark(e) {
    setRemarks(e.target.value)
    // console.log(remark);
    localStorage.setItem('remark', e.target.value);
  }

  function setPoRefNumber(e) {
    setPoRefNumbers(e.target.value)
    // console.log(poRefNumber);
    localStorage.setItem('porefnumber', e.target.value);
  }

  function setOrderType(e) {
    setOrderTypes(e.target.value);
    // console.log(orderType);
    localStorage.setItem('order-type', e.target.value);
  }

  useEffect(() => {
    dispatch(masterActions.getShippingCondition(countryCode.countryCode));

    dispatch(masterActions.getShippingType(countryCode.countryCode, {
      "customerNumber": countryCode.soldTo[0],
      "matchedSalesArea": [
        "1000_CP_CW"
      ],
      "productCategory": localStorage.getItem('CATEGORY'),
      "shipToCode": localStorage.getItem('SHIPTOCODE'),
      "shippingCondition": localStorage.getItem('shipping-condition'),
      "subCategory": localStorage.getItem('SUBCATEGORY')
    }));

    dispatch(masterActions.getOrderType(countryCode.countryCode, countryCode.soldTo[0], localStorage.getItem('matchedSalesArea')));
  }, []);

  // console.log(shipToDetails && shipToDetails.getShipToDetails, "details")

  return (
    <>
      <div className="myorders-container">
        <div className="mt-0 col-12">
          <div className="row">
            <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12 col-xs-12">
              <div className="form_section">
                <div className="row">
                  <label>{t("shipto.label")}</label>

                  <div className="col-12 mb-3">
                    <div className="yellow-box p-2">
                      <p className="top-text">{shipToDetails && shipToDetails.getShipToDetails.shipToName} |
                        #{shipToDetails && shipToDetails.getShipToDetails.shipToId}</p>
                      <p className="bottom-text">
                        {shipToDetails && shipToDetails.getShipToDetails.address.address}
                      </p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="inputBox">
                      <label>{t("label.shipping_condition")}</label>
                      <select className="input" onChange={handleChange} value={shipCondition} name={"shipCondition"}>
                        <option value="" selected disabled>{"Please Select"}</option>
                        {shippingCondition.shippingcondition
                          ? shippingCondition.shippingcondition.map(
                            (ship_cond, ind) => {
                              return (
                                <option value={ship_cond.key}>
                                  {ship_cond.value}
                                </option>
                              );
                            }
                          )
                          : null}
                      </select>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="inputBox">
                      <label>{t("label.special_shipping_condition")}</label>
                      <select className="input" disabled={disable} value={specialShipCondition} name={"specialShipCondition"} id="special_condition" onChange={setShipingCondition}>
                        <option value="" selected disabled>
                          Please Select
                        </option>
                        {spclshippingcondition.spclshippingcondition
                          ? spclshippingcondition.spclshippingcondition.map(
                            (ship_cond, ind) => {
                              return (
                                <option value={ship_cond.key}>
                                  {ship_cond.value}
                                </option>
                              );
                            }
                          )
                          : null}
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="inputBox">
                      <label>{t("shippingtype.label")}</label>
                      <select className="input" name={"shipType"} disabled={disableShippingType} value={shipType} onChange={setShippingType}>
                        <option value="" selected disabled>
                          Please Select
                        </option>
                        {shippingtype.shippingtype
                          ? shippingtype.shippingtype.Records.map(
                            (ship_type, ind) => {
                              return (
                                <option value={ship_type.ShippingType}>
                                  {ship_type.Description}
                                </option>
                              );
                            }
                          )
                          : null}
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="inputBox">
                      <label>{t("Customer PO Reference No.")}</label>
                      <input className="input" name={"poRefNumber"} value={poRefNumber} placeholder="Enter Customer PO Reference No. here" onChange={setPoRefNumber} />

                    </div>
                  </div>
                  <div className="col-12">
                    <div className="inputBox">
                      <label>{t("remark.label")}</label>
                      <input className="input" name={"remark"} value={remark} placeholder="Enter remarks here" onChange={setRemark} />

                    </div>
                  </div>
                  <div className="col-12">
                    <div className="inputBox">
                      <label>{t("ordertype.label")}</label>
                      <select className="input" name={"orderType"} value={orderType} onChange={setOrderType}>
                        <option value="" selected disabled>
                          Please Select
                        </option>
                        {ordertype.ordertype
                          ? ordertype.ordertype.map(
                            (order, ind) => {
                              return (
                                <option value={order.key}>
                                  {order.value}
                                </option>
                              );
                            }
                          )
                          : null}
                      </select>
                    </div>
                  </div>
                  {/* <div className="col-12">
                    <button className="cancel_btn">{t("back.button")}</button>
                    <button className="create_btn">
                      {t("continue.button")}
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-6"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(ShippingForm);
