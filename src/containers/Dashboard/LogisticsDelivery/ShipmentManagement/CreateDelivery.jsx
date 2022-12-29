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
import CreateDeliveryForm from "../../../../components/CreateDeliveryForm/CreateDeliveryForm";
let countryList=[
  {countryCode:'TH',countryName:"Thailand"},{countryCode:'LK',countryName:"Sri Lanka"},
  {countryCode:'VN',countryName:"Vietnam"},
  {countryCode:'KH',countryName:"Cambodia"}
 ]; 
 
function CreateDelivery(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let history = useHistory();
  const location = useLocation();
  const finalProductData = useSelector((state) => state.SelectShipToProduct);
  const { productData,productIds,shipToId,ShippingType, selectedProductsCode} = location.state?location.state:'';
  useEffect(()=>{
    dispatch(eventActions.SelectShipToProduct(productData))
  },[])
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const countryCode = userName ? userName.countryCode : ''
  const removeQty=(removeProd)=>{
    ////console.log('removeProd',removeProd)
    let prod_id=removeProd['product_id'];
    let item_key=removeProd['item_key'];
    let mySelectedProd=[...productData.filter((prod,index)=>prod.id!=prod_id).filter((prod)=>prod.items.length>0),...productData.filter((prod,index)=>prod.id===prod_id).filter((prod)=>prod.items.splice(item_key, 1) && prod.items.length>0)];
    dispatch(eventActions.SelectShipToProduct(mySelectedProd))
  }
  const displayAddress=(address)=>{
    return address!==null?address:'';
  }
  console.log('finalProductDatafinalProductData',finalProductData);
  const getcountryName=(countryCode)=>{
    let country_name=countryList.find((code)=>code.countryCode==countryCode);
    return country_name.countryName;
 }
 ///console.log('ShippingTypeShippingType',ShippingType);

 
 const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
 const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
 const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
 const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
  return (
    <>  
      <div className="content-wrapper">
        <Header title ="Create Delivery" />

        <div className={"row ipad_css "  + MyNewClass}>
          <div className="mainScroll">
            <div className="Shipment_managment mb-4">
              <ShipMentHeadingSection title={t("shipmanagement.createdelivery_btn")} />
              <div className="create_ship">
                 <div className="delivery-address-header">
                    {finalProductData && finalProductData.SelectShipToProduct!==undefined?finalProductData.SelectShipToProduct.map((prod,index)=>{
                       if(index==0)
                       {
                       return(
                          <> 
                            <p style={{fontSize: `${FontChange}px`}}>{t('Ship to')}: {shipToId && shipToId.replace(/^0+/, '')+' '+prod.partnerFunction.shipToName}</p>  
                            {
                              countryCode.countryCode === 'VN'? '' :
                          <p style={{fontSize: `${FontChange}px`}}>{displayAddress(prod.partnerFunction.shiToAddress.address)+' '
                            +displayAddress(prod.partnerFunction.shiToAddress.street)+' '
                            +displayAddress(prod.partnerFunction.shiToAddress.subDistrictId)+' '
                            +displayAddress(prod.partnerFunction.shiToAddress.districtId)+' '
                            +displayAddress(prod.partnerFunction.shiToAddress.provinceId)+' '
                            +displayAddress(prod.partnerFunction.shiToAddress.postalCode)+' '
                            +displayAddress(getcountryName(prod.partnerFunction.shiToAddress.countryId))}</p>
                            }
                            
                        </>
                       )
                       }
                    }):''}
                 </div>
                 <div className="row" id="selectedQtyMessage">
                  <div class="col-12" style={{background:"rgba(255, 0, 0, 0.2)",paddingTop:"10px",paddingBottom:"1px"}}>
                    <p style={{color:"#FF0000",fontSize: `${FontChange}px`}} id="TrackCapacity"></p>
                  </div>
                </div>
                {finalProductData && finalProductData.SelectShipToProduct!==undefined?finalProductData.SelectShipToProduct.map((prod,index)=>{
                    return <CreateShipment removeQty={removeQty} prod_id={prod.id} salesOrderNumber={prod.header1.salesOrderNumber} ponumber={prod.header1.ponumber} productIds={productIds} items={prod.items}/>
                      ///
                    }):''}
                
              </div>
              <div className="col-12">
              {finalProductData && finalProductData.SelectShipToProduct!==undefined?
                <CreateDeliveryForm ShippingType={ShippingType} shipToId={shipToId} productData={finalProductData.SelectShipToProduct} productIds={productIds} selectedProductsCode = {selectedProductsCode}/>
              :''}
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withTranslation()(CreateDelivery);