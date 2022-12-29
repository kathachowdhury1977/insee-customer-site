import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import "moment-timezone";
import { Grid, Button, Typography } from "@mui/material";
import { AutoCompleteSearchNew } from "./AutoSearchNew";
import Controls from "../Controls";
import Axios from "axios";
//import { process.env.REACT_APP_MASTER_API_URL } from "../../../../constant";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  gridContainer: {
    marginRight: "15px !important",
    marginTop: "38px !important",
  },
});

const COMPANY_OPTIONS = ["SCCC", "CONWOOD"];

const FORM_FIELDS = {
  BILLING_MONTH: "billingMonth",
  BILLING_YEAR: "billingYear",
  COMPANY: "company",
  SUB_DEALER_NUMBER: "subDealerNumber",
};

const INITIAL_FORM_VALUES = {
  [FORM_FIELDS.BILLING_MONTH]: new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    1
  ),
  [FORM_FIELDS.BILLING_YEAR]: new Date(),
  [FORM_FIELDS.COMPANY]: "",
  [FORM_FIELDS.SUB_DEALER_NUMBER]: "",
};

function AllocationHistoryTab({ onFilterChange }) {
  const [filtersForm, setFiltersForm] = useState(INITIAL_FORM_VALUES);
  const [selectedValue, setSelectedValue] = useState(null);
  const [resetCount, setCount] = useState(0);
  const [selected, setSelected] = useState([]);
  const [filterObj, setFilterObj] = useState(null);
  const [subDealerNumber, setSubDealerNumber] = useState([]);
  const [subDealerData, setSubDealerData] = useState([]);
  const lancode = localStorage.getItem("lancode");

  const classes = useStyles();
  const { t } = useTranslation();

  function autoSelectFn(selected) {
    const { name, value } = selected;
    setFilterObj({ ...filterObj, [selected.name]: selected.value });
    onFilterChange({ ...filtersForm, [name]: value });
  }

  const getSubdealer = () => {
    let customerId = localStorage.getItem("CustomerNumber");
    const envUrl = (process.env.REACT_APP_MASTER_API_URL || "").trim();
    const url = envUrl[envUrl.length - 1] === "/" ? envUrl : `${envUrl}/`;
    Axios.get(
      `${url}search/sub-dealer-number/search?soldToNumber=${customerId}&filter=All`,

      {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
          "X-SOLD-TO-ID": localStorage.getItem("CustomerNumber"),
        },
      }
    )
      .then((response) => {
        setSubDealerData(
          response?.data?.data?.map((item) => ({
            ...item,

            label:
              lancode === "en"
                ? item.subDealerNameEN
                : item.subDealerNameTH || "",
            value: item.subDealerNumber,
          })) || []
        );
      })
      .catch((error) => {
        console.log("setSubDealerData : ", error);
      });
  };

  useEffect(() => {
    setSubDealerData(
      subDealerData?.map((item) => ({
        ...item,
        label:
          lancode === "en" ? item.subDealerNameEN : item.subDealerNameTH || "",
        value: item.subDealerNumber,
      })) || []
    );
  }, [lancode]);

  useEffect(() => {
    getSubdealer();
  }, [subDealerNumber]);

  const clearAll = function () {
    setFiltersForm(INITIAL_FORM_VALUES);
    setSelectedValue(null);
    onFilterChange(INITIAL_FORM_VALUES);
    setSubDealerNumber([]);
    setCount((current) => current + 1);
  };

  const handleFiltersFormChange = function (event) {
    const { name, value } = event.target;
    setFiltersForm({
      ...filtersForm,
      [name]: value,
    });
    onFilterChange({ ...filtersForm, [name]: value });
  };

  return (
    <>
      <div>
        <Grid container>
          <Grid item md={2} sm={5} xs={12} className={classes.gridContainer}>
            <Controls.DatePicker
              name={FORM_FIELDS.BILLING_MONTH}
              label={t("Month/Year – Start")}
              value={filtersForm[FORM_FIELDS.BILLING_MONTH]}
              onChange={handleFiltersFormChange}
              inputProps={{ tabIndex: "1" }}
              maxDate={new Date()}
              views={["year", "month"]}
              format={"MMM-yyyy"}
              error={
                filtersForm[FORM_FIELDS.BILLING_MONTH].getTime() >
                filtersForm[FORM_FIELDS.BILLING_YEAR].getTime()
              }
            />
            {filtersForm[FORM_FIELDS.BILLING_MONTH].getTime() >
              filtersForm[FORM_FIELDS.BILLING_YEAR].getTime() && (
              <Typography sx={{ fontSize: "9px" }} color="error">
                Start Date Should be lesser than End Date
              </Typography>
            )}
          </Grid>
          <Grid item md={2} sm={5} xs={12} className={classes.gridContainer}>
            <Controls.DatePicker
              label={t("Month/Year – End")}
              onChange={handleFiltersFormChange}
              name={FORM_FIELDS.BILLING_YEAR}
              inputProps={{ tabIndex: "1" }}
              value={filtersForm[FORM_FIELDS.BILLING_YEAR]}
              views={["year", "month"]}
              format={"MMM-yyyy"}
            />
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "-4px",
            }}
          >
            <div>
              <Grid
                item
                md={2}
                sm={5}
                xs={12}
                className={classes.gridContainer}
              >
                <Controls.Select
                  name={FORM_FIELDS.COMPANY}
                  sx={{ width: "230px" }}
                  label={t("company")}
                  onChange={handleFiltersFormChange}
                  options={COMPANY_OPTIONS}
                  value={filtersForm[FORM_FIELDS.COMPANY]}
                  showNoneOption={false}
                  inputProps={{ tabIndex: "1" }}
                  formControlSx={{
                    width: "100%",
                  }}
                />
              </Grid>
            </div>
            <div style={{ marginTop: "-10px" }}>
              <Grid
                item
                md={2}
                sm={5}
                xs={12}
                className={classes.gridContainer}
              >
                <AutoCompleteSearchNew
                  setSelectedValue={setSelectedValue}
                  inputLabel={t("subDealer")}
                  name={FORM_FIELDS.SUB_DEALER_NUMBER}
                  INITIAL_VALUE={filtersForm[FORM_FIELDS.SUB_DEALER_NUMBER]}
                  autoSelectFn={autoSelectFn}
                  //onChange={handleFiltersFormChange}
                  resetCount={resetCount}
                  OPTIONS_TO_OBJECT={
                    Array.isArray(subDealerData) ? subDealerData : []
                  }
                  forcePopupIcon={false}
                  isSmartSearch={true}
                />
              </Grid>
            </div>
          </div>

          {/* {console.log("filtersForm", filtersForm)} */}

          <Grid
            item
            md={2}
            xs={12}
            sm={5}
            className={classes.gridContainer}
            style={{ textAlign: "center" }}
          >
            <Button variant="outlined" onClick={clearAll}>
              {t("selectshipment.clearall")}
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default withTranslation()(AllocationHistoryTab);
