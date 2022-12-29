import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";

function CaseReportTable(props) {
    const { t } = useTranslation();

    return (
        <>
            <div className="row mt-3 case-report-table">
                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 pl-0 pr-0">
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">{t("Case Number")}</th>
                                <th scope="col">{t("Created On")}</th>
                                <th scope="col">{t("Case Owner")}</th>
                                <th scope="col">{t("Created By")}</th>
                                <th scope="col">{t("SLA Due Date & Time")}</th>
                                <th scope="col">{t("Subject")}</th>
                                <th scope="col">{t("Account Name")}</th>
                                <th scope="col">{t("Account Id")}</th>
                                <th scope="col">{t("Closed Date")}</th>
                                <th scope="col">{t("Age(Hours)")}</th>
                                <th scope="col">{t("Status")}</th>
                                <th scope="col">{t("Case Origin")} </th>
                                <th scope="col">{t("Case Type")} </th>
                                <th scope="col">{t("Case Category")} </th>
                                <th scope="col">{t("Case Sub Category")} </th>
                                <th scope="col">{t("Description")} </th>
                                <th scope="col">{t("Priority")} </th>
                                <th scope="col">{t("Star Rating")} </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row">
                                    <span className="text-red">
                                        <b>100000000011</b>
                                    </span>
                                </td>
                                <td><span>28-09-2020 10:15 AM</span></td>
                                <td><span>Nguyen Hoang Dung</span></td>
                                <td><span>28-09-2020 10:15 AM</span></td>
                                <td><span>Late Delivery</span></td>
                                <td><span>ABC Enterprises</span></td>
                                <td><span>1121</span></td>
                                <td><span>28-09-2020 10:15 AM</span></td>
                                <td><span>Thornton</span></td>
                                <td><span>2</span></td>
                                <td><span>Resolved</span></td>
                                <td><span>Email Internal</span></td>
                                <td><span>Request</span></td>
                                <td><span>Customer Service</span></td>
                                <td><span>ABC</span></td>
                                <td>Order placed but not able to track...</td>
                                <td><span>High</span></td>
                                <td><span>3</span></td>
                            </tr>

                        </tbody>
                    </table>

                </div>
            </div>

        </>
    );
}
export default withTranslation()(CaseReportTable);
