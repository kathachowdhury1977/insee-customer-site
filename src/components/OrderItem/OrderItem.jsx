import React, { useEffect, useState, useRef } from 'react'
import { orderActions } from '../../_actions'
import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
import './OrderItem.scss'
import IncreMent from '../../assets/img/inc.svg'
import DecreMent from '../../assets/img/dec.svg'
import { Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import 'moment-timezone'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cartIcon from '../../assets/img/cart-xs.png'
import FormInput from '../Navmenu/Navmenu'
import Loading from '../../components/Loader/Loading'
import ProductImg from '../../../src/assets/img/inseeLogo.png'
import { commaFormatter } from '../../_constant'
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   button: {
//     marginTop: theme.spacing(1),
//     marginRight: theme.spacing(1),
//   },
//   back_button: {
//     backgroundColor: '#000 !important',
//     color: '#fff !important',
//     marginRight: '8px !important',
//   },
//   actionsContainer: {
//     marginBottom: theme.spacing(2),
//   },
//   resetContainer: {
//     padding: theme.spacing(3),
//   },
// }))

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(() => ({
  root: {
    padding: "25px",
    textAlign: "center",
    width: "417px",
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    // margin: 0,
    padding: theme.spacing(1),
    textAlign: "center",
    marginTop: "20px",
    display: "block",
  },
}))(MuiDialogActions);

function OrderItem(props) {
  const inputEl = useRef(null)
  const [showCartIcone, setshowCartIcone] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [enteredQuantity, setEnteredQuantity] = useState(0)
  const [procartFlag, setProcartFlag] = useState(props.cartFlag)
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const isShipToSelected = useSelector(
    (state) => state.isShipToSelected.isShipToSelected
  );
  const selectedLangCode = localStorage.getItem("lancode");
  const isPlantsSelected = useSelector(
    (state) => state.isPlantsSelected.isPlantsSelected
  );

  var customerNo = localStorage.getItem("CustomerNumber");
  const isErrorMsg = useSelector((state) => state.addtocart.error);

  //const clearCartErrorMsg = useSelector((state) => state.addtocart.error)
  var categoryConwood = localStorage.getItem('CATEGORY')
  useEffect(() => {
    
    if (isErrorMsg === isErrorMsg) {
      setshowCartIcone(false);
      //setOpen(true)
    }
    if (isErrorMsg === "error") {
      setshowCartIcone(false);
    }
    // setTimeout(()=>{
    //   clearCartPopup ()
    // },2000);
  }, [isErrorMsg]);

  const cartdata = useSelector((state) => state.cartdata)
  const inputValue =
    categoryConwood === "CONWOOD"
      ? 0
      : props.count > 0
      ? props.count
      : (0.0).toFixed(1);
  const [quantity, setQuantity] = useState(inputValue && inputValue);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let backUrl = "ItemDetailsPage";
  const [count, setCount] = useState(
    parseInt(props.count > 0 ? props.count : 0.0)
  );
  let productID = props.id;
  let todayDate = moment().format("YYYY-MM-DD");
  let userName = localStorage.getItem("userData");
  userName = JSON.parse(userName);
  let cartLength = cartdata.cartdata && cartdata.cartdata.length;
  const notify = () => {
    if (isShipToSelected !== true && isPlantsSelected !== true) {
      toast.dark("Please Select Ship-To and Plant.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (isShipToSelected !== true) {
      toast.dark("Please Select Ship-To.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (isPlantsSelected !== true) {
      toast.dark("Please Select Plant.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  let contractno = localStorage.getItem('CONTRACTNUMBER');
  const addToCart = (e) => {
    // let contractno = localStorage.getItem('CONTRACTNUMBER')
    localStorage.setItem('savequantity', 'NO')
    setshowCartIcone(true)
    setIsLoading(true)
    let data = {
      clearCart: false,
      countryCode: userName.countryCode,
      customerId: localStorage.getItem("CustomerNumber"),
      date: todayDate,
      userId: userName.userId,
      productId: props.item.productId,
      matchedSalesAreaList:
        props.item.matchedSalesAreaList === null
          ? []
          : props.item.matchedSalesAreaList,
      quantity: parseFloat(quantity),
      productImage: props.item.imageUrl,
      productName: `${props.name + `:` + props.title}`,
      unitOfMeasure: props.item.unitOfMeasure,
      subCategory: props.item.subCategory.toUpperCase(),
      shipToCode: localStorage.getItem("SHIPTOCODE"),
      plantId: localStorage.getItem("PLANTCODE"),
      contractId: contractno === null ? "" : contractno,
    };
    setTimeout(async () => {
      if (data.shipToCode != null) {
        await dispatch(orderActions.addToCart(data));
        setIsLoading(false);
      } else {
        toast.dark("Please Select Ship TO.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      setTimeout(async () => {
        await dispatch(orderActions.getCartData(customerNo));
        setOpen(false);
      }, 1000);

      setProcartFlag(false);
    }, 1000);
  };

  const handleIncrement = () => {
    if (
      quantity === 0 ||
      quantity === "0.0" ||
      quantity === "" ||
      quantity === "0" ||
      quantity === 0.0 ||
      quantity < 0
    ) {
      toast.dark(t("pleaseEnterQty"), {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (
      localStorage.getItem("ORDER-ADDED") === "YES" &&
      localStorage.getItem("PLACE-ORDER-FILTER-CHANGED") === "YES"
    ) {
      if (categoryConwood === "CONWOOD") {
        addToCart();
      } else {
        setOpen(true);
        props.setSearchcount(2);
      }
    } else {
      addToCart();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCount(props.count);
  };

  // const clearCartPopup = () => {
  //   if (isErrorMsg === "true") {
  //     setOpen(true)
  //   }
  // }

  const handleImg = (e) => {
    e.target.src = ProductImg;
  };

  const getEnteredQuantity = (e) => { 
    setEnteredQuantity(e.target.value)
    if (categoryConwood === 'CONWOOD') {
      if (
        e.target.value === null ||
        e.target.value === undefined ||
        e.target.value === ""
      ) {
        setQuantity("0");
        return;
      }
      if (!e.target.validity.badInput) {
        const value = e.target.value.replace(/[^\d]/, '')
        let qty = parseInt(value)
        // let result = qty - Math.floor(qty) !== 0
        // console.log('hello', qty);
        setQuantity(qty)
      }
    } else {
      // let qty = Number(e.target.value)
      // let result = qty - Math.floor(qty) !== 0
      // if (result) {
      //   console.log('Number has a decimal place.', result)
      // } else {
      //   console.log('It is a whole number.', result)
      // }

      setQuantity(e.target.value.replace(/(\.\d{3})\d+/g, "$1"));
      // let myInput = inputEl.current
      // myInput.addEventListener('keyup', function () {
      //   myInput.value = myInput.value.replace(/(\.\d{3})\d+/g, '$1')
      // })
    }
  };

  const yesAddToCart = () => {
    dispatch(orderActions.clearCart(userName.soldTo[0]));
    setTimeout(() => {
      addToCart()
      props.setYesAddToCart(false)
      localStorage.setItem('PLACE-ORDER-FILTER-CHANGED', 'NO')
    }, 1000)
  }
 
  const handleProduct = (e) => {
    localStorage.setItem("productDetId", props.id);
    localStorage.setItem("matchedSalesArea", props.matchedSalesAreaList);
    localStorage.setItem("quantitee", quantity);
  };

  const isQuantityAvailable = (remaining) => { 
      let remainingQty = remaining === null ? 0 : parseInt(remaining);
      let qty = remainingQty < 0 ? 0 : remainingQty

      console.log('hello', enteredQuantity > qty);
      return enteredQuantity > qty;
   }

   useEffect(() => {
    props.item?.selectedQuantity ?? setEnteredQuantity(props.item.selectedQuantity)
    isQuantityAvailable()
   }, []);


  return (
    <>
      {isShipToSelected === true && isPlantsSelected === true ? (
        <div className={props.class}>
          <div className="order_list">
            <div className="productItem">
              {isLoading ? (
                <div className="itemLoader">
                  <div className="orderLoader">
                    <Loading />
                  </div>
                </div>
              ) : (
                ""
              )}
              {showCartIcone === true ? (
                <i
                  class="fa fa-shopping-cart add-shoping-cart"
                  aria-hidden="true"
                ></i>
              ) : (
                ""
              )}
              {props.cartFlag && props.yesAddToCart ? (
                <i
                  class="fa fa-shopping-cart add-shoping-cart"
                  aria-hidden="true"
                ></i>
              ) : null}{" "}
              <img
                className="item-img"
                onError={handleImg}
                src={props.image}
                alt=""
                id={props.id}
              />{" "}
            </div>
            {/* <div>{props.productCode.replace(/^0+/, '')}</div> */}
            {categoryConwood === "CONWOOD" ? (
              <div className="productCode">
                {props.productCode.replace(/^0+/, "")}
              </div>
            ) : (
              ""
            )}

            <Link
              to={{
                pathname: "/ItemDetailsPage",
                productProps: {
                  productId: props.id,
                  matchedSalesAreaList: props.matchedSalesAreaList,
                  quantity: quantity,
                },
              }}
              onClick={handleProduct}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="order_detail_sec">
                <h5
                  className="text-black"
                  title={props.name}
                  style={{ fontSize: `${FontChange}px` }}
                >
                  {selectedLangCode === "en" ||
                  selectedLangCode === null ||
                  selectedLangCode === undefined
                    ? props.title
                    : props.name}
                </h5>
                {/* <span className="desc">
									{props.description.substring(0, 20)}...
								</span> */}
              </div>
            </Link>
            {contractno && (<div className="order_detail_sec">
              <h5>
                Remaining Qty:{" "}
                {props.item.remainingQty ? props.item.category === "CW" ? commaFormatter(props.item.remainingQty, 0) : commaFormatter(props.item.remainingQty, 3) : "0.000"} {" "}
                {props.item.unitOfMeasure && props.item.unitOfMeasure}
              </h5>
              <h5>
                Contract Qty:{" "}
                {props.item.targetQuantity
                  ? props.item.category === "CW" ? commaFormatter(props.item.targetQuantity, 0) : commaFormatter(props.item.targetQuantity, 3) : "0.000"} {" "}
                {props.item.unitOfMeasure && props.item.unitOfMeasure}
              </h5>
            </div>)}
            {/* </div> */}
            <div className="item-qty-section">
              <input
                type={categoryConwood === "CONWOOD" ? "text" : "number"}
                id="qty-input"
                className="form-input-qty"
                value={quantity}
                onkeypress={
                  categoryConwood === "CONWOOD"
                    ? "return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57"
                    : ""
                }
                name={"quantity"}
                placeholder={categoryConwood === "CONWOOD" ? "0" : "0.0"}
                step={categoryConwood === "CONWOOD" ? "0" : "0.0"}
                onChange={getEnteredQuantity}
                autoComplete="off"
              />
              &nbsp;
              <span className="item_weight">
                {selectedLangCode === "en" || selectedLangCode === null
                  ? props.unitOfMeasure
                  : selectedLangCode === "vt"
                  ? props.unitOfMeasure === "TON"
                    ? "tấn"
                    : props.unitOfMeasure === "Each"
                    ? "ชิ้น"
                    : props.unitOfMeasure
                  : props.unitOfMeasure === "TON"
                  ? "ตัน"
                  : props.unitOfMeasure === "Each"
                  ? "ชิ้น"
                  : props.unitOfMeasure}
              </span>
              {contractno && isQuantityAvailable(props.item.remainingQty) && (
                <p className="h-6 text-danger">
                  {selectedLangCode === "en" ? "Remaining Quantity is not enough." : "ยอดคงเหลือไม่เพียงพอ"}
                </p>
              )}
            </div>
            <div className="item-qty-btn">
              <button
                className="create_btn"
                type="button"
                onClick={handleIncrement}
                style={{
                  fontSize: `${FontChange}px`,
                  backgroundColor: `${
                    (props.item.remainingQty === null || parseInt(props.item.remainingQty) === 0  || 
                    isQuantityAvailable(props.item.remainingQty) || parseFloat(props.item.remainingQty) < 0)  && contractno
                      ? "#f5f5f5"
                      : ""
                  }`,
                }}
                disabled={
                  (props.item.remainingQty === null || quantity === "0.0" ||
                  parseInt(props.item.remainingQty) === 0 || parseFloat(props.item.remainingQty) < 0 ||
                  isQuantityAvailable(props.item.remainingQty)) && contractno
                    ? true
                    : false
                }
              >
                {" "}
                {t("addtocart.button")}
                &nbsp;
                <img src={cartIcon} alt="" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={props.class} onClick={notify}>
          <div className="order_list">
            {props.cartFlag && props.yesAddToCart ? (
              <i
                class="fa fa-shopping-cart add-shoping-cart"
                aria-hidden="true"
              ></i>
            ) : null}{" "}
            <img className="item-img" src={props.image} alt="" id={props.id} />{" "}
            <div className="order_detail_sec">
              <h5
                className="text-black title"
                style={{ fontSize: `${FontChange}px` }}
                title={props.name}
              >
                {props.name}
              </h5>
              {/* <span className="desc">
								{props.description.substring(0, 20)}...
							</span> */}
            </div>
            <div className="item-qty-section">
              <input
                placeholder="Qty"
                type="number"
                className="form-input-qty"
                name={"quantity"}
                minLength="0"
                disabled
                maxLength="5"
              />
              &nbsp;
              <span
                className="item_weight"
                style={{ fontSize: `${FontChange}px` }}
              >
                {props.unitOfMeasure}
              </span>
            </div>
            <div className="item-qty-btn">
              <button
                className="create_btn"
                type="button"
                style={{ fontSize: `${FontChange}px` }}
              >
                {" "}
                {t("addtocart.button")}
                &nbsp;
                <img src={cartIcon} alt="cart" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="dialog-boxes">
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          ></DialogTitle>
          <DialogContent>
            <Typography style={{ fontSize: `${FontChange}px` }}>
              {t("Addition of this product will clear your cart!")}
            </Typography>
            <Typography style={{ fontSize: `${FontChange}px` }}>
              {t("Are you sure you want to add?")}
            </Typography>
            <DialogActions>
              <div className="create_link d-flex">
                <button
                  className="create pl-5 pr-5"
                  onClick={handleClose}
                  style={{ fontSize: `${FontChange}px` }}
                >
                  {t("pickupform.no")}
                </button>
                <button
                  className="create pl-5 pr-5"
                  onClick={yesAddToCart}
                  style={{ fontSize: `${FontChange}px` }}
                >
                  {t("pickupform.yes")}
                </button>
              </div>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default withTranslation()(OrderItem);
