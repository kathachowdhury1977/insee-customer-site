import React from 'react';
import "./OrderItemSummary.scss";
import Item from "../../assets/img/insee.jfif";


const OrderItemSummary = (props) => {
    return (
        <>

            <div className="col-12 pt-4 pb-4">
                <div className="order_item">                  

                    <div className="row mb-3">
                        <div className="col-2">
                            <img src={Item} />
                        </div>
                        <div className="col-6 pr-0">
                            <div className="title_sec">
                                <p>{props.title}</p>
                                <span>{props.orderid}</span>
                                {
                                    props.showextra === "true" ?
                                    <div>
                                       <p className="mb-0 light-text">Unit of measure : EA </p>
                                       <p className="mb-0 light-text">Price/Unit : THB 1283 </p>
                                      <p className="mb-0 light-text">Discount/Unit : 309 </p>
                                      <p className="mb-0 light-text">Weight/Unit : 80 Kg </p>
                                       <p className="mb-0 light-text">Freight/Unit : THB 16</p>
                                      <p className="mb-0 light-text">Cash Discount/Unit : 18%</p>
                                    </div>
                                   
                                   :
                                   <div>
                                       <p className="mb-0 light-text">Price/Unit : THB {props.Amount} </p>
                                      <p className="mb-0 light-text">Discount/Unit : THB {props.DiscountAmount} </p>
                                       <p className="mb-0 light-text">Freight/Unit : THB {props.FreightChargeAmount}</p>
                                    </div>
                                }


                                {/* {
                                    props.vat === "tax" ? 

                                    <div>
                                       <p className="mb-0 light-text">Price without VAT - {props.withouttax} </p>
                                       <p className="mb-0 light-text">Price with VAT - {props.withtax} </p>
                                    </div> : null
                                } */}
                               
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="quantity_sec">
                                <p>{props.tonQty}</p>
                                <span>Quantity</span>
                            </div>
                        </div>
                    </div>

                    
                </div>

            </div>


        </>
    );

}
export default OrderItemSummary;