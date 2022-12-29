import React, { useState, useContext, useEffect } from 'react'
import { Store } from '../../Store'
import './Header.scss'
import { eventActions } from '../../_actions'
import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import '../../assets/css/Inseehome.scss'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import '../../assets/css/all-skins.min.scss'
import LeftDrawer from './LeftDrawer'
import { withTranslation, useTranslation } from 'react-i18next'
import userlogo from '../../assets/img/men.jpg'
import ToggleButton from '../ToggleButton/ToggleButton'
import { useHistory } from 'react-router'
import { orderActions } from '../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import SCCCPrivacyPolicyforCustomerEN from '../../assets/pdf/SCCC-Privacy-Policy-for-Customer-EN.pdf'
import SCCCPrivacyPolicyforCustomerTH from '../../assets/pdf/SCCC-Privacy-Policy-for-Customer-TH.pdf'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from "react-router-dom";
import RadioButtonSoldToGroup from "../../components/RadioButtonGroup/RedioButtonGroupSoldTo";
import { getCustomerPdpInfo } from '../../_reducers/getCustomerPdpInfo.reducer'
import Loading from '../../components/Loader/Loading'

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
    width: '437px',
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
export const Context = React.createContext()

function Header(props) {
  const [openPDP, setOpenPDP] = useState(false);
  let userName = localStorage.getItem('userData');
  userName = JSON.parse(userName);
  const loginData = userName
  const countryCode = userName ? userName.countryCode : ''
  const selectedLangCode = localStorage.getItem('lancode');
  const isShipToSelected = useSelector(state => state.isShipToSelected.isShipToSelected);
  const isPlantsSelected = useSelector(state => state.isPlantsSelected.isPlantsSelected);
  const pdpConfirmedCustomer = useSelector(state => state.getCustomerPdpInfo.getCustomerPdpInfo);
  const placeOrderFilterSearchClicked = useSelector(state => state.placeOrderFilterSearchClicked.placeOrderFilterSearchClicked);
  const getSoldTosForDivision = useSelector((state) => state.getSoldTosForDivision.getSoldTosForDivision)
  const getDivisionForCustomerData = useSelector((state) => state.getDivisionForCustomer.getDivisionForCustomer)
  const dispatch = useDispatch();
  const cartdata = useSelector((state) => state.cartdata);
  const cartdataError = useSelector((state) => state.cartdata.error);

  const selectedSoldToNo = localStorage.getItem('isSelectedSoldToNo')


  // const selectedByDefault = getDivisionForCustomerData && getDivisionForCustomerData != null
  //                           && getDivisionForCustomerData != undefined && getDivisionForCustomerData.data != null &&  getDivisionForCustomerData.data != undefined ? 
  //                            getDivisionForCustomerData.data[0].key : ''

  // console.log(selectedByDefault, 'getDivisionForCustomerData')
  //const { state, dispatch } = useContext(Store);
  const [validate, setValidate] = useState(false)


  let history = useHistory()
  const { t } = useTranslation()
  const { i18n } = useTranslation()
  const [sidebarDesign, setSideBar] = useState('')
  const [headerDesign, setHeaderBar] = useState('')
  const [open, setOpen] = useState(false)
  const [openSoldTo, setOpenSoldto] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [openActive, setOpenActive] = useState(false)
  const [smallFontSize, setSmallFontSize] = React.useState(12);
  const [fontSize, setFontSize] = React.useState(14);
  const [headerfontSize, setHeaderFontSize] = React.useState(18);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const [addClass, setAddClass] = useState('');


  useEffect(()=> {
    dispatch(eventActions.SmallFontChanger(smallFontSize));
    dispatch(eventActions.fontSizeChanger(fontSize));
    dispatch(eventActions.HeaderFontChanger(headerfontSize));
  }, [])

  const fontDecrement = () => {
    
    let myDescriment = fontSize - 2;

    setFontSize(myDescriment);

    let HeaderfontDesc = headerfontSize - 2;
    setHeaderFontSize(HeaderfontDesc)

    let SmallFontDesc = smallFontSize - 2;
    setSmallFontSize(SmallFontDesc)
    if (SmallFontDesc < 8) {
      return;
    }
    if (myDescriment < 10) {
      return;
    }
    if (HeaderfontDesc < 14) {
      return;
    }
    else {
      dispatch(eventActions.SmallFontChanger(SmallFontDesc));
      dispatch(eventActions.fontSizeChanger(myDescriment));
      dispatch(eventActions.HeaderFontChanger(HeaderfontDesc));
    }

  }

  const fontIncrement = () => {
    
    let myIncrement = fontSize + 2;
    setFontSize(myIncrement);

    let HeaderfontInc = headerfontSize + 2;
    setHeaderFontSize(HeaderfontInc)

    let SmallFontIns = smallFontSize + 2;
    setSmallFontSize(SmallFontIns)
    if (SmallFontIns > 20) {
      return;
    }
    else if (myIncrement > 24) {
      return;
    }
    else if (HeaderfontInc > 28) {
      return;
    }
    else {
      dispatch(eventActions.SmallFontChanger(SmallFontIns));
      dispatch(eventActions.fontSizeChanger(myIncrement));
      dispatch(eventActions.HeaderFontChanger(HeaderfontInc));
    }

  }

  const NormalSize = () => {
    dispatch(eventActions.SmallFontChanger(12));
    dispatch(eventActions.fontSizeChanger(14));
    dispatch(eventActions.HeaderFontChanger(18));
  }

  var customerNo = localStorage.getItem('CustomerNumber')
  const empyCartToast = () => {
    if (cartdata.cartdata.length > 0) {
      history.push('/CheckoutProcess')
    } else {
      toast.warning('The shopping cart is empty', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      i18n.changeLanguage(localStorage.getItem("lancode"));
      setIsLoading(false)
    }, 2000);

  }, []);

  useEffect(() => {
    //dispatch(orderActions.getCartData(customerNo))
    // getUserCartData()
    if (props.contractbyAcc || cartdataError === "Unauthorized") {
      setOpen(true)
      setTimeout(() => {
        onLogout()
      }, 10000)

    }
  }, [cartdataError, props.contractbyAcc])

  useEffect(() => {
    if (userName && userName.status === '0' || userName && userName.status === null) {
      setOpenActive(true)
      setTimeout(() => {
        onLogout()
      }, 2000)
    }
  })

  useEffect(() => {
    dispatch(orderActions.getCustomerPdpInfo(userName.userId))

  }, [0])


  useEffect(() => {
    setTimeout(() => {
      getCustomerPdpInfoData()
    }, 2000)
  }, [pdpConfirmedCustomer])



  const getCustomerPdpInfoData = () => {
    if (pdpConfirmedCustomer && pdpConfirmedCustomer.pdpConfirmed === null || pdpConfirmedCustomer && pdpConfirmedCustomer.pdpConfirmed === "NO") {
      if (countryCode && countryCode === 'VN') {
        setOpenPDP(false)
      }
      else {
        setOpenPDP(true)
      }

    }
    else {
      setOpenPDP(false)
    }
  }

  const handleClose = () => {
    setOpenPDP(false)
  }



  const navigateToCart = () => {
    history.push('/CheckoutProcess')
  }

  function onToggleChange(checked) {
    setValidate(checked)
  }

  function toggleMenu() {
    if (sidebarDesign == '' || headerDesign == '') {
      setSideBar('margin-left-sidebar');
      setHeaderBar('padding-Left')
    } else {
      setSideBar('');
      setHeaderBar('')
    }

    if(addClass == ''){
      setAddClass('myNewClass');
      dispatch(eventActions.addClasswithStype('myNewClass'));
    }
    else {
      setAddClass('') 
      dispatch(eventActions.addClasswithStype(''));
    }
  }

  const getUserCartData = () => {
    let customerno = localStorage.getItem('CustomerNumber')
    setTimeout(() => {
      let customerno = localStorage.getItem('CustomerNumber')
      dispatch(orderActions.getCartData(customerno))
    }, 2000)
  }

  function onLogout() {
    localStorage.clear();
    history.push("/");
  }
  const changeShipTo = (e) => {
    localStorage.setItem('CustomerNumber', e.target.value)
    localStorage.setItem('isSelectedSoldToNo', e.target.value)
  }

  const handleCustomerPdpInfo = () => {
    dispatch(orderActions.pdpConfirmed("Confirmed", userName.userId))
    setOpenPDP(false)
  }

  const openSoldToBox = () => {
    setOpenSoldto(true);
  }

  const handleCloseSoldTo = () => {
    history.push("/Dashboard");
    setOpenSoldto(false);
    window.location.reload();

  };
  const handleClosePopup = () => {
    setOpenSoldto(false)
  }

  useEffect(() => {
    if (loginData && loginData.userId && loginData.soldTo) {
      dispatch(eventActions.getDivisionForCustomer(loginData.userId, loginData.soldTo[0]))
      dispatch(eventActions.getSoldTosForDivision('', loginData.userId, loginData.soldTo[0]))
    }
  }, [])

  const handleChangeCat = (event) => {
    var selectedCat = event.target.value
    dispatch(eventActions.getSoldTosForDivision(selectedCat, loginData.userId, loginData ? loginData.soldTo[0] : 0))
    // dispatch(
    //     paymentofflineActions.getCatForFilter(event.target.value)
    //   );

  }


  return (
    <>
      <div className='header_button'>

        <button disabled={FontChange === 12} className='buttons' onClick={fontDecrement}> <span className='minues'> A <sup>-</sup> </span> </button> |
        <button className='buttons' onClick={NormalSize}> <span className='minues'> A </span> </button> |
        <button disabled={FontChange === 18} className='buttons' onClick={fontIncrement}> <span className='minues'> A <sup>+</sup> </span> </button>
      </div>

      <LeftDrawer style={sidebarDesign} />
      <header className={'leftClass ' + headerDesign}>
        <div className='container-fluid head_sec' >
          <div className='row mobile-view'>
            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 pl-0 pr-0 mobile-menubar'>
              <span className='toggle_menu' onClick={toggleMenu}>
                {
                  userName?.soldTo?.[0].startsWith('16') && history.location.pathname === '/SubDealerLoyalty' ? <i className='fa fa-LoyaltyPoints' aria-hidden='true'></i> : <i className='fa fa-bars' aria-hidden='true'></i>
                }
              </span>
              <span className='title' style={{ fontSize: `${HeadingFontChange}px` }}>{props.title} </span>
            </div>


            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12'>

              <div className='right-sec cart-profile-mobileview'>


                <div className='customercare-box'>
                  {
                    userName.countryCode == 'VN' ?
                      <>
                        <p className='mb-0 text-inline' style={{ fontSize: `${FontChange}px` }}>{t('shipmentdetail.customercare_btnVN')}</p>
                        <p className='mb-0 text-right text-inline mr-0' style={{ fontSize: `${FontChange}px` }}>18001718</p>
                      </>
                      :
                      <>
                        <p className='mb-0 text-inline' style={{ fontSize: `${FontChange}px` }}>{t('shipmentdetail.customercare_btn')}</p>
                        <p className='mb-0 text-right text-inline mr-0' style={{ fontSize: `${FontChange}px` }}>1732</p>
                      </>
                  }


                </div>

                

                {placeOrderFilterSearchClicked === true &&
                  isShipToSelected === true &&
                  isPlantsSelected === true ? (
                  <div className='notification' onClick={navigateToCart}>
                    <i className='fa fa-shopping-cart' aria-hidden='true'></i>
                    <span>
                      {cartdata.cartdata && cartdata.cartdata
                        ? cartdata.cartdata.length
                        : 0}
                    </span>
                  </div>
                ) : (
                  <div className='notification' onClick={empyCartToast}>
                    <i className='fa fa-shopping-cart' aria-hidden='true'></i>
                    <span>
                      {cartdata.cartdata && cartdata.cartdata
                        ? cartdata.cartdata.length
                        : 0}
                    </span>
                  </div>
                )}

                {validate === true ? (
                  <span
                    className='user-icon'
                    data-toggle='modal'
                    data-target='#myModal'
                  >
                    <div className='dropdown show'>
                      <a
                        className='dropdown-toggle'
                        href='#'
                        id='dropdownMenuLink'
                        data-toggle='dropdown'
                        aria-expanded='false'
                      >
                        <img src={userlogo} height='40px' width='40px' />
                        <span className='user_name'>
                          {userName && userName ? userName.userId : 'John'}
                        </span>
                        <i className='fa fa-angle-down' aria-hidden='true'></i>
                      </a>

                      <div
                        className='dropdown-menu'
                        aria-labelledby='dropdownMenuLink'
                      >
                        <Link className='dropdown-item' to='CustomerProfile' style={{ fontSize: `${FontChange}px` }}>
                          Profile
                        </Link>

                        <a className="dropdown-item" href="/" style={{ fontSize: `${FontChange}px` }}>
                          Logout
                        </a>
                      </div>
                    </div>
                  </span>
                ) : (
                  <span className='user-icon'>
                    <div className='dropdown show'>
                      <a
                        className='dropdown-toggle'
                        href='#'
                        id='dropdownMenuLink'
                        data-toggle='dropdown'
                        aria-expanded='false'
                      >
                        <img src={userName?.userImage} height='40px' width='40px' />
                        <span className='user_name' style={{ fontSize: `${FontChange}px` }}>
                          {userName && userName ? userName.userId : 'John'}
                        </span>
                        <i className='fa fa-angle-down' aria-hidden='true'></i>
                      </a>

                      <div
                        className='dropdown-menu'
                        aria-labelledby='dropdownMenuLink'
                      >
                        <Link className='dropdown-item' to='CustomerProfile' style={{ fontSize: `${FontChange}px` }}>
                          {t('Profile')}
                        </Link>

                        <a
                          className='dropdown-item'
                          onClick={onLogout}
                          href='javascript:;'
                          style={{ fontSize: `${FontChange}px` }}
                        >
                          {t('Logout')}
                        </a>
                      </div>
                    </div>
                  </span>
                )}

              </div>
            </div>
          </div>
          {userName && userName.countryCode === 'VN' && ((userName.roles || "").toLowerCase() === 'owner' || (userName.roles || "").toLowerCase() === 'staff') && 
            <div className="row">
              <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-right'>
                {
                  selectedSoldToNo && selectedSoldToNo ?
                    <button onClick={openSoldToBox} className="soldToNoHeader">
                      {localStorage.getItem('isSelectedSoldToNo')}
                    </button> : ''

                }
              </div>
            </div>
          }
        </div>
      </header>
      <div className='dialog-boxes'>
        <Dialog aria-labelledby='customized-dialog-title' open={open}>
          <DialogTitle id='customized-dialog-title'></DialogTitle>
          <DialogContent>
            <Typography style={{ fontSize: `${FontChange}px` }}>

              {
                selectedLangCode === 'en' || selectedLangCode === null || selectedLangCode === undefined ?
                  `User ${userName && userName ? userName.userId : 'John'} is already logged on INSEE Plus system and note that multiple logins using the same user will be terminated.`
                  : selectedLangCode === 'vt' ?
                    `Tài khoản ${userName && userName ? userName.userId : 'John'} dược đăng nhập trên 1 thiết bị khác. Vui lòng chọn "Đăng Xuất" và đăng nhập lại trên thiết bị này. ` :
                    `ผู้ใช้ ${userName && userName ? userName.userId : 'John'} เข้าสู่ระบบ INSEE Plus แล้ว โปรดทราบว่าการเข้าสู่ระบบโดยใช้ user ID เดียวกันจากช่องทางอื่นจะถูกยกเลิก`
              }
            </Typography>
            <DialogActions>
              <div className='create_link d-flex'>
                <button className='create p-2' onClick={onLogout} style={{ fontSize: `${FontChange}px` }}>
                  {t("Logout")}
                </button>

              </div>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>


      <div className='dialog-boxes'>
        <Dialog aria-labelledby='customized-dialog-title' open={openPDP}>
          <DialogTitle id='customized-dialog-title' style={{ fontSize: `${FontChange}px` }}>{t("Privacy Policy for Customer")}</DialogTitle>
          <DialogContent>
            <Typography>
              <p>{t("Privacy Policy for CustomerData")}</p>
              {
                selectedLangCode === 'en' || selectedLangCode === null || selectedLangCode === undefined ?
                  <a style={{ color: "red" }} href={SCCCPrivacyPolicyforCustomerEN} target="_blank">See more</a> :
                  <a style={{ color: "red" }} href={SCCCPrivacyPolicyforCustomerTH} target="_blank">See more</a>

              }

            </Typography>
            <DialogActions>
              <div className='create_link d-flex'>
                <button className='create p-2' onClick={onLogout} style={{ fontSize: `${FontChange}px` }}>
                  {t("Reject")}
                </button>

                <button className='create p-2' onClick={handleCustomerPdpInfo} style={{ fontSize: `${FontChange}px` }}>
                  {t("Accept")}
                </button>

              </div>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>


      <div className='dialog-boxes'>
        <Dialog aria-labelledby='customized-dialog-title' open={openActive}>
          {/* <DialogTitle id='customized-dialog-title'>{t("Privacy Policy for Customer")}</DialogTitle> */}
          <DialogContent>
            <Typography>
              <p style={{ fontSize: `${FontChange}px` }}>{t("User is in active please contect 1732")}</p>


            </Typography>

          </DialogContent>
        </Dialog>

        <Dialog aria-labelledby='customized-dialog-title' open={openSoldTo}

        >
          <DialogTitle style={{ paddingLeft: 25, paddingBottom: 0 }} id='customized-dialog-title'>{t("SelectSoldTo")}</DialogTitle>
          <DialogContent style={{ paddingTop: 5 }} >
            {
              countryCode && countryCode === 'VN' || countryCode && countryCode === 'SL' ?
                <RadioButtonSoldToGroup
                  getDivisionForCustomer={getDivisionForCustomerData}
                  handleChangeCat={handleChangeCat}
                /> : ''
            }

            <div className='create_link d-flex'>
              <select
                className='form-control'
                name='SelectSold'
                onChange={changeShipTo}
              >
                <option value=''>{t("SelectSoldTo")}</option>
                {getSoldTosForDivision && getSoldTosForDivision !== undefined && getSoldTosForDivision.data
                  ? getSoldTosForDivision.data.map((soldToData) => {
                    return <option value={soldToData.soldToNo}>{soldToData.soldToNo}</option>
                  })
                  : null}
              </select>
            </div>
            <DialogActions>
              <div className='create_link d-flex'>
                <button className='cancel' onClick={handleCloseSoldTo} style={{ fontSize: `${FontChange}px` }}>
                  {t("ok")}
                </button>
                <button onClick={handleClosePopup} className="cancel" style={{ fontSize: `${FontChange}px` }}>{t("cancel.button")}</button>


              </div>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default withTranslation()(Header)