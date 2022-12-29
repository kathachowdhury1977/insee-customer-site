import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { withTranslation, useTranslation } from "react-i18next";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { Stack, Animation } from "@devexpress/dx-react-chart";

import { points as data } from "./Data";

const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
});
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: "nowrap",
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);



function Demos({chartData}) {
  const { t } = useTranslation();
    return (
      <Paper>
        <Chart data={chartData} height="300">
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            name={t('Points Earned')}
            valueField="earnedPoints"
            argumentField="month"
            color="#000000"
          />
          <BarSeries
            name={t('points redeemed')}
            valueField="redeemedPoints"
            argumentField="month"
            color="#ff0000"
          />
         
          <Animation />
          <Legend
            position="bottom"
            rootComponent={Root}
            labelComponent={Label}
          />
          <Title text="" />
          <Stack />
        </Chart>
      </Paper>
    );
  
}

export default withTranslation()(Demos);
