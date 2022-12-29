import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import 'react-tabs/style/react-tabs.css';
import InputSearch from "../InputSearch/InputSearch";
import BarIcon from "../../assets/img/bar.svg";

function ShipMentHeadingSection(props) {
  const event = useSelector(state => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const clearallShipFilter = () => {
    window.location.reload()
  }

  console.log(event, "??????????")

     const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);

  return (
    <>
      <div className="col-12">
      <div className="title_head">
          <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-xs-12">
                  <h4 style={{fontSize: `${HeadingFontChange}px`}}>{props.title}</h4>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12 col-xs-12 text-right pl-0">
              <button className='clear_all' style={{border: '0px', backgroundColor: 'transparent', color: 'red',fontSize: `${HeadingFontChange}px`}} onClick={clearallShipFilter}>
                  {t('RefreshMyShip')}
                </button>   
              </div>
          </div>
        
      </div>
      </div>
      
    </>
  );
}
export default withTranslation()(ShipMentHeadingSection);

