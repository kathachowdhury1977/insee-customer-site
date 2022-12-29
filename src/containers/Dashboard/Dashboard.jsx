import React, { useEffect, useState } from "react";
import { eventActions, orderActions, masterActions } from "../../_actions";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import "./Dashboard.scss";
import dashboardBanner from "../../assets/img/dashboard-banner-image.png";
import placeOrderImage from "../../assets/img/place-order.png";
import createShipmentImage from "../../assets/img/create-shipment.png";
import trackShipmentImage from "../../assets/img/track-shipment.png";
import performanceImage from "../../assets/img/performance.png";
import financesImage from "../../assets/img/finances.png";
import loyaltyPointsImage from "../../assets/img/loyalty-points.png";
import userlogo from "../../assets/img/men.jpg";
import walletIcon from "../../assets/img/wallet.svg";
import { Avatar } from "@material-ui/core";
import DashboardChart from "../../components/DashboardChart/DashboardChart";
import { useHistory } from "react-router";
import Slider from "./slider";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Loading from "../../components/Loader/Loading";
import RadioButtonSoldToGroup from "../../components/RadioButtonGroup/RedioButtonGroupSoldTo";
import DbdLogo from "../../components/Footer/Footer";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  back_button: {
    backgroundColor: "#000 !important",
    color: "#fff !important",
    marginRight: "8px !important",
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(() => ({
  root: {
    padding: "25px",
    textAlign: "center",
    width: "417px",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    // margin: 0,
    padding: theme.spacing(1),
    textAlign: "center",
    marginTop: "20px",
    display: "block",
  },
}))(MuiDialogActions);

function Dashboad() {
  let userName = localStorage.getItem("userData");
  userName = JSON.parse(userName);
  const loginData = userName;
  const countryCode = userName ? userName.countryCode : "";
  const CustomerSoldToNo =
    (userName && userName.soldTo && userName.soldTo[0]) || 0;
  const THAI_COUNTRY_CODE = "TH";
  console.log(loginData, "userName---");

  const getShipmentDetails = useSelector(
    (state) => state.getShipmentDetailsByInseePlusId
  );
  const selectedLangCode = localStorage.getItem("lancode");
  const shipmentFilterList = useSelector(
    (state) => state.shipmentStatusFilterList
  );
  const getCustomerBySoldTo = useSelector((state) => state.getCustomerBySoldTo);
  const isloggedin = useSelector((state) => state.isLoggedIn.isLoggedIn);
  const deliveryOrderStatus = useSelector((state) => state.deliveryOrderStatus);
  const getSoldTosForDivision = useSelector(
    (state) => state.getSoldTosForDivision.getSoldTosForDivision
  );
  const getDivisionForCustomerData = useSelector(
    (state) => state.getDivisionForCustomer.getDivisionForCustomer
  );
  const MyNewClass = useSelector(
    (state) => state.addclasswithstyle.addclasswithstyle
  );

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectSoldToNo, setSelectSoldToNo] = useState(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  let history = useHistory();
  var customerNumber = localStorage.getItem("CustomerNumber");

  const FontChange = useSelector(
    (state) => state.fontsizechanger.fontsizechanger
  );
  const HeadingFontChange = useSelector(
    (state) => state.headerfontchanger.headerfontchanger
  );

  useEffect(() => {
    setTimeout(() => {
      i18n.changeLanguage(localStorage.getItem("lancode"));
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    dispatch(
      masterActions.deliveryOrderStatus(
        localStorage.getItem("CustomerNumber"),
        countryCode
      )
    );
    dispatch(masterActions.getCustomerBySoldTo(customerNumber));
    dispatch(
      masterActions.getAllDashBoardImages(countryCode, "CUSTOMER", "WEB")
    );
    dispatch(masterActions.shipmentStatusFilterList(countryCode));
  }, [customerNumber]);

  console.log(
    getCustomerBySoldTo && getCustomerBySoldTo,
    "getCustomerBySoldTo"
  );
  useEffect(() => {
    if (deliveryOrderStatus.deliveryOrderStatus !== undefined) {
      let inseePlusUID =
        deliveryOrderStatus.deliveryOrderStatus.length > 0
          ? deliveryOrderStatus.deliveryOrderStatus[0].inseePlusUID
          : 0;
      dispatch(eventActions.shipmentDetails(countryCode, inseePlusUID));
    }
    ///dispatch(eventActions.shipmentDetails(countryCode,inseeplusUID));
  }, [deliveryOrderStatus.deliveryOrderStatus]);

  localStorage.removeItem("PLANTC ODE");
  localStorage.removeItem("CATEGORY");
  localStorage.removeItem("SUBCATEGORY");
  localStorage.removeItem("SHIPTOCODE");
  localStorage.removeItem("CONTRACTNUMBER");
  localStorage.removeItem("Shipping-Done");
  localStorage.removeItem("QuantityEditFlag");
  localStorage.removeItem("QuantitySaveFlag");
  localStorage.removeItem("total-qty");
  localStorage.removeItem("matchedSalesArea");
  localStorage.removeItem("PLACE-ORDER-FILTER-CHANGED");
  localStorage.removeItem("ORDER-ADDED");

  const navigateToPlace = (navTo) => {
    history.push(navTo);
  };

  const boxClass = {
    cursor: "pointer",
  };
  var dateOptions = { year: "numeric", month: "long", day: "numeric" };
  useEffect(() => {
    if (
      userName &&
      ((userName.roles != null && countryCode == "VN") || countryCode == "LK")
    ) {
      if (userName.roles === "Owner" || userName.roles === "Staff") {
        if (localStorage.getItem("isSelectedSoldToNo")) {
          setOpen(false);
        } else {
          setOpen(true);
        }
      } else {
        setOpen(false);
        localStorage.setItem(
          "CustomerNumber",
          userName ? userName.soldTo[0] : 0
        );

        localStorage.setItem(
          "CustomerName",
          getCustomerBySoldTo && getCustomerBySoldTo
            ? getCustomerBySoldTo.customerDetailById &&
                getCustomerBySoldTo.customerDetailById.accountName
            : 0
        );
        localStorage.setItem(
          "CustomerNameTh",
          getCustomerBySoldTo && getCustomerBySoldTo
            ? getCustomerBySoldTo.customerDetailById &&
                getCustomerBySoldTo.customerDetailById.accountNameLocal
            : 0
        );
      }
    } else {
      setOpen(false);
      localStorage.setItem(
        "CustomerNumber",
        (userName && userName.soldTo && userName.soldTo[0]) || 0
      );

      localStorage.setItem(
        "CustomerName",
        getCustomerBySoldTo && getCustomerBySoldTo
          ? getCustomerBySoldTo.customerDetailById &&
              getCustomerBySoldTo.customerDetailById.accountName
          : 0
      );
      localStorage.setItem(
        "CustomerNameTh",
        getCustomerBySoldTo && getCustomerBySoldTo
          ? getCustomerBySoldTo.customerDetailById &&
              getCustomerBySoldTo.customerDetailById.accountNameLocal
          : 0
      );
    }
  }, [userName]);

  const changeShipTo = (e) => {
    debugger;
    ///console.log('targetValue',e.target.value);
    localStorage.setItem("CustomerNumber", e.target.value);
    localStorage.setItem("isSelectedSoldToNo", e.target.value);
    setSelectSoldToNo(e.target.value);

    return;
  };

  console.log(open, "open----");
  let searchStatus =
    deliveryOrderStatus && deliveryOrderStatus.deliveryOrderStatus !== undefined
      ? deliveryOrderStatus.deliveryOrderStatus
      : [];
  //console.log('getShipmentStatus====',getShipmentStatus);
  console.log(searchStatus, "shipmentFilterList", shipmentFilterList);
  let filanlData =
    (shipmentFilterList && shipmentFilterList.shipmentFilter !== undefined) ||
    null
      ? shipmentFilterList.shipmentFilter.filter((data) => {
          if (
            data.key != "All" &&
            data.key != "In progress" &&
            data.key != "Cancel"
          ) {
            let filterVal = data.key == "Checked In" ? "Check In" : data.key;
            let shipStatue = searchStatus.find(
              (status) => status.shipmentStatus == filterVal
            );
            data["shipmentStatus"] =
              shipStatue !== undefined || null ? shipStatue.shipmentStatus : "";
            data["shipmentLastUpdatedTime"] =
              shipStatue !== undefined || null
                ? shipStatue.shipmentLastUpdatedTime
                : "";
            return data;
          }
        })
      : [];

  function formatDate(date) {
    var day = date.getDate() + "";
    var month = date.getMonth() + 1 + "";
    var year = date.getFullYear() + "";
    var hour = date.getHours() + "";
    var minutes = date.getMinutes() + "";
    var seconds = date.getSeconds() + "";
    return (
      (day <= 9 ? "0" + day : day) +
      "-" +
      (month <= 9 ? "0" + month : month) +
      "-" +
      year +
      " " +
      (hour <= 9 ? "0" + hour : hour) +
      ":" +
      (minutes <= 9 ? "0" + minutes : minutes)
    );
  }

  const userRole = JSON.parse(localStorage.userData).userRole;

  const handleChangeCat = (event) => {
    console.log(event.target.value, "soldtoNo");
    var selectedCat = event.target.value;
    dispatch(
      eventActions.getSoldTosForDivision(
        selectedCat,
        loginData.userId,
        loginData ? loginData.soldTo[0] : 0
      )
    );
    // dispatch(
    //     paymentofflineActions.getCatForFilter(event.target.value)
    //   );
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(countryCode, "countryCode");

  const SmallFontChanger = useSelector(
    (state) => state.smallfontchanger.smallfontchanger
  );

  return (
    <>
      <div className="content-wrapper">
        {isLoading ? (
          <div className="firstLoading">
            <div className="progressLoding">
              <Loading />
            </div>
          </div>
        ) : (
          ""
        )}

        <Header title={t("Home")} />
        {userRole === "Retailer" ? null : (
          <div className={"row ipad_css " + MyNewClass}>
            <div className="mainScroll dashBordMain">
              <div className="col-12 pl-0">
                <div className="dashboard-container mt-3">
                  <div className="row">
                    {getCustomerBySoldTo &&
                      getCustomerBySoldTo.customerDetailById ? (
                      <div className="col-sm-12 col-md-12 col-lg-12">
                        <p
                          className="dash-heading-text"
                          style={{ fontSize: `${HeadingFontChange}px` }}
                        >
                          {countryCode && countryCode === "VN"
                            ? selectedLangCode === "en" ||
                              selectedLangCode === null
                              ? getCustomerBySoldTo.customerDetailById
                                  .accountName
                              : getCustomerBySoldTo.customerDetailById
                                  .accountName
                            : selectedLangCode === "en" ||
                              selectedLangCode === null
                            ? getCustomerBySoldTo.customerDetailById.accountName
                            : getCustomerBySoldTo.customerDetailById
                                .accountNameLocal}
                        </p>

                        {/* <p className='dash-small-heading'>
                      {t('label.last_login_on')} 22 Dec 2020 18.16 PM
                    </p> */}
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <Slider />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <div className="card">
                        <p
                          className="shipment-status-heading"
                          style={{ fontSize: `${FontChange}px` }}
                        >
                          {t("label.last_shipment_status")}
                        </p>
                        {getShipmentDetails &&
                        getShipmentDetails.getShipmentDetailsByInseePlusId !==
                          undefined ? (
                          <p
                            className="shipment-status-message"
                            style={{ fontSize: `${SmallFontChanger}px` }}
                          >
                            {t("label.your_last_shipment")}{" "}
                            {
                              getShipmentDetails.getShipmentDetailsByInseePlusId
                                .shipmentNumber
                            }{" "}
                            {t("label.with_order_number")}
                            {getShipmentDetails.getShipmentDetailsByInseePlusId
                              .doNumbers !== undefined
                              ? getShipmentDetails.getShipmentDetailsByInseePlusId.doNumbers.map(
                                  (doNum, index) => {
                                    if (
                                      index ==
                                      getShipmentDetails
                                        .getShipmentDetailsByInseePlusId
                                        .doNumbers.length
                                    ) {
                                      return (
                                        <span
                                          style={{
                                            marginLeft: "0.5%",
                                            marginRight: "0.5%",
                                          }}
                                        >
                                          {doNum}
                                        </span>
                                      );
                                    }
                                  }
                                )
                              : ""}
                            {t("label.is_on_the_way")}{" "}
                            {/*new Date(getShipmentDetails.getShipmentDetailsByInseePlusId.expectedDeliveryDateAndTime).toLocaleTimeString("en-US",dateOptions)*/}
                          </p>
                        ) : (
                          ""
                        )}
                        <div className="row">
                          <div className="col-sm-12 col-md-12 col-lg-12">
                            <ul class="timeline">
                              {filanlData && filanlData !== undefined
                                ? filanlData.map((data) => {
                                    if (data.key !== "Delivered") {
                                      return (
                                        <li
                                          class={
                                            data.key == data.shipmentStatus
                                              ? "complete progress-status"
                                              : "progress-status"
                                          }
                                        >
                                          <div class="timestamp">
                                            <span
                                              class="author"
                                              style={{
                                                fontSize: `${FontChange}px`,
                                              }}
                                            >
                                              {t(data.key)}
                                            </span>
                                          </div>
                                          <div class="status">
                                            <div class="status-first">
                                              <span
                                                style={{
                                                  fontSize: `${FontChange}px`,
                                                }}
                                              >
                                                {data.shipmentLastUpdatedTime !==
                                                  "" &&
                                                data.shipmentLastUpdatedTime !==
                                                  null
                                                  ? formatDate(
                                                      new Date(
                                                        data.shipmentLastUpdatedTime
                                                      )
                                                    )
                                                  : ""}
                                              </span>
                                            </div>
                                          </div>
                                        </li>
                                      );
                                    }
                                  })
                                : ""}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 mb-3">
                    <div className="col-xl-4 col-lg-lg-4 col-md-6 col-sm-12 mb-3">
                      <div
                        className="Rectangle-2221"
                        onClick={() => navigateToPlace("/PlaceOrder")}
                        style={boxClass}
                      >
                        <img alt="Place Order" src={createShipmentImage} />
                        <p
                          className="first-text"
                          style={{ fontSize: `${FontChange}px` }}
                        >
                          {t("Place Order")}
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-lg-4 col-md-6 col-sm-12 mb-3">
                      <div
                        className="Rectangle-2221"
                        onClick={() => navigateToPlace("/ShipmentManagement")}
                        style={boxClass}
                      >
                        <img alt="Place Order" src={createShipmentImage} />
                        <p
                          className="second-text"
                          style={{ fontSize: `${FontChange}px` }}
                        >
                          {t("Create Shipments")}
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-lg-4 col-md-6 col-sm-12 mb-3">
                      <div
                        onClick={() => navigateToPlace("/VehicleManagement")}
                        className="Rectangle-2221"
                        style={boxClass}
                      >
                        <img
                          alt="Vehicle Management"
                          src={trackShipmentImage}
                        />
                        <p
                          className="third-text"
                          style={{ fontSize: `${FontChange}px` }}
                        >
                          {t("Vehicle Management")}
                        </p>
                      </div>
                    </div>

                    {/* <div className='col-sm-4 col-md-4 col-lg-4 mb-3'>
                  <div className='Rectangle-107'>
                    <img
                      className='performanceImg'
                      alt='Performance'
                      src={performanceImage}
                    />
                    <p className='fourth-text'>{t('Performance')}</p>
                  </div>
                </div> */}
                    {/* <div className='col-sm-4 col-md-4 col-lg-4 mb-3'>
                  <div className='Rectangle-2222'>
                    <img
                      className='financeImg'
                      alt='Finances'
                      src={financesImage}
                    />
                    <p className='fifth-text'>{t('Finances')}</p>
                  </div>
                </div> */}
                    {/* <div className='col-sm-4 col-md-4 col-lg-4 mb-3'>
                  <div className='Rectangle-2225'>
                    <img
                      className='loyaltyPointsImg'
                      alt='Loyalty Points'
                      src={loyaltyPointsImage}
                    />
                    <p className='sixth-text'>{t('Loyalty Points')}</p>
                  </div>
                </div> */}
                  </div>

                  {/* <div className='row mb-3'>
                <div className='col-sm-12 col-md-12 col-lg-12'>
                  <div className='card'>
                    <p className='chart-heading'>
                      {t('Sales Purchase/ Volume / Payment Comparision')}
                    </p>
                    <DashboardChart />
                  </div>
                </div>
              </div> */}

                  {/* <div className='row'>
                <div className='col-sm-6 col-md-6 col-lg-6'>
                  <div className='card mt-0'>
                    <div className='row'>
                      <div className='col-sm-6 col-md-6 col-lg-6'>
                        <span className='credit-text'>{t('Credit Limit')}</span>
                        <span className='thb-text'>{t('THB')} 20,000.00</span>
                      </div>
                      <div className='col-sm-6 col-md-6 col-lg-6 text-right'>
                        <span className='credit-text green-color'>
                          {t('Available Credit')}
                        </span>
                        <span className='thb-text green-color'>
                          {t('THB')} 2,000.00
                        </span>
                      </div>
                      <div className='col-sm-12 col-md-12 col-lg-12 d-flex pt-2 pb-2'>
                        <div className='redBar'></div>
                        <div className='greenBar'></div>
                      </div>
                      <div className='col-sm-6 col-md-6 col-lg-6'>
                        <span className='thb-text red-color'>
                          {t('THB')} 20,000.00
                        </span>
                        <span className='credit-text red-color'>
                          {t('Current Outstanding')}
                        </span>
                      </div>
                      <div className='col-sm-6 col-md-6 col-lg-6 text-right pt-2'>
                        <span className='Rectangle-2229'>
                          <span className='pay-now'>{t('Pay Now')} </span>
                          &nbsp;
                          <img src={walletIcon} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-sm-6 col-md-6 col-lg-6'>
                  <div className='row'>
                    <div className='col-sm-6 col-md-6 col-lg-6'>
                      <div className='bg-gray text-center rect-one'>
                        <p className='small-text'>{t('Open Case')}</p>
                        <p className='big-text'>30</p>
                      </div>
                    </div>
                    <div className='col-sm-6 col-md-6 col-lg-6'>
                      <div className='bg-gray text-center rect-one'>
                        <p className='small-text'>{t('Close Case')}</p>
                        <p className='big-text'>18</p>
                      </div>
                    </div>
                    <div className='col-sm-12 col-md-12 col-lg-12'>
                      <div className='card'>
                        <div className='row'>
                          <div className='col-sm-2 col-md-2 col-lg-2'>
                            <Avatar alt='Remy Sharp' src={userlogo} />
                          </div>
                          <div className='col-sm-10 col-md-10 col-lg-10 pl-0 pr-0'>
                            <span className='avatar-text'>
                              Vineet Shrivastav (SO){' '}
                              {t('label.will_be_visiting')}, 22 may 2020.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             */}
                </div>
                <div className="Footer">
                  <DbdLogo />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sold To Selection modal start */}
      {countryCode !== THAI_COUNTRY_CODE ? (
        <div className="dialog-boxes">
          <Dialog aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title">
              {t("SelectSoldTo")}
            </DialogTitle>
            <DialogContent>
              {(countryCode && countryCode === "VN") ||
              (countryCode && countryCode === "SL") ? (
                <RadioButtonSoldToGroup
                  getDivisionForCustomer={getDivisionForCustomerData}
                  handleChangeCat={handleChangeCat}
                />
              ) : (
                ""
              )}

              <div className="create_link d-flex">
                <select
                  className="form-control"
                  name="SelectSold"
                  onChange={changeShipTo}
                >
                  <option value="">-{t("SelectSoldTo")}-</option>
                  {getSoldTosForDivision &&
                  getSoldTosForDivision !== undefined &&
                  getSoldTosForDivision.data
                    ? getSoldTosForDivision.data.map((soldToData) => {
                        return (
                          <option value={soldToData.soldToNo}>
                            {soldToData.soldToNo}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
              <DialogActions>
                <div className="create_link d-flex">
                  <button className="cancel" onClick={handleClose}>
                    {t("ok")}
                  </button>
                </div>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      ) : null}
      {/* Sold To Selection modal end */}
    </>
  );
}
export default withTranslation()(Dashboad);
