import React, { useEffect } from "react";
import { eventActions } from "../../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import ListingTab from "../../../../components/Tabs/ListingTab";
import { Link } from "react-router-dom";
import "./Listing.scss";

function Listing() {
  const event = useSelector(state => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  

  console.log(event, "??????????")
  return (
    <>
    <div className="content-wrapper">
      <Header />

        <div class="Listing">   
            <div className="list_tems">
                <ul>
                    <li>
                        <Link to ="/ListingDetail">Retailer</Link>
                    </li>
                     <li>
                        <Link to ="/ListingDetail">Distributor</Link>
                     </li>
                     <li>
                        <Link to ="/ListingDetail">CPM</Link>
                     </li>
                    <li>
                        <Link to ="/SmallControlDetails">Smaill Contror</Link>
                    </li>
                </ul>
            </div>        
            <ListingTab/>           
        </div>
      </div>
    </>
  );
}

export default withTranslation()(Listing);
