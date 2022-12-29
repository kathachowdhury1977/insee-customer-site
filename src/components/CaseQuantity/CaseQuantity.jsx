import React from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "./CaseQuantity.scss";

function CaseQuantity(props) {
  const { t } = useTranslation();

  return (
    <>
      <div className="cases" style={{
        border: 'solid 1px #c4c4c4',
        backgroundColor: '#f1f1f1'
      }}>
        <span>{props.caseType}</span>
        <h5>{props.caseQty}</h5>
      </div>
    </>

  );
}
export default withTranslation()(CaseQuantity);