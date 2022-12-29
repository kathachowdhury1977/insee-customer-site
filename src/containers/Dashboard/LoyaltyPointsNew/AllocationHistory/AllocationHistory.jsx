import React, { useState, useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import SearchForm from "./SearchForm";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import Axios from "axios";
//import { process.env.REACT_APP_API_URL_LMS } from "../../../../constant";
import {
  convertToCurrencyFormat,
  convertToCurrencyFormatQuantaty,
} from "../../../../_helpers";
import DataGridProMUI from "../../../../components/DataGrid/DataGridProMUI";
import moment from "moment";

const onExportClick = () => {
  alert("file downloaded");
};

const AllocationHistory = () => {
  const [row, setRow] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [filteredRows, setFilteredRows] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const lancode = localStorage.getItem("lancode");
  const [filter, setFilter] = useState({
    company: "",
    billingMonth: new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      1
    ),
    billingYear: new Date(),
    subDealerNumber: "",
  });
  const { t } = useTranslation();

  const excelFormating = [];
  // heading of the exported file
  const ExpFilecolHeadings = [
    [
      "No.",
      "Company",
      "Billing Month",
      "Billing Year",
      "Sub Dealer Number",
      "Sub Dealer Name",
      "Allocated",
    ],
  ];
  // feilds which are required in the export file and order of the feilds
  const ExpFilecolKeys = [
    "no",
    "company",
    "billingMonth",
    "billingYear",
    "subDealerId",
    "subDealerName",
    "sumAllocated",
  ];

  const fetchAllocationHistory = function () {
    let customerId = localStorage.getItem("CustomerNumber");
    setShowLoading(true);
    Axios.get(
      `${
        process.env.REACT_APP_API_URL_LMS
      }loyalty/allocate-volume/history?customerId=${customerId}&startMonthYear=${
        filter.billingMonth
          ? moment(filter.billingMonth).format("MM-YYYY")
          : null
      }&endMonthYear=${
        filter.billingYear ? moment(filter.billingYear).format("MM-YYYY") : null
      }&company=${filter.company}&subDealer=${filter.subDealerNumber}`,
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
        setRow(
          (response?.data?.data || []).map((item, index) => ({
            ...item,
            no: index + 1,
          }))
        );
      })
      .catch((error) => {
        setShowLoading(false);
        console.log("Allocate History Error : ", error);
      });
  };

  useEffect(() => {
    fetchAllocationHistory();
  }, [
    filter.billingMonth,
    filter.billingYear,
    filter.company,
    filter.subDealerNumber,
  ]);

  // useEffect(() => {
  //   setFilteredRows([...row]);
  // }, [row]);

  // useEffect(() => {
  //   let rows = [...row];

  //   if (filter.company) {
  //     rows = rows.filter((item) => item.company === filter.company);
  //   }
  //   if (filter.billingMonth) {
  //     const month = filter.billingMonth.getMonth() + 1;
  //     const year = filter.billingMonth.getFullYear();

  //     rows = rows.filter(
  //       (item) =>
  //         Number(item.billingMonth) >= Number(month) &&
  //         Number(item.billingYear) >= Number(year)
  //     );
  //   }
  //   if (filter.billingYear) {
  //     const month = filter.billingYear.getMonth() + 1;
  //     const year = filter.billingYear.getFullYear();

  //     rows = rows.filter(
  //       (item) =>
  //         Number(item.billingMonth) <= Number(month) &&
  //         Number(item.billingYear) <= Number(year)
  //     );
  //   }

  //   if (filter.subDealerNumber) {
  //     rows = rows.filter(
  //       (item) =>
  //         String(item.subDealerId).trim() ===
  //         String(filter.subDealerNumber).trim()
  //     );
  //   }
  //   setFilteredRows([
  //     ...rows.map((item, index) => ({ ...item, no: index + 1 })),
  //   ]);
  // }, [filter, row]);

  const columns = [
    {
      field: "no",
      headerName: t("no"),
      headerAlign: "center",
      align: "center",
      width: 150,
    },
    {
      field: "company",
      headerName: t("company"),
      headerAlign: "center",
      align: "center",
      width: 180,
    },
    {
      field: "billingMonth",
      headerName: t("billingMonth"),
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <div>
            {row.billingMonth ? moment(row.billingMonth).format("MM") : ""}
          </div>
        );
      },
    },
    {
      field: "billingYear",
      headerName: t("billingYear"),
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <div>
            {row.billingYear ? moment(row.billingYear).format("YYYY") : ""}
          </div>
        );
      },
    },
    {
      field: "subDealerId",
      headerName: t("subDealerNumber"),
      headerAlign: "center",
      align: "center",
      width: 180,
    },
    {
      field: `${lancode === "en" ? "subDealerName" : "subDealerNameTH"}`,
      headerName: t("subDealerName"),
      headerAlign: "center",
      align: "left",
      width: 180,
    },
    {
      field: "manuallyAllocated",
      headerName: t("allocated"),
      align: "right",
      headerAlign: "center",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <div>{convertToCurrencyFormatQuantaty(row.manuallyAllocated)}</div>
        );
      },
    },
  ];
  const filteredQqtyRow = row.filter((row) => row.manuallyAllocated > 0);
  console.log("filteredQqtyRow : ", filteredQqtyRow);

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
            {t("Export")}
          </Button>
          <GridToolbarQuickFilter />
        </div>
      </GridToolbarContainer>
    );
  };

  const onFilterChange = (filterObj) => {
    setFilter({ ...filterObj });
  };

  return (
    <>
      <div>
        <SearchForm
          onFilterChange={onFilterChange}
          setOpenPopup={true}
          recordForEdit={null}
        />
      </div>
      <div style={{ marginTop: "13px" }}>
        <DataGridProMUI
          rows={row}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
          pageSize={pageSize}
          loading={showLoading}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
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
          ExportFileName={"AllocationHistory_"}
        />
      </div>
      <div
        id="footer"
        style={{
          backgroundColor: "red",
          color: "white",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h6>
          {t("Total")}{" "}
          {convertToCurrencyFormatQuantaty(
            filteredQqtyRow.reduce(
              (acc, item) => Number(acc) + Number(item?.manuallyAllocated || 0),
              0
            )
          )}
        </h6>
      </div>
    </>
  );
};

export default withTranslation()(AllocationHistory);
