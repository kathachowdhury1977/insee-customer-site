import React from 'react';
import ".././ShipToCreationAbout.scss";
import VerticalBarGraph from '@chartiful/react-vertical-bar-graph'



const MonthChart = (props) => {
    return (
        <>        
                <VerticalBarGraph
                    data={[ 45, 80,  33]}
                    labels={['Jan', 'Feb', 'March']}
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
   export default MonthChart;