import React, { useEffect, useState } from "react";
import { masterActions, orderActions } from "../../_actions";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import "react-tabs/style/react-tabs.css";
import FormSelectbox from "../FormSelectbox/FormSelectbox";
import "./OrderHeadingSection.scss";
import GoToCart from "../GoToCart/GoToCart";

function OrderHeadingSection(props) {
 
  const { t } = useTranslation();
  let userName = localStorage.getItem('userData');
  userName = JSON.parse(userName);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);


  return (
    <>
      <div className="col-12">
        <div className="title_head order_heading">
          <div className="row">
            <div className="col-xl-3 col-lg-5 col-md-5 col-sm-12 col-xs-12 head_sec">
              <h4 style={{fontSize: `${HeadingFontChange}px`}}>{props.title}</h4>
            </div>
            <div className="col-xl-9 col-lg-7 col-md-7 col-sm-12 col-xs-12 text-right">
            {(props.showcartbutton === true) ?
                <GoToCart />
                :
                null
              }
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(OrderHeadingSection);
