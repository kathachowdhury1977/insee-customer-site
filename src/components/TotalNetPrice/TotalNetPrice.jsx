import React from 'react';
import './TotalNetPrice.scss'


const TotalNetPrice = (props) => {
    return (
        <>
            <div className="card total-net-price">
                {
                    props.showextra === "true" ?
                        <div className="row text-center">

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="text-capitalize total-light-text">Total Price
                        </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                {
                                    props.type === "currency" ?
                                        <span className="text-capitalize total-light-text">{props.currency}</span>
                                        : null
                                }
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="total-dark-text">
                                    {props.total_price}
                                </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="text-capitalize total-light-text">Total Discount
                        </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                {
                                    props.type === "currency" ?
                                        <span className="text-capitalize total-light-text">{props.currency}</span>
                                        : null
                                }
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="total-dark-text">
                                    {props.total_discount}
                                </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="text-capitalize total-light-text">Cash Discount
                        </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                {
                                    props.type === "currency" ?
                                        <span className="text-capitalize total-light-text">%</span>
                                        : null
                                }
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="text-capitalize total-dark-text">
                                    {props.cash_discount}
                                </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="text-capitalize total-light-text">Total Freight
                        </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                {
                                    props.type === "currency" ?
                                        <span className="text-capitalize total-light-text">{props.currency}</span>
                                        : null
                                }
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="total-dark-text">
                                    {props.total_freight}
                                </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="text-capitalize total-light-text">Total Weight
                        </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                {
                                    props.type === "currency" ?
                                        <span className="text-capitalize total-light-text">TON</span>
                                        : null
                                }
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="total-dark-text">
                                    {props.total_weight}
                                </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="text-capitalize total-light-text">Total Tax
                        </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                {
                                    props.type === "currency" ?
                                        <span className="text-capitalize total-light-text">{props.currency}</span>
                                        : null
                                }
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="total-dark-text">
                                    {props.total_tax}
                                </span>
                            </div>

                            <div className="col-sm-12 col-md-12 col-lg-12 borderLine mb-2 mt-2"></div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="text-capitalize total-light-text">TOTAL
                        </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                {
                                    props.type === "currency" ?
                                        <span className="text-capitalize total-light-text">{props.currency}</span>
                                        : null
                                }

                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="total-dark-text">
                                    26,602.00
                        </span>
                            </div>

                        </div >

                        :
                        <div className="row text-center">

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="text-capitalize total-light-text">Total Price
                            </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                {
                                    props.type === "currency" ?
                                        <span className="text-capitalize total-light-text">{props.currency}</span>
                                        : null
                                }
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="total-dark-text">
                                    {props.total_price}
                                </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="text-capitalize total-light-text">Total Discount
                            </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                {
                                    props.type === "currency" ?
                                        <span className="text-capitalize total-light-text">{props.currency}</span>
                                        : null
                                }
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="total-dark-text">
                                    {props.total_discount}
                                </span>
                            </div>

                            

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="text-capitalize total-light-text">Total Freight
                            </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                {
                                    props.type === "currency" ?
                                        <span className="text-capitalize total-light-text">{props.currency}</span>
                                        : null
                                }
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="total-dark-text">
                                    {props.total_freight}
                                </span>
                            </div>

                            

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="text-capitalize total-light-text">Total Tax
                            </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                {
                                    props.type === "currency" ?
                                        <span className="text-capitalize total-light-text">{props.currency}</span>
                                        : null
                                }
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="total-dark-text">
                                    {props.total_tax}
                                </span>
                            </div>

                            <div className="col-sm-12 col-md-12 col-lg-12 borderLine mb-2 mt-2"></div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="text-capitalize total-light-text">TOTAL
                            </span>
                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                {
                                    props.type === "currency" ?
                                        <span className="text-capitalize total-light-text">{props.currency}</span>
                                        : null
                                }

                            </div>

                            <div className="col-sm-4 col-md-4 col-lg-4">
                                <span className="total-dark-text">
                                    {props.total}
                            </span>
                            </div>

                        </div >


                }
            </div>
        </>
    );

}
export default TotalNetPrice;