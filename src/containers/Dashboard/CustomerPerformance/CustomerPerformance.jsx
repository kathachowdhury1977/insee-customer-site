import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import Header from "../../../components/Header/Header";
import ShipMentHeadingSection from "../../../components/ShipMentHeadingSection/ShipMentHeadingSection";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MonthlyYearly from "../../../components/MonthlyYearly/MonthlyYearly";
import TonCircle from "../../../components/TonCircle/TonCircle";
import NetworkTab from "../../../components/NetworkTab/NetworkTab";
import "./CustomerPerformance.scss";


function CustomerPerformance() {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    return (
        <>
            <div className="content-wrapper">
                <Header title={t("heading.customerperformance")} />

                <div class="row">
                    <div className="mainScroll">
                        <div className="customer_performance_sec">
                            <ShipMentHeadingSection title={t("label.performance")} />
                            <div className="col-12">
                                <Tabs>
                                    <TabList>
                                        <Tab>{t("tab.self")}</Tab>
                                        <Tab>{t("tab.network")}</Tab>
                                    </TabList>
                                    <TabPanel>
                                        <MonthlyYearly/>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="network_section">
                                            <h5>{t("label.topshiptoperformer")}</h5>
                                            <span className="sub_txt">{t("sublabel.basedonvolume")}</span>
                                            <TonCircle/>                                         
                                        </div>
                                        <NetworkTab/>
                                    </TabPanel>
                                </Tabs>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default withTranslation()(CustomerPerformance);
