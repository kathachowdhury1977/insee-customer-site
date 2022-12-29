import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import { withTranslation, useTranslation } from 'react-i18next'
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui'
import { withStyles } from '@material-ui/core/styles'
import { Stack, Animation } from '@devexpress/dx-react-chart'

import { olimpicMedals as data } from './Data'

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
})
const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
)
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase)
const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
})
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
)
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(
  legendLabelBase
)

export default class DashboardChart extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      data,
    }
  }

  render() {
    const { data: chartData } = this.state

    return (
      <Paper>
        <Chart data={chartData} height='300'>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            name='Sales Purchase'
            valueField='gold'
            argumentField='country'
            color='#2f5189'
          />
          <BarSeries
            name='Payment'
            valueField='silver'
            argumentField='country'
            color='#f59a32'
          />
          <BarSeries
            name='Volume'
            valueField='silver'
            argumentField='country'
            color='#23cf8f'
          />

          <Animation />
          <Legend
            position='bottom'
            rootComponent={Root}
            labelComponent={Label}
          />
          <Title text='' />
          <Stack />
        </Chart>
      </Paper>
    )
  }
}
