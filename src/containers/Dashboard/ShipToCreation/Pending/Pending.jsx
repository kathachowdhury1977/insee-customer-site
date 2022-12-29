
import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import Header from "../../../../components/Header/Header";
import BasicInformation from "../Status/BasicInformation";
import OwnerDetails from "../Status/OwnerDetails";
import ContactDetails from "../Status/ContactDetails";
import "../Status.scss";
import StatusButton from "../Status/StatusButton";
// import OtherSoldPlan from "../Status/OtherSoldPlan";
import OrderThreeMonthSummary from "../Status/OrderThreeMonthSummary";
import StatusMap from "../Status/StatusMap";
import { Link } from "react-router-dom";




function Approval(props) {
    const { t } = useTranslation();
    const [validate, setValidate] = useState(false);
    const selectedDay = (val) => {
        console.log(val);
    };
    function onToggleChange(checked) {

        setValidate(checked)
    }

    function handleChange(event, name) {
        console.log(event, "event target", name);
    }
    function onSelectChange(event) {
        console.log(event);
    }

    return (
        <>
            <div className="content-wrapper">
                <Header />
                <div className="status_section">
                    <div className="co-12">
                       {/* <div className="row">
                           <div className="status_head">
                               <h5>East Bangkok Plant</h5>
                               <Link to ="">Add to Another sold to</Link>
                           </div>    
                        </div> */}
                        <div className="row">
                            <StatusButton status="Pending For Approval" class="pending"/>
                        </div>
                        <div className="row">
                            <div className="col-7 pl-1">
                                <BasicInformation/>
                                <OwnerDetails/>
                                <ContactDetails/>
                            </div>
                            <div className="col-5 pl-0 pr-1">
                              <OrderThreeMonthSummary/>                       
                              <StatusMap/>
                            </div>
                        </div>                   
                          <button className="back-btn"><Link to="/ShipToCreationDetail" className="text-white">Back</Link></button>
                    </div>  
                </div>
            </div>

        </>
    );
}

export default withTranslation()(Approval);