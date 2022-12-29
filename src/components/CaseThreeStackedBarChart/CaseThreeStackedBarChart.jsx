import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Stack, Animation } from '@devexpress/dx-react-chart';

import { mangoConsumption as data } from "../CaseReportsCharts/CaseBarChartData";

const legendStyles = () => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
    },
});
const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
    label: {
        whiteSpace: 'nowrap',
    },
});
const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);

export default class Demos extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data,
        };
    }

    render() {
        const { data: chartData } = this.state;

        return (
            <Paper>
                <Chart
                    data={chartData}
                    height="300"
                >
                    <ArgumentAxis />
                    <ValueAxis
                        max={2400}
                    />


                    <BarSeries
                        name="Request"
                        valueField="coal"
                        argumentField="country"
                        color="#b9ad05"
                    />
                    <BarSeries
                        name="Enquiry"
                        valueField="nuclear"
                        argumentField="country"
                        color="#a4a4a4"
                    />

                    <BarSeries
                        name="Complaint"
                        valueField="mango"
                        argumentField="country"
                        color="#2f5189"
                    />
                    <Animation />
                    <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
                    {/* <Title text="Energy Consumption in 2004 (Millions of Tons, Oil Equivalent)" /> */}
                    <Stack
                        stacks={[
                            { series: ['Request', 'Enquiry', 'Complaint'] },
                        ]}
                    />
                </Chart>
            </Paper>
        );
    }
}
