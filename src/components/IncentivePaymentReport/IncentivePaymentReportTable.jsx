import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import Pagination from "@material-ui/lab/Pagination";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loader/Loading'

function IncentivePaymentReportTable(props) {
    const { t } = useTranslation();


    const rightTabStyle = {
        paddingTop: "10px",
        borderTopRightRadius: "25px",
        borderBottomRightRadius: "25px",
        borderRight: "2px solid rgba(0, 0, 0, 0.05)",
        borderTop: "2px solid rgba(0, 0, 0, 0.05)",
        borderBottom: "2px solid rgba(0, 0, 0, 0.05)",
        textAlign: "center",

    }
    const leftTabStyle = {
        paddingTop: "10px",
        borderTopLeftRadius: "25px",
        borderBottomLeftRadius: "25px",
        borderLeft: "2px solid rgba(0, 0, 0, 0.1)",
        borderTop: "2px solid rgba(0, 0, 0, 0.1)",
        borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
        backgroundColor: "blue",
        textAlign: "center",
        color: "white"
    }


    const incentivePaymentReport = useSelector((state) => state.getIncentivePaymentReports.getIncentivePaymentReports);
    const isPageLoading = useSelector((state) => state.getIncentivePaymentReports.loading);

    console.log(incentivePaymentReport, 'incentivePaymentReport---')

    return (
        <>
            {/* <div> <span style={{ color: "red", margin: "10px" }}>* For payment method off invoice & Free Cement: So Validilty is just valid within 2 months since creation date</span></div>
            <div className="row" style={{ margin: "10px" }}>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" style={leftTabStyle} >
                    <h5><b>{t("Off Invoice & Free Charge")}</b></h5>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" style={rightTabStyle} >
                    <h5><b>{t("Offset & Price Adjustment")}</b></h5>
                </div>
            </div> */}


            {/* <div className="list_tems bg-light"> */}
                <FormControl component="fieldset" className="ml-4">
                    <RadioGroup row aria-label="onChangeDivision" name="onChangeDivision" defaultValue={props.division} className="filterRedio">
                        <FormControlLabel
                            value="OD"
                            control={<Radio color="primary" />}
                            label={t("OD")}
                            onChange={props.onChangeDivision}

                        />

                        <FormControlLabel
                            value="Retailer"
                            control={<Radio color="primary" />}
                            label={t("Retailer")}
                            onChange={props.onChangeDivision}

                        />
                    </RadioGroup>
                </FormControl>
            {/* </div> */}
            <div className="row mt-3 case-report-table" style={{ marginLeft: '10px', marginRight: '10px' }}>
                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 pl-0 pr-0">
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                
                                <th scope="col">{t("Payment Date")}</th>
                                <th scope="col">{t("Internal Note")}</th>
                                <th scope="col">{t("Payment Method")}</th>
                                <th scope="col">{t("Payment Amount(Before VAT)")}</th>
                                <th scope="col">{t("Payment Amoutn(After VAT)")}</th>
                                <th scope="col">{t("Billing Number")}</th>
                                <th scope="col">{t("SO Number")}</th>
                                <th scope="col">{t("Material")}</th>
                                <th scope="col">{t("Ship-to-name")}</th>
                                <th scope="col">{t("Plant")}</th>
                                <th scope="col">{t("Shipping Condition")} </th>
                                <th scope="col">{t("Shipping Type")} </th>
                                <th scope="col">{t("Order Qty(ton)")} </th>
                                <th scope="col">{t("Dispatched Qty")} </th>
                                <th scope="col">{t("Open DO Qty")} </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               !isPageLoading ? incentivePaymentReport && incentivePaymentReport.totalCount > 0 ?
                                 incentivePaymentReport && incentivePaymentReport.results.map((item, i) => {
                                    return (
                                        <tr>
                                            <td>{item.paymentDate}</td>
                                            <td>{item.internalNote}</td>
                                            <td>{item.paymentMethod}</td>
                                            <td>{item.paymentAmountBeforeVAT}</td>
                                            <td>{item.paymentAmountAfterVAT}</td>
                                            <td>{item.billingNumber}</td>
                                            <td>{item.soNumber}</td>
                                            <td>{item.material}</td>
                                            <td>{item.shipToName}</td>
                                            <td>{item.plantName}</td>
                                            <td>{item.shippingCondition}</td>
                                            <td>{item.shippingType}</td>
                                           
                                        
                                    </tr>
                                    )
                                }) :<div className="no_record_table">{t("lable.norecordfound")}</div>
                                :
                                <div className='loading'>
                                <Loading />
                            </div>
                                
                                // !(incentivePaymentReport.incentivePaymentReport && incentivePaymentReport.incentivePaymentReport.length > 0)
                                // ? <div className="no_record_table">{t("lable.norecordfound")}</div> : null) 
                                
                            }
                           

                        </tbody>
                    </table>

                </div>
            </div>

            <div className="row ">

                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12">
                {incentivePaymentReport && incentivePaymentReport && incentivePaymentReport.totalCount ?
                        <Pagination count={Math.ceil(incentivePaymentReport && incentivePaymentReport && incentivePaymentReport.totalCount / 10)} page={props.page} onChange={props.handleChangePage} />
                        : null}

                </div>
            </div>

        </>
    );
}
export default withTranslation()(IncentivePaymentReportTable);
