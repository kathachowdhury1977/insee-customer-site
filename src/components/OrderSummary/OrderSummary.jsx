import React from 'react';
import OrderSummaryItems from "./OrderSummaryItems";


const OrderSummary = (props) => {
    return (
        <>
               <div className="order_summary product_brand_section">
                    <h5 className="product_heading mb-3">Order Summary</h5>

                    <div className="row">
                        <OrderSummaryItems/>   
                        <OrderSummaryItems/>    
                    </div>
                            
                </div> 
               
        </>
    ); 

}
   export default OrderSummary;