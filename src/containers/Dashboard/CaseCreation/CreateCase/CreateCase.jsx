import React, { useEffect } from "react";
import Header from "../../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import CreateCaseField from '../../../../components/CreateCase/CreateCase';
import { eventActions } from "../../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
function CreateCase() {
  // event = useSelector(state => state);
  const eventMode = useSelector(state => state.eventMode);
  const eventObjective = useSelector(state => state.eventObjective);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const padding = {
    paddingLeft: "15px"
    , paddingRight: "15px"
    , paddingTop: "15px"
    , paddingBottom: "30px"
  }
  //console.log("eventObjective", eventmodeData, eventObjectiveData)
  return (
    <>
      <div className="content-wrapper">
        <Header title="" />

        <div className="row ipad_css">
          <div className="mainScroll">
            <div class="add_visit_pg" style={padding}>
              <h5 className="text-black">{t("createcase.heading")}</h5>
              <div className="visit_sec mt-4">
                <CreateCaseField />
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default withTranslation()(CreateCase);
