import React, { useEffect } from "react";
import { eventActions } from "../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../components/Header/Header";
import VisitCounter from "../../../components/VisitCounter/VisitCounter";
import UpcomingPlan from "../../../components/UpcomingPlan/UpcomingPlan";
import ModalBox from "../../../components/ModalBox/ModalBox";
import { withTranslation, useTranslation } from "react-i18next";
import banger from "../../../assets/img/banger.jpeg";
import { Link } from "react-router-dom";
import LandingToggle from '../../../components/ToggleMenu/LandingToggle';

function VisitPlan() {
  const event = useSelector(state => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  

  console.log(event, "??????????")
  return (
    <>
    <div className="content-wrapper">
      <Header />

      <div class="upcoming_detail_plan today_plan">
   

        <div className="planned_visit">
        <section class="content-header">
          <h3 class="box-title">Planned Visit</h3>
          <div className="plan_date_calender">
            {/* <span className="date">Dec-14, 2020</span>   */}
                {/* <input type="date"/>     */}
               <Link to="/AddVisit"><span className="add_hoc"><i class="fa fa-plus-circle" aria-hidden="true"></i> Add Ad Hoc</span></Link>
          </div>
          <LandingToggle/>
         
        </section>

        <section class="content">
          <div class="row">
            <VisitCounter counter={1} name={t("focus.label")} />
            <VisitCounter counter={7} name={t("hunting.label")} />
            <VisitCounter counter={10} name={t("farming.label")} />
            <VisitCounter counter={21} name={t("small.label")} />
            <VisitCounter counter={12} name={t("hot.label")} />
            <VisitCounter counter={50} name={t("stand.label")} />
          </div>
        </section>
        </div>

       
          <div class="col-md-12">
            <div className="row">
              <div className="col-7 pr-0">
              <div class="box">
              <div class="box-header with-border">
                <h3 class="box-title">{t("upcomingPlan.heading")}</h3>

                {/* <div class="box-tools pull-right">
                  <a href="">See All</a>
                </div> */}
              </div>
              <div class="box-body">
                <div class="row">
                  <UpcomingPlan
                    image={banger}
                    class={"col-sm-12 col-md-12 col-lg-12"}
                    src={"/PlanDetail"}
                    title={"Bungur Enterprises"}
                    contact={"65478-79879"}
                    amv={"3000 Tons"}
                    inseeGrowth={"20%"}
                    inseeSow={"50%"}
                  />
                  <UpcomingPlan
                    image={banger}
                    class={"col-sm-12 col-md-12 col-lg-12"}
                    src={"/PlanDetail"}
                    title={"For test"}
                    contact={"+91-9045106630"}
                    amv={"500 Tons"}
                    inseeGrowth={"50%"}
                    inseeSow={"30%"}
                  />
                </div>
              </div>
            </div>
              </div>
              <div className="col-5">
                <div class="box">
                <div class="box-header with-border">
                  <h3 class="box-title">Activity Map</h3>
                </div>
                <div class="box-body">
                  <img
                    src="https://i.pcmag.com/imagery/lineupitems/05cbl9chMRllUbsVdHbHUXj.1569506187.fit_lim.size_1050x578.jpg"
                    width="100%"
                    height="auto"
                  />
                </div>
              </div>
              </div>
            </div>       
          </div>
        </div>
      </div>

      <ModalBox title={"ModalBox"} />
    </>
  );
}

export default withTranslation()(VisitPlan);
