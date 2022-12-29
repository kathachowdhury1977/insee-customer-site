import * as React from "react";
import Loading from '../Loader/Loading'

import Chart from "react-google-charts";
export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);


  }

  render() {
    

    let chartData =
      this.props.graphData ? this.props.graphData.map((chartdata) => {
        return ({
          measureType: chartdata.measureType,
          month: chartdata.month,
          payment: parseInt(chartdata.payment),
          value: parseInt(chartdata.value),
          volume: parseInt(chartdata.volume),
          year: chartdata.year,

        }

        )
      }
      ) : null

      var chartDataFilter = [[ 'month', 'volume', 'value', 'payment' ]]
      var dataChart = chartData.reverse()
      dataChart &&  dataChart.map((item)=> {
          var chartDataModify = [item.month, item.volume,  item.value, item.payment ]
          chartDataFilter.push(chartDataModify)
      })

    let data = chartDataFilter
    return (
    <div className="chart">
      {
        data && data.length > 1 ?
        <Chart
        chartType="ColumnChart"
        width="100%"
        height="500px"
        data={data}
        loader={ <div className="loading"><Loading /></div>}
        options={{
          bar: {groupWidth: 100},
          legend: {position:"bottom", maxLines: 1 },
          title: '',
          colors: ['#2f5189', '#f59a32', '#23cf8f'],
          vAxes: {
            0: {
                title: 'Amount (X 100)'
            },
            1: {
                title: 'volume (TONS)'
            }
        },
          vAxis: {
            minValue: 1000,
            gridlines: {
              count: 10
            },
            
          },
        
         
          series: {
            1: {
              targetAxisIndex:1
            },
            2: {
              targetAxisIndex:5
            }
          },
        
          
        }}
      />: <div className="loading"> No Data Found</div>
      }
     
    </div>
      
    );
  }
}
