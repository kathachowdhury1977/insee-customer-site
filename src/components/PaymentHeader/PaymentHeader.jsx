import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import FormInput from "../FormInput/FormInput";
import InputSearch from "../InputSearch/InputSearch";
import "./PaymentHeader.scss";
import excelIcon from "../../assets/img/Export-to-excel.png";
import { Link } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DateRangePicker from 'react-bootstrap-daterangepicker'
import moment from 'moment'
import 'moment-timezone'
import styled from 'styled-components';
import { useSelector } from "react-redux";
function PaymentHeader(props) {
    const { t } = useTranslation();
    const [validate, setValidate] = useState(false);
    const [showResults, setShowResults] = React.useState(false);
    const selectedDay = (val) => {
        console.log(val);
    };
    function onToggleChange(checked) {

        setValidate(checked)
    }

    function onSelectChange(event) {
        console.log(event);
    }

    const clearSearch = () => {
        window.location.reload()
      }
      const URL = window.location.pathname
    const onClick = () => setShowResults(showResults => !showResults);
   
    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
    const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)
    const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
    const Container = styled.div`
    .MuiFormControlLabel-label {
       font-size: ${FontChange}px
  
    }
  `;
    return (
        <>

            <div className="row mb-3 payment_header_container">
                <div className="col-xl-2 col-lg-2 col-md-12 co-sm-12 col-xs-12">
                    <p className="bigHeading" style={{fontSize:`${SmallFontChanger}px`}}>{props.heading}</p>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <div className="form_section">
                            <div className="inputBox">
                    <label style={{fontSize:`${SmallFontChanger}px`}}>{t("Search")}</label>
                    {URL === '/PaymentHistory' ?
                        <InputSearch  style={{fontSize:`${SmallFontChanger}px`}} onChangeSearch={props && props.onChangeSearch}  placeholder={t('Type Payment Ref No')}/> :  <InputSearch onChangeSearch={props && props.onChangeSearch}  placeholder={t('Type Doc No PO No Status')}/> }
                    </div>
                    </div>
                </div>

            

                <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-xs-12 pr-0">

                    {URL === '/PaymentHistory' ?
                        <div className="form_section">
                            <div className="inputBox">
                                <label style={{fontSize:`${SmallFontChanger}px`}}>{t("label.transaction_date")}</label>
                                <DateRangePicker
                                  onEvent={props.handleEvent}
                                  onCallback={props && props.paymentHisDateChange}
                                >
                                  <button className='mt-1 dateRangeButton'>
                                {
                                     props.pleaseSelectTransDate  === 'DD-MM-YYYY' ? props.pleaseSelectTransDate :                                    
                                    `${moment(props.fromDateTransDate).format("DD-MM-YYYY")} 
                                    to 
                                    ${moment(props.toDateTransDate).format("DD-MM-YYYY")}`
                                }
                                  
                                  </button>
                                </DateRangePicker>
                                {/* <FormInput
                                    type={"date"}
                                    class={"input"}
                                    palceHolder ="jnjnjnn"
                                    name={"eventname"}
                                    onChange={props && props.paymentHisDateChange}
                                    label={t("label.transaction_date")}
                                /> */}
                            </div>
                        </div>

                        :
                        URL !== '/IncentivePayment' ?
                        <div className="form_section">
                            <div className="inputBox">
                                <label style={{fontSize:`${SmallFontChanger}px`}}>{t("payment.doc_date")}</label>
                                <DateRangePicker
                                  onEvent={props.handleEvent}
                                  onCallback={props.handleCallback}
                                >
                                  <button disabled={props.dateDisable} className='mt-1 dateRangeButton'>
                                {
                                     props.pleaseSelect  === 'DD-MM-YYYY' ? props.pleaseSelect :                                    
                                    `${moment(props.fromDate).format("DD-MM-YYYY")} 
                                    to 
                                    ${moment(props.toDate).format("DD-MM-YYYY")}`
                                }
                                  
                                  </button>
                                </DateRangePicker>
                            </div>
                        </div> : 
                        <div className='form_section'>
                        <div className='inputBox'>
                        <label style={{margin : '0px'}}>{t('Status')}</label>
                        <select
                          className='input'
                          name='preferedTrucktype'
                          onChange={onSelectChange}
                        >
                             <option value={0}>No Data available</option>
                          {/* <option value=''>{t('Please select Preferred Truck type')}</option>
                          {preftrucktype.preftrucktype ? (
                            preftrucktype.preftrucktype.map((preftrucktype) => {
                              return (
                                <option value={preftrucktype.value}>
                                              {preftrucktype.value}
                                </option>
                              )
                            })
                          ) : (
                            <option value={0}>No Data available</option>
                          )} */}
                        </select>
                        
                      </div>
                      </div>

                    }


                </div>
                <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-xs-12">

                    {URL === '/PaymentHistory' ?
                        <div className="row">
                            
                            <div className="col-12">
                            <label style={{fontSize:`${SmallFontChanger}px`}}>{''}</label>
                                <i class="fa fa-bars" onClick={onClick} aria-hidden="true"></i>
                            </div>

                        </div>
                        :
                        URL !== '/IncentivePayment' ?
                        <div className="form_section">
                            <div className="inputBox">
                                <label style={{fontSize:`${SmallFontChanger}px`}}>{t("label.duedate")}</label>
                                {
                                  props.pamentTypeCat && props.pamentTypeCat === 'Receipt' ? 
                                  <DateRangePicker
                                  onEvent={props.handleEvent}
                                  onCallback={props.handleCallbackDueDate}
                                 
                                >
                                  <button  disabled={props.dateDueDisable} className='mt-1 dateRangeButton'>
                                {
                                                                        
                                    `${moment(props.fromDueDateSetteld).format("DD-MM-YYYY")} 
                                    to 
                                    ${moment(props.toDateDueSetteld).format("DD-MM-YYYY")}`
                                }
                                  
                                  </button>
                                </DateRangePicker>
                                :
                                <DateRangePicker
                                onEvent={props.handleEvent}
                                onCallback={props.handleCallbackDueDate}
                               
                              >
                                 <button  disabled={props.dateDueDisable} className='mt-1 dateRangeButton'>
                                {
                                     props.pleaseSelectDue  === 'DD-MM-YYYY' ? props.pleaseSelectDue :                                    

                                    `${moment(props.fromDueDate).format("DD-MM-YYYY")} 
                                    to 
                                    ${moment(props.toDateDue).format("DD-MM-YYYY")}`
                                }
                                  
                                  </button>
                                
                              </DateRangePicker>
                                }
                               
                            </div>
                        </div>
                        : <div className="inputBox">
                        <label style={{fontSize:`${SmallFontChanger}px`}}>{t("payment.doc_date")}</label>
                        <DateRangePicker
                          onEvent={props.handleEvent}
                          //onCallback={props.handleCallback}
                        >
                          <button disabled={props.dateDisable} className='mt-1 dateRangeButton'>
                        {
                             props.pleaseSelect  === 'DD-MM-YYYY' ? props.pleaseSelect :                                    
                            `${moment(props.fromDate).format("DD-MM-YYYY")} 
                            to 
                            ${moment(props.toDate).format("DD-MM-YYYY")}`
                        }
                          
                          </button>
                        </DateRangePicker>
                    </div>

                    }


                </div>
                <div className="col-sm-12 col-md-12 col-lg-2">
                <label>{''}</label>
                    <span className='text-red' onClick={clearSearch} style={{fontSize:`${SmallFontChanger}px`}}>
                      {t('Clear Search')}
                    </span>
                </div>
                
                {showResults ?
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="list_tems bg-light">
                        
                            <FormControl component="fieldset" className="ml-4">
                                <RadioGroup row aria-label="position" name="position" defaultValue="" className="filterRedio">
                                <FormControlLabel
                                        value="all"
                                        control={<Radio color="primary" />}
                                        label={t("All")}
                                        onChange={props.handleChangeCat}

                                    />
                                    <FormControlLabel
                                        value="In-Progress"
                                        control={<Radio color="primary" />}
                                        label={t("label.in_progress")}
                                        onChange={props.handleChangeCat}

                                    />

                                    <FormControlLabel
                                        value="Cancelled"
                                        control={<Radio color="primary" />}
                                        label={t("Cancelled")}
                                        onChange={props.handleChangeCat}

                                    />

                                    <FormControlLabel
                                        value="Receipt"
                                        control={<Radio color="primary" />}
                                        label={t("Receipt")}
                                        onChange={props.handleChangeCat}

                                    />

                                    <FormControlLabel
                                        value="Processing"
                                        control={<Radio color="primary" />}
                                        label={t("Processing")}
                                        onChange={props.handleChangeCat}

                                    />

                                    <FormControlLabel
                                        value="Failed"
                                        control={<Radio color="primary" />}
                                        label={t("Failed")}
                                        onChange={props.handleChangeCat}

                                    />
                                </RadioGroup>
                            </FormControl>
                          
                        </div>
                    </div>
                    : null}
            </div>

        </>
    );
}

export default withTranslation()(PaymentHeader);