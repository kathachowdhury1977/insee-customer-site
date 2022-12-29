import React, { useEffect } from "react";
import { orderActions } from "../../../../_actions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import OrderHeadingSection from "../../../../components/OrderHeadingSection/OrderHeadingSection";
import CheckoutItem from "../../../../components/CheckoutItems/CheckoutItem";
import "./PlaceOrder.scss";
import ItemImag from "../../../../assets/img/insee.jfif";
import AccordianShipping from "../../../../components/Accordian/AccordianShipping";
import AccordianPlaceOrder from "../../../../components/Accordian/AccordianPlaceOrder";
import CreateOrderPopup from "../../../../components/ModalPopup/CreateOrderPopup";
import VerticalStepper from "../../../../components/VerticalStepper/VerticalStepper";
import PlaceOrderStepper from "../../../../components/PlaceOrderStepper/PlaceOrderStepper";

function CheckoutProcess(props) {
  const cartdata = useSelector((state) => state.cartdata);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let userName = localStorage.getItem("userData");
  userName = JSON.parse(userName);
  let shipToIdCode = localStorage.getItem("SHIPTOCODE");
  var customerNo = localStorage.getItem("CustomerNumber");
  const MyNewClass = useSelector(
    (state) => state.addclasswithstyle.addclasswithstyle
  );

  useEffect(() => {
    //dispatch(orderActions.getCartData(customerNo));
    //  dispatch(orderActions.getShipToDetails(userName.soldTo[0]));
    dispatch(orderActions.getShipToDetails(shipToIdCode));
  }, []);

  return (
    <>
      <div className="content-wrapper">
        <Header title={t("checkoutprocess.label")} />

        <div className={"row ipad_css " + MyNewClass}>
          <div className="mainScroll ml-4">
            <OrderHeadingSection title={t("checkoutprocess.label")} />
            {/* <VerticalStepper /> */}
            <PlaceOrderStepper />
            {/* <div className="checkout_process">
              <div className="checkout">

                <div className="col-12">
                  <div className="row">
                    {cartdata.cartdata
                      ? cartdata.cartdata.map((carditem, index) => {
                        return (
                          <CheckoutItem
                            class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12"
                            image={ItemImag}
                            title={carditem.productName ? carditem.productName : "NA"}
                            itemId={carditem.productId}
                            quantity={carditem.quantity}
                            inWeight={carditem.unitOfMeasure}
                          />
                        );
                      })
                      : null}
                  </div>
                </div>
                <div className="col-12 pl-0">
                  <button className="create_btn">
                    <CreateOrderPopup modal={t("entershippingdetail.label")} />
                  </button>
                </div>
                <div className="col-12">
                  <AccordianShipping title={t("shipping.label")} />
                  <AccordianPlaceOrder title={t("placeorder.label")} />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(CheckoutProcess);
