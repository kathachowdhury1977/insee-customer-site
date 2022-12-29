import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import FormSelectbox from "../FormSelectbox/FormSelectbox";
import InputSearch from "../InputSearch/InputSearch";
//import { process.env.REACT_APP_API_URL_LOYALTY } from "../../constant";
import { masterActions } from '../../_actions'

function mapper(objARr) {
  return objARr.map(({ key, value }) => ({ id: value, name: key }));
}

function AllocateVolumeHistoryHeader({values,setter,clearAll }) {
  const event = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const yr = new Date().getFullYear();

  const [dates, setDates] = useState();
  const [companies, setCompanies] = useState();

  const [company, setCompany] = useState();
  const [date, setDate] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const style = {
    border: '0px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
    marginTop: '40px',
    backgroundColor: 'transparent'
  };
  
  function inputSearch(e) {
    setSearchValue(e)
  }

  const months =
    "January|February|March|April|May|June|July|August|September|October|November|December"
      .split("|")
      .map((i) => ({ id: i, name: i }));

  const years = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((i) => ({
    id: yr + i,
    name: yr + i,
  }));

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL_LOYALTY + "dateMaster", {
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      },
    })
      .then((resp) => resp.json())
      .then((data) => setDates(mapper(data.data)))
      .catch();

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

  useEffect(() => {
    if (date && company || searchValue) {
      setter({ date, company,searchValue });
      values(date, company,searchValue);
    }
  }, [date,company,searchValue]);

  return (
    <>
      <div className="row">
        <div className="col-sm-3 col-md-3 col-lg-2">
          <div className="form_section">
            <div className="inputBox">
            {/* <FormSelectbox
                name="month"
                class="input"
                onSelectChange={(e) => setMonth(e)}
                label={t("Month")}
                data={months || "data"}
              /> */}
               <FormSelectbox
                name="businessegment"
                class="input"
                onSelectChange={(e) => setDate(e)}
                label={t("Date")}
                data={dates || "data"} 
              />
            </div>
          </div>
        </div>
        {/* <div className="col-sm-3 col-md-3 col-lg-2">
          <div className="form_section">
            <div className="inputBox">
              <FormSelectbox
                name="year"
                class="input"
                onSelectChange={(e) => setYear(e)}
                label={t("Year")}
                data={years || "data"}
              />
            </div>
          </div>
        </div> */}
        <div className="col-sm-3 col-md-3 col-lg-3">
          <div className="form_section">
            <div className="inputBox">
              <FormSelectbox
                name="businessegment"
                class="input"
                onSelectChange={(e) => setCompany(e)}
                label={t("Company")}
                data={companies || "data"}
              />
            </div>
          </div>
        </div>
        {/* <div className="col-sm-6 col-md-6 col-lg-4" style={{ top: '28px' }}>
          <InputSearch inputSearch={(e)=>inputSearch(e)}/>
        </div> */}
        <div className="col-sm-1 col-md-1 col-lg-1">
        <button style={style} onClick={clearAll}>
                  {t('selectshipment.clearall')}
          </button>
        </div>
      </div>
    </>
  );
}

export default withTranslation()(AllocateVolumeHistoryHeader);
