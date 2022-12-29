//import { process.env.REACT_APP_API_URL_LMS } from "../constant";
import Axios from "axios";
import moment from "moment";
// 0110000039
export function getMyPointsService(accountNumber) {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
      "X-SOLD-TO-ID": localStorage.getItem("CustomerNumber"),
    },
  };
  return Axios.get(
    process.env.REACT_APP_API_URL_LMS +
      "myPoints/points?accountNumber=" +
      accountNumber,
    requestOptions
  )
    .then((response) => response)
    .catch((error) => error);
}
export function getMyPointsGraphService(filterData, accountNumber) {
  let filterDates =
    filterData.startDate != null && filterData.endDate != null
      ? "&startDate=" +
        moment(filterData.startDate).format("DD-MM-yyyy") +
        "&endDate=" +
        moment(filterData.endDate).format("DD-MM-yyyy")
      : "";
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
      "X-SOLD-TO-ID": localStorage.getItem("CustomerNumber"),
    },
  };
  return Axios.get(
    process.env.REACT_APP_API_URL_LMS +
      "myPoints/monthWisePointsEarnedAndRedeemed?accountNumber=" +
      accountNumber +
      filterDates,
    requestOptions
  )
    .then((response) => response)
    .catch((error) => error);
}
