import React, { useState, useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import "moment-timezone";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { Typography } from "@material-ui/core";
//import { process.env.REACT_APP_MASTER_API_URL } from "../../../../constant";
import moment from "moment";
import "moment-timezone";

import "./AllocationVolume.scss";
import Controls from "../Controls";
import { AutoCompleteSearchNew } from "../AllocationHistory/AutoSearchNew";
import Axios from "axios";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  gridContainer: {
    marginRight: "15px !important",
    marginTop: "38px !important",
  },
});

const FORM_FIELDS = {
  SUB_DEALER: "subDealer",
  MONTH_AND_YEAR: "monthAndYear",
  COMPANY: "company",
};

const INITIAL_FORM_VALUES = {
  [FORM_FIELDS.COMPANY]: "SCCC",
  [FORM_FIELDS.SUB_DEALER]: "",
  [FORM_FIELDS.MONTH_AND_YEAR]: new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  ),
};

const AllocationVolumeTab = function ({ onFilterChange }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [resetCount, setCount] = useState(0);
  const [filtersForm, setFiltersForm] = useState(INITIAL_FORM_VALUES);
  const [subDealerData, setSubDealerData] = useState([]);
  const [filterObj, setFilterObj] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const COMPANY_OPTIONS = ["SCCC", "CONWOOD"];
  const lancode = localStorage.getItem("lancode");

  function clearAll() {
    setFiltersForm(INITIAL_FORM_VALUES);
    setSelectedValue(null);
    onFilterChange(INITIAL_FORM_VALUES);
    setCount((current) => current + 1);
  }

  const handleFiltersFormChange = function (event) {
    const { name, value } = event.target;

    setFiltersForm({
      ...filtersForm,
      [name]: value,
    });
    onFilterChange({ ...filtersForm, [name]: value });
  };

  function autoSelectFn(selected) {
    const { name, value } = selected;

    setFiltersForm({
      ...filtersForm,
      subDealer: value,
    });
    setFilterObj({ ...filterObj, [selected.label]: selected.value });
  }

  const getSubdealer = () => {
    let customerId = localStorage.getItem("CustomerNumber");
    // let lancode = localStorage.getItem("lancode");
    const envUrl = (process.env.REACT_APP_MASTER_API_URL || "").trim();
    const url = envUrl[envUrl.length - 1] === "/" ? envUrl : `${envUrl}/`;
    Axios.get(
      `${url}search/sub-dealer-number/search?soldToNumber=${customerId}&filter=Active`,

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
                ? item.subDealerNameEN || ""
                : item.subDealerNameTH || "",
            value:
              lancode === "en"
                ? item.subDealerNameEN || ""
                : item.subDealerNameTH || "",
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
  }, [filtersForm[FORM_FIELDS.SUB_DEALER]]);

  console.log("filtersForm", filtersForm);

  useEffect(() => {
    onFilterChange({ ...filtersForm });
  }, [filtersForm]);

  return (
    <>
      <div>
        <Grid container>
          <Grid item md={2} xs={12} className={classes.gridContainer}>
            <Controls.DatePicker
              name={FORM_FIELDS.MONTH_AND_YEAR}
              label={t("billingMonth")}
              onChange={handleFiltersFormChange}
              inputProps={{ tabIndex: "1" }}
              value={filtersForm[FORM_FIELDS.MONTH_AND_YEAR]}
              views={["year", "month"]}
              minDate={moment().subtract(1, "months")}
              format={"MMM-yyyy"}
            />
          </Grid>
          <Grid item md={2} xs={12} className={classes.gridContainer}>
            <Controls.Select
              name={FORM_FIELDS.COMPANY}
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
          <Grid
            item
            md={2}
            xs={12}
            sx={{
              textAlign: "inherit",
              paddingTop: "8px",
            }}
            className={classes.gridContainer}
          >
            <Typography className="Sub-dealer-text">
              {t("selectSubdealer")}
            </Typography>
          </Grid>

          <Grid item md={2} xs={12} className={classes.gridContainer}>
            <AutoCompleteSearchNew
              setSelectedValue={setSelectedValue}
              inputLabel={t("subDealerAllocationVolume")}
              name={FORM_FIELDS.SUB_DEALER_NUMBER}
              INITIAL_VALUE={filtersForm[FORM_FIELDS.SUB_DEALER]}
              autoSelectFn={autoSelectFn}
              resetCount={resetCount}
              OPTIONS_TO_OBJECT={
                Array.isArray(subDealerData) ? subDealerData : []
              }
              forcePopupIcon={false}
              // callSmartApiFn={(e) => getSubdealer(e)}
              isSmartSearch={true}
            />
          </Grid>
          <Grid
            item
            md={2}
            xs={12}
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
};

export default withTranslation()(AllocationVolumeTab);
