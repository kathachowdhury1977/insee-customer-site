import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import "./MultiRangeSlider.scss";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
});

function valuetext(value) {
    return `${value}°C`;
}

export default function MultiRangeSlider() {
    const classes = useStyles();
    const Shipment = "0";
    const Block = "30";
    const InProgress = "60";
    const [value, setValue] = React.useState([Shipment, Block, InProgress]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <div className="multi-slider">
                <div className="range-slider">
                    <Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                    />
                     <span className="full_view">Full view</span>
                </div>
            </div>
        </div>
    );
}

