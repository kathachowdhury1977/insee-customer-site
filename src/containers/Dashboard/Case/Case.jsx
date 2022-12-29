import React from 'react'
import Header from '../../../components/Header/Header'
import './Case.scss'
import { withTranslation, useTranslation } from 'react-i18next'
import { useEffect } from 'react';
import { caseActions, masterActions } from "../../../_actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";



const Case = props => {
    const caseType = useSelector((state) => state.getCaseType);
    const caseStatus = useSelector((state) => state.getCaseStatus);
    const allCases = useSelector(state => state.getAllCase)
    // console.log(allCases, "casesss")
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).employeeId : '12345'

    const requiredJSON = {
        "filter": {
            "caseStatus": "",
            "caseType": "",
            "creationDate": {
                "from": "",
                "to": ""
            }
        },
        "fromIndex": "1",
        "search": "",
        "toIndex": "20",
        "userId": userData
    }

    useEffect(() => {
        dispatch(caseActions.getAllCase(requiredJSON));
    }, []);

    useEffect(() => {
        dispatch(masterActions.getCaseType('TH'));
    }, []);

    useEffect(() => {
        dispatch(masterActions.getCaseStatus('TH'));
    }, []);

    //   function createCase() {
    //     history.push("/CreateCase");
    //   }

    // console.log(caseType);
    const caseTypeData = caseType.getCaseType
        ? caseType.getCaseType.map((element) => {
            return {
                id: element.id,
                name: element.value,
            };
        })
        : [
            {
                id: "0",
                name: "Data is not available",
            },
        ];



    const caseStatusData = caseStatus.getCaseStatus
        ? caseStatus.getCaseStatus.map((caseStatusData) => {
            return {
                id: caseStatusData.id,
                name: caseStatusData.value,
            };
        })
        : [
            {
                id: "0",
                name: "Data is not available",
            },
        ];





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

    const createCase = () => {
        history.push({
            pathname: "CreateCase",
        })
    }

    // useEffect(() => {
    //     // dispatch(caseActions.getAllCase());
    //     dispatch(caseActions.getCase("89"));

    // }, [])

    return (
        <div className='content-wrapper'>
            <Header title={t('Case')} />
            <div className="product_sectionBox" style={{ height: "fit-content" }}>
                <div className="container-fluid">
                    <div className="row flexBox">
                        <div className="col-2" style={{ marginBottom: '20px' }}>
                            <h1>{t("label.caselist")}</h1>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" >
                            {/* <InputSearch searchHandler={searchHandler}/> */}
                            <div className="form-group has-search" style={{ marginLeft: '20px' }}>
                                <span className="fa fa-search form-control-feedback"></span>
                                <input type="text" className="form-control"
                                    // onChange={searchHandler} 
                                    placeholder="Search by Case Id"></input>
                            </div>

                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12" style={{ top: '-20px' }}>
                            <div className="form_section">
                                <div className="formBox">
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
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12" style={{ top: '-20px' }}>
                            <div className="form_section">
                                <div className="formBox">
                                    <div className="inputBox ">
                                        <label>{t("End Date")}</label>
                                        <input
                                            type="date"
                                            name=""
                                            // value={toDate}
                                            placeholder="Enter"
                                            className="input"
                                            // min={fromDate}
                                            style={{ width: "100%" }}
                                            // onChange={toDateHandler}
                                            onKeyDown={(event) => {
                                                event.preventDefault();
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12">
                            <button
                                style={redButton}
                                onClick={createCase}
                            >{t("label.createcase")}</button>
                        </div>
                    </div>
                    <div className="rectangleContainer">
                        <div className="rectangle">
                            <h6>Open Case</h6>
                            <b><h4>30</h4></b>
                        </div>
                        <div className="rectangle">
                            <h6>Open Case</h6>
                            <b><h4>30</h4></b>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        {/* <div className="cards">
                            <div>
                                <b><h4>{`Case ID: ${!!getCase && getCase.caseId}`}</h4></b>
                                <b><h6>Last Delivery</h6></b>
                                <p>{!!getCase && getCase.caseDetails}</p>
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
                                        Complaint
                                    </div>
                                    <div style={{
                                        margin: '3px 4px 7px 0',
                                        padding: '0 17.9px 0 17px',
                                        borderRadius: '4px',
                                        backgroundColor: '#c14752',
                                        color: '#fff'
                                    }}>
                                        3 days
                                    </div>
                                    <div style={{
                                        margin: '3px 4px 7px 0',
                                        padding: '0 17.9px 0 17px',
                                        borderRadius: '4px',
                                        backgroundColor: '#f59a32',
                                        color: '#fff'
                                    }}>
                                        in-progress
                                    </div>
                                </div>
                                <div className="rectangleContainer">
                                    <div className="rectangle" style={{ width: '50%', margin: '5px 5px 0 0' }}>
                                        <h6>CREATED DATE & TIME</h6>
                                        <b><h6>26/12/2020, 10:30 AM</h6></b>
                                    </div>
                                    <div className="rectangle" style={{ width: '50%', margin: '5px 5px 0 0' }}>
                                        <h6>CASE ORIGIN</h6>
                                        <b><h6>Whatsapp</h6></b>
                                    </div>
                                </div>

                            </div>
                        </div>
                         */}

                        {!!allCases.results && allCases.results.map(eachcase => (
                            <div className="cards">
                                <div>
                                    <b><h4>Case ID: 00051742</h4></b>
                                    <b><h6>Last Delivery</h6></b>
                                    <p>Order Placed but not delivered on time -- Case details...</p>
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
                                            Complaint
                                        </div>
                                        <div style={{
                                            margin: '3px 4px 7px 0',
                                            padding: '0 17.9px 0 17px',
                                            borderRadius: '4px',
                                            backgroundColor: '#c14752',
                                            color: '#fff'
                                        }}>
                                            3 days
                                        </div>
                                        <div style={{
                                            margin: '3px 4px 7px 0',
                                            padding: '0 17.9px 0 17px',
                                            borderRadius: '4px',
                                            backgroundColor: '#f59a32',
                                            color: '#fff'
                                        }}>
                                            in-progress
                                        </div>
                                    </div>
                                    <div className="rectangleContainer">
                                        <div className="rectangle" style={{ width: '50%', margin: '5px 5px 0 0' }}>
                                            <h6>CREATED DATE & TIME</h6>
                                            <b><h6>26/12/2020, 10:30 AM</h6></b>
                                        </div>
                                        <div className="rectangle" style={{ width: '50%', margin: '5px 5px 0 0' }}>
                                            <h6>CASE ORIGIN</h6>
                                            <b><h6>Whatsapp</h6></b>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default withTranslation()(Case)
