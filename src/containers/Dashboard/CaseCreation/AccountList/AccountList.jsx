import React, { useEffect } from "react";
import { eventActions } from "../../../../_actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import FormSelectbox from "../../../../components/FormSelectbox/FormSelectbox";
import CashList from "../../../../components/CaseList/CashList";
import UpcomingPlan from "../../../../components/UpcomingPlan/UpcomingPlan";
import { withTranslation, useTranslation } from "react-i18next";
import "./AccountList.scss";
import banger from "../../../../assets/img/banger.jpeg";
import { Link } from "react-router-dom";

const buttonwidth = {
  width: "100%",
};
function CaseList() {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const fromDate = "01-01-2019";

  const toDate = "01-12-2020";

  function createCase() {
    history.push("/CreateCase");
  }
  return (
    <>
      <div className="content-wrapper">
        <Header title={t("accountlist.label")} />

        <div class="upcoming_detail_plan today_plan">
          <div className="planned_visit create_list">
            <section class="content-header">
              <div className="row">
                <div className="col-sm-2 col-lg-2 col-md-2">
                  <h3 class="box-title">{t("accountlist.label")}</h3>
                </div>
                <div className="col-sm-6 col-lg-6 col-md-6"></div>
                <div className="col-sm-4 col-md-4 col-lg-4">
                  <SearchBox />
                </div>
              </div>
            </section>
          </div>

          <div class="col-md-12 create_list_item">
            <div className="col-12 pr-0 pl-0">
              <div class="box">
                <div class="box-body">
                  <div class="row">
                    <UpcomingPlan
                      image={banger}
                      class={"col-sm-6 col-md-6 col-lg-6"}
                      src={"/AccountDetail"}
                      title={"Bungur Enterprises"}
                      contact={"65478-79879"}
                      amv={"3000 Tons"}
                      inseeGrowth={"20%"}
                      inseeSow={"50%"}
                      graph={"none"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(CaseList);
