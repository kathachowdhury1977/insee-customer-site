import React, { useEffect } from "react";
import { orderActions } from "../../../../_actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OrderHeadingSection from "../../../../components/OrderHeadingSection/OrderHeadingSection";
import Header from "../../../../components/Header/Header";
import PlaceOrderItemDetails from "../../../..//components/PlaceOrderItemDetails/PlaceOrderItemDetails";
import { withTranslation, useTranslation } from "react-i18next";

const ItemDetailsPage = (props) => {
  const getProduct = useSelector((state) => state.getproduct);
  const { t } = useTranslation();
  let history = useHistory();
  const dispatch = useDispatch();
  let productID = localStorage.getItem("productDetId")
  let CustomerNumber = localStorage.getItem("CustomerNumber")
  let matchedSalesAreaList = localStorage.getItem("matchedSalesArea")
  let quantity = localStorage.getItem("quantitee")
  let subCategory= localStorage.getItem('SUBCATEGORY')
  let category= localStorage.getItem('CATEGORY')

  let shipToCode =  localStorage.getItem('SHIPTOCODE')
  let plantId =  localStorage.getItem('PLANTCODE')
  let contract =  localStorage.getItem('CONTRACTNUMBER')
  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);


  useEffect(() => {
    dispatch(orderActions.getProduct(productID, CustomerNumber));
   
  }, []);

  console.log(shipToCode , 'shipToCode')

  // let productDetail = getProduct.getproduct && getProduct.getproduct;
  return (
    <>
      <div className="content-wrapper">
        <Header />

        <div className={"row ipad_css "  + MyNewClass}>
          <div className="mainScroll">
            <div className="detail_pg">
              <OrderHeadingSection title={t("inseeproductdetails.label")} showcartbutton={false} />
              <PlaceOrderItemDetails 
              // productConf={getProduct.getproduct && getProduct.getproductProductList}
              matchedSalesAreaList ={matchedSalesAreaList}
              productID={productID}
              quantity = {quantity}
              contract = {contract}
              shipTo = {shipToCode}
              plant = {plantId}
              subcategory = {subCategory}

              // quantity={productDetail.ProductList.selectedQuanity}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default withTranslation()(ItemDetailsPage);
