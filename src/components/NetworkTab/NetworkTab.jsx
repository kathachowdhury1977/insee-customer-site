import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import MonthlyYearly from "../MonthlyYearly/MonthlyYearly";
import FormSelectbox from "../FormSelectbox/FormSelectbox";
import "./NetworkTab.scss";


function NetworkTab() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    
    function onSelectChange(event) {
        console.log(event);
    }

    return (
        <>
            <div className="netwok_tab">
            
                            <div className="formBox">
                                <FormSelectbox
                                    name={"visitmode"}
                                    class={"input"}
                                    onSelectChange={onSelectChange}
                                    label={t("Shee Cement Enterprises 10000")}
                                    data={"data"}
                                />
                            </div>
                    
                <MonthlyYearly/>
            </div>
        </>
    );
}

export default withTranslation()(NetworkTab);
