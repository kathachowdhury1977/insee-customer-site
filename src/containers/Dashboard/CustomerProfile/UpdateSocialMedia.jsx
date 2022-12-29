import React, { useEffect,useState,useRef,useMemo  } from "react";
import { eventActions,masterActions } from "../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import Header from "../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import UserProfileCard from "../../../components/UserProfileCard/UserProfileCard";
import FormInput from "../../../components/FormInput/FormInput";
import addMore from "../../../assets/img/plus.png";
import "./CustomerProfile.scss";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function UpdateSocialMedia() {
  let userName = localStorage.getItem('userData');
  userName = JSON.parse(userName);
  const inputRefs = useRef([]);
  const [socialText, setSocialText] = useState();
  const [socialmedia, setSocialMedia] = useState({
    facebook: '',
    id:localStorage.getItem('CustomerNumber'),
    instagram: '',
    line: '',
    soldToNumber:localStorage.getItem('CustomerNumber'),
    twitter: '',
    viber: '',
    whatsapp: '',
    zalo: ''
});
  const getCustomerBySoldTo = useSelector(state => state.getCustomerBySoldTo);
  const adminSocialmedia = useSelector(state => state.adminSocialmedia);
  
  const { t } = useTranslation();
  const dispatch = useDispatch();
  ///console.log('userName',userName);
  useEffect(()=>{
    dispatch(masterActions.getCustomerBySoldTo(localStorage.getItem('CustomerNumber')));
  },[]);
  console.log('userName',userName);
  const handleChange=(e)=>{debugger
    setSocialText(e.target.value)
   
    ///setSocialMedia(socialmedia => ({ ...socialmedia, [e.target.name]: e.target.value}));
  }
  const handleSubmit=(e)=>{debugger
    e.preventDefault();
     const curentValue=inputRefs.current;
     const socialmediaData={};
     var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
     if(regex.test(socialText)){
        for(let i=0;i<curentValue.length;i++)
        {
          ///console.log('namenamename',curentValue[i]);
          
            if(curentValue[i]!=null)
          {
            socialmediaData[curentValue[i].name]=curentValue[i].value;
            socialmediaData['soldToNumber']=localStorage.getItem('CustomerNumber')
          }
       }
      }
      else {
        toast.error("Invalid url. please enter valid url", {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
       }
     ////console.log('socialmediaDatasocialmediaData',socialmediaData);
     dispatch(masterActions.adminSocialmedia(socialmediaData));
     ///console.log('getCustomerBySoldTo',curentValue);
  }

  useEffect(()=>{
    if(adminSocialmedia.adminSocialmedia!==undefined)
    {
      setTimeout(()=>{
        window.location.reload();
      },2000);
    }
    
  },[adminSocialmedia.adminSocialmedia])

  const socialMediaDumyData={
    "facebook": "",
    "instagram": "",
    "line": "",
    "twitter": "",
    "viber": "",
    "whatsapp": "",
    "soldToNumber": "",
    "zalo": ""
  };
  ////console.log('adminSocialmedia',adminSocialmedia);  

  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
  const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);
  return (
    <>
      <div className="content-wrapper user_section">
        <Header title= "Update Profile" />
        <div className={"row ipad_css "  + MyNewClass}>
          <form style={{width:"100%"}} onSubmit={handleSubmit}>
          <div className="mainScroll">
          {getCustomerBySoldTo && getCustomerBySoldTo.customerDetailById!==undefined? 
            <div class="customer_profile">
              <div className="main-heading">
                <h5 style={{fontSize: `${HeadingFontChange}px`}}>{t("userprofile.heading")}</h5>
              </div>
              <UserProfileCard customerInfo={getCustomerBySoldTo.customerDetailById}/>
              <div className="row mt-3">
                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h6 className="form_title" style={{fontSize: `${FontChange}px`}}>{t("updatesocialmedia.heading")}</h6>
                </div>
                </div>
                <div className="row mt-3">
                {getCustomerBySoldTo && getCustomerBySoldTo.customerDetailById!==undefined && getCustomerBySoldTo.customerDetailById.socialMedia!==null?
                Object.entries(getCustomerBySoldTo.customerDetailById.socialMedia).map((data)=>{
                  const [key, value] = data;
                         if(key!='id' && key!='soldToNumber')
                         {
                          return(
                            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                            <div className="form_section">
                              <div className="inputBox ">
                                <label style={{fontSize: `${FontChange}px`}}>{t(key.toUpperCase())}</label>
                                <input style={{fontSize: `${FontChange}px`}} ref={ref=>inputRefs.current.push(ref)}  type="text" placeholder={t(key.toUpperCase())} onChange={handleChange} className="input" name={key} defaultValue={value}/>
                                
                              </div>
                            </div>
                            
                          </div>
                          );
                          }
                      }):Object.entries(socialMediaDumyData).map((data)=>{
                        const [key, value] = data;
                               if(key!='id' && key!='soldToNumber')
                               {
                                return(
                                  <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                  <div className="form_section">
                                    <div className="inputBox ">
                                      <label style={{fontSize: `${FontChange}px`}}>{t(key.toUpperCase())}</label>
                                      <input style={{fontSize: `${FontChange}px`}} ref={ref=>inputRefs.current.push(ref)}  type="text" placeholder={t(key.toUpperCase())} onChange={handleChange} className="input" name={key} defaultValue={value}/>
                                      
                                    </div>
                                  </div>
                                  
                                </div>
                                );
                                }
                            })
                      }
               </div>
               <div className="row" style={{paddingBottom:"50px"}}>
                 {adminSocialmedia && adminSocialmedia.loading?<h6>loading....</h6>:''}
                 {adminSocialmedia && adminSocialmedia.adminSocialmedia!==undefined?<h6>Social details updating...</h6>:''}
                <div className="col-12">
                <div className="form_section">
                  <div className="create_link">
                    <button type="button" className="cancel" style={{fontSize: `${FontChange}px`}}> {t("cancel.button")}</button>
                    <button type="submit" className="create" style={{fontSize: `${FontChange}px`}}>{t("save.button")} </button>
                  </div>
                  </div>
                </div>
                </div>
            </div>:''
           }
          </div>
         </form>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(UpdateSocialMedia);
