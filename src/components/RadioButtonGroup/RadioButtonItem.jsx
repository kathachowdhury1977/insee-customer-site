import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { masterActions,orderActions } from '../../_actions'
import { withTranslation, useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components';
import './RadioButton.scss'
export default function RadioButtonItem(props) {
  var categoryName = useSelector(
    (state) => state.getConwoodCategory.getConwoodCategory
  )

 var categoryValue = localStorage.getItem('CATEGORY')
  const selectedSubProductValue = useSelector(
    (state) => state.getProductSubCatLevelValue.getProductSubCatLevelValue
  )
  const [productCategory, setProductCategory] = React.useState('')
  const { t } = useTranslation()
  const dispatch = useDispatch()
  var contractNumber
  var shipTo
  var plant
  var category
  var subcategory
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)

  // localStorage.setItem('SUBCATEGORY', 'BAG');

  function onChangeProductCategory(event) {
    console.log(event.target.value)
    if (event.target.value === 'CONWOOD') {
      localStorage.setItem('SUBCATEGORY', '')


    }
    localStorage.setItem('CATEGORY', event.target.value)


    contractNumber =
    localStorage.getItem('CONTRACTNUMBER') === null ||
    localStorage.getItem('CONTRACTNUMBER') === undefined
      ? ''
      : localStorage.getItem('CONTRACTNUMBER')

    shipTo = localStorage.getItem('SHIPTOCODE')
    plant = localStorage.getItem('PLANTCODE')
    category = localStorage.getItem('CATEGORY')
    subcategory = localStorage.getItem('SUBCATEGORY')

    
    dispatch(
      orderActions.getConwoodCategory(event.target.value, userName.countryCode)
    ) 

    dispatch( 
      masterActions.plantbyCountry(
        userName.countryCode,
        category
      )
    )
    // dispatch(orderActions.getAllProductCatalog(contractNumber, userName.soldTo[0], plant, shipTo, category, subcategory));
    if (localStorage.getItem('ORDER-ADDED') === 'YES') {
      localStorage.setItem('PLACE-ORDER-FILTER-CHANGED', 'YES')
    }
  }

  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);

  const Container = styled.div`
    .MuiFormControlLabel-label {
       font-size: ${FontChange}px

    }
`;

  return (
    // <Container>
    <FormControl component='fieldset' className=''>
      
      {
      userName.countryCode === "LK" ? 
      <RadioGroup
        row
        aria-label='productCategory'
        name='productCategory'
        defaultValue={categoryValue && categoryValue ? categoryValue : 'BAG CMT'}
      >
        <FormControlLabel
          value='BAG CMT'
          control={<Radio color='primary' />}
          label={t('BAG CMT')}
          onChange={onChangeProductCategory}
        />

        <FormControlLabel
          value='BULK CMT'
          control={<Radio color='primary' />}
          label={t('BULK CMT')}
          onChange={onChangeProductCategory}
        />
      
        
      </RadioGroup>
      
      :
      <RadioGroup
        row
        aria-label='productCategory'
        name='productCategory'
        defaultValue={categoryValue && categoryValue ? categoryValue : 'CMT'}
      >
        <FormControlLabel
          value='CMT'
          control={<Radio color='primary' />}
          label={t('Cement')}
          onChange={onChangeProductCategory}
          
        />
        {
          userName.countryCode === "VN" ? 
          <FormControlLabel
            value='DM'
            control={<Radio color='primary' />}
            label={t('Dry Mix')}
            onChange={onChangeProductCategory}
          />
          :
          <>
            <FormControlLabel
            value='MORTAR'
            control={<Radio color='primary' />}
            label={t('Mortar')}
            onChange={onChangeProductCategory}
          />
          <FormControlLabel
            value='CONWOOD'
            control={<Radio color='primary' />}
            label={t('Conwood')}
            onChange={onChangeProductCategory}
          />
          </>
        }
        
      </RadioGroup>
    }
    </FormControl>
    // </Container>
  )
}



