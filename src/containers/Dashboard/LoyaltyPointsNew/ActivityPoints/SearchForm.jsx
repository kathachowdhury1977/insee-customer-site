import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import "moment-timezone";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "../../../../components/Form/FormComponent";
import Controls from "../Controls";
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

function ActivityPointsTab({ onFilterChange}) {
  const classes = useStyles();
  const { t } = useTranslation();

  const ACTIVITY_TYPE = ["Point Collection", "Point Deduction", "Bonus"];

  const FORM_FIELDS = {
    START_DATE: "startDate",
    END_DATE: "endDate",
    ACTIVITY_TYPE: "activityType",
  };

  const INITIAL_FORM_VALUES = {
    [FORM_FIELDS.START_DATE]: moment().subtract(1, "months"),
    [FORM_FIELDS.END_DATE]: new Date(),
    [FORM_FIELDS.ACTIVITY_TYPE]: "",
  };

  const [filtersForm, setFiltersForm] = useState(INITIAL_FORM_VALUES);
  

  const handleFiltersFormChange = function (event) {
    const { name, value } = event.target;
    setFiltersForm({
      ...filtersForm,
      [name]: value,
    });
    onFilterChange({ ...filtersForm, [name]: value });
  };

    const clearAll = function () {
      setFiltersForm(INITIAL_FORM_VALUES);
      onFilterChange(INITIAL_FORM_VALUES);
    };
    
  return (
    <>
      <div>
        <Grid container>
          <Grid item md={2} xs={12} className={classes.gridContainer}>
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
           
            {filtersForm[FORM_FIELDS.END_DATE] <
              filtersForm[FORM_FIELDS.START_DATE]  && (
              <Typography sx={{ fontSize: "12px" }} color="error">
                Start Date Should be lesser than End Date
              </Typography>)}
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
