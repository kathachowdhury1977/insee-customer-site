import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import phone from "../../assets/img/phone.svg";
import map from "../../assets/img/map.svg";
import navigate from "../../assets/img/add_map.svg";
import progress from "../../assets/img/month_phone.svg";
import progress1 from "../../assets/img/month_simple.svg";
import plan from "../../assets/img/watch.svg";

function UpcomingPlan(props) {
  const { t } = useTranslation();

  return (
    <>
      <div className={props.class}>
        <Link to={props.src}>
          <div className="card">
            {/* <span className="planned"><img src={plan}/> 10:00AM &nbsp; &nbsp; Planned</span> */}
            <div className="row">
              <div className="section-item">
                <div className="col-sm-2 col-md-2">
                  {" "}
                  <img src={props.image} className="rounded" width="155" />{" "}
                </div>
                <div className="col-sm-7 col-md-7 sec_details">
                  <h4 className="mb-2">{props.title}</h4>
                  <span className="number mb-2">{props.contact}</span>
                  <span className="focus mb-2">Focus</span>
                  <span className="address">
                    {" "}
                    <img src={navigate} /> New Delhi | Distributor
                  </span>
                </div>
                {props.graph !== "none" ? 
                (<div className=" col-sm-3 col-md-3 sec_details text-right">
                  <div class="information">
                    <span className="navigation">
                      <img src={map} />
                      <span>{"Navigate"}</span>
                    </span>
                    <span className="call">
                      <img src={phone} />
                      <span>{"Call"}</span>
                    </span>
                  </div>
                </div>): null}
              </div>
            </div>
            <div className="cemenet_type">
              <div className="progress-sec">
                <ul className="container-fluid">
                  <div className="row w-100">
                    {props.graph !== "none" ? 
                    (<><div className="col-3">
                      <span className="qty_sec">
                        <div class="qty">
                          <span>800B</span>
                          <img src={progress} />
                          <span>Sep</span>
                        </div>
                        <div class="qty qty1">
                          <span>1000B</span>
                          <img src={progress1} />
                          <span>Oct</span>
                        </div>
                        <div class="qty">
                          <span>800B</span>
                          <img src={progress} />
                          <span>Nov</span>
                        </div>
                      </span>
                    </div> </>):null}
                    <div className= {props.graph !== "none" ? "col-9 pr-0":"col-12 pr-0 "}>
                      <div className="row">
                        <li className="col-sm-4 col-lg-4 col-md-4">
                          <div className="process-type">
                            <p>{t("amv.label")}</p>
                            <span>
                              <b>{props.amv}</b>
                            </span>
                          </div>
                        </li>
                        <li className="col-sm-4 col-lg-4 col-md-4">
                          <div className="process-type">
                            <p>{t("inseeGrowth.label")}</p>
                            <span className="percentage">
                              {props.inseeGrowth}
                            </span>
                          </div>
                        </li>

                        <li className="col-sm-4 col-lg-4 col-md-4">
                          <div className="process-type">
                            <p>{t("inseeSow.label")}</p>
                            <span className="percentage">{props.inseeSow}</span>
                          </div>
                        </li>
                      </div>
                    </div>
                  </div>
                </ul>
              </div>

              <div className="cement-sec">
                <a href="" className="sc_cement">
                  SCG Cement
                  <br />
                  <h6 className="text-white text-center">20%</h6>
                </a>
                <a href="" className="thai_cement">
                  Thai Pride Cement
                  <br />
                  <h6 className="text-white text-center">20%</h6>
                </a>
                <a href="" className="asia_cement">
                  Asia Cement
                  <br />
                  <h6 className="text-white text-center">20%</h6>
                </a>
                <a href="" className="thai_cement">
                  Thai Pride Cement
                  <br />
                  <h6 className="text-white text-center">20%</h6>
                </a>
                <a href="" className="asia_cement">
                  Asia Cement
                  <br />
                  <h6 className="text-white text-center">20%</h6>
                </a>
              </div>
            </div>

            <div className="status">
              {t("lastcaptured.label")} <span>20-11-2020</span> {t("by.label")}{" "}
              <span>Jhon Smith</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
export default withTranslation()(UpcomingPlan);
