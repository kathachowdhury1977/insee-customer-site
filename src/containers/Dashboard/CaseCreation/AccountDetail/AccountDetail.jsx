import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import Header from "../../../../components/Header/Header";
import AccountDetailTab from "../../../../components/Tabs/AccountDetailTab"

function AccountDetail(props) {
    const { t } = useTranslation();
    const [validate, setValidate] = useState(false);
 
   

    return (
        <>
        <div className="content-wrapper">
          <Header />
            <div className="upcoming_detail_plan">
                <div className="container-fluild mt-2 List_detail_page">
                    <div className="row">
                         <AccountDetailTab /> 
                    </div>
                </div>
            </div>
            </div>

        </>
    );
}

export default withTranslation()(AccountDetail);