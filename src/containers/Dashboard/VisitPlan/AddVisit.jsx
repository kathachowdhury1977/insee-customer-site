import React, { useEffect } from "react";
import Header from "../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import AddVisitTabs from '../../../components/Tabs/AddVisitTabs';
import { eventActions } from "../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
function AddVisit() {
  // event = useSelector(state => state);
  const eventMode = useSelector(state => state.eventMode);
  const eventObjective = useSelector(state => state.eventObjective);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(eventActions.getAllVisitMode());
  }, []);
 
  useEffect(() => {
    dispatch(eventActions.getAllVisitObjective());
  }, []);
 
console.log(eventObjective, "eventObjective", eventMode)
  return (
    <>
    <div className="content-wrapper">
      <Header />

      <div class="upcoming_detail_plan add_visit_pg">
          <h5 className="text-black">Add Visit</h5>

          <div className="visit_sec mt-4">
              <AddVisitTabs eventmode = {eventMode } eventObjective= {eventObjective}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(AddVisit);
