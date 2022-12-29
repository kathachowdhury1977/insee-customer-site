import React from "react";
import { withTranslation, useTranslation } from "react-i18next";
import VerticalBarGraph from '@chartiful/react-vertical-bar-graph'

const Graph = (props) => {
    
    return (
        <>
         <VerticalBarGraph
            data={[50, 20, 10, 40, 1, 30, 70]}
            labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
            width={1000}
            height={400}
            barRadius={5}
            barWidthPercentage={0.45}
            baseConfig={{
                hasXAxisBackgroundLines: false,
                xAxisLabelStyle: {
                position: 'left',
                // prefix: '$'
                }
            }}
            style={{
                paddingVertical: 10,
            }}
            />
       </>
    )
};

export default Graph;