import React, { useEffect, useState } from "react";
import { paymentofflineActions } from "../../_actions";
import { useDispatch, useSelector } from "react-redux";
import "react-tabs/style/react-tabs.css";
import PaymentRadioButton from "../RadioButtonGroup/PaymentRadioButton";
import PaymentTable from "../Table/PaymentTable";
import SattledTable from "../Table/SattledTable";
import "./PaymentChildTabs.scss";
import Loading from "../../components/Loader/Loading";
import RefreshIcon from "../../assets/img/refreshIcon.png";
const PaymentChildTabs = (props) => {
  let custmerNo = localStorage.getItem("CustomerNumber");
  const [isPaymentTableDisplayed, setIsPaymentTableDisplayed] = useState(true);
  console.log(custmerNo, "custmerNo---");
  const getpendingpay = useSelector((state) => state.getpendingpay);
  const getSettledPaymentData = useSelector((state) => state.getSettledPayment);
  // const getpendingpaydata = getpendingpay.getpendingpay && getpendingpay.getpendingpay;
  const getSettledPaymentTable =
    getSettledPaymentData.getSettledPayment &&
    getSettledPaymentData.getSettledPayment;
  const selectedTab = props.tab;

  console.log(getSettledPaymentData, "getSettledPaymentData78");
  const pamentTypeCat = useSelector(
    (state) => state.offlinegetPaymentStatus.offlinegetPaymentStatus
  );
  return (
    <div className="row ml-1 mr-1 parent-child-tabs">
      <div className="col-12 p-0">
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-xs-10">
            <PaymentRadioButton
              setIsPaymentTableDisplayed={setIsPaymentTableDisplayed}
              selectedTab={selectedTab}
            />
           
          </div>

          <div className="col-xl-4 col-lg-4 col-md-2 col-sm-2 col-xs-2 text-right">
            <button className="refreshButton" onClick={props.refresPendingData}>
              <img src={RefreshIcon} />
            </button>
          </div>
        </div>
        {isPaymentTableDisplayed ? (
          props.getpendingpaydata != undefined ? (
            <PaymentTable
              handleChangePage={props.handleChangePage}
              page={props.page}
              Pending={props.getpendingpaydata}
              isChecked={props.checkedValue}
              ischeckedSoiValue={props.ischeckedSoiValue}
              handleCheckPayment={props.handleCheck}
              handleCheckAllPayment={props.handleCheckAll}
              sortDocumentDate ={props.sortDocumentDate}
              sortDueDate={props.sortDueDate}
              sortNoOfDueDate={props.sortNoOfDueDate}
            />
          ) : (
            <div className="loading">
              {"Please wait..."}
              <Loading />
            </div>
          )
        ) : getSettledPaymentTable ? (
          <SattledTable
            handleChangePageSattled={props.handleChangePageSattled}
            page={props.page}
            getSettledPaymentTable={getSettledPaymentTable}
          />
        ) : (
          <div className="loading">
            {" "}
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentChildTabs;
