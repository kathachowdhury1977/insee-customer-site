// import React from 'react';
// import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import "./MyShipmentBlockStepper.scss";
import { withTranslation, useTranslation } from "react-i18next";

function valueLabelFormat(value) {
  const [coefficient, exponent] = value
    .toExponential()
    .split('e')
    .map((item) => Number(item));
  return `${Math.round(coefficient)}e^${exponent}`;
}

export default function MyShipmentBlockStepper() {
  const [value, setValue] = React.useState(1);
  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Typography gutterBottom>
        {t("myshipment.radiogrouplabel_blocked")}
      </Typography>
      <div className="range-slider">
      <Slider
        value={value}
        min={0}
        step={0.1}
        max={0}
        scale={(x) => x ** 10}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
      <span className="full_view">Full View</span>
    </div>
    </div>
  );
}

