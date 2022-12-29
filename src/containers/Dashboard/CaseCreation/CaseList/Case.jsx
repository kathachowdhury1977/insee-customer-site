import React, { useEffect } from "react";
import { eventActions } from "../../../../_actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import SearchBox from "../../../../components/SearchBox/SearchBox";
import FormSelectbox from "../../../../components/FormSelectbox/FormSelectbox";
import CashList from "../../../../components/CaseList/CashList";
import { withTranslation, useTranslation } from "react-i18next";
import "./CaseList.scss";
import banger from "../../../../assets/img/banger.jpeg";


const buttonwidth={
  width: "100%"
} 
function Case() {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const fromDate = "01-01-2019";

  const toDate = "01-12-2020";
  

    function createCase(){
      history.push('/CreateCase')
    }
  return (
    <>
    

          <div className="planned_visit create_list ml-0 mr-0 mb-2 pb-3" style={{display: "inline-block", width: "100%"}}>
            <section class="content-header">
              <div className="row">
                <div className="col-sm-3 col-md-3 col-lg-3">
                  <SearchBox />
                </div>
                <div className="col-sm-9 col-md-9 col-lg-9">
                  <div className="row">
                  <div className="col-sm-3 col-md-3 col-lg-3">
                     <input type="date" className="input-date" /> 
                  </div>
                  <div className="col-sm-2 col-md-2 col-lg-2">
                    <div class="inputBox">
                   <FormSelectbox
                            name={"visitobjective"}
                            label={t("case type")}
                            data={"data"} 
                          />
                          </div>
                  </div>
                  <div className="col-sm-2 col-md-2 col-lg-2">
                    <div class="inputBox ml-3">
                     <FormSelectbox
                            name={"visitobjective"}
                            label={t("case type")}
                            data={"data"} 
                          />
                          </div>
                  </div>
                  <div className="col-sm-5 col-md-5 col-lg-5 text-right">
                  <button type="button" class="btn btn-danger" onClick={createCase}><i className="fa fa-plus"></i> Create </button>
            
                  </div>
                </div>
                </div>
              </div>
            </section>
          </div>

          <div class="col-md-12 create_list_item pl-0 pr-0">
              <div className="col-12 pr-0 pl-0">
                <div class="box">
                           <div class="box-body">
                    <div class="row">
                     
                         <CashList
                                image={banger}
                                class={"col-sm-6 col-md-6 col-lg-6"}
                                src={"/CaseDetail"}
                                title={"Case ID : 00590910"}
                                contact={"65478-79879"}
                                amv={"3000 Tons"}
                                inseeGrowth={"20%"}
                                inseeSow={"50%"}
                                
                              />

                             <CashList
                                image={banger}
                                class={"col-sm-6 col-md-6 col-lg-6"}
                                src={"/CaseDetail"}
                                title={"Case ID : 00590910"}
                                contact={"65478-79879"}
                                amv={"3000 Tons"}
                                inseeGrowth={"20%"}
                                inseeSow={"50%"}
                                
                              />
                    </div>
                  </div>
                </div>
              </div>
          </div>
    </>
  );
}

export default withTranslation()(Case);
