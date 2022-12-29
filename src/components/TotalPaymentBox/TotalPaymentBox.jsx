
import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./TotalPaymentBox.scss"

function TotalPaymentBox(props) {
    const selectedLangCode = localStorage.getItem('lancode');
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

            <div className="row totalpayment_box_container">
                <div className="col-6 text-left pb-4 pt-4 rounded-left" style={{ backgroundColor: "#ccc" }}>
                    <p className="bigText mb-1">{t("label.total_amount")}</p>
                </div>
                <div className="col-6 text-right pb-4 pt-4 rounded-right" style={{ backgroundColor: "#ccc" }}>
                    <p className="bigText mb-1">
                    {selectedLangCode === 'en' || selectedLangCode === null ? 
                              `(${props.docCurrencyData})`
                              : props.docCurrencyData === 'THB' ? '(บาท)' :
                              props.docCurrencyData === 'USD' ? '(ดอลล่าร์)' :  `(${props.docCurrencyData})`
                                       
                             }
                     {' '}
                    {  
                    
                    Number(parseFloat(props.totalMakePayment).toFixed(2)).toLocaleString('en', {
                        minimumFractionDigits: 2
                    })
                  
                        //(parseFloat(props.totalMakePayment).toFixed(2))
                        
                       
                    }
                    
                    
                    </p>
                </div>
            </div>

        </>
    );
}

export default withTranslation()(TotalPaymentBox);