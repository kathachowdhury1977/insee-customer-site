import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { caseActions } from "../../../../_actions";
import Header from "../../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import banger from "../../../../assets/img/banger.jpeg";
import StarRatingComponent from "react-star-rating-component";
import "./CaseDetail.scss";
import { useLocation } from "react-router-dom";
import pdfIcon from "../../../../assets/img/pdf-icon.png";
import wordIcon from "../../../../assets/img/word-icon.png";
import { caseService } from "../../../../_services";
import moment from 'moment';
import Loading from '../../../../components/Loader/Loading'
const imgwidth = {
  width: "100%",
};

const no_record_table = {

  // display: flex;
  paddingTop: "5px",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(60vh - 20px)",
  fontSize: "22px",
  left: "40%",
  textAlign: "center",
  color: "black",
  clear: "both",
  position: "absolute",
  paddingBottom: "10px",
  marginBottom: "5px"

}

function CaseList(props) {
  const caseDetails = useSelector((state) => state.getCase);
  const isPageLoading = useSelector((state) => state.getCase.loading)

  const [rating, setRating] = useState(1);
  const upcomingEvents = useSelector((state) => state.upcomingEvents);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const caseId = !!props.location.state && props.location.state.caseId
  const countryCode = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).countryCode : "";
  const [details, setDetails] = useState('');
  
  useEffect(() => {
    dispatch(caseActions.getCase(caseId,countryCode));
  }, []);


  const caseDetailsData = !!caseDetails.getCase && caseDetails.getCase

  function onStarClick(nextValue, prevValue, name) {
    // this.setState({rating: nextValue});
    setRating(nextValue);
  }

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
  const maxRating = 5;
  const [selectedRating, setSelectedRating] = useState(caseDetailsData && caseDetailsData.rating ? caseDetailsData.rating : 0);

  useEffect(() => {

    if (caseDetails.getCase && caseDetails.getCase.rating) {
      setSelectedRating(caseDetails.getCase.rating);
    }
    if (caseDetails.getCase && caseDetails.getCase.caseDetails) {
      setDetails(caseDetails.getCase.caseDetails);
    }
  }, [caseDetails])
  function handleRating(rating) {
    setSelectedRating(rating);
    caseService.addRating(caseDetails ? caseId : null, rating,countryCode);
  }

  function createElements(n) {
    const elements = [];
    for (let i = 1; i <= n; i++) {
      if (i <= selectedRating) {
        elements.push(<span onClick={event => handleRating(i)} style={{ cursor: 'pointer', color: "orange" }} className="fa fa-star fa-2x  checked"
          id={i}>&nbsp;</span>);
      } else {
        elements.push(<span onClick={event => handleRating(i)} style={{ cursor: 'pointer' }} className="fa fa-star-o fa-2x">&nbsp;</span>);

      }
    }
    return elements;
  }

  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
  return (
    <>
      <div className="content-wrapper">
        <Header title={t('casedetail.label')} />

        {!isPageLoading ? <div className={"row ipad_css "  + MyNewClass}>
          <div className="mainScroll">
            <div className="upcoming_detail_plan case_details">
              <div className="card">
                <div className="row">
                  <div className="section-item">
                    <div className="col-xl-7 col-lg-5 col-md-4 col-sm-12 col-xs-12 sec_details">
                      <h4 className="mb-2">
                        <span class="detail_title">{t("caseid.title")} :</span>{" "}
                        {caseDetailsData.caseId}
                      </h4>
                      <span className="number mb-2">
                        <span class="detail_title">{caseDetailsData.subject}</span>
                      </span>
                    </div><div style={{ display: 'flex' }}>
                      <div style={{
                        margin: '20px 4px 7px 0',
                        padding: '0 17.9px 0 17px',
                        borderRadius: '4px',
                        backgroundColor: '#242424',
                        color: '#fff'
                      }}>
                        {caseDetailsData.caseType}
                      </div>
                      <div style={{
                        margin: '20px 4px 7px 0',
                        padding: '0 17.9px 0 17px',
                        borderRadius: '4px',
                        backgroundColor: '#c14752',
                        color: '#fff'
                      }}>
                        {caseDetailsData.caseAge} {t('hours.label')}
                      </div>
                      <div style={{
                        margin: '20px 4px 7px 0',
                        padding: '0 17.9px 0 17px',
                        borderRadius: '4px',
                        backgroundColor: '#f59a32',
                        color: '#fff'
                      }}>
                        {caseDetailsData.caseStatus}
                      </div>
                    </div></div>
                </div>
              </div>
              <div className="card">
                <div className="row">
                  <div className="section-item">
                    <div className="col-sm-12 col-md-12 sec_details">
                      <h4 className="mb-2">
                        <span class="detail_title">{"Case Details"} :</span>{" "}

                      </h4>
                      <span className="number mb-2">
                        <span class="detail_title">
                          <textarea readOnly={true} rows="4" cols="100">
                            {caseDetailsData.caseDetails}
                          </textarea>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="row">
                  <div className="section-item">
                    <div className="col-sm-12 col-md-12 sec_details">
                      <div className="row">

                        <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-2">
                          <span>{t("businessegment.label")} </span>
                          <br></br>
                          <strong> {caseDetailsData.businessSegment}</strong>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-2">
                          <span>{t("documentnumber.label")}</span>
                          <br></br>
                          <strong> {caseDetailsData.documentNumber ? caseDetailsData.documentNumber : 'NA'}</strong>
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-2">
                          <span>{t("casecategory.label")}</span>
                          <br></br>
                          <strong> {caseDetailsData.caseCategory ? caseDetailsData.caseCategory : 'NA'}</strong>
                        </div>
                        {countryCode != "VN" ? <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-2">
                          <span>{t("caseorigin.label")} </span>
                          <br></br>
                          <strong> {caseDetailsData.caseOrigin ? caseDetailsData.caseOrigin : 'NA'}</strong>
                        </div> : null}
                        <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-2">
                          <span>{t("createddatetime.label")} </span>
                          <br></br>
                          <strong> {caseDetailsData.createdDateToDisplay ?
                            convertUTCToTimezone(caseDetailsData.createdDateToDisplay, null) : ''}</strong>
                        </div>

                        <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-2">
                          <span>{t('createdby.label')} </span>
                          <br></br>
                          <strong> {caseDetailsData.createdBy}</strong>
                        </div>

                        <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-2">
                          <span>{t("closeddatetime.label")} </span>
                          <br></br>
                          <strong> {caseDetailsData.closedDateTimeToDisplay ?
                            convertUTCToTimezone(caseDetailsData.closedDateTimeToDisplay, null) : ''}</strong>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {caseDetailsData.attachments && caseDetailsData.attachments.length > 0 && (<div className="card">
                <div className="row">
                  <div className="section-item">
                    <div className="col-sm-12 col-md-12 sec_details">
                      <h4 className="mb-2">
                        <span class="detail_title">
                          {t("attachments.heading")}{" "}
                        </span>
                      </h4>
                      <span className="number mb-2">
                        <div className="row">
                          {caseDetailsData.attachments && caseDetailsData.attachments.map(eachCase => (
                            <div className="col-sm-2 attachment_img_item" style={{ textAlign: 'left' }}>
                              {eachCase.fileUrl.includes(".docx") || eachCase.fileUrl.includes(".doc") || eachCase.fileUrl.includes(".pdf") ? <a href={eachCase.fileUrl} target="_blank" >
                                <img
                                  src={eachCase.fileUrl.includes(".docx") ? wordIcon : pdfIcon}
                                  style={{ width: '60%', height: '60%' }} />
                              </a> : <img src={eachCase.fileUrl} style={imgwidth} />}
                              <span className="text-center">{eachCase.fileName}</span>
                            </div>))}
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              )}
              <div className="card">
                <div className="row">
                  <div className="section-item">
                    <div className="col-sm-12 col-md-12 sec_details">
                      <h4 className="mb-2">
                        <span class="detail_title">{t("soution.heading")}</span>
                      </h4>
                      <span className="mb-2">
                        <span >
                          {caseDetailsData && caseDetailsData.caseSolution
                            && caseDetailsData.caseSolution.solution
                            ? caseDetailsData.caseSolution.solution : 'NA'}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="section-item">

                    <div className="col-sm-12 col-md-12 sec_details">
                      <h4 className="mb-2">
                        <span class="detail_title">
                          {t("attachments.heading")}
                        </span>
                      </h4>
                      <span className="number mb-2">
                        <div className="row">
                          {caseDetailsData && caseDetailsData.caseSolution && caseDetailsData.caseSolution.attachments
                            ? caseDetailsData.caseSolution.attachments.map(eachCase => (
                              <div className="col-sm-2 attachment_img_item" style={{ textAlign: 'left' }}>
                                {eachCase.fileUrl.includes(".docx") || eachCase.fileUrl.includes(".doc") || eachCase.fileUrl.includes(".pdf") ? <a href={eachCase.fileUrl} target="_blank" >
                                  <img
                                    src={eachCase.fileUrl.includes(".docx") ? wordIcon : pdfIcon}
                                    style={{ width: '60%', height: '60%' }} />
                                </a> : <img src={eachCase.fileUrl} style={imgwidth} />}
                                <span>{eachCase.fileName}</span>
                              </div>)) : null}
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {caseDetailsData && caseDetailsData.caseClosed ? <div className="text-center">
                <p className="text-center">Rate Us</p>
                <p className="text-center">
                  {createElements(maxRating)}
                </p>
              </div> : null}
            </div>
          </div>
        </div> : <div className='loading'>
          <Loading />
        </div>}
      </div>
    </>
  );
}

export default withTranslation()(CaseList);