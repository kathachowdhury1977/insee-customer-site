import * as React from "react";
import Paper from "@material-ui/core/Paper";
import "./PerformanceChart.scss";
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

import { olimpicMedals as data } from "./Data";

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

export default class PerformanceChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <div className="chart_sec">
        <div className="row mb-3">
          <div className="col-8">
            <span className="month-title">{this.props.titleName}
              <span className="month_item">({this.props.monthType})
               </span>
            </span>
          </div>
          <div className="col-4 text-right">
         
              {
                this.props.monthDiv == "true" ?
                <span className="six_month_type">
                   Next 6 Months
               </span> : null
              }
             
          </div>
        </div>
        <Paper>
          <Chart data={chartData} height="400">
            <ArgumentAxis />
           

            <BarSeries
              name="2019"
              valueField="gold"
              argumentField="country"
              color="#8c54ff"
            />
            <BarSeries
              name="2020"
              valueField="silver"
              argumentField="country"
              color="#f7c137"
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
      </div>
    );
  }
}
