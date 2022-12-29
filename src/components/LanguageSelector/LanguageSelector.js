import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import  '../../containers/Home/Home.scss';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const countryCode = userName ? userName.countryCode : ''
  const changeLanguage = (event) => {
    localStorage.setItem("lancode",event.target.value);
    i18n.changeLanguage(event.target.value);
  };
  // useEffect(()=>{
  //   setTimeout(() => {
  //     i18n.changeLanguage(localStorage.getItem("lancode"));
  //   }, 2000);
    
  // },[]);

  // useEffect(() => {
  //    i18n.changeLanguage(localStorage.getItem("lancode"));
  // })
 
  // console.log(localStorage.getItem("lancode"), '85')
  let languageObj=[{key:"th",value:"Thailand"}, {key:"en",value:"English"},{key:"vt",value:"Vietnam"}];
  return (
    <div className="languageselector" onChange={changeLanguage}>
     <select>
       {
         languageObj.map((lan)=>{
           if(localStorage.getItem("lancode")==lan.key)
           {
            return(
              <option selected value={lan.key} key={lan.key} name="language">
                 {lan.value}
              </option>
             );
           }else
           {
            return(
              <option value={lan.key}  key={lan.key} name="language">
                 {lan.value}
              </option>
             );
           }
           
         })
       }
      </select>

    </div>

  );

};


export default LanguageSelector;