import React, { useEffect } from "react";
// import { eventActions } from "../../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "../MMDC/ListingPage/Listing.scss";
import UpcomingPlan from "../../../components/UpcomingPlan/UpcomingPlan";
import banger from "../../../assets/img/banger.jpeg";
import InputSearch from "../../../components/InputSearch/InputSearch";

function ShipToCreationLanding() {
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
          <div className="row bg-white pt-1 pb-2  mt-2 ml-1 mr-1">
            <div className="col-sm-6">
            </div>
            <div className="col-sm-6 text-right mt-2">
              <InputSearch />
            </div>
          </div>
        </div>

        <div class="Listing">
          <div className="list_tems">
            <ul>
              <li>
                <Link to="/ListingDetail">Retailer</Link>
              </li>
              <li>
                <Link to="/ListingDetail">Distributor</Link>
              </li>

            </ul>
          </div>

          <div className="container-fluid">
            <div className="row">
              <UpcomingPlan
                image={banger}
                class={"col-sm-12 col-md-6 col-lg-6"}
                src={"/ShipToCreationDetail"}
                title={"Bungur Enterprises"}
                contact={"65478-79879"}
                amv={"3000 Tons"}
                inseeGrowth={"20%"}
                inseeSow={"50%"}
              />

              <UpcomingPlan
                image={banger}
                class={"col-sm-12 col-md-6 col-lg-6"}
                src={"/ShipToCreationDetail"}
                title={"Bungur Enterprises"}
                contact={"65478-79879"}
                amv={"3000 Tons"}
                inseeGrowth={"20%"}
                inseeSow={"50%"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(ShipToCreationLanding);
