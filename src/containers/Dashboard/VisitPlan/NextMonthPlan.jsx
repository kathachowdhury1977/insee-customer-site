import React, {useState} from "react";
import Header from "../../../components/Header/Header";
import { withTranslation, useTranslation } from "react-i18next";
import DateRangePickerCalendarExample from '../../../components/CalenderView/MonthCalender';
import Tabing from '../../../components/Tabs/Tabs';
import DatePicker from "react-horizontal-datepicker";
import NextMonthPopup from '../../../components/ModalPopup/NextMonthPopup';
import NextMonthProgressPopup from '../../../components/ModalPopup/NextMonthProgressPopup';

function NextMonthPlan(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { t } = useTranslation();
  const selectedDay = (val) => {
    console.log(val);
  };
  return (
    <>
    <div className="content-wrapper">
      <Header />
      <div className="next_month_plan_section mt-3">
        <div className="col-12">
         <div className="container_fluid">
 
            <div className="calender_view">
              <div className="horizotal_calender">
              <span className="month">December</span>
              <span className="year">2020</span>
              <span className="weeks">
                <select>
                  <option value="week1">Week1</option>
                  <option value="week2">Week2</option>
                  <option value="week3">Week3</option>
                  <option value="week4">Week4</option>
                </select>
              </span>
              </div>
              <div className="calender">
                  <DatePicker
                  getSelectedDay={selectedDay}
                  labelFormat={"MMMM"}
                  color={"#003d7d"}
                />
              </div>
            
               {/* <DateRangePickerCalendarExample/> */}
            </div>

            <div className="allplans_details">
              <Tabing/>
            </div>

           <div className="col-12 text-center pb-3">
             <button className="plan_submit" onClick={handleShow}>Submit Plan</button>
             </div> 
         </div>
         </div>
      </div>
      </div>
      <NextMonthPopup show ={"true"} handleClose = {handleClose}/>
      <NextMonthProgressPopup show ={"true"} handleClose = {handleClose}/>
    </>
  );
}

export default withTranslation()(NextMonthPlan);
