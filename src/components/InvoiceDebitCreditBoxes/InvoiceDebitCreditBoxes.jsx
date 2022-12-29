import React, { useEffect, useState } from "react";
import { paymentofflineActions } from "../../_actions";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { withTranslation, useTranslation } from "react-i18next";
import "./InvoiceDebitCreditBoxes.scss";

function InvoiceDebitCreditBoxes(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
 console.log(props, "all props data")
 
  return (
    <>
      <div className="p-0 invoice_debit_box_container">
        {props.type === "true" ? (
          <div className="row ml-2 mr-2 mt-2">
            <div className="col-sm-8 col-md-8 col-lg-8 p-0">
              <span className={props.status_class}>
                <span>{props.invoice_status}</span>
              </span>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4 p-0">
              <label className="textLight d-flex" style={{ fontSize: "12px" }}>
                <input
                  id={props.id}
                  value={props.total_amt}
                  type="checkbox"
                  onClick={props.handleCheck}
                />{" "}
                &nbsp; {t("label.addforpayment")}
              </label>
            </div>
          </div>
        ) : null}

        <div className="row ml-2 mr-2 mt-2">
          <div className="col-sm-12 col-md-12 col-lg-12 p-0 mb-3">
            <div className="row">
              <div className="col-sm-4 col-md-4 col-lg-4">
                <p className="textLight">{t("label.document_number")}</p>
                <p className="textDark">{props.doc_number}</p>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4">
                <p className="textLight">{t("label.document_date")}</p>
                <p className="textDark">{props.doc_date}</p>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4">
                <p className="textLight">{t("label.po_number")}</p>
                <p className="textDark">{props.po_number}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 p-0 mb-3">
            <div className="row">
              <div className="col-sm-4 col-md-4 col-lg-4">
                <p className="textLight">{t("label.total_amount")}</p>
                <p className="textDark">{props.total_amt}</p>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4">
                <p className="textLight">{t("label.duedate")}</p>
                <p className="textDark">{props.due_date}</p>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4">
                <p className="textLight">{t("label.document_type")}</p>
                <p className="textDark">{props.doc_type}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 p-0 mb-3">
            <div className="row">
              <div className="col-sm-4 col-md-4 col-lg-4">
                <p className="textLight">{t("label.overdue_days")}</p>
                <p className="textDark">{props.overdue_days}</p>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4">
                <p className="textLight">{t("label.overdue_amount")}</p>
                <p className="textDark">{props.overdue_amt}</p>
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4"></div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 p-0 mb-3">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <p className="textLight">{t("label.description")}</p>
                <p className="textDark">{props.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(InvoiceDebitCreditBoxes);
