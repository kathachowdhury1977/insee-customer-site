import React, { useState, useEffect } from "react";
import "./Timepicker.scss";

function Timepicker(props) {

  const date =  new Date();
  const onGoingHour = date.getHours();
  const onGoingMinut = date.getMinutes();
  const today = new Date().toISOString().slice(0, 10);
  let selectedDate = props.selectedDate;

  let currentSelectedTime = String(props.defaultTime).split(":");
  let currentHour = 0;
  let currentMinut = 0;
  const [hours, setHours] = useState(
    currentHour < 10 ? `0` + currentHour : currentHour
  );
  const [minut, setMinut] = useState(
    currentMinut < 10 ? `0` + currentMinut : currentMinut
  );
  const [updatetime, setUpdatetime] = useState(false);

  let minutsArray = [];
  for (let m = 0; m < 60; m++) {
    minutsArray.push(m);
  }
  minutsArray = [
    ...minutsArray.filter((value) => value === currentMinut),
    ...minutsArray.filter((value) => value !== currentMinut),
  ];

  let hoursArray = [];
  for (let h = 0; h < 24; h++) {
    hoursArray.push(h);
  }
  hoursArray = [
    ...hoursArray.filter((value) => value === currentHour),
    ...hoursArray.filter((value) => value !==currentHour),
  ];

  const selectMinut = (event) => {
    setMinut(event.target.value);
    setUpdatetime(true);
  };
  const selectHour = (event) => {
    setUpdatetime(true);
    setHours(event.target.value);
  };

  useEffect(() => {
    console.log("props.defaultTime", props.defaultTime, hours, minut);
    let updateHour =
      hours === "00"
        ? props.defaultTime && props.defaultTime.split(":")[0]
        : hours
        ? hours
        : "00";
    let updateminut =
      minut === "00"
        ? props.defaultTime && props.defaultTime.split(":")[1]
        : minut
        ? minut
        : "00";

    let updateHourFinal = updateHour === undefined ? "00" : updateHour;
    let updateminutFinal = updateminut === undefined ? "00" : updateminut;
    if (updatetime) {
      props.setExpectedArrivalTime(updateHourFinal + ":" + updateminutFinal);
    } else {
      props.setExpectedArrivalTime(props.defaultTime);
    }
  }, [hours, minut]);

  
  const isHoursDisabled = (value) => {
    return selectedDate === today && value < onGoingHour ? true : false;
  };

  const isMinutesDisabled = (value) => { 
    return (selectedDate === today && +hours === +onGoingHour) ? value < onGoingMinut ? true : false : false;
   }

  //  console.log('hello', hours, onGoingHour, minut, +hours === +onGoingHour);

  return (
    <>
      <div className="timepicker">
        {/*<i onClick={selectTimepicker} class="fa fa-clock-o"></i>*/}
        <select
          name="set_hours"
          className="input create-select"
          onChange={selectHour}
        >
          {hoursArray.map((value, index) => {
            if (value < 10) {
              if (
                currentSelectedTime[0] !== undefined &&
                currentSelectedTime[0] === `0` + value
              ) {
                return (
                  <option disabled={isHoursDisabled(value)} selected="selected" value={`0` + value}>
                    {`0` + value}
                  </option>
                );
              } else {
                return <option disabled={selectedDate === today && value < onGoingHour ? true : false} value={`0` + value}>{`0` + value}</option>;
              }
            } else {
              if (
                currentSelectedTime[0] !== undefined &&
                currentSelectedTime[0] === value
              ) {
                return (
                  <option disabled={selectedDate === today && value < onGoingHour ? true : false} selected="selected" value={value}>
                    {value}
                  </option>
                );
              } else {
                return <option disabled={selectedDate === today && value < onGoingHour ? true : false} value={value}>{value}</option>;
              }
            }
          })}
        </select>

        <select
          name="set_minut"
          className="input create-select"
          onChange={selectMinut}
        >
          {minutsArray.map((value, index) => {
            if (value < 10) {
              if (
                currentSelectedTime[1] !== undefined &&
                currentSelectedTime[1] === `0` + value
              ) {
                return (
                  <option disabled={isMinutesDisabled(value)} selected="selected" value={`0` + value}>
                    {`0` + value}
                  </option>
                );
              } else {
                return <option disabled={isMinutesDisabled(value)} value={`0` + value}>{`0` + value}</option>;
              }
            } else {
              if (
                currentSelectedTime[1] !== undefined &&
                currentSelectedTime[1] === value
              ) {
                return (
                  <option disabled={isMinutesDisabled(value)} selected="selected" value={value}>
                    {value}
                  </option>
                );
              } else {
                return <option disabled={isMinutesDisabled(value)} value={value}>{value}</option>;
              }
            }
          })}
        </select>
      </div>
    </>
  );
}
export default Timepicker;
