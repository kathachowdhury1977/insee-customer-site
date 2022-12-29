import React, { useEffect, useState } from "react";
import FormInput from "../FormInput/FormInput";
import FormInputEditCase from "../FormInput/FormInputEditcase";
import FormSelectbox from "../FormSelectbox/FormSelectbox";
import { eventActions } from "../../_actions";
import { masterActions } from "../../_actions/master.action";
import { caseActions } from "../../_actions/case.action";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CreateCasePopup from "../ModalPopup/CreateCasePopup";
import { Link, useHistory } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import "./CreateCase.scss"
import pdfIcon from "../../assets/img/pdf-icon.png";
import wordIcon from "../../assets/img/word-icon.png";
import { ToastContainer, toast } from 'react-toastify'
import SaveCasePopup from "../ModalPopup/SaveCasePopup";
import FailureStatus from "../ModalPopup/FailureCasePopup";
//import { process.env.REACT_APP_MASTER_API_URL } from "../../constant";
const cancleStyle = {
  "margin-left": "3%"
}
const imgwidth = {
  width: "75%",
};
let fileObj = [];

let previousFileArray = [];
const AddVisitTabs = (props) => {
  const businesSegment = useSelector((state) => state.getBusinessSegment);
  const caseTypes = useSelector((state) => state.getCaseType);
  const caseCategorys = useSelector((state) => state.getCaseCategory);
  const userData = JSON.parse(localStorage.getItem('userData'))
  const [businessSegment, setBusinessSegment] = useState("");
  const [businessSegmentId, setBusinessSegmentId] = useState("");
  const [subject, setSubject] = useState("");
  const [caseTypeId, setCaseTypeId] = useState("");
  const [caseType, setCaseType] = useState("");
  const [caseCategory, setCaseCategory] = useState("");
  const [caseCategoryId, setCaseCategoryId] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [caseDetails, setCaseDetails] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");

  const [openModal, setopenModal] = useState(false)
  const [fileArray, setFileArray] = useState([]);
  const { t } = useTranslation();
  const [file, setFile] = useState([])
  const dispatch = useDispatch();
  const event = useSelector((state) => state);
  const [showChild, setShowChild] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [isCreateCaseOk, setIsCreateCaseOk] = useState(false);

  // const division = localStorage.getItem('userData') &&
  //   JSON.parse(localStorage.getItem('userData')).division && JSON.parse(localStorage.getItem('userData')).division[0] ? JSON.parse(localStorage.getItem('userData')).division[0] : "";
  // console.log('********'+JSON.parse(localStorage.getItem('userData')).division[0]);
  const [isClickOnCreate, setIsClickOnCreate] = useState(false);
  const createReducer = useSelector((state) => state.createCaseReducer);
  const [createCaseReducerCopy, setCreateCaseReducerCopy] = useState(null);
  let history = useHistory();
  const starColor = {
    color: "red"
  }
  const getCustomerBySoldTo = useSelector(state => state.getCustomerBySoldTo);
  const fileHandler = (e) => {
    setFile(e.target.files[0])
  }
  const uploadFileReducer = useSelector((state) => state.uploadFile.uploadFile);


  useEffect(() => {
    dispatch(masterActions.getBusinessSegment(userData.countryCode));
  }, []);

  useEffect(() => {
    dispatch(masterActions.getCaseType(userData.countryCode));
  }, []);

  useEffect(() => {
    dispatch(masterActions.getCaseCategory(userData.countryCode));
  }, []);

  useEffect(() => {
    uploadFile();
  }, [uploadFileReducer]);


  useEffect(() => {
    if (createReducer && !createReducer.loading && (createReducer.createCase || createReducer.error)) {
      setShowChild(true);
      setCreateCaseReducerCopy(Object.assign(createReducer));
      dispatch(caseActions.resetCreateCaseReducer());
    }
  }, [createReducer]);

  useEffect(() => {
    if (isCreateCaseOk && isClickOnCreate) {
      createNewCase();
    }
  }, [isCreateCaseOk]);

  const handleClose = () => {
    setOpen(false);
    history.push("/CaseList");
  };
  const businessSegmentData = businesSegment.getBusinessSegment
    ? businesSegment.getBusinessSegment.map((element) => {
      return {
        id: element.id,
        name: element.description,
        value: element.value
      };
    })
    : [
      {
        id: "0",
        name: "Data is not available",
      },
    ];

  const caseTypeData = caseTypes.getCaseType
    ? caseTypes.getCaseType.map((element) => {
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

  const caseCategoryData = caseCategorys.getCaseCategory
    ? caseCategorys.getCaseCategory.map((element) => {
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

  function handleFileChange(e) {
    e.preventDefault();
    const files = e.target.files;
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {

      if (JSON.stringify(files[i].size) < 2048000) {
        formData.append(`files`, files[i])
      }
      else {
        toast.error('Please upload file within 2MB', {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

      }
    }
    dispatch(masterActions.uploadFile(formData));

  }

  function uploadFile() {
    fileObj = [];
    let docName = Object.assign(documentName);
    setDocumentName('');
    if (fileArray.length > 0) {
      for (let file of fileArray) {
        fileObj.push(file);
      }
    }
    if (uploadFileReducer) {
      for (let file of uploadFileReducer.fileDetails) {
        file.fileName = docName;
        fileObj.push(file);
      }
      setFileArray(Object.assign(fileObj));
      dispatch(masterActions.deleteFile());
    }

  }
  function deleteMultipleFiles(e) {

    var index = e.target.id;

    fileObj = [];
    if (fileArray.length > 0) {
      for (let file of fileArray) {
        fileObj.push(file);
      }
    }

    if (index > -1) {
      fileObj.splice(index, 1)
    }

    setFileArray(Object.assign(fileObj));
  }

  function handleEditDocumentName(value, index) {


    fileObj = [];
    if (fileArray.length > 0) {
      let i = 0;
      for (let file of fileArray) {
        if (index == i) {
          file.fileName = value;
          fileObj.push(file);
        } else {
          fileObj.push(file);
        }
        i++;
      }
    }

    setFileArray(Object.assign(fileObj));
  }

  function handleChange(event) {

    console.log(event, "event target");
  }

  function onSelectChange(event) {
    console.log(event);
  }

  useEffect(() => {
    if (!caseType.length > 0)
      selectedDefaultCaseType();
  }, [userData]);

  function selectedDefaultCaseType() {

    if (userData.countryCode == 'VN') {
      setCaseType('Request');
      return "Request";
    } else if (userData.countryCode == 'LK') {
      setCaseType('Enquiry');
      return "Enquiry";
    } else {
      return "";
    }

  }
  function getSelectedBusinessSegment(event) {
    if (event != 'Business Segment') {
      businessSegmentData.map(element => {
        if (event == element.id) {
          setBusinessSegmentId(event);
          setBusinessSegment(element.name);
          setSelectedDivision(element.value);
        }
      })
    }
  }

  function getSelectedCaseCategory(event) {
    if (event != 'Case Category') {
      caseCategoryData.map(element => {
        if (event == element.id) {
          setCaseCategoryId(event);
          setCaseCategory(element.name);
        }
      })
    }
  }

  function getSelectedCaseType(event) {
    if (event != 'Case Type') {
      caseTypeData.map(element => {
        if (event == element.id) {
          setCaseTypeId(event);
          setCaseType(element.name);
        }
      })
    }
  }

  function createNewCase() {

    const payload = {
      "accountDetails": {
        "accountId": localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).soldTo[0],
        "accountName": getCustomerBySoldTo.customerDetailById ?
          getCustomerBySoldTo.customerDetailById.accountName : ""
      },

      "attachments": fileArray,
      "businessSegment": businessSegment,
      "businessSegmentId": businessSegmentId,
      "caseCategory": caseCategory,
      "caseCategoryId": caseCategoryId,
      "caseDetails": caseDetails,
      "caseId": 0,
      "caseOrigin": "INSEE Plus Customer",
      "caseOwner": localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).firstName : "Test-User",
      // "caseSubCategory": caseCategory,
      // "caseSubCategoryId": caseCategoryId,
      "caseType": caseType,
      "caseTypeId": caseTypeId,
      "contactName": localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).firstName : "",
      "countryCode": localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).countryCode : "TH",
      "createdBy": localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).firstName : "Test-User",
      "customerId":userData.userId,
      "description": "NA",
      "division": selectedDivision,
      "documentName": documentName,
      "documentNumber": documentNumber,
      "emailId": localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).employeeEmail : "Test-User",
      "subject": subject,
      "userId": (localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).soldTo) ?
        JSON.parse(localStorage.getItem('userData')).soldTo[0] : ''
    }
    dispatch(caseActions.createCase(payload));
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function backtoDetail() {
    history.push("/CaseList");
  }
  const handleCreateCase = (e) => {
    setopenModal(false);
    setIsClickOnCreate(true);
    setIsCreateCaseOk(false);
    if (!subject.length > 0 || !caseType.length > 0 || !caseDetails.length > 0) {

      toast.error('please enter the subject and case type and case details', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else if (documentName.length > 0 && fileArray.length <= 0) {

      toast.error('please upload the file', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {

      setopenModal(true)
    }

  }


  return (
    <div className="todo_status">

      {showChild ? (createCaseReducerCopy.createCase ? (<SaveCasePopup displayId={"Case ID : " + createCaseReducerCopy.createCase.caseId} message={"Case created successfully "} show={showChild} cancel="OK"
        handleClose={() => {
          setShowChild(false)
          handleClose();
        }
        } />) : <FailureStatus message={createCaseReducerCopy.error} show={showChild} cancel="OK"
          handleClose={() => {
            setShowChild(false)
            handleClose();
          }
          } />) : null}

      <div className="visit_dtls">
        <div className="form_section">
          <div className="container-fluid">
            <div className="">
              <div className="formBox">
                <form onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="inputBox ">
                        <label>{t("businessegment.label")}</label>
                        <FormSelectbox
                          name={"BusinessSegment"}
                          class={"input"}
                          onSelectChange={getSelectedBusinessSegment}
                          label={t("Select")}
                          data={businessSegmentData}
                        />

                      </div>
                    </div>

                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="inputBox">
                        <label>{t("subject.label")}<span style={starColor}> (*)</span></label>

                        <FormInput
                          type={"text"}
                          class={"input"}
                          name={"subject"}
                          onChange={event => setSubject(event)}
                          label={t("subject.label")}
                        />
                        {/* <FormSelectbox
                          name={"subject"}
                          class={"input"}
                          onSelectChange={onSelectChange}
                          label={t("subject.label")}
                          data={"data"}
                        /> */}
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="inputBox ">
                        <label>{t("casetype.label")}<span style={starColor}> (*)</span></label>
                        <FormSelectbox
                          name={"caseType"}
                          class={"input"}
                          onSelectChange={getSelectedCaseType}
                          defaultValue={caseType}
                          label={t("Select")}
                          data={caseTypeData}
                        />
                      </div>
                    </div>

                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="inputBox">
                        <label>{t("casecategory.label")}</label>
                        <FormSelectbox
                          name={"caseCategory"}
                          class={"input"}
                          onSelectChange={getSelectedCaseCategory}
                          label={t("Select")}
                          data={caseCategoryData}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
                      <div className="inputBox">
                        <label>{t("label.document_number")}</label>
                        <FormInput
                          type={"text"}
                          class={"input"}
                          name={"documentNumber"}
                          onChange={event => setDocumentNumber(event)}
                          label={t("label.document_number")}
                        />
                      </div>
                    </div>

                    <div className="col-9">
                      <div style={{
                        position: "relative",
                        boxSizing: "border-box",
                        marginBottom: "10px"
                      }}>
                        <label>{t("casedetail.label")}<span style={starColor}> (*)</span></label>

                        <textarea
                          rows="4"
                          cols=""
                          style={{ width: "100%" }}
                          onChange={event => {
                            setCaseDetails(event.target.value);
                          }}
                          placeholder={t("entertexthere.text")}
                        />
                      </div>
                    </div>

                  </div>
                  <div className="col-sm-4">
                    <div className="inputBox">
                      <label>{t("documentname.label")}</label>
                      <FormInput
                        type={"text"}
                        class={"input"}
                        name={"documentName"}
                        onChange={event => setDocumentName(event)}
                        label={t("Enter Document Name")}
                      />
                    </div>
                  </div>

                  <div className="row">

                    <div className="col-sm-8">
                      <div className="inputBox">
                      </div>
                    </div>

                  </div>
                  <div className="row">
                    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                      <div className="inputBox">
                        {/* <input type="file" id="upload" onChange={uploadMultipleFiles} hidden multiple /> */}
                        <input type="file" accept=".jpeg,.jpg,.png,.pdf,.doc,.docx" id="upload" onChange={handleFileChange} disabled={!(documentName.length > 0) || fileArray.length >= 5} hidden
                          multiple />
                        <label class="image-upload" for="upload"><i class="fa fa-cloud-upload"></i> {t("uploadattachments.uploadimg")}</label>
                        <span class="image-note">{t("uploadlimit.text")}</span>
                      </div>

                    </div>

                    <div className="col-xl-8 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                      <div className="row">
                        <div className="section-item">
                          <div className="col-sm-12 col-md-12 sec_details">

                            <span className="number mb-2">
                              <div className="row">
                                {(fileArray || []).map((file, index) => (
                                  <div className="col-sm-3 p-0">
                                    <div className="create_upload_img">
                                      {file.fileUrl ? (file.fileUrl.includes(".docx") || file.fileUrl.includes(".doc") || file.fileUrl.includes(".pdf")) ?
                                        <a href={file.fileUrl} target="_blank" >
                                          <img
                                            src={file.fileUrl.includes(".docx") ? wordIcon : pdfIcon}
                                            style={imgwidth} />
                                        </a>
                                        :
                                        <embed
                                          src={file.fileUrl}
                                          style={imgwidth} /> : null}
                                      <span style={imgwidth}>
                                        <FormInputEditCase
                                          inputType={"text"}
                                          classname={"input"}
                                          onChange={event => handleEditDocumentName(event.target.value, index)}
                                          name={"contact name"}
                                          lable={t("Enter")}
                                          defaultValue={file.fileName}
                                        /> </span>
                                      <span className="cross_icon" id={index} onClick={deleteMultipleFiles}> × </span>

                                    </div>

                                  </div>
                                ))}


                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6 ">
                      <button className="create_btn" onClick={handleCreateCase}>
                        {t("create.button")}
                      </button>
                      <button class="cancel_btn" onClick={backtoDetail} style={cancleStyle}>
                        {t("cancel.button")}</button>
                    </div>
                    {openModal && <CreateCasePopup handleOpenModel={(isCreate) => setopenModal(isCreate)} isCreateCase={(isCreate) => setIsCreateCaseOk(isCreate)} openModal={openModal} cancel={t('pickupform.no')} done={t('pickupform.yes')} />}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default AddVisitTabs;
