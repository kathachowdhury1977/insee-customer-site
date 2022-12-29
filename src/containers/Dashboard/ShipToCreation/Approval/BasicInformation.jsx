
import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "../Status.scss";



function BasicInformation(props) {
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
            <div className="main-box">
                <p className="heading">
                    Basic Information
                </p>       
               <div className="row pl-3 pr-3">
                   
                    <div className="col-3">
                        <div className="box-item">
                             <p>Ship to Name (EN)</p>
                              <h4>East Bangkok Plant </h4>
                        </div>
                    </div>
                    <div className="col-3">
                    <div className="box-item">
                             <p>Ship to Name (Local)</p>
                              <h4>124585691 </h4>
                        </div>
                    </div>
                    <div className="col-3">
                         <div className="box-item">
                             <p>Group Company </p>
                              <h4>SCC </h4>
                        </div>
                    </div>
                    <div className="col-3">
                    <div className="box-item">
                             <p>Month Potential (Tons) </p>
                              <h4>5000</h4>
                        </div>
                    </div>
                    <div className="col-3">
                    <div className="box-item">
                             <p>Sales District </p>
                              <h4>N1</h4>
                        </div>
                    </div>
                    <div className="col-3">
                       <div className="box-item">
                             <p>Good Receiving Hours </p>
                              <h4>18:00</h4>
                        </div>
                    </div>

                    <div className="col-5">
                       <div className="box-item">
                             <p>Address </p>
                              <h4>1177 Pearl bangkok, 23rd floor, phaholyothin road, Bangkok 10400</h4>
                        </div>
                    </div>
               </div>
            </div>

        </>
    );
}

export default withTranslation()(BasicInformation);