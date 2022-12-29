import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "./MyPointsLeftBox.scss";
//import { process.env.REACT_APP_API_URL_LOYALTY } from "../../constant";



function MyPointsLeftBox({ userData }) {
  const event = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { customerId, customerName, ...data } = userData;

  const userRole = JSON.parse(localStorage.userData).userRole;

 

  function dateFormatting(input) {
    return input ? input.toString().split("-").reverse().join("-") : "";

  }

  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)

  const displayedFontSize = {fontSize: `${FontChange}px`};
  return (
    <>
      <div className="mypoints-leftbox-container">
        <div className="row parent-graybox">
          {/* {userRole === 'Retailer' ?
           <div className="col-sm-12 col-md-12 col-lg-12 green-box">
            <p className="big-text">{data.expiry && data.points}</p>
            <p className="small-text">{t("label.total_points")}</p>
          </div>  : null } */}
          <div className="gray-boxs">
            <div className="row">
              <div className="col-sm-9" style={{ paddingLeft: "10px",paddingBottom:"5px" }}>
                <p style={displayedFontSize}>{t("label.points_expiry_date")} </p>
              </div>
              <div className="col-sm-3" style={{ paddingLeft: "10px" }}>
                 <p style={displayedFontSize}>{data.expiry && dateFormatting(data.expiry.date)}</p>
              </div>
            </div>


            <div className="row">
              <div className="col-sm-9" style={{ paddingLeft: "10px",paddingBottom:"5px" }}>
                <p style={displayedFontSize}>{t("Pts")} </p>
              </div>
              <div className="col-sm-3" style={{ paddingLeft: "10px" }}>
                <p style={displayedFontSize}>{data.expiry && parseFloat(data.expiry.points).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              </div>
            </div>



          </div>
        </div>


        <div className="row parent-graybox mt-2">

          <div className="gray-boxs">

            <div className="row">
              <div className="col-sm-9" style={{ paddingLeft: "10px",paddingBottom:"5px" }}>
                <p style={displayedFontSize}>{t("label.last_points_created")}</p>
              </div>
              <div className="col-sm-3" style={{ paddingLeft: "10px" }}>
                <p style={displayedFontSize}>{data.expiry && dateFormatting(data.credit.date)}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-9" style={{ paddingLeft: "10px",paddingBottom:"5px" }}>
                <p style={displayedFontSize}>{t("Pts")} </p>
              </div>
              <div className="col-sm-3" style={{ paddingLeft: "10px" }}>
                <p style={displayedFontSize}>{data.expiry && parseFloat(data.credit.points).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              </div>
            </div>
          </div>
          <span className="bottom-label mt-2"   style={{fontSize: `${FontChange}px`}}>
            {t("label.point_are_based_on_the_volume")}
          </span>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(MyPointsLeftBox);
