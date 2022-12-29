import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import "moment-timezone";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Axios from "axios";
import { useForm, Form } from "../../../../../components/Form/FormComponent";
import Controls from "../../Controls";
// re commit
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#ffe6e6",
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: 14,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {},
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  gridContainer: {
    marginRight: "15px !important",
    marginTop: "38px !important",
  },
  containerTable: {
    //   maxHeight: 1000,
  },

  table: {
    minWidth: 700,
  },
  tableBody: {
    "& th": {
      fontSize: "14px !important",
      padding: "10px !important",
    },
    "& td": {
      fontSize: "14px !important",
      padding: "10px !important",
    },
  },
  textRight: {
    textAlign: "right !important",
  },
  childtableBody: {
    background: "#ccc",
    "& th": {
      fontSize: "12px !important",
      padding: "10px !important",
    },

    "& td": {
      fontSize: "12px !important",
      padding: "10px !important",
    },
    ".text-right": {
      textAlign: "center",
    },
  },
});

function toParams(obj) {
  let params = [];
  for (let [k, v] of Object.entries(obj))
    params.push(String(k) + "=" + String(v));
  return "?" + params.join("&");
}

function mapper(objArr) {
  return objArr.map(
    ({
      redeemPoints: points_redeemed,
      transactionNo: redemption_order,
      productName: product_name,
      quantity,
      remarks: delivery_status,
      transactionDate: redemption_date,
    }) => ({
      redemption_order,
      redemption_date,
      product_name,
      quantity,
      points_redeemed,
      delivery_status,
    })
  );
}

const Pstep = 10; // pagination step (amount of items per page)

function ActivityPointsTab({ onFilterChange, minDate }) {
  const [selectedValue, setSelectedValue] = useState(null);
  const selectedLangCode = localStorage.getItem("lancode");
  const classes = useStyles();
  const { t } = useTranslation();
  const [indices, setIndices] = useState([1, Pstep]);
  const [page, setPage] = useState(1);

  const ACTIVITY_TYPE = ["Point Collection", "Point Deduction", "Bonus"];

  const DATE_ONE_YEAR_BACK = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  );

  const FORM_FIELDS = {
    START_DATE: "startDate",
    END_DATE: "endDate",
    ACTIVITY_TYPE: "activityType",
  };

  const INITIAL_FORM_VALUES = {
    [FORM_FIELDS.START_DATE]: minDate || moment().subtract(1, "months"),
    [FORM_FIELDS.END_DATE]: new Date(),
    [FORM_FIELDS.ACTIVITY_TYPE]: "",
  };

  const [filtersForm, setFiltersForm] = useState(INITIAL_FORM_VALUES);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if (
      "startDate" in fieldValues &&
      fieldValues.startDate &&
      fieldValues.endDate
    ) {
      temp.startDate =
        fieldValues.startDate > fieldValues.endDate
          ? "Start Date Should be lesser than End Date"
          : "";
    }
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((eachFieldErr) => eachFieldErr == "");
  };
  const { values, setValues, handleInputChange, errors, setErrors } = useForm(
    INITIAL_FORM_VALUES,
    true,
    validate
  );

  const handleFiltersFormChange = function (event) {
    const { name, value } = event.target;
    setFiltersForm({
      ...filtersForm,
      [name]: value,
    });
    onFilterChange({ ...filtersForm, [name]: value });
  };

  function paginate(e, v) {
    setIndices([(v - 1) * Pstep + 1, v * Pstep]);
    setPage(v);
  }

  useEffect(() => {
    setFiltersForm(INITIAL_FORM_VALUES);
  }, [minDate]);

  const clearAll = function () {
    setFiltersForm(INITIAL_FORM_VALUES);
    setSelectedValue(null);
    onFilterChange(INITIAL_FORM_VALUES);
  };

  return (
    <>
      <div>
        <Grid container>
          <Grid item md={2} xs={12} className={classes.gridContainer}>
            {minDate ? (
              <Controls.DatePicker
                name={FORM_FIELDS.START_DATE}
                label={t("label.start_date")}
                value={filtersForm?.[FORM_FIELDS.START_DATE]}
                onChange={handleFiltersFormChange}
                inputProps={{ tabIndex: "1" }}
                maxDate={filtersForm?.[FORM_FIELDS.END_DATE]}
                // minDate={filtersForm?.[FORM_FIELDS.START_DATE]}
              />
            ) : (
              <Controls.DatePicker
                name={FORM_FIELDS.START_DATE}
                label={t("label.start_date")}
                value={filtersForm?.[FORM_FIELDS.START_DATE]}
                onChange={handleFiltersFormChange}
                inputProps={{ tabIndex: "1" }}
                maxDate={filtersForm?.[FORM_FIELDS.END_DATE]}
                error={
                  filtersForm[FORM_FIELDS.END_DATE] <
                  filtersForm[FORM_FIELDS.START_DATE] - 8640000
                }
              />
            )}
            {filtersForm[FORM_FIELDS.END_DATE] <
              filtersForm[FORM_FIELDS.START_DATE] - 8640000 && (
              <Typography sx={{ fontSize: "12px" }} color="error">
                Start Date Should be lesser than End Date
              </Typography>
            )}
          </Grid>
          <Grid item md={2} xs={12} className={classes.gridContainer}>
            <Controls.DatePicker
              name={FORM_FIELDS.END_DATE}
              label={t("label.end_date")}
              value={
                filtersForm?.[FORM_FIELDS.END_DATE] ||
                moment().subtract(1, "months")
              }
              onChange={handleFiltersFormChange}
              inputProps={{ tabIndex: "1" }}
              maxDate={new Date()}
              // minDate={filtersForm?.[FORM_FIELDS.START_DATE]}
            />
          </Grid>
          <Grid item md={2} xs={12} className={classes.gridContainer}>
            <Controls.Select
              name={FORM_FIELDS.ACTIVITY_TYPE}
              sx={{ width: "230px" }}
              label={t("label.activity_type")}
              onChange={handleFiltersFormChange}
              options={ACTIVITY_TYPE}
              value={filtersForm?.[FORM_FIELDS.ACTIVITY_TYPE]}
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

export default withTranslation()(ActivityPointsTab);
