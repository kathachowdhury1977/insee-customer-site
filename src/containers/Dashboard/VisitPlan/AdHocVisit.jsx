import React from "react";
import Header from "../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import LeadsItem from "./LeadsItem";

function AdHocVisit() {
  const { t } = useTranslation();
  const selectedDay = (val) => {
    console.log(val);
  };
  return (
    <>
    <div className="content-wrapper">
      <Header />

      <div class="upcoming_detail_plan add_visit_pg">
          <h5 className="text-black">Create Ad Hoc Visit</h5>

          <div className="visit_sec mt-4">


           <div className="create_ad_hoc">
               <div className="contaner-fluid">
               <div className="row mb-4">
                   <div className="col-6 pl-0">
                        <div id="custom-search-input">
                            <div class="input-group col-md-12">
                                <input type="text" class="  search-query form-control" placeholder="Search" />
                                <span class="input-group-btn">
                                    <button class="btn btn-danger" type="button">
                                        <span class="fa fa-search"></span>
                                    </button>
                                </span>
                            </div>
                        </div>

                   </div>
                   <div className="col-6 pr-0">
                       <ul>
                           <li>
                               <select className="cat">
                                   <option value="cateory">Category</option>
                               </select>
                           </li>
                           <li>
                               <select className="type">
                                   <option value="Type">Type</option>
                               </select>
                           </li>
                           <li>
                               <select className="beat">
                                   <option value="Beat">Beat</option>
                               </select>
                           </li>
                       </ul>

                   </div>
               </div>
               </div>
           </div>
            <LeadsItem/>   
            <LeadsItem/>       
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(AdHocVisit);
