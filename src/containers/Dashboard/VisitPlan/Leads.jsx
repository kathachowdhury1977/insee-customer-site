import React, { useEffect } from "react";
import { eventActions } from "../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import LeadsItem from "./LeadsItem";

function Leads() {
  const event = useSelector(state => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  

  console.log(event, "??????????")
  return (
    <>
    <div className="content-wrapper">
      <Header />
      <div class="upcoming_detail_plan mt-3">
         <LeadsItem/>
         <LeadsItem/>
         <LeadsItem/>
         <LeadsItem/>
      </div>    
      </div>
    </>
  );
}

export default withTranslation()(Leads);
