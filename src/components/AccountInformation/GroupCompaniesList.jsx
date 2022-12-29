import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import "./AccountInformation.scss";
function GroupCompaniesList(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    ///console.log('propsprops',props.cotactList);
    const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
    return (
        <>
            <div className="row account_value pt-2">
                <div className="col-5 text-left"><h6 style={{fontSize: `${SmallFontChanger}px`}}>
                    {props.accountName}</h6></div>
                <div className="col-4"><h6 style={{fontSize: `${SmallFontChanger}px`}}>{props.companyList.accountID}</h6> </div>
                {/* <div className="col-3 pl-0"><h6>{props.companyList.creditControlArea}</h6></div> */}
            </div>


        </>
    );
}
export default withTranslation()(GroupCompaniesList);