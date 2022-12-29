import React, { useEffect } from "react";
import { useLocation,Redirect,useHistory } from 'react-router-dom';
import { eventActions } from "../../../../_actions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import "react-tabs/style/react-tabs.css";
import "./ShipMent.scss";
import ShipMentHeadingSection from "../../../../components/ShipMentHeadingSection/ShipMentHeadingSection";
import CreateShipment from "../../../../components/CreateShipment/CreateShipment";
import CreateShipmentForm from "../../../../components/CreateShipmentForm/CreateShipmentForm";

function CreatePickup(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let history = useHistory();
  const location = useLocation();
  const { productData,productIds,shipToId, ShippingType,unShipMentId } = location.state!==undefined?location.state:[];
  const finalProductData = useSelector((state) => state.SelectShipToProduct);
  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
  // console.log(finalProductData, 'finalProductData')
  useEffect(()=>{
    dispatch(eventActions.SelectShipToProduct(productData))
  },[])
  const removeQty=(removeProd)=>{
    ///console.log(prod_id,'remove',index)
    let prod_id=removeProd['product_id'];
    let item_key=removeProd['item_key'];
    let mySelectedProd=[...productData.filter((prod,index)=>prod.id!=prod_id).filter((prod)=>prod.items.length>0),...productData.filter((prod,index)=>prod.id===prod_id).filter((prod)=>prod.items.splice(item_key, 1) && prod.items.length>0)];
    dispatch(eventActions.SelectShipToProduct(mySelectedProd))
  }
  console.log('unShipMentId',unShipMentId,'productIds',productIds,'shipToId',shipToId,'SelectShipToProduct',finalProductData);
  return (
    <>
      <div className="content-wrapper">
        <Header />
        <div className={"row ipad_css "  + MyNewClass}>
          <div className="mainScroll">
            <div className="Shipment_managment mb-4">
              <ShipMentHeadingSection title={t("createpickup.heading")} />
              <div className="row" id="selectedQtyMessage">
              <div class="col-12" style={{background:"rgba(255, 0, 0, 0.2)",paddingTop:"10px",paddingBottom:"1px"}}>
                 <p style={{color:"#FF0000"}} id="TrackCapacity"></p>
               </div>
               </div>
              <div className="create_ship">
                {
                  finalProductData && finalProductData.loading?"Please wait":finalProductData && finalProductData.SelectShipToProduct!==undefined?finalProductData.SelectShipToProduct.map((prod,index)=>{
                    return <CreateShipment removeQty={removeQty} prod_id={prod.id} salesOrderNumber={prod.header1.salesOrderNumber} ponumber={prod.header1.ponumber} productIds={productIds} items={prod.items}/>
                      ///
                    }):''
                }
              </div>
              {finalProductData && finalProductData.SelectShipToProduct!==undefined?
              <div className="col-12">
                <CreateShipmentForm  ShippingType={ShippingType} shipToId={shipToId} productData={finalProductData.SelectShipToProduct} productIds={productIds}/>
              </div>:''
               }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withTranslation()(CreatePickup);
