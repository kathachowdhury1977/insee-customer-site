import React, { useState } from "react";
import "./PlaceOrderItemDetails.scss";
import { orderActions } from "../../_actions";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ItemImag from "../../assets/img/insee.jfif";
import IncreMent from "../../assets/img/inc.svg";
import DecreMent from "../../assets/img/dec.svg";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ReadMore from "../../components/ReadMore/ReadMore";
import FormSelectbox from "../../components/FormSelectbox/FormSelectbox";
import ProductImg from '../../../src/assets/img/inseeLogo.png'
import moment from "moment";
import "moment-timezone";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
		width: "417px"
	}
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		// margin: 0,
		padding: theme.spacing(1),
		textAlign: "center",
		marginTop: "20px",
		display: "block"
	}
}))(MuiDialogActions);

const PlaceOrderItemDetails = (props) => {
  const isShipToSelected = useSelector(state => state.isShipToSelected.isShipToSelected);
  const isPlantsSelected = useSelector(state => state.isPlantsSelected.isPlantsSelected);
  const getProduct = useSelector((state) => state.getproduct.getproduct);
	const [open, setOpen] = useState(false);
var defaultImg = getProduct && getProduct.imageUrl ? getProduct.imageUrl[0] : ''
  const [ fullSize, setFullSIze ] = useState()
  const contractNumber =
  localStorage.getItem('CONTRACTNUMBER') === null ||
  localStorage.getItem('CONTRACTNUMBER') === undefined
    ? ''
    : localStorage.getItem('CONTRACTNUMBER')
const shipTo =
  localStorage.getItem('SHIPTOCODE') === null ||
  localStorage.getItem('SHIPTOCODE') === undefined
    ? ''
    : localStorage.getItem('SHIPTOCODE')
const plant =
  localStorage.getItem('PLANTCODE') === null ||
  localStorage.getItem('PLANTCODE') === undefined
    ? ''
    : localStorage.getItem('PLANTCODE')
const category =
  localStorage.getItem('CATEGORY') === null ||
  localStorage.getItem('CATEGORY') === undefined
    ? ''
    : localStorage.getItem('CATEGORY')
const subcategory =
  localStorage.getItem('SUBCATEGORY') === null ||
  localStorage.getItem('SUBCATEGORY') === undefined
    ? ''
    : localStorage.getItem('SUBCATEGORY')


  const [count, setCount] = useState(props.quantity ? props.quantity : getProduct && getProduct.ProductList.selectedQuanity ? getProduct.ProductList.selectedQuanity : 0);
  //const [contractNumber, setContractNumber] = React.useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let history = useHistory();
  const event = useSelector((state) => state);
  let todayDate = moment().format("YYYY-MM-DD");
  const selectedLangCode = localStorage.getItem('lancode');
  let countryCode = localStorage.getItem('userData');
  countryCode = JSON.parse(countryCode);
  let userName = localStorage.getItem('userData');
  userName = JSON.parse(userName);
  const quantity = props.quantity
  var customerNo = localStorage.getItem('CustomerNumber')
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1.0);
  };

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1.0);
  };

  console.log(props.shipTo, 'props.shipTo')

  const countChange = (e) => {

    if(category === "CONWOOD"){

			if(e.target.value === null || e.target.value === undefined || e.target.value === ""){
				setCount("0");
				return;

			}
			if (!e.target.validity.badInput) {
				const value = e.target.value.replace(/[^\d]/,'');
				let qty = parseInt(value);
				let result = qty - Math.floor(qty) !== 0;
				setCount(qty);
			 }
    }
    else{
      setCount (e.target.value)

    }
  }


  function onSelectChange(event) {
    console.log(event);
  }
  function continueShoping() { debugger
    history.goBack();
  }
  function handleCart(e) {

    if (count === undefined || count === 0 || count === '0' || count === '0.0') {
      toast.dark('Please Enter Quantity.', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if ((localStorage.getItem("ORDER-ADDED") === "YES" && 
    localStorage.getItem("PLACE-ORDER-FILTER-CHANGED") === "YES")) {
      setOpen(true);
      //props.setSearchcount(2);
    }
    else {
      let data = {
        clearCart: false,
        countryCode: userName.countryCode,
        customerId: userName.soldTo[0],
        date: todayDate,
        userId: userName.userId,
        productId:  props.productID,
        matchedSalesAreaList:[
          props.matchedSalesAreaList
        ],
        quantity: parseFloat(count),
        productImage: getProduct && getProduct.ProductList.ProductImageUrl,
        productName:  `${getProduct && getProduct.ProductList.Name +`:`+ getProduct.ProductList.Product_Name_EN__c}`,
        unitOfMeasure: getProduct && getProduct.ProductList.ccrz__UnitOfMeasure__c,
        subCategory: props.subcategory,
        shipToCode: props.shipTo,
        plantId: localStorage.getItem('PLANTCODE'),
        contractId: props.contract
      };
      
      dispatch(orderActions.addToCart(data))

      setTimeout(async() => {
        localStorage.setItem("ORDER-ADDED", "YES");
        await dispatch(orderActions.getCartData(customerNo));
        setOpen(false);
       
      }, 1200);
  }
  }

  const yesAddToCart=()=>{		
		dispatch(orderActions.clearCart(userName.soldTo[0]));
		setTimeout(() => {

      let data = {
        clearCart: false,
        countryCode: userName.countryCode,
        customerId: userName.soldTo[0],
        date: todayDate,
        productId:  props.productID,
        matchedSalesAreaList:[
          props.matchedSalesAreaList
        ],
        quantity: parseFloat(count),
        productImage: getProduct && getProduct.ProductList.ProductImageUrl,
        productName:   `${getProduct && getProduct.ProductList.Name +`:`+ getProduct.ProductList.Product_Name_EN__c}`,
        unitOfMeasure: getProduct && getProduct.ProductList.ccrz__UnitOfMeasure__c,
        subCategory: props.subcategory,
        shipToCode: props.shipTo,
        plantId: props.plant,
        contractId: props.contract
      };
      
      dispatch(orderActions.addToCart(data))

      setTimeout(async() => {
        localStorage.setItem("ORDER-ADDED", "YES");
        await dispatch(orderActions.getCartData(customerNo));
        setOpen(false);
        toast.success(t("productAddedtoCart"), {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }, 1200);

			localStorage.setItem("PLACE-ORDER-FILTER-CHANGED","NO")	
		}, 1000);

  }
  
  const handleClose = () => {
		setOpen(false);
	};

 
  const handleImg = (e) =>{
		e.target.src = ProductImg
	}
 

  const getImage = (image) => {
    setFullSIze(image)
   }      
 
   const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
     const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
     const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);

  // console.log(props, "propsprops")
  return (
    <>
      <div className="place_order_details_pg">
        <div className="col-12">
          <div className="row">
            <div className="col-xl-1 col-lg-2 col-md-3 col-sm-6 col-xs-12">
              <div className="simillar_imags">
                {
                  getProduct && getProduct.imageUrl != null ? getProduct && getProduct.imageUrl.slice(0, 3).map((item) => {
                    return (
                      <img className=""  onError={handleImg} onClick={() => {getImage(item)}} src={item ? item : ''} />
                    )
                  }) :  ''
                }
               
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 text-center">
              <img className="item-img" onError={handleImg} src={fullSize != undefined ? fullSize : defaultImg} />
            </div>
            <div className="col-xl-8 col-lg-6 col-md-12 col-sm-12 col-xs-12 pl-0 mt-3">
              <div className="order_item_details">
                <div className="head_sec">
                  <h5 style={{fontSize: `${HeadingFontChange}px`}}>
                   
                  {
                    selectedLangCode === 'en' || selectedLangCode === null || selectedLangCode === undefined ? 
                    getProduct && getProduct.ProductList.Product_Name_EN__c ? getProduct.ProductList.Product_Name_EN__c : '' 
                    : getProduct && getProduct.ProductList.Name ? getProduct.ProductList.Name : ''
                  }
                   </h5>
                  <span className="order_id" style={{fontSize: `${FontChange}px`}}>{t('Productcode')} {props.productID.replace(/^0+/, '')}</span>
                </div>
                <p className="description" style={{fontSize: `${FontChange}px`}}>
                  {" "}
                  <ReadMore
                  class={"content-css"}
                    more={t("readmore.label")}
                    less={t("showless.label")}
                    // text={getProduct && getProduct.ProductList.productDescriptionInLocal ? getProduct.ProductList.productDescriptionInLocal : ""}
                   text={
                    selectedLangCode === 'en' || selectedLangCode === null || selectedLangCode === undefined ? 
                    getProduct && getProduct.ProductList.productDescriptionInEn ? getProduct.ProductList.productDescriptionInEn : '' 
                    : getProduct && getProduct.ProductList.productDescriptionInLocal ? getProduct.ProductList.productDescriptionInLocal : ''
                  }
                  />{" "}
                </p>


              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1">

            </div>
            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-xs-9  mt-2">
              <div className="item_qty">
                <input placeholder="Qty" 
                  type="text" 
                  style={{ "width": "100px", "height":"40px", "border": "none", "borderBottom": "1px solid #989898" }} 
                  value={count} name={"count"} 
                  onChange={countChange} 
                  onkeypress={category === "CONWOOD" ? "return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" :""}
                  maxLength="5"/>
                  &nbsp;
                  {/* <img src={IncreMent} onClick={handleCart} alt="" />
                  &nbsp; */}
                  
                <span>{selectedLangCode === 'en' || selectedLangCode === null  ? 
                getProduct && getProduct.ProductList && getProduct.ProductList.ccrz__UnitOfMeasure__c : 
                getProduct && getProduct.ProductList && getProduct.ProductList.ccrz__UnitOfMeasure__c === "TON" ? "ตัน": 
                getProduct && getProduct.ProductList && getProduct.ProductList.ccrz__UnitOfMeasure__c === "Each" ? "ชิ้น"  : 
                getProduct && getProduct.ProductList && getProduct.ProductList.ccrz__UnitOfMeasure__c }</span>
              </div>

              <div className="mt-4">
                  <button className="create_btn ml-0" onClick={handleCart} style={{fontSize: `${FontChange}px`}}>
                    {t("addtocart.button")}
                  </button>
                

                <button onClick={continueShoping} className="cancel_btn ml-4 bg-black font-weight-bold" style={{fontSize: `${FontChange}px`}}>
                  {t("continueshopping.label")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
						<Typography>
							Addition of this product will clear your cart!
						</Typography>
						<Typography>Are you sure you want to add?</Typography>
						<DialogActions>
							<div className="create_link d-flex">
								<button className="create pl-5 pr-5" onClick={handleClose}>
									No
								</button>
								<button className="create pl-5 pr-5" onClick={yesAddToCart}>
									Yes
								</button>
							</div>
						</DialogActions>
					</DialogContent>
				</Dialog>
			</div>


  
    </>
  );
};
export default PlaceOrderItemDetails;
