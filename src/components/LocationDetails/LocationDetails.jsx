import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import "../AccountInformation/AccountInformation.scss";
import {Link} from "react-router-dom";


function LocationDetails(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();


    return (
        <>

            <div className="user_information">
                <div className="head">
                  <h5>{props.mainHeading}</h5> 

                  {
                  props.location === "alternate" ?
                      <span><Link to = "/AlternateLocationForm"><i className="fa fa-pencil"></i></Link></span>  
                      : null   
                }
                         
                </div>
               

               <div className="co-12 mt-3">
                    <div className="row account_title">
                        <div className="col-12">
                        <h6>{t("address.label")}  </h6>
                        </div>
                    </div>
                    <div className="row account_value pt-2">
                        <div className="col-12">
                        <h6>{props.address}</h6>
                        </div>         
                    </div>
                </div>

                <div className="co-12 mt-3">
                    <div className="row account_title">
                        <div className="col-4">
                        <h6>{t("region.label")} </h6>
                        </div>

                        <div className="col-4">
                        <h6>{t("province.label")} </h6>
                        </div>

                        <div className="col-4">
                        <h6>{t("district.label")}</h6>
                        </div>

                    </div>
                    <div className="row account_value pt-2">
                        <div className="col-4">
                        <h6>{props.region}</h6>
                        </div>
                        <div className="col-4">
                        <h6>{props.province}</h6>
                        </div>
                        <div className="col-4">
                        <h6>{props.district}</h6>
                        </div>          
                    </div>
                </div>  

                
                <div className="co-12 mt-3">
                    <div className="row account_title">
                        <div className="col-4">
                        <h6>{t("postalcode.label")} </h6>
                        </div>

                        <div className="col-6">
                        <h6>{t("googlemapcordinates.label")} </h6>
                        </div>

                    </div>
                    <div className="row account_value pt-2">
                        <div className="col-4">
                        <h6>{props.postalCode}</h6>
                        </div>
                        <div className="col-6">
                        <h6>{props.googleMap}</h6>
                        </div>            
                    </div>
                </div>         

            </div>
        </>
    );
}

export default withTranslation()(LocationDetails);
