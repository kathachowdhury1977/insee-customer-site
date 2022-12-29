import React, { useEffect, Suspense } from "react";
import "./App.scss";
import "./i18n";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import { Router, Route, Switch, Redirect, HashRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "./_helpers";
import { alertActions } from "./_actions";
import Page404 from "./components/Page404/Page404";

import Login from "./containers/Login/Login";
import ResetPassword from "./containers/Login/ResetPassword";
import PrivateRoute from './containers/Login/PrivateRoute';

import Dashboard from "./containers/Dashboard/Dashboard";
import ShipmentManagement from "./containers/Dashboard/LogisticsDelivery/ShipmentManagement/ShipmentManagement";
import CreateDelivery from "./containers/Dashboard/LogisticsDelivery/ShipmentManagement/CreateDelivery";
import CreatePickup from "./containers/Dashboard/LogisticsDelivery/ShipmentManagement/CreatePickup";
import ShipmentDetailPickup from "./containers/Dashboard/LogisticsDelivery/ShipmentManagement/ShipmentDetailPickup";
import ShipmentDetailPickupEdit from "./containers/Dashboard/LogisticsDelivery/ShipmentManagement/ShipmentDetailPickupEdit";
import ShipmentDetailDelivery from "./containers/Dashboard/LogisticsDelivery/ShipmentManagement/ShipmentDetailDelivery";
import MyShipmentsDetail from "./containers/Dashboard/LogisticsDelivery/MyShipments/MyShipmentsDetail";
import MyShipments from "./containers/Dashboard/LogisticsDelivery/MyShipments/MyShipments";
import MyOrdersLanding from "./containers/Dashboard/Order/MyOrders/MyOrdersLanding";
import OrderDetails from "./containers/Dashboard/Order/MyOrders/OrderDetails";
import ChangeSO from "./containers/Dashboard/Order/MyOrders/ChangeSO";
import RaiseReleaseRequest from "./containers/Dashboard/Order/MyOrders/RaiseReleaseRequest";
import placeOrder from "./containers/Dashboard/Order/PlaceOrder/PlaceOrder";
import CheckoutProcess from "./containers/Dashboard/Order/PlaceOrder/CheckoutProcess";
import ItemDetailsPage from "./containers/Dashboard/Order/PlaceOrder/ItemDetailsPage";
import PaymentLanding from "./containers/Dashboard/PaymentOffline/PaymentLanding";
import Payment from "./containers/Dashboard/PaymentOffline/Payment";
import PaymentSummary from "./containers/Dashboard/PaymentOffline/PaymentSummary";
import PaymentHistory from "./containers/Dashboard/PaymentOffline/PaymentHistory";
import IncentivePayment from "./containers/Dashboard/PaymentOffline/IncentivePayment";
import PaymentHistoryDetails from "./containers/Dashboard/PaymentOffline/PaymentHistoryDetails";
import CustomerProfile from "./containers/Dashboard/CustomerProfile/CustomerProfile";
import AlternateLocationForm from "./containers/Dashboard/CustomerProfile/AlternateLocationForm";
import ViewRetailers from "./containers/Dashboard/CustomerProfile/ViewRetailers";
import ViewShipTo from "./containers/Dashboard/CustomerProfile/ViewShipTo";
import AlternateContactForm from "./containers/Dashboard/CustomerProfile/AlternateContactForm";
import UpdateSocialMedia from "./containers/Dashboard/CustomerProfile/UpdateSocialMedia";

import CaseList from "./containers/Dashboard/CaseCreation/CaseList/CaseList";
import CaseDetail from "./containers/Dashboard/CaseCreation/CaseDetail/CaseDetail";
import CreateCase from "./containers/Dashboard/CaseCreation/CreateCase/CreateCase";

import LoyaltyPoints from "./containers/Dashboard/LoyaltyPoints/LoyaltyPointsLanding";
import MyPointsLanding from "./containers/Dashboard/LoyaltyPoints/MyPointsLanding";
import RedeemPointsLanding from "./containers/Dashboard/LoyaltyPoints/RedeemPointsLanding";

import CustomerPerformance from "./containers/Dashboard/CustomerPerformance/CustomerPerformance";
import ReportsLanding from "./containers/Dashboard/CaseReports/ReportsLanding";
import ReportsDashboard from "./containers/Dashboard/CaseReports/ReportsDashboard";
import AgentPerformance from "./containers/Dashboard/CaseReports/AgentPerformance";
import ShipmentDetailsDeliveryEdit from "./containers/Dashboard/LogisticsDelivery/ShipmentManagement/ShipmentDetailsDeliveryEdit";
import PaymentRefrence from "./containers/Dashboard/PaymentOffline/PaymentRefrence";

import VehicleManagement from "./containers/Dashboard/VehicleManagement/VehicleManagement";

import ReportManagement from "./containers/Dashboard/ReportManagement/ReportManagement";
import Case from "./containers/Dashboard/Case/Case"

import SalesReportLanding from "./containers/Dashboard/ReportManagement/salesReports/SalesOrderReport";
import DeliveryReportLanding from "./containers/Dashboard/ReportManagement/deliveryReports/DeliveryReport";

import TaxInvoiceReportLanding from "./containers/Dashboard/ReportManagement/TaxInvoiceReport";

import CreditNoteReportLanding from "./containers/Dashboard/ReportManagement/creditNote/CreditNoteReport";

import OpenItemReportLanding from "./containers/Dashboard/ReportManagement/OpenItemReport";
import ReceiptReportLanding from "./containers/Dashboard/ReportManagement/ReceiptReport";
import IncentiveReportLanding from "./containers/Dashboard/ReportManagement/IncentivePaymentReport";
import CustomerReportLanding from "./containers/Dashboard/ReportManagement/CustomerReport";
import CustomerReportLandingNew from "./containers/Dashboard/ReportManagement/CustomerReportNew";
import PaymentRefrenceSuccess from "./containers/Dashboard/PaymentOffline/PaymentSuccessFull";
import LoyaltyPointsNew from "./containers/Dashboard/LoyaltyPointsNew/Container";
import SubDealerLoyalty from "./containers/Dashboard/LoyaltyPointsNew/subDealer/Container"
import { Footer } from "antd/lib/layout/layout";

import SalesOrderReportNew from "./containers/Dashboard/ReportManagement/salesReports/SalesOrderReportNew";
import DeliveryReportNew from "./containers/Dashboard/ReportManagement/deliveryReports/DeliveryReportNew";
import CreditNoteReportNew from "./containers/Dashboard/ReportManagement/creditNote/CreditNoteReportNew";
import ReceiptReportNew from "./containers/Dashboard/ReportManagement/ReceiptReportNew";
import TaxInvoiceReportNew from "./containers/Dashboard/ReportManagement/invoiceReports/TaxInvoiceReportNew";
import { LicenseInfo } from '@mui/x-license-pro';

function App() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  let userName = localStorage.getItem('userData');
  userName = JSON.parse(userName);
  useEffect(() => {

    //adding data-grid-pro-license key.
    LicenseInfo.setLicenseKey('95ea54c6fb3796b6d0df648cbbdb20efTz01MjQ3NixFPTE2OTczNjYxNDgxNjMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');
    
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  const user = localStorage.getItem("CustomerNumber")

  // const ACTIVE_PERFORMANCE_ROLE = userName && userName.performanceRole === "Active";
  const ACTIVE_PERFORMANCE_ROLE=true

  return (
    <div className="inseeHome">
      <Suspense fallback={null}>
        <LanguageSelector />
        {alert.message && (
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/reset-password" exact component={ResetPassword} />
            <PrivateRoute path="/Dashboard" exact component={Dashboard} />
            <PrivateRoute path="/ShipmentManagement" exact component={userName && userName.orderAndDeliverRole === "Active" ? ShipmentManagement : Page404} />
            <PrivateRoute path="/MyShipments" exact component={userName && userName.orderAndDeliverRole === "Active" ? MyShipments : Page404} />

            <PrivateRoute path="/placeOrder" exact component={userName && userName.orderAndDeliverRole === "Active" ? placeOrder : Page404} />
            <PrivateRoute path="/ItemDetailsPage" component={userName && userName.orderAndDeliverRole === "Active" ? ItemDetailsPage : Page404} />
            <PrivateRoute path="/CheckoutProcess" exact component={userName && userName.orderAndDeliverRole === "Active" ? CheckoutProcess : Page404} />
            <PrivateRoute path="/MyOrder" exact component={userName && userName.orderAndDeliverRole === "Active" ? MyOrdersLanding : Page404} />
            <PrivateRoute path="/MyOrderDetails" exact component={userName && userName.orderAndDeliverRole === "Active" ? OrderDetails : Page404} />
            <PrivateRoute path="/ChangeSO" exact component={userName && userName.orderAndDeliverRole === "Active" ? ChangeSO : Page404} />
            <PrivateRoute path="/RaiseReleaseRequest" exact component={userName && userName.orderAndDeliverRole === "Active" ? RaiseReleaseRequest : Page404} />

            <PrivateRoute path="/CreatePickup" exact component={userName && userName.orderAndDeliverRole === "Active" ? CreatePickup : Page404} />
            <PrivateRoute path="/ShipmentDetails-Pickup" exact component={userName && userName.orderAndDeliverRole === "Active" ? ShipmentDetailPickup : Page404} />
            <PrivateRoute path="/ShipmentDetails-PickupEdit" exact component={userName && userName.orderAndDeliverRole === "Active" ? ShipmentDetailPickupEdit : Page404} />
            <PrivateRoute path="/ShipmentDetails-Delivery" exact component={userName && userName.orderAndDeliverRole === "Active" ? ShipmentDetailDelivery : Page404} />
            <PrivateRoute path="/MyShipmentsDetail" exact component={userName && userName.orderAndDeliverRole === "Active" ? MyShipmentsDetail : Page404} />
            <PrivateRoute path="/CreateDelivery" exact component={userName && userName.orderAndDeliverRole === "Active" ? CreateDelivery : Page404} />

            <PrivateRoute path="/PaymentLanding" exact component={userName && userName.paymentOfflineAndOnlineRole === "Active" ? PaymentLanding : Page404} />
            <PrivateRoute path="/Payment" exact component={userName && userName.paymentOfflineAndOnlineRole === "Active" ? Payment : Page404} />
            <PrivateRoute path="/PaymentSummary" exact component={userName && userName.paymentOfflineAndOnlineRole === "Active" ? PaymentSummary : Page404} />
            <PrivateRoute path="/PaymentHistory" exact component={userName && userName.paymentOfflineAndOnlineRole === "Active" ? PaymentHistory : Page404} />
            <PrivateRoute path="/PaymentHistoryDetails" exact component={userName && userName.paymentOfflineAndOnlineRole === "Active" ? PaymentHistoryDetails : Page404} />
            <PrivateRoute path="/IncentivePayment" exact component={userName && userName.paymentOfflineAndOnlineRole === "Active" ? IncentivePayment : Page404} />

            <PrivateRoute path="/CustomerProfile" exact component={userName && userName.performanceRole === "Active" ? CustomerProfile : Page404} />
            <PrivateRoute path="/AlternateLocationForm" exact component={AlternateLocationForm} />
            <PrivateRoute path="/ViewRetailers" exact component={ViewRetailers} />
            <PrivateRoute path="/ViewShipTo" exact component={ViewShipTo} />
            <PrivateRoute path="/AlternateContactForm" exact component={AlternateContactForm} />
            <PrivateRoute path="/UpdateSocialMedia" exact component={UpdateSocialMedia} />
            <PrivateRoute path="/CaseList" exact component={CaseList} />
            <PrivateRoute path="/CaseDetail" exact component={CaseDetail} />
            <PrivateRoute path="/CreateCase" exact component={CreateCase} />

            {/* <PrivateRoute path="/LoyaltyPoints" exact component={userName && userName.loyality   === "Active" || userName && userName.loyality   === null ? LoyaltyPoints : Page404} /> */}
            <PrivateRoute path="/MyPointsLanding" exact component={userName && userName.loyality === "Active" || userName && userName.loyality === null ? MyPointsLanding : Page404} />
            <PrivateRoute path="/RedeemPointsLanding" exact component={userName && userName.loyality === "Active" || userName && userName.loyality === null ? RedeemPointsLanding : Page404} />
            <PrivateRoute path="/CustomerPerformance" exact component={CustomerPerformance} />

            <PrivateRoute path="/Report" exact component={ReportsLanding} />
            <PrivateRoute path="/Report-Dashboard" exact component={ReportsDashboard} />
            <PrivateRoute path="/Agent-Performance" exact component={AgentPerformance} />
            <PrivateRoute path="/ShipmentDetailsDeliveryEdit" exact component={ShipmentDetailsDeliveryEdit} />
            <PrivateRoute path="/PaymentRefrence" exact component={PaymentRefrence} />

            <PrivateRoute path="/VehicleManagement" exact component={userName && userName.performanceRole === "Active" ? VehicleManagement : Page404} />


            <PrivateRoute path="/ReportManagement" exact component={ACTIVE_PERFORMANCE_ROLE ? ReportManagement : Page404} />
            <PrivateRoute path="/DeliveryReport" exact component={userName && userName.performanceRole === "Active" ? DeliveryReportLanding : Page404} />
            <PrivateRoute path="/DeliveryReportNew" exact component={ACTIVE_PERFORMANCE_ROLE ? DeliveryReportNew : Page404} />
            {/* <PrivateRoute path="/SalesReport" exact component={userName && userName.performanceRole === "Active" ? SalesReportLanding : Page404} /> */}
            <PrivateRoute path="/TaxInvoiceReport" exact component={userName && userName.performanceRole === "Active" ? TaxInvoiceReportLanding : Page404} />
            <PrivateRoute path="/TaxInvoiceReportNew" exact component={ACTIVE_PERFORMANCE_ROLE ? TaxInvoiceReportNew : Page404} />
            <PrivateRoute path="/CreditNoteReport" exact component={userName && userName.performanceRole === "Active" ? CreditNoteReportLanding : Page404} />
            <PrivateRoute path="/CreditNoteReportNew" exact component={ACTIVE_PERFORMANCE_ROLE ? CreditNoteReportNew : Page404} />

            <PrivateRoute path="/OpenItemReport" exact component={userName && userName.performanceRole === "Active" ? OpenItemReportLanding : Page404} />
            <PrivateRoute path="/ReceiptReport" exact component={userName && userName.performanceRole === "Active" ? ReceiptReportLanding : Page404} />
            <PrivateRoute path="/ReceiptReportNew" exact component={ACTIVE_PERFORMANCE_ROLE ? ReceiptReportNew : Page404} />
      
            <PrivateRoute path="/IncentivePaymentReport" exact component={IncentiveReportLanding} />
            <PrivateRoute path="/CustomerStatement" exact component={userName && userName.performanceRole === "Active" ? CustomerReportLanding : Page404} />
            <PrivateRoute path="/CustomerStatementNew" exact component={ACTIVE_PERFORMANCE_ROLE ? CustomerReportLandingNew : Page404} />
            <PrivateRoute path="/SalesOrderReports" exact component={ACTIVE_PERFORMANCE_ROLE ? SalesOrderReportNew : Page404} />
            <PrivateRoute path="/Bayfg" exact component={PaymentRefrenceSuccess} />
          
            <PrivateRoute path="/loyaltypoints" exact component={(userName && userName.loyality === "Active" || userName && userName.loyality === null) && process.env.REACT_APP_ENV !== "production" ? LoyaltyPointsNew : Page404} />
            <PrivateRoute path="/SubDealerLoyalty" exact component={ process.env.REACT_APP_ENV !== "production" ? SubDealerLoyalty : Page404} />
            {/* <Redirect exact from="payment/success" to="/paymentSuccess" /> */}

            {/* <PrivateRoute path="/CaseDetail" exact component={Case} /> */}

            <Route component={Page404} />
          </Switch>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

      </Suspense>

    </div>
  );
}

export { App };
