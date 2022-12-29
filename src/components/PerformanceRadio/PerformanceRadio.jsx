import React, { useEffect } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import "./PerformanceRadio.scss";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';


export default function PerformanceRadio() {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <div className="perfomance_type_radio">
            <FormControl component="fieldset" className="ml-4">
                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel
                        value="top"
                        control={<Radio color="primary" />}
                        label={t("label.overall")}

                    />
                    <FormControlLabel
                        value="start"
                        control={<Radio color="primary" />}
                        label={t("label.productwise")}

                    />
                </RadioGroup>
            </FormControl>
        </div>
    );
}
