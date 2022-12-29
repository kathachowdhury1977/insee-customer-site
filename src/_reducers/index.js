import { combineReducers } from "redux";

import { alert } from "./alert.reducer";
import { shippingcondition } from "./shippingcondition.reducer";
import { spclshippingcondition } from "./spclshippingcondition.reducer";
import { ordertype } from "./ordertype.reducer";
import { shippingtype, shippingtypemyorder } from "./shippingtype.reducer";
import { contractbyacc } from "./contractbyacc.reducer";
import { preftrucktype } from "./preftrucktype.reducer";
import { specialpro } from "./specialpro.reducer";
import { getallproduct } from "./getallproduct.reducer";
import { shiptobycount } from "./shiptobycount.reducer";
import { plantbycount } from "./plantbycount.reducer";
import { getproduct } from "./getproduct.reducer";
import { addtocart } from "./addtocart.reducer";
import { getprovince } from "./getprovince.reducer";
import { getdistrict } from "./getdistrict.reducer";
import { cartdata } from "./cartdata.reducer";
import { orderdetail } from "./orderdetail.reducer";
import { ShipToValueMyOrder } from "./getShipToValueMyOrder.reducer";
import { offlinegetPaymentStatus } from "./getPaymentOfflineStatus.reducer";
import { raiseReleaseRequestVN } from "./getRaiseReleaseRequestvn.reducer";
import { orderUpdateVN } from "./orderUpdateVn.reducer";
import { getIncentivePaymentReports } from "./getIncentivePaymentReports.reducer";
import {
  getavailablity,
  getsapaging,
  getpaymentmode,
  getpaymenttype,
  getpaymentbank,
  getpendingpay,
  getpaymentstatus,
  paymentsummaryupdate,
  paymentStatus,
} from "./paymentoffline.reducer";
import { getCaseType } from "./getCaseType.reducer";
import { getCaseStatus } from "./getCaseStatus.reducer";
import { getBusinessSegment } from "./getBusinessSegment.reducer";
import { getCaseCategory } from "./getCaseCategory.reducer";
import { getCase } from "./getCase.reducer";
import { createCaseReducer } from "./createCase.reducer";
import { getAllCase } from "./getAllCase.reducer";
import { loginPage, isLoggedIn } from "./login.reducer";
import {
  shipmentstatus,
  shipmentStatusFilterList,
  getShipmentStatusVn,
} from "./shipmentstatus.reducer";
import { getShipToByAccNum } from "./getShipToByAccNum.reducer";
import {
  getConwoodCategory,
  getSelectedOrderInCheckout,
} from "./getConwoodCategory.reducer";
import {
  isPlantsSelected,
  placeOrderFilterSearchClicked,
  ShipingCondSelected,
  ShipingTypeSelected,
} from "./isPlantsSelected.reducer";
import { isShipToSelected } from "./isShipToSelected.reducer";
import { getAllOrdersList } from "./getAllOrdersList.reducer";
import { clearCart, deleteProductFormCart } from "./clearCart.reducer";
import { getOrderCreditInfo } from "./getOrderCreditInfo.reducer";
import { placeOrder } from "./placeOrder.reducer";
import { getShipToDetails } from "./getShipToDetails.reducer";
import { getShipmentDetailsByInseePlusId } from "./getShipmentDetailsByInseePlusId.reducer";
import { raiseReleaseRequest } from "./raiseReleaseRequest.reducer";
import { cancelSO } from "./cancelSO.reducer";
import { shipToForShipment } from "./shipToForShipment.reducer";
import { productForShipment } from "./productForShipment.reducer";
import { plantNameForShipment } from "./plantNameForShipment.reducer";
import { getShipMentData } from "./getShipData.reducer";
import { getProductCatForShipment } from "./getProductCatForShipment.reducer";
import {
  shipmentmanagment,
  shipmentByFilter,
  filterMyShipments,
  filterShipmentManagment,
} from "./shipmentmanagment.reducer";
import { createpickup } from "./createpickup.reducer";
import {
  setPassword,
  resetPassword,
  forgotPassword,
  getshipToCustomer,
  adminSocialmedia,
  authentication,
  getCustomerBySoldTo,
  getRetailerBySoldToNumberUsingGET,
  getSocialMediaUsingGet,
  deliveryOrderStatus,
} from "./authentication.reducer";
import { getPlantIdForShipment } from "./getPlantId.reducer";
import { getProductForShipment } from "./getProductId.reducer";
import { getShipToForShipment } from "./getShipTo.reducer";
import { orderByStatusValue } from "./orderStatusValue.reducer";
import { getSubdealer } from "./getSubdealer.reducer";
import { shipToMyOrder } from "./shipToMyOrder.reducer";
import { searchByNoValue } from "./searchByValue.reducer";
import { searchByOrderNo } from "./searchByOrederNo.reducer";
import { shippingConditionMyOrderValue } from "./shippingConditionMyOrder.reducer";
import { shipTypeValueMyOredr } from "./shippingTypeValueMyOrder.reducer";
import { paginationValue } from "./getPaginationValue.reducer";
import { getProductCatLevel } from "./getProductCatValue.reducer";
import { getProductCatLevelValue } from "./get_product_category_lavel.reducer";
import { getProductSubCatLevel } from "./getProductSubCat.reducer";
import { getProductSubCatLevelValue } from "./getProductSubCatValue.reducer";
import { getSpecialShippingConditionConwood } from "./getSpecialShipCondByCat.reducer";
import { getRemarks } from "./getNotes.reducer";
import {
  updateVehicle,
  getVehicletypes,
  getOwnership,
  createVehicle,
  deleteVehiclesByVehicleId,
  getVehiclesDetailsById,
} from "./getVehicletypes.reducer";
import { getVehicles } from "./getVehicle.reducer";
import { chooseTransporter } from "./chooseTransporter.reducer";
import { createDelivery } from "./createdelevery.reducer";
import { cancelShipment, getShipmentStatus } from "./cancelShipment.reducer";
import { deliveryUpdate } from "./deliveryUpdate.reducer";
import { getCatForFilter } from "./getPaymentCat.reducer";
import { SelectShipToProduct } from "./selectShipToProduct.reducer";
import { getSettledPayment } from "./getsetlledPayment.reducer";
import { makePaymentData } from "./getMakePaymentData.reducer";
import { totalMakePaymentData } from "./getTotalAmount.reducer";
import { onPaymentMode } from "./getPaymentMode.reducer";
import { onPaymentType } from "./getPaymentType.reducer";
import { onBankName } from "./getPaymentBank.reducer";
import { onPaymentDateChange } from "./getPaymentDate.reducer";
import { confirmPaymentButton } from "./confirmPayment.reducer";
import { paymentHistoryData } from "./getPaymentHistory.reducer";
import { paymentHistoryDownloadPdf } from "./getPaymentPdfDownload.reducer";
import { paymentHistoryDetail } from "./getPaymentHistoryDetail.reducer";
import { paymentHistoryDataDelete } from "./deletePaymentHistory.reducer";
import { serachValue } from "./getOnSearchValue.reducer";
import { getPaymentOfflineChartData } from "./getPaymentOfflineChartData.reducer";
import { getPendingPaymentStatus } from "./getPaymentStatus.reducer";
import { uploadFile } from "./uploadFile.reducer";
import { getRetailerByDistrict } from "./getRetailerByDistrict.reducer";
import { totalCheckedPandingData } from "./getCheckedPaymentData.reducer";
import { totalCheckedData } from "./getSelectedCheckedData.reducer";
import { getRegionByCountry } from "./getRegionByCountry.reducer";
import { getProvinceByRegion } from "./getProvinceByRegion.reducer";
import { getDistrictByProvince } from "./getDistrictByProvince.reducer";
import { loadcacheData } from "./getLoadChache.reducer";
import shipToCustomerByDistrict from "./shipToCustomerByDistrict.reducer";
import { getShipCatValue } from "./getShipmentCat.reducer";
import { getAllDashBoardImages } from "./getAllDashBoardImages.reducer";
import { getCustomerPdpInfo } from "./getCustomerPdpInfo.reducer";
import { pdpConfirmed } from "./getpdpConfirmed.reducer";
import { changePaymentMethod } from "./changePaymentMethod.reducer";
import { allocateVolumeHistory } from "./getallocateVolumeHistory.reducer";

import { getSalesOrderReport } from "./getSalesOrderReport.reducer";
import { getDeliveryReports } from "./getDeliveryReports.reducer";
import { getTaxInvoiceReport } from "./getTaxInvoiceReport.reducer";
import { getReceiptReport } from "./getReceiptReport.reducer";
import { getOpenItemsReport } from "./getOpenItemsReport.reducer";
import { getCustomerStatementReport } from "./getCustomerStatementReport.reducer";
import { getCustomerStatementReportPdf } from "./getCustomerStatementReportPdf.reducer";
import { getIncentivePaymentReport } from "./getIncentivePaymentReport.reducer";
import { getCreditNoteReport } from "./getCreditNoteReport.reducer";
import { confirmPaymentButtonOnline } from "./getConfirmPaymentOnline.reducer";
import { plantbyCountryForVN } from "./getPlantForVT.reducer";
import { getTaxInvoiceReports } from "./getTaxInvoiceReports.reducer";
import { getDivisionForCustomer } from "./getDivisionForCustomer.reducer";
import { getSoldTosForDivision } from "./getSoldTosForDivision.reducer";
import { getShippingCondForVn } from "./getShippingCondForVn.reducer";
import { getShippingTypeForVn } from "./getShippingTypeForVn.reducer";

import { getTaxInvoiceMaterial } from "./getTaxInvoiceMaterial.reducer";
import { getDeliveryReportMaterial } from "./getDeliveryReportMaterial.reducer";
import { getSalesOrderReportMaterial } from "./getSalesOrderMaterial.reducer";
import { salesOrderReportExport } from "./salesReportExport.reducer";
import { deliveryReportExport } from "./deliveryReportExport.reducer";
import { getSalesAndDeliverContractReducer } from "./getSalesAndDeliveryContracts.reducer";
import { getDeliveryShipmentStatusReducer } from "./getDeliveryShipmentStatus.reducer";
import { getDateRangeMaster } from "./getDateRangeMaster.reducer";

import { getShipToForVn } from "./getShipToForVn.reducer";
import { getSalesOrderStatus } from "./getSalesOrderStatus.reducer";
import { getSalesOrderShippingCondition } from "./getSalesOrderShippingCondition.reducer";
import { getSalesOrderShipToName } from "./getSalesOrderShipToName.reducer";
import { getSalesOrderMaterialList } from "./getSalesOrderMaterialList.reducer";
import { getSalesOrderContracts } from "./getSalesOrderContracts.reducer";

import { getDeliveryStatus } from "./getDeliveryStatus.reducer";
import { getDeliveryShipToName } from "./getDeliveryShipToName.reducer";
import { getDeliveryMaterialList } from "./getDeliveryMaterialList.reducer";
import { getDeliveryShippingCondition } from "./getDeliveryShippingCondition.reducer";
import { getDeliveryContracts } from "./getDeliveryContracts.reducer";
import { getTaxInvoiceContracts } from "./getTaxInvoiceContracts.reducer";
import { getTaxInvoiceReportsConwood } from "./getTaxInvoiceReportsConwood.reducer";
import { getDeliveryReportChild } from "./getDeliveryReportChild.reducer";
import { getDeliveryReportConwod } from "./getDeliveryReportConwood.reducer";
import { getBayBankResponse } from "./getBankResponse.reducer";
import { fontsizechanger } from "./fontsizechanger.reducer";
import { headerfontchanger } from "./headerfontchanger.reducer";
import { smallfontchanger } from "./smallfontchanger.reducer";
import { addclasswithstyle } from "./addclasswithstyle.reducer";
import { getAllExpiredCalcRulesUsing } from "./getAllExpiredCalcRules.reducer";
import { getMyPoints } from "./getMyPoints.reducer";
import { getMyPointsGraph } from "./getMyPointsGraph.reducer";
import {
  reports,
  salesReports,
  creditReports,
  receiptReports,
  reportsCompany,
  deliveryReports,
  invoiceReports
} from "./reports.reducer";

const rootReducer = combineReducers({
  alert,
  createVehicle,
  getDeliveryReportConwod,
  getShipToForVn,
  getAllDashBoardImages,
  SelectShipToProduct,
  deliveryOrderStatus,
  getshipToCustomer,
  adminSocialmedia,
  getOwnership,
  deleteVehiclesByVehicleId,
  getVehiclesDetailsById,
  getSubdealer,
  getRetailerBySoldToNumberUsingGET,
  getSocialMediaUsingGet,
  getShipmentDetailsByInseePlusId,
  getVehicles,
  createDelivery,
  cancelShipment,
  getShipmentStatus,
  chooseTransporter,
  deliveryUpdate,
  authentication,
  getCustomerBySoldTo,
  getVehicletypes,
  shippingcondition,
  spclshippingcondition,
  ordertype,
  shippingtype,
  shippingtypemyorder,
  shipmentstatus,
  getShipmentStatusVn,
  shipmentStatusFilterList,
  getShipToByAccNum,
  deleteProductFormCart,
  contractbyacc,
  preftrucktype,
  specialpro,
  isLoggedIn,
  getallproduct,
  plantbycount,
  shiptobycount,
  getproduct,
  addtocart,
  getprovince,
  getdistrict,
  cartdata,
  orderdetail,
  getavailablity,
  getsapaging,
  getCaseType,
  getCaseStatus,
  getBusinessSegment,
  getCaseCategory,
  getCase,
  createCaseReducer,
  getAllCase,
  getpaymentmode,
  getpaymenttype,
  getpaymentbank,
  getpendingpay,
  getpaymentstatus,
  getConwoodCategory,
  getSelectedOrderInCheckout,
  isShipToSelected,
  isPlantsSelected,
  ShipingCondSelected,
  ShipingTypeSelected,
  getAllOrdersList,
  clearCart,
  getOrderCreditInfo,
  placeOrder,
  getShipToDetails,
  raiseReleaseRequest,
  cancelSO,
  shipToForShipment,
  productForShipment,
  plantNameForShipment,
  getShipMentData,
  getProductCatForShipment,
  placeOrderFilterSearchClicked,
  shipmentmanagment,
  shipmentByFilter,
  filterMyShipments,
  filterShipmentManagment,
  getIncentivePaymentReports,
  createpickup,
  getPlantIdForShipment,
  getProductForShipment,
  getShipToForShipment,
  orderByStatusValue,
  paymentsummaryupdate,
  orderByStatusValue,
  shipToMyOrder,
  searchByNoValue,
  searchByOrderNo,
  shippingConditionMyOrderValue,
  shipTypeValueMyOredr,
  paginationValue,
  getProductCatLevel,
  getProductCatLevelValue,
  getProductSubCatLevel,
  getProductSubCatLevelValue,
  getSpecialShippingConditionConwood,
  getRemarks,
  getCatForFilter,
  offlinegetPaymentStatus,
  getSettledPayment,
  paymentStatus,
  makePaymentData,
  totalMakePaymentData,
  onPaymentMode,
  onPaymentType,
  onBankName,
  onPaymentDateChange,
  confirmPaymentButton,
  paymentHistoryData,
  paymentHistoryDownloadPdf,
  updateVehicle,
  paymentHistoryDetail,
  paymentHistoryDataDelete,
  serachValue,
  getPaymentOfflineChartData,
  ShipToValueMyOrder,
  getPendingPaymentStatus,
  forgotPassword,
  resetPassword,
  setPassword,
  uploadFile,
  getRetailerByDistrict,
  totalCheckedPandingData,
  totalCheckedData,
  getRegionByCountry,
  getProvinceByRegion,
  getDistrictByProvince,
  getShipCatValue,
  loadcacheData,
  shipToCustomerByDistrict,
  getCustomerPdpInfo,
  pdpConfirmed,
  raiseReleaseRequestVN,
  orderUpdateVN,
  changePaymentMethod,
  allocateVolumeHistory,
  getSalesOrderReport,
  getDeliveryReports,
  getTaxInvoiceReport,
  getCreditNoteReport,
  getOpenItemsReport,
  getIncentivePaymentReport,
  getReceiptReport,
  getCustomerStatementReport,
  confirmPaymentButtonOnline,
  plantbyCountryForVN,
  getTaxInvoiceReports,
  getDivisionForCustomer,
  getSoldTosForDivision,
  getShippingCondForVn,
  getShippingTypeForVn,
  getTaxInvoiceMaterial,
  getDeliveryReportMaterial,
  salesOrderReportExport,
  deliveryReportExport,
  getSalesOrderReportMaterial,
  getDateRangeMaster,
  getSalesAndDeliverContractReducer,
  getDeliveryShipmentStatusReducer,
  getSalesOrderStatus,
  getSalesOrderShipToName,
  getSalesOrderShippingCondition,
  getSalesOrderContracts,
  getSalesOrderMaterialList,
  getDeliveryStatus,
  getDeliveryMaterialList,
  getDeliveryShippingCondition,
  getDeliveryShipToName,
  getDeliveryContracts,
  getTaxInvoiceContracts,
  getTaxInvoiceReportsConwood,
  getDeliveryReportChild,
  getBayBankResponse,
  getCustomerStatementReportPdf,
  fontsizechanger,
  headerfontchanger,
  smallfontchanger,
  addclasswithstyle,
  getAllExpiredCalcRulesUsing,
  getMyPoints,
  getMyPointsGraph,
  reports,
  salesReports,
  creditReports,
  receiptReports,
  reportsCompany,
  deliveryReports,
  invoiceReports
});
export default rootReducer;
