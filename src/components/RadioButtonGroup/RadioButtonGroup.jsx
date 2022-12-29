import React, { useEffect, useState } from 'react'
import Radio from '@material-ui/core/Radio'
import { useDispatch, useSelector } from 'react-redux'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { masterActions, eventActions } from '../../_actions'
import styled from 'styled-components';
import './RadioButton.scss'
import { withTranslation, useTranslation } from 'react-i18next'
export default function FormControlLabelPlacement(props) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  let userName = localStorage.getItem('userData')
  const [checked, setChecked] = useState(false)
  userName = JSON.parse(userName)
  const soldToNumber = localStorage.getItem('CustomerNumber')
    ? localStorage.getItem('CustomerNumber')
    : 0
  const shipingConditionValue = props.shipingConditionValue
  const selectProdCat = (event) => { debugger
    props.setSelectproductId([
      
    
    ])
    ///console.log('event.target.value', event.target.value)
    props.setFilterarray({
      ...props.filterarray,
      ['productCategory']: event.target.value,
    })

    dispatch(masterActions.getShipCatValue( event.target.value))
  }

  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);

  const Container = styled.div`
  .MuiFormControlLabel-label {
     font-size: ${FontChange}px

  }
`;

  return (
  
    <FormControl component='fieldset' className='ml-4'>
      {
        userName && userName.countryCode === "VN" ? 
        <RadioGroup
        row
        aria-label='position'
        name='position'
        defaultValue='Bag CMT %26 Dry Mix'
      >
         <FormControlLabel
          value='Bag CMT %26 Dry Mix'
          control={<Radio color='primary' />}
          name='categorySelect'
          label={t('Bag CMT & Dry Mix')}
          onChange={selectProdCat}
        />
        <FormControlLabel
          value='Bulk CMT'
          control={<Radio color='primary' />}
          name='categorySelect'
          label={t('Bulk CMT')}
          onChange={selectProdCat}
        />
        {/* <FormControlLabel
          value='Bulk Dry Mix'
          control={<Radio color='primary' />}
          name='categorySelect'
          label={t('Bulk Dry Mix')}
          onChange={selectProdCat}
        /> */}
      </RadioGroup>
        :
        <RadioGroup
        row
        aria-label='position'
        name='position'
        defaultValue='Bag CMT %26 Mortar'
      >
        <FormControlLabel
          value='Bag CMT %26 Mortar'
          control={<Radio color='primary' />}
          name='categorySelect'
          label={t('Bag CMT & Mortar')}
          onChange={selectProdCat}
        />
        <FormControlLabel
          value='Bulk CMT'
          control={<Radio color='primary' />}
          name='categorySelect'
          label={t('Bulk CMT')}
          onChange={selectProdCat}
        />
        <FormControlLabel
          value='Bulk Mortar'
          control={<Radio color='primary' />}
          name='categorySelect'
          label={t('Bulk Mortar')}
          onChange={selectProdCat}
        />
      </RadioGroup>
      }
      
    </FormControl>

  )
}
