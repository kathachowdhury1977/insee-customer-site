import React, { useEffect, useState } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { paymentofflineActions } from "../../_actions";
import FormControl from '@material-ui/core/FormControl';
import "./RadioButton.scss";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { eventActions } from "../../_actions";
import Loading from '../../components/Loader/Loading'


export default function RadioButtonSoldToGroup(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();
   
    let userName = localStorage.getItem('userData');
    userName = JSON.parse(userName);
    let countryCode = localStorage.getItem('userData')
    countryCode = JSON.parse(countryCode)
   const soldToNo = userName.soldTo[0]
   const todayDat = new Date();
   let onlyDateGet = todayDat.getFullYear() + '-' + ('0' + (todayDat.getMonth()+1)).slice(-2) + '-' + ('0' + todayDat.getDate()).slice(-2);
    const getDivisionForCustomerRedio = props.getDivisionForCustomer;

    // const selectedDivision = getDivisionForCustomerRedio && getDivisionForCustomerRedio!=null 
    //                             && getDivisionForCustomerRedio != undefined &&
    //                             getDivisionForCustomerRedio.data != undefined ?
    //                              getDivisionForCustomerRedio.data[0].key : ''

    // console.log(selectedDivision, 'selectedDivision')
    return (
        <FormControl component="fieldset" className="ml-0">
            <RadioGroup row aria-label="position" name="position" defaultValue={''}>
          
                  {
                     getDivisionForCustomerRedio && getDivisionForCustomerRedio  &&
                      props.getDivisionForCustomer.data && props.getDivisionForCustomer.data.map((data) => {
                          return (
                            <FormControlLabel
                            value={data.key}
                            control={<Radio color="primary" />}
                            label={data.value.split('-')[0]}
                            onChange={props.handleChangeCat}        
                         />
                          )
                        
                      })
                      
                  }
                   
              
            </RadioGroup>
        </FormControl>
    );
}
