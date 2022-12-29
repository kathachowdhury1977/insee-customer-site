import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import "./AllocateVolumeChildBox.scss";
import IncreMent from "../../assets/img/inc.svg";
import DecreMent from "../../assets/img/dec.svg";

function AllocateVolumeChildBox(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [count, setCount] = useState(0);

    const handleDecrement = () => {
        if (count>=1){
      setCount(prevCount => prevCount - 1);
      props.increase(props.key, count-1);}
    }
  
    const handleIncrement = () => {
      setCount(prevCount => prevCount + 1);
      props.increase(props.key, count+1);
    }
  
    return (
        <>
            <div className="allocate-volume-childbox">
                <div className="shadow-box">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.billing_month")}</p>
                            <p className="small-label">{props.billing_month}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.material_code")}</p>
                            <p className="small-label">{props.material_code}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.material_name")}</p>
                            <p className="small-label">{props.material_name}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.billing_qty")}</p>
                            <p className="small-label">{props.billing_qty}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.remaining_qty")}</p>
                            <p className="small-label">{props.remaining_qty}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.auto_allocated")}</p>
                            <p className="small-label">{props.auto_allocated}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.manual_allocated")}</p>
                            <p className="small-label">{props.manual_allocated}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.sum_allocated")}</p>
                            <p className="small-label">{props.sum_allocated}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.point_recieved")}</p>
                            <p className="small-label">{props.point_recieved}</p>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <p className="big-label">{t("label.expiration")}</p>
                            <p className="small-label">{props.expiration}</p>
                        </div>
                    </div>

                </div>
                <div className="bottom-graybox">
                    <div className="box-bottom-child">
                        <p className="bottom-text">{t("label.quantity")}</p>
                    </div>
                    <div className="box-bottom-child content-left">
                        <div className="qty_type">
                            <img src={DecreMent} onClick={handleDecrement} />
                            <span className="count">{count}</span>
                            <img src={IncreMent} onClick={handleIncrement} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default withTranslation()(AllocateVolumeChildBox);
