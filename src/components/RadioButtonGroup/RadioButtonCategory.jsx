import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "./RadioButton.scss";
import { orderActions } from '../../_actions';


export default function RadioButtonCategory(props) {
    const categoryName = useSelector(state => state.getConwoodCategory.getConwoodCategory);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    // if(categoryName && categoryName === 'CONWOOD'){
    //     localStorage.setItem('SUBCATEGORY',categoryName && categoryName);
    //   }
    var contractNumber;
    var shipTo;
    var plant;
    var category;
    var subcategory;
    
    let userName = localStorage.getItem('userData');
    userName = JSON.parse(userName);

    const onChangeProductCategory = (event) => {
        console.log(event.target.value)
        localStorage.setItem('SUBCATEGORY', event.target.value);
        contractNumber = localStorage.getItem('CONTRACTNUMBER')
        shipTo = localStorage.getItem('SHIPTOCODE')
        plant = localStorage.getItem('PLANTCODE')
        category = localStorage.getItem('CATEGORY')
        subcategory = localStorage.getItem('SUBCATEGORY');
        // dispatch(orderActions.getConwoodCategory(event.target.value, userName.countryCode));
        dispatch(orderActions.getAllProductCatalog(contractNumber, userName.soldTo[0], plant, shipTo, category, subcategory));
    }

    return (
        <div className="col-sm-12 col-md-12 col-lg-12 gotocart">
            <FormControl component="fieldset" className="">
                <RadioGroup row aria-label="position" name="position" defaultValue="Roof Application">
                    <label style={{ fontWeight: '600', paddingTop: '6px' }}>Category</label>&nbsp;
                    <FormControlLabel
                        value="Roof Application"
                        control={<Radio color="primary" />}
                        label={t("Roof Application")}
                        onChange={onChangeProductCategory}
                    />
                    <FormControlLabel
                        value="Decorative Application"
                        control={<Radio color="primary" />}
                        label={t("Decorative Application")}
                        onChange={onChangeProductCategory}
                    />
                    <FormControlLabel
                        value="Wall Application"
                        control={<Radio color="primary" />}
                        label={t("Wall Application")}
                        onChange={onChangeProductCategory}
                    />
                    <FormControlLabel
                        value="Paint"
                        control={<Radio color="primary" />}
                        label={t("Paint")}
                        onChange={onChangeProductCategory}
                    />
                    <FormControlLabel
                        value="Floor Application"
                        control={<Radio color="primary" />}
                        label={t("Floor Application")}
                        onChange={onChangeProductCategory}
                    />
                    <FormControlLabel
                        value="Fiber Cement"
                        control={<Radio color="primary" />}
                        label={t("Fiber Cement")}
                        onChange={onChangeProductCategory}
                    />
                    <FormControlLabel
                        value="Non-Fiber Cement"
                        control={<Radio color="primary" />}
                        label={t("Non-Fiber Cement")}
                        onChange={onChangeProductCategory}
                    />
                    <FormControlLabel
                        value="Other"
                        control={<Radio color="primary" />}
                        label={t("Other")}
                        onChange={onChangeProductCategory}
                    />
                </RadioGroup>
            </FormControl>
        </div>

    );
}

