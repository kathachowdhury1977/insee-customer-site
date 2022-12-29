import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation, Redirect, Link } from 'react-router-dom'
import i18n from 'i18next'
import Grid from '@material-ui/core/Grid'
import logo from '../../assets/img/insee-login.png'
import BottomLogo from '../../assets/img/bottom_logo.png'
import { useTranslation, withTranslation } from 'react-i18next'
import { Store } from '../../Store'
import FormInput from '../../components/FormInput/FormInput'
import Button from '../../components/Button/Button'

import './Login.scss'
import { masterActions } from '../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import emailIcon from '../../assets/img/email.png'
import passwordIcon from '../../assets/img/password.png'

import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
export function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
const ResetPassword = () => {
  const query = useQuery();
  const dispatch = useDispatch()
  const { t } = useTranslation()
  let history = useHistory();
  const[password,setPassword]=useState('');
  const[errorpassword, setErrorPassword]=useState('');
  const[dissable,setDissable]=useState(true);
  const[errot,setError]=useState('');
  const[confpassword,setConfirmPassword]=useState('');
  const resetPassword=useSelector((state) => state.resetPassword);
  const setPasswordData=useSelector((state) => state.setPassword);
  const selectedLangCode = localStorage.getItem('lancode');
  useEffect(()=>{
    let passwordResetReqId=query.get('id');
   dispatch(masterActions.resetPassword(passwordResetReqId));
  },[]);
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    let passwordResetReqId=query.get('id');
    
    if(confpassword!==password)
    {
      setError("The password and confirm password does not match!!");
    }else
    {
      setError("");
      dispatch(masterActions.setPassword(passwordResetReqId,password,confpassword))
    }
    
  }

  const passwordChange = (event) => { 
    const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#^()-_=+"'@$!%*?&])[A-Za-z\d#^()-_=+"'@$!%*?&]{8,}$/
    if(passwordRegex.test(event.target.value)){
      setDissable(false)
      setErrorPassword('')
      setPassword(event.target.value) 
      
  }
  else if (event.target.value === '') {
    setErrorPassword('')
    setDissable(true)
  }
  else {
    setDissable(true)
    setErrorPassword('New Password must be at least 8 characters, One Uppercase, One Lowercase, One special character : รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร, ตัวพิมพ์ใหญ่หนึ่งตัว, ตัวพิมพ์เล็กหนึ่งตัว, อักขระพิเศษหนึ่งตัว')
  }
    
    
  }

  
  console.log('resetPasswordresetPassword',setPasswordData);
  return (
    <>
      <Grid className='LoginContainer'>
        {localStorage.getItem('userData') ? <Redirect to='/Dashboard' /> : null}
        <div className='container login_sec'>
          <div className='row'>
            <div className='col-lg-5 col-md-5 col-sm-12 col-xs-12'>
            <div className='login_left_sec'>
                <img alt='logo' src={logo} />
                <div className='left_txt'>
                  <h4 className='head_txt'>
                    {t('welcome.label')} <br />
                    INSEE PLUS
                  </h4>
                  <div className='address_dtl'>
                    <span>
                      {' '}
                      <i class='fa fa-map-marker' aria-hidden='true'></i>{' '}
                      Thailand
                    </span>
                    <br />
                    <span>
                      {' '}
                      <i class='fa fa-phone' aria-hidden='true'></i> 1732
                    </span>
                    <br />
                    <span>
                      {' '}
                      <i class='fa fa-envelope' aria-hidden='true'></i>{' '}
                      wecare@siamcitycement.com
                    </span>
                  </div>

                  <div className='address_dtl'>
                    <span>
                      {' '}
                      <i class='fa fa-map-marker' aria-hidden='true'></i>{' '}
                      Vietnam
                    </span>
                    <br />
                    <span>
                      {' '}
                      <i class='fa fa-phone' aria-hidden='true'></i> 18001718
                    </span>
                    <br />
                    <span>
                      {' '}
                      <i class='fa fa-envelope' aria-hidden='true'></i>{' '}
                      aloinsee@siamcitycement.com
                    </span>
                  </div>

                  <div className='address_dtl'>
                    <span>
                      {' '}
                      <i class='fa fa-map-marker' aria-hidden='true'></i> Sri
                      Lanka
                    </span>
                    <br />
                    <span>
                      {' '}
                      <i class='fa fa-phone' aria-hidden='true'></i> 0117800801
                    </span>
                    <br />
                    <span>
                      {' '}
                      <i class='fa fa-envelope' aria-hidden='true'></i>{' '}
                      lka@siamcitycement.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-7 col-md-7 col-sm-12 col-xs-12'>
              <div className='login_img'>
                <div className='login_right_sec mb-3'>
                  <h4 className='head_txt'>{t('Reset Password')}</h4>
                  <div className='Login_Section form_section'>
                  <form onSubmit={handleSubmit}>
                      <div className='inputBox '>
                        <input
                          type={'password'}
                          name={'username'}
                          onChange={(event) => passwordChange(event)}
                          placeholder={t('password.label')}
                          className='input'
                          required
                        />
                        {/* <img src={emailIcon} /> */}
                        <span style={{color:"red"}}>{selectedLangCode === 'en' || selectedLangCode === null ? errorpassword.split(':')[0] : errorpassword.split(':')[1]}</span>
                        
                      </div>

                      <div className='inputBox mb-1'>
                        <input
                          type={'password'}
                          name={'password'}
                          onChange={(event) => setConfirmPassword(event.target.value)}
                          placeholder={t('Confirm Password')}
                          className='input'
                          required
                        />
                        {/* <img src={passwordIcon} /> */}
                      </div>
                       {setPasswordData && setPasswordData.error!==undefined?<span style={{color:"red"}}>{setPasswordData.error}</span>:''}
                       {setPasswordData && setPasswordData.setPassword!==undefined?<span style={{color:"green"}}>{setPasswordData.setPassword.data}</span>:''}
                       {errot!==''?<span style={{color:"red"}}>{errot}</span>:''}
                      <Button disabled={dissable} type={'submit'} label={t('Set Password')} />

                    </form>
                    <div style={{textAlign:'center', marginTop:'10px', color:'red'}}>
                    <Link style={{textAlign:'center', marginTop:'10px', color:'red'}} to={'/'}>{t("Go To Login")}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="container bottom_logo">
				<div className="row">
					<img src={BottomLogo} />
				</div>
			</div> */}
      </Grid>
      
    </>
  )
}

export default withTranslation()(ResetPassword)
