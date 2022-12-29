import React from 'react';
import "../ShipToCreationAbout.scss";
import VerticalBarGraph from '@chartiful/react-vertical-bar-graph'



const BarChart = (props) => {
    return (
        <>        
                <VerticalBarGraph
                    data={[20, 45, 28, 80, 99, 43, 50, 60, 20, 40, 10, 30]}
                    labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', "Aug", "Sept", "Oct", "Nov", "Dec"]}
                    width={props.Width}
                    height={props.Height}
                    barRadius={2}
                    barWidthPercentage={0.30}
                    baseConfig={{
                        hasXAxisBackgroundLines: true,
                        xAxisLabelStyle: {
                        position: 'left',
                        // prefix: '$'
                        }
                    }}
                    style={{
                      paddingVertical: 15
                    }}
                    />
               
        </>
    ); 

}
   export default BarChart;