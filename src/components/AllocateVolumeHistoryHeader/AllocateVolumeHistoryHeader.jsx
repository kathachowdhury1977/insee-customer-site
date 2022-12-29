import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import FormSelectbox from "../FormSelectbox/FormSelectbox";
import InputSearch from "../InputSearch/InputSearch";
//import { process.env.REACT_APP_API_URL_LOYALTY, process.env.REACT_APP_MASTER_API_URL } from "../../constant";

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'


function mapper(objARr) {

  // if (objARr) {
  //   return objARr.map(({ key }) => ({ id: key, name: key }));
  // } else {
  //   return "";
  // }

  if(objARr) {
    return objARr.map(({ key, value }) => ({ id: value, name: key }));
  } else {
    return "";
  }
  
}




function AllocateVolumeHistoryHeader(props) {
  const event = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const yr = new Date().getFullYear();
  const selectedLangCode = localStorage.getItem('lancode');
  const [retailercodes, SetRetailerCodes] = useState([])
  const [retailer, SetRetailer] = useState('')
  const defaultProps = {
    options: retailercodes,
    getOptionLabel: (retailercodes) => selectedLangCode === 'en' || selectedLangCode === null ? 
    retailercodes.retailerCode + '-' + retailercodes.retailerName : 
    retailercodes.retailerCode + '-' + retailercodes.retailerNameInLocal,
  };

  const soldToNo = JSON.parse(localStorage.userData).soldTo[0];


 

  const months =
    "January|February|March|April|May|June|July|August|September|October|November|December"
      .split("|")
      .map((i) => ({ id: i, name: i }));

  const years = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((i) => ({
    id: yr + i,
    name: yr + i,
  }));





  const [companies, setCompanies] = useState();
  const [company, setCompany] = useState();

  const [month, setMonth] = useState();
  // const [year, setYear] = useState();
  const year = props.selectedYear
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL_LOYALTY + "companyType", {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      },
    })
      .then((resp) => resp.json())
      .then((data) => setCompanies(mapper(data.data)))
      .catch();
  }, []);

  useEffect(() => { debugger
    fetch(
      process.env.REACT_APP_MASTER_API_URL + `/retailer/retailer/search?fromIndex=1&needInactive=${true}&soldToNumber=${soldToNo}&toIndex=100`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
          'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
        },
      })
      .then((resp) => resp.json())
      .then(({ data: { results } }) => {
        console.log('----', results);
        SetRetailerCodes(results);
        let _results = results
          .map(({ retailerCode }) => retailerCode)
          .filter((i) => i);
        // setTotal(_results.length);
        console.log("_results", _results);
        return _results;
      })
  }, [])
  function inputSearch(e) {
    props.searchValue(e);
  }

  console.log(props.selectedMonth, 'selectedMonth----')

  // useEffect(() => {
  //   if (month && year && company && retailer) {
  //     props.setter({ month, year, company,retailer});
  //   }
  // }, [month, year, company,retailer]);

  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);

  const style = {
    border: '0px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
    marginTop: '40px',
    backgroundColor: 'transparent',
    fontSize: `${FontChange}px`
  };
  return (
    <>
      <div className="row">
        <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div className="form_section">
            <div className="inputBox">
              <FormSelectbox
                name="month"
                class="input"
                defaultValue={props.selectedMonth}                
                onSelectChange={props.onMonthSlect}
                label={t("Month")}
                data={months || "data"}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div className="form_section">
            <div className="inputBox">
              <FormSelectbox
                name="year"
                class="input"
                defaultValue={JSON.stringify(props.currentYear)}
                onSelectChange={props.onYearSlect}
                label={t("Year")}
                data={years || "data"}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12">
          <div className="form_section">
            <div className="inputBox">
              <FormSelectbox
                name="company"
                class="input"
                defaultValue={props.selectedCompany}
                onSelectChange={props.onCompanySlect}
                label={t("label.company")}
                data={companies || "data"}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: '16px' }} className='col-xl-4 col-lg-10 col-md-9 col-sm-9 col-xs-12 mb-2'>
        <Autocomplete          
            {...defaultProps}
            loading
            id="tags-outlined"
            noOptionsText={t('lable.norecordfound')}
           value={props.selectedRetailerDefault || null}
            onChange={props.onChangeRetailer}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} variant="outlined" placeholder={t('Select Retailer')} />
            )}
          />
           
          {/* <Autocomplete
            {...defaultProps}
            id='select-ship-to'
            noOptionsText={t('lable.norecordfound')}
            value={props.selectedRetailer || null}
            onChange={props.onChangeRetailer}

            style={{ width: 400 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('Select Retailer')}
                variant='outlined'
              />
            )}
          /> */}
        </div>
        <div style={{ marginTop: '2px' }}  className="col-xl-2 col-lg-2 col-md-3 col-sm-3 col-xs-12 mb-2 text-right">
          <button style={style} onClick={props.clearAll}>
            {t('selectshipment.clearall')}
          </button>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(AllocateVolumeHistoryHeader);
