import { Checkbox, FormControlLabel } from "@material-ui/core";
import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import "./InvoiceBoxes.scss";

function InvoiceBoxes(props) {
  const { t } = useTranslation();
  console.log(props.data, "above90above90");

  return (
    <>
      <div className="col-sm-12 col-md-12 col-lg-12 p-0 invoice_box_container">
        <div className="row ml-2 mr-2">
          <div className="col-sm-8 col-md-8 col-lg-8 p-0">
            <p className="mt-2 out_standing_amt_heading">
              {props.invoice_heading}
              {props.amt ? "(" + props.amt + ")" : null}
            </p>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4 p-0">
            <p className="mt-2 out_standing_amt_heading_red">
              {t("payment.invoice_after")}: &nbsp;{" "}
              <span>{props.invoice_date}</span>
            </p>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 p-0 mb-3">
            <div className="row">
              <div className="col-sm-2 col-md-2 col-lg-2">
                <p className="textLight">{t("payment.doc_no")}</p>
              </div>
              <div className="col-sm-2 col-md-2 col-lg-2">
                <p className="textLight">{t("payment.doc_date")}</p>
              </div>
              <div className="col-sm-3 col-md-3 col-lg-3">
                <p className="textLight">{t("createdelivery.shiptoname")}</p>
              </div>
              <div className="col-sm-3 col-md-3 col-lg-3 p-0">
                <p className="textLight">{t("payment.noofduedays")}</p>
              </div>
              <div className="col-sm-2 col-md-2 col-lg-2 p-0">
                <p className="textLight d-flex">
                  {t("payment.amt")}({props.currency}) &nbsp;
                  <input type="checkbox" />
                </p>
              </div>
            </div>
            {props.data
              ? props.data.map((docData) => {
                  return (
                    <div className="row">
                      <div className="col-sm-2 col-md-2 col-lg-2">
                        <p className="textDark">{docData.documentNo_FI}</p>
                      </div>
                      <div className="col-sm-2 col-md-2 col-lg-2">
                        <p className="textDark">{docData.dueDate}</p>
                      </div>
                      <div className="col-sm-3 col-md-3 col-lg-3">
                        <p className="textDark">{docData.shipto}</p>
                      </div>
                      <div className="col-sm-3 col-md-3 col-lg-3 p-0">
                        <p className="textDark">{docData.overdueDays}</p>
                      </div>
                      <div className="col-sm-2 col-md-2 col-lg-2 p-0">
                        <p className="textDark d-flex">
                          {docData.amountDocCurrency} &nbsp;
                          <input type="checkbox" />
                        </p>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(InvoiceBoxes);
