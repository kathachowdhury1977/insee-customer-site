import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withTranslation, useTranslation } from "react-i18next";
import "./RadioButton.scss";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../../_actions";
import styled from 'styled-components';

export default function RadioButtonType(props) {
  
  const categoryName = useSelector(state => state.getConwoodCategory.getConwoodCategory);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  var contractNumber;
  var shipTo;
  var plant;
  var category;
  var subcategory;
  var subcategoryValue = localStorage.getItem('SUBCATEGORY')
  let userName = localStorage.getItem('userData');
  userName = JSON.parse(userName);
console.log(subcategoryValue, 'subcategoryValue----')
  function onChangeProductCategory(event){
    console.log(event.target.value)
    if(categoryName && categoryName != undefined){
      localStorage.setItem('CATEGORY',categoryName && categoryName);
    }
    localStorage.setItem('SUBCATEGORY',event.target.value);
    contractNumber = localStorage.getItem('CONTRACTNUMBER')
    shipTo = localStorage.getItem('SHIPTOCODE')
    plant = localStorage.getItem('PLANTCODE')
    category = localStorage.getItem('CATEGORY')
    subcategory = localStorage.getItem('SUBCATEGORY')
    // dispatch(orderActions.getAllProductCatalog(contractNumber,userName.soldTo[0],plant,shipTo,category,subcategory));
    if(localStorage.getItem('ORDER-ADDED') === 'YES'){
      localStorage.setItem('PLACE-ORDER-FILTER-CHANGED', 'YES');
    }
  }

  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);

  const Container = styled.div`
  .MuiFormControlLabel-label {
     font-size: ${FontChange}px

  }
`;


  return (
    // <Container>
      <FormControl component="fieldset">
     
         
         <RadioGroup row aria-label="position" name="position" defaultValue={subcategoryValue === "BAG" ? "BAG" : subcategoryValue}>
          <FormControlLabel
            value="BAG"
            control={<Radio color="primary" />}
            label={t("bag.radio")}
            onChange={onChangeProductCategory}
          />
          {
            props.categoryName === 'DM' ? '' :
            <FormControlLabel
            value="BULK"
            control={<Radio color="primary" />}
            label={t("bulk.radio")}
            onChange={onChangeProductCategory}
          />

          }
         
        </RadioGroup>
      
        
      </FormControl>
      // </Container>
   
  );
}

