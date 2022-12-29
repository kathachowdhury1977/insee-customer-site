import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../../containers/Dashboard/LogisticsDelivery/ShipmentManagement/ShipMent.scss";
import PerformanceChart from "../PerformanceChart/PerformanceChart";
import PerformanceRadio from "../PerformanceRadio/PerformanceRadio";
import PerformanceTargetChart from "../PerformanceTargetChart/PerformanceTargetChart";



function MonthlyYearly(props) {
    const { t } = useTranslation();


    return (
        <>
            <div className="Shipment_managment">
                <Tabs>
                    <TabList>
                        <Tab>{t("tab.monthly")}</Tab>
                        <Tab>{t("tab.yearly")}</Tab>
                    </TabList>

                    <PerformanceRadio />
                    <TabPanel>
                        <div className="row mb-5">
                            <div className="col-6">
                                <PerformanceChart
                                    titleName={t("momvolumetoncomparison.graphchart")}
                                    monthType="Last 6 Months"
                                    monthDiv="true"
                                />
                            </div>
                        </div>

                    </TabPanel>
                    <TabPanel>
                        <div className="row mb-5">
                            <div className="col-6">
                                <PerformanceTargetChart
                                    titleName={t("targetactualvolume.graphchart")}
                                    monthType="Last 3 Year"
                                    monthDiv="false" />
                            </div>
                            <div className="col-6">
                                <PerformanceChart
                                    titleName={t("momvolumetoncomparison.graphchart")}
                                    monthType="Last 6 Months"
                                    monthDiv="true"
                                />
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </>
    );
}

export default withTranslation()(MonthlyYearly);
