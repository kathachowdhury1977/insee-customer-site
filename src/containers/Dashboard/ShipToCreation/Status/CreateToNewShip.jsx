import React, { useEffect } from "react";
// import { eventActions } from "../../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import Header from "../../../../components/Header/Header";
import "../ShipToCreationAbout.scss";
import CreateNewShipToStepper from "../../../../components/Stepper/CreateNewShipToStepper";
import PlanDetailsCard from "../../../../components/PlanDetailsCard/PlanDetailsCard";
import "../../MMDC/RetailBrand/ListingDetail.scss";


function CreateToNewShip(props) {
  const event = useSelector(state => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(());
  // }, []);

  console.log(event, "??????????")
  return (
    <>
      <div className="content-wrapper">
        <Header />

        <div className="container-fluid">
            <p className="step-head">Chettinad Enterprise</p>
            <div className="upcoming_detail_plan clearfix p-0 mb-2 List_detail_page">
            <PlanDetailsCard/>
            </div>  
            <div className="step_section">
                <h5>Create New Ship-to</h5>
               <CreateNewShipToStepper/>
            </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(CreateToNewShip);
