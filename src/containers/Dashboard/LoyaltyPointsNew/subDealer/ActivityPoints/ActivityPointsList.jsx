import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import moment from "moment";
import { withTranslation, useTranslation } from "react-i18next";
import { RenderCellExpand } from "../../../../../components/Datagridtooltip/DataGridToolTip";
import "./ActivityPoints.scss";
// re commit
import SearchForm from "./SearchForm";
import Axios from "axios";
//import { process.env.REACT_APP_API_URL_LMS } from "../../../../../constant";

import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarQuickFilter,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import DataGridProMUI from "../../../../../components/DataGrid/DataGridProMUI";
import {
  convertToCurrencyFormat,
  convertToCurrencyFormatQuantaty,
  millisecondsToStringDate,
  DATE_FORMAT,
  DataFormat,
} from "../../../../../_helpers";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <div className="ExportAndSearchContainer">
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={onExportClick}
          style={{ border: "0px" }}
        >
          Export
        </Button>
        <GridToolbarQuickFilter />
      </div>
    </GridToolbarContainer>
  );
};

const onExportClick = () => {
  console.log("Inside Export Click");
};

const SubDealerActivityPoint = () => {
  const { t } = useTranslation();
  const lancode = localStorage.getItem("lancode");
  const [row, setRow] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [filteredRows, setFilteredRows] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [filteredValues, setFilteredValues] = useState({
    startDate: moment().subtract(1, "months"),
    endDate: new Date(),
    activityType: null,
  });
  const [newMinDate, setNewMinDate] = useState(null);
  const [state, setState] = React.useState({
    message: "Deleted Successfully!!!!",
    severity: "success",
    open: false,
  });
  const excelFormating = [{ expireDate: "date" }, { createDate: "date" }];
  // heading of the exported file
  const ExpFilecolHeadings = [
    [
      "Activity Type",
      "Dealer Number",
      "Dealer Name",
      "Billing Number",
      "Billing Date",
      "Create Date",
      "Product Number",
      "Product Name",
      "Quantity",
      "Points Received",
      "Expiration Date",
      "Remarks",
    ],
  ];
  // feilds which are required in the export file and order of the feilds
  const ExpFilecolKeys = [
    "activityType",
    "accountNumber",
    "accountName",
    "billingn",
    "billDate",
    "createDate",
    "productNu",
    "productName",
    "quantity",
    "totalPoints",
    "expireDate",
    "remarks",
  ];

  const columns = [
    {
      field: "activityType",
      headerName: t("label.activity_type"),
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "accountNumber",
      headerName: t("label.dealernumber"),
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "accountName",
      headerName: t("dealername.label"),
      headerAlign: "center",
      align: "left",
      width: 200,
      renderCell: RenderCellExpand,
    },
    {
      field: "billingNumber",
      headerName: t("label.billing_no"),
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "billingDateStr",
      headerName: t("label.billing_date"),
      headerAlign: "center",
      align: "center",
      width: 150,
      // renderCell: ({ row }) => {
      //   return (
      //     <div>
      //       {row.billingDate
      //         ? moment(row.billingDate).format("DD-MM-yyyy")
      //         : null}
      //     </div>
      //   );
      // },
    },
    {
      field: "createDateString",
      headerName: t("label.create_date"),
      headerAlign: "center",
      align: "center",
      width: 150,
      // renderCell: ({ row }) => {
      //   return (
      //     <div>
      //       {row.createDate
      //         ? moment(row.createDate).format("DD-MM-YYYY")
      //         : null}
      //     </div>
      //   );
      // },
    },
    {
      field: "productCode",
      headerName: t("label.product_number"),
      align: "center",
      headerAlign: "center",
      width: 150,
      renderCell: ({ row }) => {
        return <div>{DataFormat(row.productCode)}</div>;
      },
    },
    {
      field: "productCodeTranslate",
      headerName: t("label.product_name"),
      headerAlign: "center",
      align: "left",
      width: 150,
      renderCell: RenderCellExpand,
    },
    {
      field: "quantity",
      headerName: t("label.quantity_units"),
      headerAlign: "center",
      align: "right",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <div>
            {row.activityType === "Point Deduction" ||
            row.activityType === "Bonus"
              ? ""
              : convertToCurrencyFormatQuantaty(row.quantity)}
          </div>
        );
      },
    },
    {
      field: "totalPoints",
      headerName: t("label.point_recieved"),
      headerAlign: "center",
      align: "right",
      width: 150,
      renderCell: ({ row }) => {
        return <div>{convertToCurrencyFormat(row.totalPoints)}</div>;
      },
    },
    {
      field: "expireDateString",
      headerName: t("label.expiration_date"),
      headerAlign: "center",
      align: "center",
      width: 150,
      // renderCell: ({ row }) => {
      //   return <div>{moment(row.createDate).format("DD-MM-yyyy")}</div>;
      // },
    },
    {
      field: "remarks",
      headerName: t("Remarks"),
      headerAlign: "center",
      align: "left",
      width: 150,
      renderCell: RenderCellExpand,
    },
  ];

  const fetchActivityHistorySubDealer = function () {
    setShowLoading(true);
    let customerId = localStorage.getItem("CustomerNumber");
    Axios.get(
      // `${
      //   process.env.REACT_APP_API_URL_LMS
      // }loyalty/activityHistory?accountNumber=${"110005870"}&isDealer=true`,
      `${
        process.env.REACT_APP_API_URL_LMS
      }loyalty/activityHistory?accountNumber=${customerId}&isDealer=false&startDate=${moment(
        filteredValues.startDate
      ).format("DD-MM-YYYY")}&endDate=${moment(filteredValues.endDate).format(
        "DD-MM-YYYY"
      )}&activityType=${filteredValues.activityType}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
          "X-SOLD-TO-ID": localStorage.getItem("CustomerNumber"),
        },
      }
    )
      .then((response) => {
        setShowLoading(false);
        const responseRow = (response?.data?.data || []).map((item, index) => ({
          ...item,
          id: index + 1,
          createDateString: millisecondsToStringDate(
            item.createDate,
            DATE_FORMAT
          ),
          billingDateStr: millisecondsToStringDate(
            item.billingDate,
            DATE_FORMAT
          ),
          expireDateString: millisecondsToStringDate(
            item.expireDate,
            DATE_FORMAT
          ),
          productCodeTranslate:
            lancode === "en" ? item.productNameEN : item.productName,
        }));
        setRow(responseRow);
      })
      .catch((error) => {
        setShowLoading(false);
        console.log("Activity History Error : ", error);
      });
  };

  useEffect(() => {
    fetchActivityHistorySubDealer();
  }, [
    filteredValues.startDate,
    filteredValues.endDate,
    filteredValues.activityType,
  ]);

  useEffect(() => {
    setRow(
      (row || []).map((item) => ({
        ...item,
        productCodeTranslate:
          lancode === "en" ? item.productNameEN : item.productName,
      }))
    );
  }, [lancode]);

  // useEffect(() => {
  //   let rows = [...row];
  //   if (filteredValues?.activityType) {
  //     rows = rows.filter(
  //       (item) => item.activityType === filteredValues.activityType
  //     );
  //   }

  //   if (filteredValues?.startDate) {
  //     rows = rows.filter((item) => {
  //       return (
  //         new Date(item.createDate).getTime() >=
  //         new Date(filteredValues.startDate).getTime() - 10000000
  //       );
  //     });
  //   }
  //   if (filteredValues?.endDate) {
  //     rows = rows.filter((item) => {
  //       return (
  //         new Date(item.createDate).getTime() <=
  //         new Date(filteredValues.endDate).getTime() + 10000000
  //       );
  //     });
  //   }

  // useEffect(() => {
  //   setFilteredRows([...row]);
  // }, [row]);

  const onFilterChange = (filterObj) => {
    setFilteredValues({ ...filterObj });
  };

  return (
    <>
      <div>
        <SearchForm
          setOpenPopup={true}
          recordForEdit={null}
          onFilterChange={onFilterChange}
          minDate={newMinDate === 0 ? null : newMinDate}
        />
      </div>
      <div className="DataGridContainer">
        <DataGridProMUI
          rows={row}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
          pageSize={pageSize}
          loading={showLoading}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[25, 50, 75, 100]}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          ExpFilecolHeadings={ExpFilecolHeadings}
          ExpFilecolKeys={ExpFilecolKeys}
          ExportDateFormatIndexes={[]}
          excelFormating={excelFormating}
          ExportFileName={"ActivityPoints"}
        />
      </div>
    </>
  );
};

export default withTranslation()(SubDealerActivityPoint);
