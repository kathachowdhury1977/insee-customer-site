import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import moment from "moment";
import { withTranslation, useTranslation } from "react-i18next";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarQuickFilter,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import "./RedemptionHistory.scss";
import SearchForm from "./SearchForm";
import Axios from "axios";
//import { process.env.REACT_APP_API_URL_LMS } from "../../../../../constant";
import DataGridProMUI from "../../../../../components/DataGrid/DataGridProMUI";
import {
  convertToCurrencyFormat,
  convertToCurrencyFormatQuantaty,
  millisecondsToStringDate,
  DATE_FORMAT,
  handleZero,
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

const SubDealerReedemHistory = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [showLoading, setShowLoading] = useState(false);
  const [state, setState] = React.useState({
    message: "Deleted Successfully!!!!",
    severity: "success",
    open: false,
  });
  const [filteredRows, setFilteredRows] = useState([]);
  const [filter, setFilter] = useState({
    startDate: new Date().setFullYear(new Date().getFullYear() - 1),
    endDate: new Date(),
  });
  const excelFormating = [{ redemptionDate: "date" }];
  // heading of the exported file
  const ExpFilecolHeadings = [
    [
      "Redemption Order",
      "Redemption Date",
      "Product Name",
      "Quantity (Units)",
      "Points Redeemed",
    ],
  ];
  // feilds which are required in the export file and order of the feilds
  const ExpFilecolKeys = [
    "redemptionNumber",
    "redemptionDate",
    "productName",
    "quantity",
    "redeemedPoints",
  ];

  const columns = [
    {
      field: "redemptionNumber",
      headerName: t("label.redemption_order"),
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "redemptionDateString",
      headerName: t("label.redemption_date"),
      headerAlign: "center",
      width: 150,
      align: "center",
      // renderCell: (row) => {
      //   return <div>{moment(Number(row.value)).format("DD-MM-yyyy")}</div>;
      // },
    },
    {
      field: "productName",
      headerName: t("label.product_name"),
      headerAlign: "center",
      align: "left",
      width: 200,
    },
    {
      field: "quantity",
      headerName: t("label.quantity_units"),
      headerAlign: "center",
      align: "right",
      width: 150,
      renderCell: ({ row }) => {
        return <div>{convertToCurrencyFormatQuantaty(row.quantity)}</div>;
      },
    },
    {
      field: "redeemedPoints",
      headerName: t("label.points_redeemed"),
      headerAlign: "center",
      align: "right",
      width: 150,
      renderCell: ({ row }) => {
        return <div>{convertToCurrencyFormat(row.redeemedPoints)}</div>;
      },
    },
    {
      field: "deliveryStatusUrl",
      headerName: t("label.delivery_status"),
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <a
            href={`${process.env.REACT_APP_INSEE_LIFE_AWARD_TRACKING_URL}${row.redemptionNumber}/${row.accountNumber}/${row.productCode}
          `}
            target="_blank"
          >
            Click Link
          </a>
        );
      },
    },
  ];

  const fetchRedeemHistorySubdealer = function () {
    const customerId = localStorage.getItem("CustomerNumber");
    setShowLoading(true);
    Axios.get(
      // `${process.env.REACT_APP_API_URL_LMS}loyalty/redeem/history?accountNumber=1600002914&isDealer=true`,
      `${
        process.env.REACT_APP_API_URL_LMS
      }loyalty/redeemPoints/inquirePointBalance?accountNumber=${customerId}&needHistoryFlag=true&startDate=${
        filter.startDate ? moment(filter.startDate).format("DD-MM-YYYY") : null
      }&endDate=${
        filter.endDate ? moment(filter.endDate).format("DD-MM-YYYY") : null
      }`,
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
        setRows(
          (response?.data?.data?.redeemedPointsHistory || []).map((item) => ({
            ...item,
            redemptionDateString: millisecondsToStringDate(
              item.redemptionDate,
              DATE_FORMAT
            ),
          }))
        );
      })
      .catch((error) => {
        setShowLoading(false);
        console.log("Reedem History Error : ", error);
      });
  };

  useEffect(() => {
    fetchRedeemHistorySubdealer();
  }, [filter.startDate, filter.endDate]);

  // useEffect(() => {
  //   setFilteredRows([...rows]);
  // }, [rows]);

  const onFilterChange = (filterObj) => {
    console.log("filterObj", filterObj);
    setFilter({ ...filterObj });
  };

  // useEffect(() => {
  //   let row = [...rows];

  //   if (filter.startDate) {
  //     row = row.filter((item) => {
  //       return (
  //         Number(item.redemptionDate) >=
  //         new Date(filter.startDate).setDate(
  //           new Date(filter.startDate).getDate() - 1
  //         )
  //       );
  //     });
  //   }
  //   if (filter.endDate) {
  //     row = row.filter((item) => {
  //       return Number(item.redemptionDate) <= filter.endDate.getTime();
  //     });
  //   }

  //   setFilteredRows([...row]);
  // }, [filter]);

  return (
    <>
      <div>
        <SearchForm
          onFilterChange={onFilterChange}
          setOpenPopup={true}
          recordForEdit={null}
        />
      </div>
      <div className="DataGridContainer">
        <DataGridProMUI
          rows={rows}
          // rows={filteredRows}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[25, 50, 75, 100]}
          loading={showLoading}
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
          ExportFileName={"RedemptionHistory_"}
        />
      </div>
    </>
  );
};

export default withTranslation()(SubDealerReedemHistory);
