import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import '../../../components/RadioButtonGroup/RadioButton.scss';
import styled from 'styled-components';

function RadioButtonDivision(props) {

    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    const countryCode = userData.countryCode;
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const isPageLoadingDeliveryReports = useSelector((state) => state.getDeliveryReports.loading)
    const isPageLoadinggetSalesOrderReport = useSelector((state) => state.getSalesOrderReport.loading)
    const isPageLoadinggetTaxInvoiceReports = useSelector((state) => state.getTaxInvoiceReports.loading);
    const isPageLoadinggetCreditNoteReport = useSelector((state) => state.getCreditNoteReport.loading)
    const isPageLoadinggetReceiptReport = useSelector((state) => state.getReceiptReport.loading)
    const isPageLoadinggetCustomerStatementReport = useSelector((state) => state.getCustomerStatementReport.loading)
    const isPageLoading = useSelector((state) => state.getCustomerStatementReportPdf.loading)
    function onChangeProductCategory(event) {
        props.onChangeDivision(event.target.value);
    }





    const isThai = countryCode && countryCode == 'TH' ? true : false;

    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
    const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);

    const Container = styled.div`
    .MuiFormControlLabel-label {
       font-size: ${HeadingFontChange}px

    }
`;

    return (
        <>
            
                <div className="row" style={{ margin: "10px" }}>

                    {!props.isSales ? <FormControl component='fieldset' className=''>

                        <RadioGroup
                            row
                            aria-label='productCategory'
                            name='productCategory'
                            defaultValue={countryCode === 'TH' ? 'Cement' : 'DryMix'}
                        >
                            {
                                countryCode === 'TH' ?
                                    <FormControlLabel
                                        disabled={isPageLoadinggetTaxInvoiceReports || isPageLoadinggetCreditNoteReport || isPageLoadinggetReceiptReport || isPageLoadinggetCustomerStatementReport || isPageLoading}
                                        value='Cement'
                                        control={<Radio color='primary' />}
                                        label={t('Cement & Mortar')}
                                        onChange={onChangeProductCategory}
                                    /> :
                                    ''
                                //     <FormControlLabel
                                //     disabled={isPageLoadinggetTaxInvoiceReports || isPageLoadinggetCreditNoteReport || isPageLoadinggetReceiptReport || isPageLoadinggetCustomerStatementReport}
                                //     value='DryMix'
                                //     control={<Radio color='primary' />}
                                //     label={t('Dry Mix')}
                                //     onChange={onChangeProductCategory}
                                // />
                            }


                            {isThai ? <FormControlLabel
                                value='Concrete'
                                disabled={isPageLoadinggetTaxInvoiceReports || isPageLoadinggetCreditNoteReport || isPageLoadinggetReceiptReport || isPageLoadinggetCustomerStatementReport || isPageLoading}
                                control={<Radio color='primary' />}
                                label={t('Concrete')}
                                onChange={onChangeProductCategory}
                            /> : null}
                            {isThai ? <FormControlLabel
                                value='Conwood'
                                disabled={isPageLoadinggetTaxInvoiceReports || isPageLoadinggetCreditNoteReport || isPageLoadinggetReceiptReport || isPageLoadinggetCustomerStatementReport || isPageLoading}
                                control={<Radio color='primary' />}
                                label={t('Conwood')}
                                onChange={onChangeProductCategory}
                            /> : null}


                        </RadioGroup>
                    </FormControl> :

                        <FormControl component='fieldset' className=''>
                            <RadioGroup
                                row
                                aria-label='productCategory'
                                name='productCategory'
                                defaultValue={countryCode === 'TH' ? 'CM' : 'DryMix'}
                            >
                                {
                                    countryCode === 'VN' ? '' :
                                        <FormControlLabel
                                            disabled={isPageLoadingDeliveryReports || isPageLoadinggetSalesOrderReport}
                                            value='CM'
                                            control={<Radio color='primary' />}
                                            label={t('Cement')}
                                            onChange={onChangeProductCategory}
                                        />

                                }


                                {isThai ? <FormControlLabel
                                    disabled={isPageLoadingDeliveryReports || isPageLoadinggetSalesOrderReport}
                                    value='CO'
                                    control={<Radio color='primary' />}
                                    label={t('Concrete')}
                                    onChange={onChangeProductCategory}
                                /> : null}
                                {isThai ? <FormControlLabel
                                    disabled={isPageLoadingDeliveryReports || isPageLoadinggetSalesOrderReport}
                                    value='CW'
                                    control={<Radio color='primary' />}
                                    label={t('Conwood')}
                                    onChange={onChangeProductCategory}
                                /> : null}
                                {isThai ? <FormControlLabel
                                    disabled={isPageLoadingDeliveryReports || isPageLoadinggetSalesOrderReport}
                                    value='MT'
                                    control={<Radio color='primary' />}
                                    label={t('Mortar')}
                                    onChange={onChangeProductCategory}
                                /> : null}

                            </RadioGroup>
                        </FormControl>}
                </div>
           

        </>
    );
}

export default withTranslation()(RadioButtonDivision);
