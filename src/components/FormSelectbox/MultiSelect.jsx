import React, { useState, useEffect } from 'react';
import MultiSelect from  'react-multiple-select-dropdown-lite';
import  'react-multiple-select-dropdown-lite/dist/index.css';
import "./selectoption.scss"
import { eventActions } from "../../_actions";
import { withTranslation, useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

export function  MultiSelectBox (props)  {
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const [value, setvalue] = useState([])

  const selectedLangCode = localStorage.getItem('lancode');

  const  handleOnchange  =  (value, name)  => {debugger
    setvalue(value)
    props.setShipToId(value)
    var data = value.split(",")
    console.log(("data+++",data))
    props.setFilterarray ({
      ...props.filterarray,
      [props.name]: data,
    })
   
    // dispatch(eventActions.productSelectId(data));
  }

 

  return(
    <div className="select_option">
      <MultiSelect
        className="multiSelect"
        name={props.name}
        placeholder={props.placeholder}
        onChange={handleOnchange}
        options={props.getShipToForVnDataValue}
      />
    </div>
)}



export function  MultiSelectBoxDelivery (props)  {
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const [value, setvalue] = useState([])

  const selectedLangCode = localStorage.getItem('lancode');

  const  handleOnchange  =  (value, name)  => {debugger
    setvalue(value)
    props.setShipToId(value)
    var data = value.split(",")
    console.log(("data+++",data))
    props.setFilterarray ({
      ...props.filterarray,
      [props.name]: data,
    })
   
    // dispatch(eventActions.productSelectId(data));
  }

 

  return(
    <div className="select_option">
      <MultiSelect
        className="multiSelect"
        name={props.name}
        placeholder={props.placeholder}
        onChange={handleOnchange}
        options={props.getShipToForVnDataValue}
      />
    </div>
)}
