import React, { useEffect, useState } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { paymentofflineActions } from "../../_actions";
import FormControl from '@material-ui/core/FormControl';
import "./RadioButton.scss";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { eventActions } from "../../_actions";
import Loading from '../../components/Loader/Loading'
import styled from 'styled-components';

export default function RadioButtonPaymentGroup(props) {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();
   
    let userName = localStorage.getItem('userData');
    userName = JSON.parse(userName);
    let countryCode = localStorage.getItem('userData')
    countryCode = JSON.parse(countryCode)
   const soldToNo = userName.soldTo[0]
   const todayDat = new Date();
   let onlyDateGet = todayDat.getFullYear() + '-' + ('0' + (todayDat.getMonth()+1)).slice(-2) + '-' + ('0' + todayDat.getDate()).slice(-2);
    const getPaymentCat = useSelector((state) => state.getCatForFilter.getCatForFilter);
    const defaultCat = getPaymentCat && getPaymentCat ? getPaymentCat && getPaymentCat :
    countryCode.countryCode === 'VN'  || countryCode.countryCode === 'LK' ? 'DryMix' : "Cement"

    const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)
  const Container = styled.div`
  .MuiFormControlLabel-label {
     font-size: ${FontChange}px

  }
`;
    return (
        <Container>
        <FormControl component="fieldset" className="ml-4">
            <RadioGroup row aria-label="position" name="position" defaultValue={defaultCat}>
                
                

                {
                     countryCode.countryCode ==="VN" || countryCode.countryCode ==="LK" ? 
                     <>
                     
                     <FormControlLabel
                     value="DryMix"
                     control={<Radio color="primary" />}
                     label={t("Cement & Dry Mix")}
                     onChange={props.handleChangeCat}
 
                 />
                 </>
                     
                     : 
                     <>
                     <FormControlLabel
                    value="Cement"
                    control={<Radio color="primary" />}
                    label={t("cement&mortor.radio")}
                    onChange={props.handleChangeCat}

                />
                      <FormControlLabel
                    value="Conwood"
                    control={<Radio color="primary" />}
                    label={t("conwod.radio")}
                    onChange={props.handleChangeCat}

                />

                <FormControlLabel
                    value="Concrete"
                    control={<Radio color="primary" />}
                    label={t("radio.rmx")}
                    onChange={props.handleChangeCat}

                />
                     </>
                }

               
            </RadioGroup>
        </FormControl>
        </Container>
    );
}
