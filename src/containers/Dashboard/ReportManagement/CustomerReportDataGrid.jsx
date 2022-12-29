import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import DownloadIcon from "@mui/icons-material/Download";
import moment from "moment";
import Axios from 'axios';
//import { process.env.REACT_APP_API_URL_CONFIRMPAYMENT } from '../../../constant'
import ReportDataGrid from "../../../components/DataTable/ReportDataGrid";
import ExportPopup from '../../../components/exportPopup/ExportPopup';


function lastDateOfMonth(date) {
  var date = new Date(date);
  var y = date.getFullYear();
  var m = date.getMonth();
  var lastDay = new Date(y, m + 1, 0);
  return lastDay;
}

function format_date(d) {
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [day, month, year].join('-');
}

const CustomerReportDataGrid = ({ rows, filterState, setIsLoading }) => {
  const { t } = useTranslation();
  let userData = localStorage.getItem('userData')
  userData = JSON.parse(userData)
  let custmerNo = userData && userData.soldTo ? userData.soldTo[0] : 0;
  const [openExportPopup, setOpenExportPopup] = useState(null);
  // Export Excel
  const [exportState, setExportState] = useState({
    btnName: "EXPORT",
    linkToDownload: null,
  });

  const [rowData, setRowData] = useState([]);
  const [fName, setFName] = useState("")

  const formatRowData = () => { 
    const data = rows?.map(item =>{
      const formatYear = moment(item.createdDate).format("yyyy");
      // const formatMonth = moment(item.createdDate).format("MMMM");
      const formatMonth = item.createdDate;
      return {...item, year: formatYear, month: formatMonth}
    })
    setRowData(data);
   }

  useEffect(() => {
    formatRowData();
  }, [rows]);
  
  var monthNames = [
    { key: "January", value: "มกราคม" },
    { key: "February", value: "กุมภาพันธ์" },
    { key: "March", value: "มีนาคม" },
    { key: "April", value: "เมษายน" },
    { key: "May", value: "พฤษภาคม" },
    { key: "June", value: "มิถุนายน" },
    { key: "July", value: "กรกฎาคม" },
    { key: "August", value: "สิงหาคม" },
    { key: "September", value: "กันยายน" },
    { key: "October", value: "ตุลาคม" },
    { key: "November", value: "พฤศจิกายน" },
    { key: "December", value: "ธันวาคม" }];

  function division() {
    let divType = "cement";
    if (filterState.company === "SCCO") {
      divType = "concrete"
    }
    if (filterState.company === "Conwood") {
      divType = "conwood"
    }
    return divType
  }

  const sortYear = (date) => { 
    let year = moment(date).format("yyyy");
    const intdate = parseInt(year)
    return intdate;
   }

   const sortMonth = (month) => { 
        const mnt = monthNames.find((item) => item.key === month)
        const langCode = localStorage.getItem("lancode")
        return langCode === "th" ? mnt.value : month;
    }

  const columns = [
    {
      field: "download",
      headerName: t("label.DownloadCustomerStatement"),
      headerAlign: "center",
      align: 'center',
      width: 250,
      renderCell: ({ row }) => {
        return (
          <DownloadIcon
            className="cursorPointer"
            onClick={(event) => {
              downLoadInvoice(moment(row.createdDate).format("DD-MM-YYYY"))
            }}
          />
        );
      },
      sortable: false
    },
    {
      field: "year",
      headerName: t("label.year"),
      headerAlign: "center",
      align: 'center',
      width: 150,
      sortable: true,
      type: "date",
      renderCell: ({ row }) => {
        return <div>{sortYear(row.createdDate)}</div>;
      },
    },
    {
      field: "month",
      headerName: t("label.month"),
      headerAlign: "center",
      align: 'center',
      width: 150,
      sortable: true,
      // type: "date",
      // sort: 'desc',
      renderCell: ({ row }) => {
        return <div>{sortMonth(moment(row.month).format("MMMM"))}</div>;
        // return <div>{sortMonth(row.month)}</div>;
      },
    },
    {
      field: "createdDate",
      headerName: t("End Date of Month"),
      headerAlign: "center",
      align: 'center',
      width: 250,
      renderCell: ({ row }) => {
        return <div>{format_date(lastDateOfMonth(row.createdDate))}</div>;
      },
    },

  ];

  const downLoadInvoice = (date) => {
    setExportState({ btnName: "Exporting..." });
    setIsLoading(true)
    var getData = moment(date, 'DD-MM-YYYY')
    var day = getData.format('DD');
    var month = getData.format('MM');
    var year = getData.format('YYYY')
    setFName(`Customer_Statement_${filterState.company}_${month+year}`)
    let newUrl = `customercode=${custmerNo}&division=${division()}&date=${year + month}`

    Axios({
      method: "GET", url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT + `/reports/downloadCustomerStatementThDms?${newUrl}`,
      responseType: 'arraybuffer', headers: {
        "Content-Type": "application/json",
        'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
        'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
      }
    })
      .then(async (response) => {
        setIsLoading(false)
        setOpenExportPopup(true);
        setExportState({ btnName: "EXPORT", linkToDownload: response.data });
      }).catch((err) => {
        setIsLoading(false)
        setExportState({ btnName: "EXPORT" });
      })
  }

  return (
    <>
      <ExportPopup
        title={t("report.customerStatement")}
        fileName={fName}
        openPopup={openExportPopup}
        setOpenExportPopup={setOpenExportPopup}
        linkToDownload={exportState.linkToDownload}
      />

      <ReportDataGrid
        rows={rowData}
        columns={columns}
      />
    </>
  )
}

export default withTranslation()(CustomerReportDataGrid);