import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import "./BlockedReasion.scss";


function BlockedReasion() {
  const event = useSelector(state => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
       <div className="blocked_reason">
           <h5>Blocked Reason</h5>
            <span>Unavailability of Pallets</span>
       </div>
    </>
  );
}

export default withTranslation()(BlockedReasion);
