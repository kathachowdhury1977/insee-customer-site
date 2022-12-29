import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import i18n from 'i18next'
import Grid from '@material-ui/core/Grid'
import logo from '../../assets/img/insee-login.png'
import BottomLogo from '../../assets/img/bottom_logo.png'
import ShowPassword from '../../assets/img/showPassword.png'
import HidePassword from '../../assets/img/hidePass.png'
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
import Loading from '../../components/Loader/Loading'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import DbdLogo from '../../components/Footer/Footer'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  back_button: {
    backgroundColor: '#000 !important',
    color: '#fff !important',
    marginRight: '8px !important',
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}))

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(() => ({
  root: {
    padding: '25px',
    textAlign: 'center',
    width: '417px',
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    // margin: 0,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginTop: '20px',
    display: 'block',
  },
}))(MuiDialogActions)

const Login = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  let history = useHistory()
  const [convertedText, setConvertedText] = useState('en')
  const loggedIn = useSelector((state) => state.authentication);
  const forgotPassword = useSelector((state) => state.forgotPassword);
  const forgotPasswordError = useSelector((state) => state.forgotPassword.message);
  const user = useSelector((state) => state.authentication.user)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loginfailMessage, setLoginfailMessage] = useState('')
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  console.log(forgotPassword && forgotPassword, 'forgotPasswordError')
  useEffect(() => {
    localStorage.setItem("lancode",'en');
    i18n.changeLanguage(localStorage.getItem("lancode"));
   
      

    
    ///localStorage.clear();
  }, [])

  useEffect(() => {
     setTimeout(() => {
      if(forgotPassword && forgotPassword.forgotPassword !== undefined){
        if(forgotPassword.forgotPassword.data === "Password reset link has been sent to registered email!!"){      
          window.location.reload();
        }
      }
     
        }, 3000);
  })


  function handleChange(e, n) {
    if (n === 'userName') {
      setUsername(e)
    }
    if (n === 'password') {
      setPassword(e)
    }
  }

  // let username = "10001";
  // let passwords = "insee@123";
  function handleSubmit(e) {
    e.preventDefault()
   
    const { from } = location.state || { from: { pathname: '/Dashboard' } }
    dispatch(masterActions.login(username, password, from))
    dispatch(masterActions.isLoggedIn(true))
   
    

   
   // window.forcedReload(true)
    ///history.push("/Dashboard");
  }

// const defaultLang = () => {
//    if(countryCode && countryCode === 'TH'){
//       localStorage.setItem("lancode",'th');
//       return;
//     }
//     if(countryCode && countryCode === 'VN'){
//       localStorage.setItem("lancode",'en');
//       return;
//     } 
// }

  const forgotpassword = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    window.location.reload();
  }
  const getUserName = (e) => {
    setUsername(e.target.value);
  }
  const forgotSubmit = (e) => { debugger
    e.preventDefault();
    setLoading(true)
    console.log('username', username);
    dispatch(masterActions.forgotPassword(username))
   
    setTimeout(() => {      
      setLoading(false)
  }, 500);
      

  }
  ////console.log('forgotPasswordforgotPassword',forgotPassword);
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
                    {t('INSEE PLUS')}
                 
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
                  <div className='title-heading'>
                    {loggedIn && loggedIn.loggedInFail ? (
                      <span>{loggedIn.message}</span>
                    ) : (
                      ''
                    )}
                    <h4 className='head_txt'>{t('login.label')}</h4>
                    {/* <Typography className="sub_head">
										{t("login.label")}
								This is a sucure system and you will need to provide your login details to access the site
							</Typography> */}
                  </div>
                  <div className='Login_Section form_section'>
                    <form onSubmit={handleSubmit}>
                      <div className='inputBox '>
                        <input
                          type={'text'}
                          name={'username'}
                          onChange={(event) => setUsername(event.target.value)}
                          placeholder={t('username.label')}
                          className='input'
                          required
                        />
                        {/* <img src={emailIcon} /> */}
                      </div>

                      <div className='inputBox mb-1 loginPassword'>
                        <input
                          type={isRevealPwd ? "text" : "password"}
                          name={'password'}
                          onChange={(event) => setPassword(event.target.value)}
                          placeholder={t('password.label')}
                          className='input'
                          required
                          autocomplete="off"
                        />
                        <img
                        title={isRevealPwd ? "Hide password" : "Show password"}
                        src={isRevealPwd ? HidePassword : ShowPassword}
                        onClick={() => setIsRevealPwd(prevState => !prevState)}
                      />
                        {/* <img src={passwordIcon} /> */}
                      </div>
                      <div className='inputBox text-right mb-4'>
                        <a onClick={forgotpassword} href='javascript:;'>
                          {t('forgotpassword.label')}
                        </a>
                      </div>
                      <Button type={'submit'} label={t('login.button')} />
                    </form>
                  </div>
                </div>
               
              </div>
              <div className='dbdLoginpage'>
              <DbdLogo />
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
      {/* Sold To Selection modal start */}
      <div className='dialog-boxes'>
        <Dialog aria-labelledby='customized-dialog-title' open={open}>
          <DialogTitle id='customized-dialog-title' onClose={handleClose}>
            {t('forgotpassword.label')}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={forgotSubmit}>
              <div class='form-group'>
                <input
                  type='text'
                  class='form-control'
                  name='UserName'
                  id='UserName'
                  value={username}
                  onChange={getUserName}
                  placeholder={t('username.label')}
                />
                {loading ? <div className="loading1"> <Loading /> </div> : ''}
                {forgotPassword && forgotPassword.forgotPassword !== undefined ?
                  <span style={{ color: "green" }}>{forgotPassword.forgotPassword.data}</span>
                  : ''
                }
                {
                  forgotPassword && forgotPassword.loading ? <span style={{ color: "red" }}>No customer found</span> : ''
                }
              </div>
              <button
                style={{
                  background: '#ff0000',
                  color: '#fff',
                  border: '1px solid #fff',
                }}
                type='submit'
                class='btn btn-primary'
              >
                {t('submit.button')}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default withTranslation()(Login)
