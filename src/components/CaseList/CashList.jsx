import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";

function CashList(props) {
  const { t } = useTranslation();

  return (
    <>
      <div className={props.class}>
        <Link to={props.src}>
          <div className="shipmentList">
             <div className="row">
              <div className="section-item">
                
                <div className="col-sm-12 col-md-12 sec_details">
                {/* <h4 className="mb-2">ABC Enterprise :  <span className="number mb-2">123456</span></h4> */}
                  <h4 className="mb-2">{t("caseid.title")} : {props.caseid}</h4>
                  <span className="number mb-2">Last Delivery</span>
                  
                  <span className="address">
                    {" "} Order Placed but not delivered on time.
                  </span>
                </div>
               
              </div>
            </div>
            <div className="cemenet_type">
              {/*  */}

              <div className="cement-sec">
                <a href="" className="col-sm-3 sc_cement">
                  Complaint
                 </a>
                <a href="" className="col-sm-3 thai_cement">
                  3 Days
                 </a>
                <a href="" className="col-sm-3 asia_cement">
                  In-progress
                  </a>
               
              </div>
              <div className="progress-sec">
                <ul className="container-fluid">
                  <div className="row w-100">
                    
                    <div className="col-12 pr-0">
                      <div className="row">
                        <li className="col-sm-6 col-lg-6 col-md-6 margin-top">
                          <div className="process-type">
                            <p>{t("createdate&time.boxtype")}</p>
                            <span>
                              <b>{props.amv}</b>
                            </span>
                          </div>
                        </li>
                        <li className="col-sm-6 col-lg-6 col-md-6 margin-top">
                          <div className="process-type">
                            <p>{t("caseorigin.boxtype")}</p>
                            <span className="percentage">
                              {props.inseeGrowth}
                            </span>
                          </div>
                        </li>
                        
                      </div>
                    </div>
                  </div>
                </ul>
              </div>
            </div>

          </div>
        </Link>
      </div>
    </>
  );
}
export default withTranslation()(CashList);
