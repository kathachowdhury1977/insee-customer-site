
import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "../Status.scss";



function ContactDetails(props) {
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
                    Contact Personal Details
                </p>       
               <div className="row pl-3 pr-3">
                   
                    <div className="col-3">
                        <div className="box-item">
                             <p>Name </p>
                              <h4>John Oliver </h4>
                        </div>
                    </div>
                
                    <div className="col-3">
                         <div className="box-item">
                             <p>Phone Number</p>
                              <h4>+8100 528 20 </h4>
                        </div>
                    </div>
                    <div className="col-3">
                    <div className="box-item">
                             <p>Mobile </p>
                              <h4>+8100 528 20</h4>
                        </div>
                    </div>
                    <div className="col-12">
                    <div className="box-item">
                             <p>Email </p>
                              <h4>oliver.john@gmail.com</h4>
                        </div>
                    </div>
                  
               </div>
            </div>

        </>
    );
}

export default withTranslation()(ContactDetails);