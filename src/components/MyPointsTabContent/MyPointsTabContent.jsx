import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../FormInput/FormInput";
import MyPointsLeftBox from "../MyPointsLeftBox/MyPointsLeftBox";
import { Link } from "react-router-dom";
import MypointsChart from "../MypointsChart/MypointsChart";
import axios from "axios";
import { points as chartData } from "../MypointsChart/Data";
//import { process.env.REACT_APP_API_URL_LOYALTY } from "../../constant";
import moment from 'moment'
import 'moment-timezone'

import DatePickers from "../FormInput/DatePicker"

function toParams(obj) {
  let params = [];
  for (let [k, v] of Object.entries(obj))
    params.push(String(k) + "=" + String(v));
  return "?" + params.join("&");
}

function mapper(objArr) {
  return objArr.map(({ earnedPoints: e, redeemedPoints: r, month }) => ({
    month,
    earnedPoints: Number(e.replaceAll(",", "")),
    redeemedPoints: Number(r.replaceAll(",", "")),
  }));
}

function MyPointsTabContent({ userData }) {
  const event = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [data, setData] = useState();

  var userName =  localStorage.getItem('userData')
  userName = JSON.parse(userName);
var userRole = userName && userName.userRole

  var curruntData = moment().format('YYYY-MM-DD')
  var dateFrom = moment().subtract(3,'months').format('YYYY-MM-DD')
  

  useEffect(() => { debugger
   
      const 
        fromDate = start ? start : dateFrom,
        toDate = end? end : curruntData,
        customerId = localStorage.CustomerNumber,
        isDealer = userRole === "Retailer" ? false : true;

      fetch(
        process.env.REACT_APP_API_URL_LOYALTY +
          "earnedPoints/graph" +
          toParams({ fromDate, toDate, customerId, isDealer }),
        {
          headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
            'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
          },
        }
      )
        .then((resp) => resp.json())
        // .then((data) => {
        //   alert(JSON.stringify(data));
        //   return data;
        // })
        .then((data) => {
          if(data.status === 420) {
            return
          }
          else {
            setData(mapper(data.data))
          }

        })
        
        
        .catch(alert);
    
  }, [start, end]);

  const handleStartDate = (event) => {

    setStart(event.target.value)
  }

  const handleEndDate = (event) => {
    setEnd (event.target.value)
  }

  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)

  return (
    <>
      <div className="row mypoints-tab-content">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <MyPointsLeftBox userData={userData} />

          <div className="row mt-3">
            <div className="col-sm-12 col-md-12 col-lg-12 text-center">
              <a  className={"createButton"} target="_blank" href="http://uat.insee.life/insee-loyalty-line/#/" style={{fontSize: `${HeadingFontChange}px`}}>
                {" "}
                {t("label.redeem_points")}
              </a>
              <Link className={"cancelButton"} to="/MyPointsLanding" style={{fontSize: `${HeadingFontChange}px`}}>
                {" "}
                {t("label.my_points")}
              </Link>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="row">
                <div className="col-sm-6 col-md-6 col-lg-6">
                  <div className="form_section">
                    <div className="inputBox">
                      <label style={{fontSize: `${FontChange}px`}}>{t("label.start_date")}</label>
                      <DatePickers 
                       id="startdate"
                       onChange={handleStartDate}
                       defaultValue = {dateFrom}
                      />
                      {/* <FormInput
                        type="date"
                        class="input"
                        name="start"
                        onChange={(e) => e && setStart(e)}
                        label={t("eventname.label")}
                      
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6">
                  <div className="form_section">
                    <div className="inputBox">
                      <label style={{fontSize: `${FontChange}px`}}>{t("label.end_date")}</label>
                      {/* <FormInput
                        type="date"
                        class="input"
                        name="end"
                        placeholder={t('d')}
                        onChange={(e) => e && setEnd(e)}
                        label={t("eventname.label")}
                      /> */}
                       <DatePickers 
                       id="enddate"
                       defaultValue = {curruntData}
                       onChange={handleEndDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12">
              {
                data ? <MypointsChart chartData={data} /> : 
                <div style={{textAlign: "center", marginTop: 30}}>No Data Found </div>
              }
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(MyPointsTabContent);
