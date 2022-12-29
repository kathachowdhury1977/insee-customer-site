import React, { useEffect } from "react";
import { eventActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import "./GoToCart.scss";
import RadioButtonItem from "../../components/RadioButtonGroup/RadioButtonItem";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function GoToCart(props) {
  const event = useSelector(state => state);
  const isShipToSelected = useSelector(state => state.isShipToSelected.isShipToSelected);
  const isPlantsSelected = useSelector(state => state.isPlantsSelected.isPlantsSelected);
  const placeOrderFilterSearchClicked = useSelector(state => state.placeOrderFilterSearchClicked.placeOrderFilterSearchClicked);
  const [isEnabled, setIsEnabled] = React.useState(true);
  const { t } = useTranslation();
  let history = useHistory();
  const dispatch = useDispatch();
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);

// console.log(placeOrderFilterSearchClicked, 'placeOrderFilterSearchClicked+++++++++++')
  const notify = () => {
    if (isShipToSelected !== true && isPlantsSelected !== true) {
      toast.dark('Please Select Ship-To and Plant.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if (isShipToSelected !== true) {
      toast.dark('Please Select Ship-To.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else if (isPlantsSelected !== true) {
      toast.dark('Please Select Plant.', {
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


  const redButton = {
    textTransform: 'uppercase',
    marginTop: '8px',
    background: 'red',
    fontWeight: '600',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    '&:hover': {
      color: '#fff',
      background: 'red',
    }
  };

  const navigateToCart = () => {
    history.push("/CheckoutProcess");
  }



  console.log(event, "??????????")
  return (
    <>
    
      <div className="gotocart container-fluid">
        <div className="col-12">
          <div className="row">
            <div className="col-6 text-left pl-0">
              {/* <RadioButtonItem /> */}
            </div>
            <div className="col-6 text-right cart-btn pr-0">
              {(placeOrderFilterSearchClicked === true && isShipToSelected === true && isPlantsSelected === true) ?
                <button type="button" className="redButton"  onClick={navigateToCart} style={{fontSize: `${FontChange}px`}}>{t("gotocart.label")}</button>
                :
                <button style={{fontSize: `${FontChange}px`}} onClick={notify} type="button" className="redButton">{t("gotocart.label")}</button>
              }

            
            </div>
          </div>
        </div>

      </div>

    
    </>
  );
}

export default withTranslation()(GoToCart);
