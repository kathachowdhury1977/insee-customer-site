import React, { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import Controls from "../../Controls";
import GraphComponent from "../../GraphComponent";
import Grid from "@mui/material/Grid";
import moment from "moment";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyPointsAction,
  getMyPointsGraphAction,
} from "../../../../../_actions/loyaltyPoints.action";
import { convertToCurrencyFormat } from "../../../../../_helpers";
import "./MyPoints.scss";

const MyPoints = () => {
  const { t } = useTranslation();
  const [filterValues, setFilterValues] = useState({
    startDate: moment().subtract(6, "months")._d,
    endDate: new Date(),
    disableFilters: false,
  });
  const [filterErr, setFilterErr] = useState({});
  const [myPoint, setMyPoint] = useState({});
  const [myGraphPoints, setmyGraphPoints] = useState([]);
  const [graphState, setGraphState] = useState({
    monthsList: [],
    earnedPoints: [],
    redeemedPoints: [],
  });
  const dispatch = useDispatch();
  const getMyPoints = useSelector((state) => state.getMyPoints);
  const getMyGraphData = useSelector((state) => state.getMyPointsGraph);
  // to invoke ms call on change
  useEffect(() => {
    handleFilterSubmit();
  }, [filterValues.startDate, filterValues.endDate]);

  useEffect(() => {
    const filterData =
      getMyPoints &&
      getMyPoints.getMyPointsList &&
      getMyPoints.getMyPointsList.data;
    setMyPoint(filterData);
  }, [getMyPoints]);

  useEffect(() => {
    const filterData =
      getMyGraphData &&
      getMyGraphData.getMyPointsGraphList &&
      getMyGraphData.getMyPointsGraphList.data;
    setmyGraphPoints(filterData);
  }, [getMyGraphData, filterValues.startDate, filterValues.endDate]);

  useEffect(() => {
    getPointsForGraph(myGraphPoints);
  }, [myGraphPoints, filterValues.startDate, filterValues.endDate]);

  useEffect(() => {
    dispatch(getMyPointsAction(localStorage.getItem("CustomerNumber")));
    dispatch(
      getMyPointsGraphAction(
        filterValues,
        localStorage.getItem("CustomerNumber")
      )
    );
  }, []);

  const handleFilterChange = (e) => {
    setFilterErr({});
    const { name, value } = e.target;
    setFilterValues({
      ...filterValues,
      [name]: value,
    });
  };

  const isInRange = (startDate, endDate) => {
    if (!startDate || !endDate) {
      return null;
    }
    var mStartDate = moment([
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
    ]);
    var mEndDate = moment([
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
    ]);
    return mEndDate.diff(mStartDate, "months", true);
  };

  const validate = () => {
    let temp = {};
    if (
      "startDate" in filterValues &&
      filterValues.startDate != null &&
      filterValues.endDate != null
    ) {
      temp.startDate =
        filterValues.startDate > filterValues.endDate
          ? "Start Date Should be lesser than End Date"
          : "";
    }
    let isInR = isInRange(filterValues.startDate, filterValues.endDate);
    if (isInR != null && isInR > 6) {
      temp.startDate = "Range should not be greater than 6 months";
    }

    setFilterErr({ ...temp });
    return Object.values(temp).every((eachFieldErr) => eachFieldErr === "");
  };

  // called when filters are changed
  const handleFilterSubmit = () => {
    if (validate())
      if (filterValues.startDate && filterValues.endDate) {
        dispatch(getMyPointsAction(localStorage.getItem("CustomerNumber")));
        dispatch(
          getMyPointsGraphAction(
            filterValues,
            localStorage.getItem("CustomerNumber")
          )
        );
      }
  };

  // calculate the difference between start and end date
  const getLastNMonths = (n) => {
    const locale = "en-GB";
    var dateStart = moment(filterValues.startDate);
    var dateEnd = moment(filterValues.endDate);
    var timeValues = [];
    while (
      dateEnd > dateStart ||
      dateStart.format("M") === dateEnd.format("M")
    ) {
      let { day, month, year } = new Intl.DateTimeFormat("en", {
        month: "short",
        year: "numeric",
      })
        .formatToParts(dateStart._d)
        .reduce((acc, part) => {
          if (part.type != "literal") {
            acc[part.type] = part.value;
          }
          return acc;
        }, Object.create(null));
      timeValues.push(`${month}-${year.slice(-2)}`);
      dateStart.add(1, "month");
    }
    return timeValues;
  };
  // data to the graph container
  const getPointsForGraph = (myGraphPoints) => {
    let monthList = getLastNMonths(
      filterValues.endDate.getMonth() -
        filterValues.startDate.getMonth() +
        12 *
          (filterValues.endDate.getFullYear() -
            filterValues.startDate.getFullYear())
    );
    let finalRows = [];
    let epts = [];
    let rpts = [];
    if (myGraphPoints && myGraphPoints.length > 0) {
      for (let i = 0; i < monthList.length; i++) {
        let curRow = myGraphPoints.filter((r) => {
          return r.month == monthList[i];
        });

        if (curRow[0] != undefined) {
          finalRows.push(curRow[0].month);
          epts.push(curRow[0].earnedPoints);
          rpts.push(curRow[0].redeemedPoints);
        } else {
          epts.push(0);
          rpts.push(0);
        }
      }
    }
    setGraphState({
      monthsList: monthList,
      earnedPoints: epts,
      redeemedPoints: rpts,
    });
  };

  const graphData = {
    labels: graphState.monthsList,
    datasets: [
      {
        label: t("label.pointsEarned"),
        data: graphState.earnedPoints,
        backgroundColor: "#ff0000",
      },
      {
        label: t("label.pointsRedeemed"),
        data: graphState.redeemedPoints,
        backgroundColor: "#000000",
      },
    ],
  };

  return (
    <div className="MyPointsContainer">
      <div className="TransReedContainer">
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Controls.CardComponent
              header={t("label.lastPointsTransaction")}
              content={
                myPoint &&
                myPoint.lastPointsTransaction &&
                convertToCurrencyFormat(myPoint?.lastPointsTransaction?.key)
              }
              footer={
                myPoint &&
                myPoint.lastPointsTransaction &&
                myPoint.lastPointsTransaction.value !== "null"
                  ? t("label.on") +  " " +
                    moment(myPoint.lastPointsTransaction.value).format(
                      "DD-MM-yyyy"
                    )
                  : "--"
              }
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Controls.CardComponent
              header={t("label.lastPointsRedeem")}
              content={
                myPoint?.lastPointsRedeemed &&
                "-" + convertToCurrencyFormat(myPoint?.lastPointsRedeemed?.key)
              }
              footer={
                myPoint &&
                myPoint.lastPointsRedeemed &&
                myPoint.lastPointsRedeemed.value !== "null"
                  ? t("label.on") +  " " +
                    moment(myPoint.lastPointsRedeemed.value).format(
                      "DD-MM-yyyy"
                    )
                  : "--"
              }
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <div className="MyPointsFltrContainer">
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <Controls.DatePicker
                    displayStaticWrapperAs="desktop"
                    name="startDate"
                    label={t("Start Date")}
                    maxDate={filterValues.endDate || new Date()}
                    value={filterValues.startDate}
                    onChange={handleFilterChange}
                    PopperProps={{
                      placement: "top",
                    }}
                    disable={filterValues.disableFilters}
                    error={filterErr.startDate}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controls.DatePicker
                    // views={["day", "month", "year"]}
                    name="endDate"
                    label={t("label.end_date")}
                    maxDate={new Date()}
                    value={filterValues.endDate}
                    onChange={handleFilterChange}
                    PopperProps={{
                      placement: "top",
                    }}
                    disable={filterValues.disableFilters}
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="ExpCardContainer">
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Grid container spacing={2}>
              {myPoint &&
                myPoint.expiringPoints &&
                myPoint.expiringPoints.length > 0 &&
                myPoint.expiringPoints.map((eachItem, key) => (
                  <Grid item md={4} xs={12}>
                    <Controls.CardComponent
                      header={t("label.expiring")}
                      content={convertToCurrencyFormat(eachItem.key)}
                      footer={t("label.on") +  " " + eachItem.value}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
            <GraphComponent data={graphData} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MyPoints;
