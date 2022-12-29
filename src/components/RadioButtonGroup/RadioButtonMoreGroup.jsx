import React, { useEffect } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import './RadioButton.scss'
import { withTranslation, useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { eventActions, masterActions } from '../../_actions'
import styled from 'styled-components';

export default function RadioButtonMoreGroup(props) {
  const shipmentFilterList = useSelector(
    (state) => state.shipmentStatusFilterList
  )
  let userName = localStorage.getItem('userData')
  userName = JSON.parse(userName)
  const countryCode = userName ? userName.countryCode : ''
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const selectShipMentStatus = (event) => {
    props.selectShipMentStatusEvent(event.target.value)
  }
  useEffect(() => {
    dispatch(masterActions.shipmentStatusFilterList(countryCode))
  }, [])
  ///console.log('shipmentFilterList', shipmentFilterList)

  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);

  const Container = styled.div`
    .MuiFormControlLabel-label {
       font-size: ${FontChange}px

    }
`;

  return (
    
    <FormControl component='fieldset' className='ml-4 mt-3' style={{fontSize: `${FontChange}px`}}>
      {t('myshipment.radiobuttonheading')} :
      <RadioGroup row aria-label='position' name='position' defaultValue='all'>
        <FormControlLabel
          value='all'
          control={<Radio color='primary' />}
          label={t('myshipment.radiogrouplabel_all')}
          onChange={selectShipMentStatus}
        />
        {(shipmentFilterList &&
          shipmentFilterList.shipmentFilter !== undefined) ||
        null
          ? shipmentFilterList.shipmentFilter.map((data) => {
              if (data.key !== 'All') {
                return (
                  <FormControlLabel
                    value={data.key}
                    control={<Radio color='primary' />}
                    label={t(data.key)}
                    onChange={selectShipMentStatus}
                  />
                )
              }
            })
          : ''}
      </RadioGroup>
    </FormControl>
    
  )
}
