import React from "react";
import Header from "../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import PlainDiv from "../../../components/PlainDIv/PlainDiv";
import PlanType from '../../../assets/img/plantype.png';
import LandingToggle from '../../../components/ToggleMenu/LandingToggle';

function ViewVisitPlan() {
  const { t } = useTranslation();
  const selectedDay = (val) => {
    console.log(val);
  };
  return (
    <>
    <div className="content-wrapper">
      <Header />
      <div className="pb-5 pages_toggle">
           <LandingToggle/>
       </div>
      <div className="upcoming_detail_plan visit_guideline mt-3">
        <div className="plan_details">
          <div class="container-fluid">
            {/* <div className="main_heading">
              Suggested Visit Guideline for the month{" "}
            </div> */}
            <div className="row">
              <PlainDiv
                 
                class1={"col-6 text-left "}
                class2={"tiitle_name bold"}
                title={t("category")}
              />
              <PlainDiv
                class1={"col-6"}
                class2={"title_value bold"}
                title={"No. of Visit/Month"}
              />
            </div>
            <div className="row">
                <div className="col-6">
                  <div className="tiitle_name"><img src={PlanType} className="mr-2"/>Focus</div>
                </div>
                <div className="col-6">
                  <div className="title_value"> <span>3</span> Visit</div>
                </div>

            </div>
            <div className="row">
                <div className="col-6">
                  <div className="tiitle_name"><img src={PlanType} className="mr-2"/>Farming</div>
                </div>
                <div className="col-6">
                  <div className="title_value"> <span>3</span> Visit</div>
                </div>

            </div>

            <div className="row">
                <div className="col-6">
                  <div className="tiitle_name"><img src={PlanType} className="mr-2"/>Hunting</div>
                </div>
                <div className="col-6">
                  <div className="title_value"> <span>3</span> Visit</div>
                </div>

            </div>

            <div className="row">
                <div className="col-6">
                  <div className="tiitle_name"><img src={PlanType} className="mr-2"/>Small</div>
                </div>
                <div className="col-6">
                  <div className="title_value"> <span>3</span> Visit</div>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                  <div className="tiitle_name"><img src={PlanType} className="mr-2"/>Hot</div>
                </div>
                <div className="col-6">
                  <div className="title_value"> <span>3</span> Visit</div>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                  <div className="tiitle_name"><img src={PlanType} className="mr-2"/>Standard</div>
                </div>
                <div className="col-6">
                  <div className="title_value"> <span>3</span> Visit</div>
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                  <div className="tiitle_name"><img src={PlanType} className="mr-2"/>No Target</div>
                </div>
                <div className="col-6">
                  <div className="title_value"> <span>3</span> Visit</div>
                </div>
            </div>

          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default withTranslation()(ViewVisitPlan);
