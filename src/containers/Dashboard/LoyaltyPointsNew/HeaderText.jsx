import React, { useEffect } from "react";
import logoImage from "./INSEE-life-Logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getMyPointsAction } from "../../../_actions/loyaltyPoints.action";
import { useTranslation } from "react-i18next";
import { convertToCurrencyFormat, DataFormat } from "../../../_helpers";
import { masterActions } from '../../../_actions'

export default function HeaderText(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const lancode = localStorage.getItem("lancode");
  const getMyPoints = useSelector((state) => state.getMyPoints);
  const getCustomerBySoldTo = useSelector((state) => state.getCustomerBySoldTo)
  useEffect(() => {
    dispatch(getMyPointsAction(localStorage.getItem("CustomerNumber")));
    dispatch(
      masterActions.getCustomerBySoldTo(localStorage.getItem('CustomerNumber'))
  )
  }, []);

  return (
    <div className="loyaltyPageHeader">
      <div className="ImageContainer">
        <img src={logoImage} alt="" />
      </div>
      <div className="textContainer">
        <div className="headerText">
          <span>{t("label.account_number")}</span>{" "}
          <span>{DataFormat(localStorage.getItem("CustomerNumber"))}</span>
        </div>
        <div className="headerText">
          <span>{t("label.account_name")}</span>{" "}
          <span>
            {getCustomerBySoldTo && getCustomerBySoldTo ? getCustomerBySoldTo.customerDetailById && (lancode === "en" ? getCustomerBySoldTo.customerDetailById.accountName : getCustomerBySoldTo.customerDetailById.accountNameTH ):""}
          </span>
        </div>
        <div className="headerText">
          <span>{t("label.total_points")}</span>{" "}
          <span>
            {convertToCurrencyFormat(
              getMyPoints?.getMyPointsList?.data?.totalAvailablePoints?.key
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
