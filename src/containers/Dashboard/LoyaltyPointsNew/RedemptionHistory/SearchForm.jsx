import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import "moment-timezone";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";

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

const Pstep = 10; // pagination step (amount of items per page)

const DATE_ONE_YEAR_BACK = new Date(
  new Date().setFullYear(new Date().getFullYear() - 1)
);

const FORM_FIELDS = {
  START_DATE: "startDate",
  END_DATE: "endDate",
};

const INITIAL_FORM_VALUES = {
  [FORM_FIELDS.START_DATE]: DATE_ONE_YEAR_BACK,
  [FORM_FIELDS.END_DATE]: new Date(),
};

function RedemptionHistoryTab({ onFilterChange }) {
  const [filtersForm, setFiltersForm] = useState(INITIAL_FORM_VALUES);
  const [selectedValue, setSelectedValue] = useState(null);
  const [filterObj, setFilterObj] = useState(null);
  const classes = useStyles();
  const { t } = useTranslation();
  const [indices, setIndices] = useState([1, Pstep]);
  const [page, setPage] = useState(1);

  // const validate = (fieldValues = values) => {
  //   let temp = { ...errors };

  //   if (
  //     "startDate" in fieldValues &&
  //     fieldValues.startDate &&
  //     fieldValues.endDate
  //   ) {
  //     temp.startDate =
  //       fieldValues.startDate > fieldValues.endDate
  //         ? "Start Date Should be lesser than End Date"
  //         : "";
  //   }

  //   setErrors({
  //     ...temp,
  //   });
  //   if (fieldValues == values)
  //     return Object.values(temp).every((eachFieldErr) => eachFieldErr == "");
  // };
  // const { values, setValues, handleInputChange, errors, setErrors } = useForm(
  //   INITIAL_FORM_VALUES,
  //   true,
  //   validate
  // );

  function paginate(e, v) {
    setIndices([(v - 1) * Pstep + 1, v * Pstep]);
    setPage(v);
  }
  //   useEffect(() => {
  //     setloading (true)
  //     fetch(
  //       process.env.REACT_APP_API_URL_LOYALTY +
  //         "redeem/history" +
  //         toParams({
  //           customerId: localStorage.CustomerNumber,
  //           fromIndex: indices[0],
  //           toIndex: indices[1],
  //           fromDate:start,
  //           toDate: end,
  //           activityType: activity
  //         }),
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
  //           'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
  //         },
  //       }
  //     )
  //       .then((resp) => resp.json())
  //       .then(( { data:
  //         { totalCount, results } } ) => {
  //         setRedeems(results);
  //         setTotalcount(totalCount)
  //         setTotal(Math.ceil(totalCount / Pstep));
  //       })
  //       .catch(alert);
  //       setTimeout(()=>{
  //         setloading (false)
  //       },3000);
  //   }, [indices, start, end, activity]);

  //   useEffect(()=> {

  //     fetch(
  //       process.env.REACT_APP_API_URL_LOYALTY +
  //       "activityType",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
  //           'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
  //         },
  //       }
  //     )
  //       .then((resp) => resp.json())
  //       .then(data => {
  //         console.log('data',data);
  //         setActivityType(data.data)})
  //       .catch(alert);
  //   },[])

  // function dateFormatting(input) {

  //   return input ? input.toString().split(" ").reverse().join(" ") : "";
  // }

  const style = {
    marginTop: "73px",
  };

  const clearAll = function () {
    setFiltersForm(INITIAL_FORM_VALUES);
    setSelectedValue(null);
    onFilterChange(INITIAL_FORM_VALUES);
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
          <Grid item md={3} xs={12} className={classes.gridContainer}>
            <Controls.DatePicker
              name={FORM_FIELDS.START_DATE}
              label={t("label.start_date")}
              value={filtersForm[FORM_FIELDS.START_DATE] || DATE_ONE_YEAR_BACK}
              onChange={handleFiltersFormChange}
              inputProps={{ tabIndex: "1" }}
              maxDate={new Date()}
              error={
                filtersForm[FORM_FIELDS.START_DATE].getTime() - 8640000 >
                filtersForm[FORM_FIELDS.END_DATE].getTime()
              }
            />
            {filtersForm[FORM_FIELDS.START_DATE].getTime() - 8640000 >
              filtersForm[FORM_FIELDS.END_DATE].getTime() && (
              <Typography sx={{ fontSize: "12px" }} color="error">
                Start Date Should be lesser than End Date
              </Typography>
            )}
          </Grid>
          <Grid item md={3} xs={12} className={classes.gridContainer}>
            <Controls.DatePicker
              name={FORM_FIELDS.END_DATE}
              label={t("label.end_date")}
              value={filtersForm[FORM_FIELDS.END_DATE] || new Date()}
              onChange={handleFiltersFormChange}
              inputProps={{ tabIndex: "1" }}
              maxDate={new Date()}
            />
          </Grid>

          <Grid
            item
            md={3}
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

export default withTranslation()(RedemptionHistoryTab);
