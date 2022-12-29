import React from "react";
import Header from "../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import planTypeImage from  '../../../assets/img/plantype.png';
import planImage from '../../../assets/img/logos.png';


function LeadsItem() {
  const { t } = useTranslation();
  const selectedDay = (val) => {
    console.log(val);
  };
  return (
    <>
          <div className="suggest_sec mb-3">
                  <div className="row">
                      <div className="col-1"><div className="img_logo"> <img src ={planImage}/></div></div>
                      <div className="col-10">
                          <div className="row plan_sec">
                            <span className="col-5 plan_head">S.S Enterprises Group of Companies</span>
                            <div className="plan_txt col-5">
                            <img className="plan_image" src={planTypeImage}/>
                                <span className="plan_type">Hunting</span>                         
                                </div>
                          </div>
                        </div>
                      <div className="col-1 submit_check">
                      <div class="form-group">
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                        </div>
                      </div>
                  </div>
             </div>     
    </>
  );
}

export default withTranslation()(LeadsItem);
