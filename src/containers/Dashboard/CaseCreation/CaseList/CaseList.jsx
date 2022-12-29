import React, { useEffect, useState } from "react";
import { caseActions } from "../../../../_actions";
import { masterActions } from "../../../../_actions/master.action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import FormSelectbox from "../../../../components/FormSelectbox/FormSelectbox";
import CashList from "../../../../components/CaseList/CashList";
import CaseQuantity from "../../../../components/CaseQuantity/CaseQuantity";
import { withTranslation, useTranslation } from "react-i18next";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import "bootstrap/dist/css/bootstrap.css";
import "./CaseList.scss";
import { Link } from "react-router-dom";
import banger from "../../../../assets/img/banger.jpeg";
import InputSearch from "../../../../components/InputSearch/InputSearch";
import moment from 'moment';
import { getBusinessSegment } from "../../../../_reducers/getBusinessSegment.reducer";
import ChatBot from "../../ChatBot/ChatBot";
const redButton = {
  textTransform: "uppercase",
  marginTop: "8px",
  marginLeft: "40px",
  marginBottom: '1rem',
  background: "#ef0000",
  padding: "5px 22px",
  border: "none",
  borderRadius: "4px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "12px",
  cursor: "pointer",
  "&:hover": {
    color: "#fff",
    background: "#ef0000",
  },
};

function CaseList() {
  const caseTypeList = useSelector((state) => state.getCaseType);
  const caseStatusList = useSelector((state) => state.getCaseStatus);
  const businesSegmentList = useSelector((state) => state.getBusinessSegment);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const allCases = useSelector(state => state.getAllCase)
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = (localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).soldTo) ?
    JSON.parse(localStorage.getItem('userData')).soldTo[0] : '';
  const [search, setSearch] = React.useState("");

  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [isBothDatesArechanged, setIsBothDatesAreChanged] = React.useState(false);
  const [creationTime, setCreationTime] = React.useState({})
  const [caseTypeId, setCaseTypeId] = React.useState("");
  const [caseType, setCaseType] = React.useState("");
  const [caseStatus, setCaseStatus] = React.useState("");
  const countryCode = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).countryCode : "";
  const [businessSegment, setBusinessSegment] = React.useState("");
  const [businessSegmentId, setBusinessSegmentId] = React.useState("");


  let requiredJSON = {
    "filter": {
      "caseStatus": "",
      "caseType": "",
      "businessSegment": "",
      "creationDate": {
        "from": "",
        "to": ""
      }
    },
    "fromIndex": "1",
    "search": "",
    "toIndex": "20",
    "userId": userData,
    "countryCode": countryCode
  }

  useEffect(() => {

    requiredJSON = {
      "filter": {
        "caseStatus": caseStatus,
        "caseType": caseType,
        "businessSegment": businessSegment,
        "creationDate": {
          "from": fromDate,
          "to": toDate
        }
      },
      "fromIndex": "1",
      "search": search,
      "toIndex": "20",
      "userId": userData,
      "countryCode": countryCode
    }
    dispatch(caseActions.getAllCase(requiredJSON));
  }, [search, caseType, caseStatus, businessSegment, fromDate, toDate]);

  useEffect(() => {
    dispatch(masterActions.getCaseType(countryCode));
  }, []);

  useEffect(() => {
    dispatch(masterActions.getCaseStatus(countryCode));
  }, []);

  useEffect(() => {
    dispatch(masterActions.getBusinessSegment(countryCode));
  }, []);


  function createCase() {
    history.push("/CreateCase");
  }


  function handleShowMoreDetails() {
    setShowMoreDetails(!showMoreDetails);
  }

  function getSelectedCaseType(event) {

    if (!(event && event.length > 0)) {
      setCaseTypeId('');
      setCaseType('');

    } else {
      caseTypeData.map(element => {
        if (event == element.id) {
          setCaseTypeId(event);
          setCaseType(element.name);
        }
      })
    }
  }

  function getSelectedCaseStatus(event) {

    if (!(event && event.length > 0)) {
      setCaseStatus('');

    }
    else {
      caseStatusData.map(element => {
        if (event == element.id) {
          setCaseStatus(element.name);
        }
      })
    }
  }

  function searchHandler(event) {
    setSearch(event.target.value);
    // requiredJSON.search = event.target.value

  }

  function fromDateHandler(event) {
    setIsBothDatesAreChanged(false);
    setFromDate(event.target.value)
    creationTime.from = event.target.value
    // requiredJSON.filter.creationDate = creationTime
    setToDate('');

  }


  function toDateHandler(event) {
    setToDate(event.target.value)
    creationTime.to = event.target.value
    // requiredJSON.filter.creationDate = creationTime
    setIsBothDatesAreChanged(true);
  }

  function getSelectedBusinessSegment(event) {
    if (!(event && event.length > 0)) {
      setBusinessSegmentId('');
      setBusinessSegment('');

    }
    else {
      businessSegmentData.map(element => {
        if (event == element.id) {
          setBusinessSegmentId(event);
          setBusinessSegment(element.name);
        }
      })
    }
  }

  const caseTypeData = caseTypeList.getCaseType
    ? caseTypeList.getCaseType.map((element) => {
      return {
        id: element.id,
        name: element.description,
      };
    })
    : [
      {
        id: "0",
        name: "Data is not available",
      },
    ];



  const caseStatusData = caseStatusList.getCaseStatus
    ? caseStatusList.getCaseStatus.map((caseStatusData) => {
      return {
        id: caseStatusData.id,
        name: caseStatusData.description,
      };
    })
    : [
      {
        id: "0",
        name: "Data is not available",
      },
    ];

  const businessSegmentData = businesSegmentList.getBusinessSegment
    ? businesSegmentList.getBusinessSegment.map((element) => {
      return {
        id: element.id,
        name: element.description,
      };
    })
    : [
      {
        id: "0",
        name: "Data is not available",
      },
    ];


  function convertUTCToTimezone(utcDt, utcDtFormat) {
    if (countryCode == "TH") {
      return moment.utc(utcDt, utcDtFormat).tz("Asia/Bangkok").format('DD-MM-YYYY HH:mm:ss');
    } else if (countryCode == "LK") {
      return moment.utc(utcDt, utcDtFormat).tz("Asia/Bangkok").format('DD-MM-YYYY HH:MM:ss');
    } else if (countryCode == "VN") {
      return moment.utc(utcDt, utcDtFormat).tz("Asia/Ho_Chi_Minh").format('DD-MM-YYYY HH:mm:ss');
    } else {
      return moment.utc(utcDt, utcDtFormat).tz("Asia/Bangkok").format('DD-MM-YYYY HH:mm:ss');
    }
  }

  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);

  return (
    <div className="content-wrapper">
      <Header title="Case Creation" />
      <div className={"row ipad_css "  + MyNewClass}>
        <div className="product_sectionBox" style={{
          height: 'calc(100vh - 100px)',
          overflow: 'auto'
        }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="row flexBox">
                  <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-12" style={{ top: '-6px' }}>
                    <h1>{t("caselist.heading")}</h1>
                  </div>
                  <div className="col-xl-4 col-lg-3 col-md-9 col-sm-8 col-xs-12" >
                    {/* <InputSearch searchHandler={searchHandler}/> */}
                    <div className="form-group has-search" style={{ top: '-6px' }}>
                      <span className="fa fa-search form-control-feedback"></span>
                      <input type="text" className="form-control" onChange={searchHandler} placeholder={t("Search")}></input>
                    </div>

                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12" style={{ top: '-6px' }}>
                    <div className="form_section">
                      <div className="formBox">
                        <div className="inputBox ">
                          <label>{t("label.start_date")}</label>
                          <input
                            type="date"
                            name=""
                            value={fromDate}
                            placeholder="Enter"
                            className="input"
                            style={{ width: "100%" }}
                            onChange={fromDateHandler}
                            onKeyDown={(event) => {
                              event.preventDefault();
                            }}
                          />

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12" style={{ top: '-6px' }}>
                    <div className="form_section">
                      <div className="formBox">
                        <div className="inputBox ">
                          <label>{t("label.end_date")}</label>
                          <input
                            type="date"
                            name=""
                            value={toDate}
                            placeholder="Enter"
                            className="input"
                            min={fromDate}
                            style={{ width: "100%" }}
                            onChange={toDateHandler}
                            onKeyDown={(event) => {
                              event.preventDefault();
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12 text-right">
                    <button
                      type="button"
                      class="btn btn-danger"
                      style={redButton}
                      onClick={createCase}
                    >
                      <i className="fa fa-plus"></i> {t("create.button")}{" "}
                    </button>
                  </div>


                </div>
              </div>



              <div className="col-12">
                <div className="row">

                  <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12" >
                    <div className="form_section">
                      <div className="formBox">
                        <div className="inputBox ">
                          <label>{t("businessegment.label")}</label>
                          <FormSelectbox
                            name={"visitobjective"}
                            label={t("Select")}
                            class={"input"}
                            onSelectChange={getSelectedBusinessSegment}
                            data={businessSegmentData}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12">
                    <div className="form_section">
                      <div className="formBox">
                        <div className="inputBox ">
                          <label>{t("casetype.label")}</label>
                          <FormSelectbox
                            name={"CaseType"}
                            label={t("Select")}
                            name={"caseCategory"}
                            class={"input"}
                            onSelectChange={getSelectedCaseType}
                            data={caseTypeData}
                          />
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="col-xl-3 col-lg-4 col-md-4 col-sm-12" >
                    <div className="form_section">
                      <div className="formBox">
                        <div className="inputBox ">
                          <label>{t("Case Status")}</label>
                          <FormSelectbox
                            name={"visitobjective"}
                            label={t("Select")}
                            onSelectChange={getSelectedCaseStatus}
                            data={caseStatusData}
                            class={"input"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="planned_visit create_list">
                <section class="content-header">
                  <div className="row">
                    <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-2">
                      <h3 class="box-title">{t("caselist.heading")}</h3>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-2">
                      <InputSearch />
                    </div>
                    <div className="col-xl-7 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                      <div className="row">
                        <div className="col-sm-3 col-md-3 col-lg-3">
                          <div className="case_date">
                            <DateRangePicker>
                              <input type="text" className="form-control" />
                            </DateRangePicker>
                            <i className="fa fa-calendar"></i>
                            <div className="inputBox ">
                              <label>{t("Start Date")}</label>
                              <input
                                type="date"
                                name=""
                                // value={fromDate}
                                placeholder="Enter"
                                className="input"
                                style={{ width: "100%" }}
                                // onChange={fromDateHandler}
                                onKeyDown={(event) => {
                                  event.preventDefault();
                                }}
                              />

                            </div>
                          </div>
                        </div>
                        <div className="col-sm-2 col-md-2 col-lg-2">
                          <div class="inputBox">
                            <FormSelectbox
                              name={"visitobjective"}
                              label={t("casetype.label")}
                              data={caseTypeData}
                            />
                          </div>
                        </div>
                        <div className="col-sm-2 col-md-2 col-lg-2">
                          <div class="inputBox ml-3">
                            <FormSelectbox
                              name={"visitobjective"}
                              label={t("status.label")}
                              data={caseStatusData}
                            />
                          </div>
                        </div>
                        <div className="col-sm-5 col-md-5 col-lg-5 text-right">
                          <button
                            type="button"
                            class="btn btn-danger"
                            onClick={createCase}
                          >
                            <i className="fa fa-plus"></i> {t("create.button")}{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div> */}

              {/* <div className="myChat"><ChatBot/></div> */}

              <div className="col-md-12 case_qty">
                {allCases.getAllCase && <CaseQuantity caseType={t("opencase.label")} caseQty={allCases.getAllCase.openCaseCounts} />}
                {allCases.getAllCase && <CaseQuantity caseType={t("closecase.label")} caseQty={allCases.getAllCase.closeCaseCount} />}
              </div>
              <div className="col-12 p-2">
                <div className="row">
                  {!!allCases.getAllCase && allCases.getAllCase.results.map(eachcase => (
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12" onClick={() => history.push("/caseDetail", { caseId: eachcase.caseId })}>
                      <div className="cards caseDetail">
                        {/* <Link to={`/caseDetail/${eachcase.caseId}`}> */}
                        <div>
                          <div className="row">

                            <div className="col-md-7"><b><h4>{t('caseid.title')}: {eachcase.caseId}</h4></b></div>

                            <div className="col-md-5">{t('createdby.label')}:<b>{eachcase.createdBy}</b></div>
                          </div>
                          <b><h6>{eachcase.subject}</h6></b>
                          <span onClick={handleShowMoreDetails} style={{
                            display: "block",
                            width: "200px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis"
                          }}>
                            {eachcase.caseDetails}
                          </span>

                        </div>
                        <div>
                          <div className="rectangleContainer">
                            <div style={{
                              margin: '3px 4px 7px 0',
                              padding: '0 17.9px 0 17px',
                              borderRadius: '4px',
                              backgroundColor: '#242424',
                              color: '#fff'
                            }}>
                              {eachcase.caseType}
                            </div>
                            <div style={{
                              margin: '3px 4px 7px 0',
                              padding: '0 17.9px 0 17px',
                              borderRadius: '4px',
                              backgroundColor: '#c14752',
                              color: '#fff'
                            }}>
                              {eachcase.caseAge} {t('hours.label')}
                            </div>
                            <div style={{
                              margin: '3px 4px 7px 0',
                              padding: '0 17.9px 0 17px',
                              borderRadius: '4px',
                              backgroundColor: '#f59a32',
                              color: '#fff'
                            }}>
                              {eachcase.caseStatus}
                            </div>
                          </div>
                          <div className="rectangleContainer">
                            <div className="rectangle" style={{ width: '50%', margin: '5px 5px 0 0' }}>
                              <h6>{t('createddatetime.label')}</h6>
                              <b><h6>{convertUTCToTimezone(eachcase.createdDateToDisplay, null)}</h6></b>
                            </div>
                            {countryCode != "VN" ? <div className="rectangle" style={{ width: '50%', margin: '5px 5px 0 0' }}>
                              <h6>{t('case.caseorigin.label')}</h6>
                              <b><h6>{eachcase.caseOrigin}</h6></b>
                            </div> : null}
                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              {/* <div>
                <div>
                  <div>
                    <div>
                      <div style={{ display: 'flex' }}>
                        {!!allCases.getAllCase && !!allCases.getAllCase.results && allCases.getAllCase.results.map((eachcase) => (
                          <div style={{ width: '50%' }}>
                            <CashList
                              image={banger}
                              class={
                                "col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 p-2"
                              }
                              src={"/CaseDetail/" + 1}
                              caseid={"1"}
                              contact={"65478-79879"}
                              amv={"3000 Tons"}
                              inseeGrowth={"20%"}
                              inseeSow={"50%"}
                              {...eachcase}
                            />
                          </div>
                        ))}

                        {/* // <CashList
                        //   image={banger}
                        //   class={
                        //     "col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 p-2"
                        //   }
                        //   src={"/CaseDetail"}
                        //   caseid={"00470910"}
                        //   contact={"65478-79879"}
                        //   amv={"3000 Tons"}
                        //   inseeGrowth={"20%"}
                        //   inseeSow={"50%"}
                        // /> */}
              {/* </div>
          </div>
        </div>
      </div>
    </div> * /} */}
            </div >
          </div >
        </div >
      </div >
    </div >
  );
}

export default withTranslation()(CaseList);