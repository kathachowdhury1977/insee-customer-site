import React, { useState, useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { RenderCellExpand } from "../../../../components/DataGridTooltip/DataGridToolTip";
import { Grid, Button, TextField } from "@mui/material";
import DataGridProMUI from "../../../../components/DataGrid/DataGridProMUI";
import Alert from "@mui/material/Alert";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Axios from "axios";

import SearchForm from "./SearchForm";
//import { process.env.REACT_APP_API_URL_LMS, process.env.REACT_APP_MASTER_API_URL } from "../../../../constant";
import {
  convertToCurrencyFormat,
  convertToCurrencyFormatQuantaty,
  millisecondsToStringDate,
  DATE_FORMAT,
  DataFormat,
} from "../../../../_helpers";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1000px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const getRows = () => [
  {
    id: "04fd22c1-c80b-43b9-b724-419049608215",
    company: null,
    customerId: "0110000001",
    customerName: "CHAIWATTANA MATERIALS CO., LTD.",
    subDealerId: "160000294",
    subDealerName: "Sandeep",
    billingMonth: "09-2022",
    productCode: "sccc",
    productName: "cement",
    billingQty: Number(0).toFixed(3),
    remainingQty: Number(78).toFixed(3),
    autoAllocated: Number(0).toFixed(3),
    productNumber: "123",
    manuallyAllocated: Number(0).toFixed(3),
    sumAllocated: Number(78).toFixed(3),
    expirationDate: "10-11-2023",
    selectedQuantity: Number(18).toFixed(3),
    manualAllocatedQuantity: Number(0).toFixed(3),
    pointsReceived: Number(144).toFixed(2),
    activityType: null,
    expirationPoints: Number(0).toFixed(2),
    salesOrg: "1000",
    materialGroup1: "S2",
    materialPricingGroup: null,
    billingNumber: null,
    billingType: "ZHDF",
    referenceDocumentNumber: null,
    division: null,
    billingYear: null,
    distributionChannel: "AVG1",
    itemCategory: "FG",
    isAdminModified: null,
    isMarkDelete: null,
    createdBy: null,
    creationDate: 1662466396337,
    lastModifiedBy: null,
    lastModifiedDate: 1662466396337,
    autoAllocation: false,
    subDealerAllotPoints: 20,
  },
];

const getModalColumns = ({ t }) => {
  return [
    {
      field: "billingDate",
      headerName: t("billingMonth"),
      headerAlign: "center",
      align: "center",
      width: 180,
      renderCell: ({ row }) => {
        return (
          <div>
            {row.billingDate ? moment(row.billingDate).format("MM-YYYY") : ""}
          </div>
        );
      },
    },
    {
      field: "productCode",
      headerName: t("productNumber"),
      headerAlign: "center",
      align: "center",
      width: 180,
      renderCell: ({ row }) => {
        return <div>{DataFormat(row.productCode)}</div>;
      },
    },
    {
      field: "productCodeTranslate",
      headerName: t("productName"),
      headerAlign: "center",
      align: "left",
      width: 180,
      renderCell: RenderCellExpand,
    },
    {
      field: "selectedQuantity",
      headerName: t("qqty"),
      headerAlign: "center",
      type: "number",
      align: "right",
      width: 180,
      renderCell: ({ row }) => {
        return (
          <div>{convertToCurrencyFormatQuantaty(row.selectedQuantity)}</div>
        );
      },
    },
    {
      field: "pointsReceived",
      headerName: t("pointsReceived"),
      headerAlign: "center",
      align: "right",
      width: 180,
      renderCell: ({ row }) => {
        return (
          <div>
            {convertToCurrencyFormat(
              row.selectedQuantity * row.subDealerAllotPoints
            )}
          </div>
        );
      },
    },
  ];
};

const AllocationVolume = ({ open, setOpen }) => {
  const lancode = localStorage.getItem("lancode");
  const [filterValues, setFilterValues] = useState({});
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [subDealerData, setSubDealerData] = useState([]);
  const [editedRows, setEditedRows] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [showLoading, setShowLoading] = useState(false);
  const [filter, setFilter] = useState({
    company: "SCCC",
    monthAndYear: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    // billingMonth: new Date(),
    subDealer: null,
  });
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const filteredQqtyRow = rows.filter((row) => row.selectedQuantity > 0);
  console.log("filteredQqtyRow : ", filteredQqtyRow);
  // const filteredQqtyRow = rows.filter((row) => (row.selectedQuantity = 0));

  const { t } = useTranslation();

  useEffect(() => {
    setRows(
      (rows || []).map((item) => ({
        ...item,
        productCodeTranslate:
          lancode === "en" ? item.productNameEN : item.productName,
      }))
    );
  }, [lancode]);

  const RenderCell = ({ params }) => {
    const [value, setValue] = useState(Number(params.value).toFixed(3) || "");
    const showError = value > Number(params.row["remainingQty"]);

    const handleManualAllocationQty = () => {
      const row = (rows || []).find((item) => item.id === params.id);
      row[params.field] = value;

      const newRows = (rows || []).map((item) => {
        return row.id === item.id ? row : item;
      });

      setRows(newRows);
    };

    return (
      <div>
        <TextField
          label=""
          inputProps={{ min: 0 }}
          variant="standard"
          id="outlined-size-small"
          size="small"
          margin="dense"
          type="number"
          error={showError}
          helperText={showError ? t("error.allocateVolumneQty") : ""}
          value={value}
          onChange={(e) => {
            setValue(Number(e.target.value) >= 0 ? e.target.value : 0);
          }}
          onBlur={handleManualAllocationQty}
        />
      </div>
    );
  };

  const getColumns = ({ t, isSubDealerSet }) => [
    ...[
      {
        field: "billingDate",
        headerName: t("billingMonth"),
        headerAlign: "center",
        align: "center",
        width: 180,
        renderCell: ({ row }) => {
          return (
            <div>
              {row.billingDate ? moment(row.billingDate).format("MM-YYYY") : ""}
            </div>
          );
        },
      },
      {
        field: "productCode",
        headerName: t("productNumber"),
        headerAlign: "center",
        align: "center",
        width: 180,
        renderCell: ({ row }) => {
          return <div>{DataFormat(row.productCode)}</div>;
        },
      },
      {
        field: "productCodeTranslate",
        headerName: t("productName"),
        headerAlign: "center",
        align: "left",
        width: 180,
        renderCell: RenderCellExpand,
      },
      {
        field: "billingQty",
        headerName: t("billingQty"),
        headerAlign: "center",
        align: "right",
        width: 180,
        renderCell: ({ row }) => {
          return <div>{convertToCurrencyFormatQuantaty(row.billingQty)}</div>;
        },
      },
      {
        field: "remainingQty",
        headerName: t("remainingQty"),
        headerAlign: "center",
        align: "right",
        width: 180,
        renderCell: ({ row }) => {
          return <div>{convertToCurrencyFormatQuantaty(row.remainingQty)}</div>;
        },
      },
      {
        field: "autoAllocated",
        headerName: t("autoAllocated"),
        align: "right",
        headerAlign: "center",
        width: 180,
        renderCell: ({ row }) => {
          return (
            <div>{convertToCurrencyFormatQuantaty(row.autoAllocated)}</div>
          );
        },
      },
      {
        field: "manuallyAllocated",
        headerName: t("manualAllocated"),
        align: "right",
        headerAlign: "center",
        width: 180,
        renderCell: ({ row }) => {
          return (
            <div>{convertToCurrencyFormatQuantaty(row.manuallyAllocated)}</div>
          );
        },
      },
      {
        field: "sumAllocated",
        headerName: t("sumAllocated"),
        align: "right",
        headerAlign: "center",
        width: 180,
        renderCell: ({ row }) => {
          return <div>{convertToCurrencyFormatQuantaty(row.sumAllocated)}</div>;
        },
      },
    ],

    ...(isSubDealerSet
      ? [
          {
            field: "pointsReceived",
            headerName: t("pointsReceived"),
            headerAlign: "center",
            align: "right",
            width: 180,
            renderCell: ({ row }) => {
              return (
                <div>
                  {convertToCurrencyFormat(
                    row.selectedQuantity * row.subDealerAllotPoints
                  )}
                </div>
              );
            },
          },
          {
            field: "selectedQuantity",
            width: 250,
            headerName: t("qqty"),
            headerAlign: "center",
            type: "number",
            align: "right",
            renderCell: (params) => <RenderCell params={params} />,
          },
        ]
      : []),

    ...[
      {
        field: "expirationDateString",
        headerName: t("expirationDate"),
        align: "center",
        headerAlign: "center",
        width: 180,
      },
    ],
  ];

  const columns = getColumns({ t, isSubDealerSet: !!filter.subDealer });

  const fetchAllocationVolume = function () {
    let lancode = localStorage.getItem("lancode");
    let customerId = localStorage.getItem("CustomerNumber");
    setShowLoading(true);
    Axios.get(
      `${
        process.env.REACT_APP_API_URL_LMS
      }allocateVolume?customerId=${customerId}&monthYear=${moment(
        filter.monthAndYear
      ).format("MM-YYYY")}&company=${filter.company}`,
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
          (response?.data?.data || []).map((item) => ({
            ...item,
            selectedQuantity: 0,
            productCodeTranslate:
              lancode === "en" ? item.productNameEN : item.productName,
            expirationDateString: millisecondsToStringDate(
              item.expirationDate,
              DATE_FORMAT
            ),
          }))
        );
      })
      .catch((error) => {
        setShowLoading(false);
        setRows(getRows());
        console.log("Allocate Volume Error : ", error);
      });
  };

  useEffect(() => {
    fetchAllocationVolume();
  }, [filter.monthAndYear, filter.company]);

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <div className="ExportAndSearchContainer">
          <GridToolbarQuickFilter />
        </div>
      </GridToolbarContainer>
    );
  };

  const handleClose = () => {
    setShowLoading(false);
    fetchAllocationVolume();
    setShow(false);
    setConfirm(null);
  };

  const handleClick = () => {
    setShow(true);
  };

  const handleReset = () => {
    setRows(
      (rows || []).map((item) => ({
        ...item,
        selectedQuantity: 0,
      }))
    );
  };

  const handleConfirm = () => {
    const userStr = localStorage.getItem("userData");
    const userObj = JSON.parse(userStr);
    const userId = userObj?.userId;
    // setShowLoading(true);
    const [subDealerId, subDealerName] = filter.subDealer.split("-");
    Axios.post(
      `${process.env.REACT_APP_API_URL_LMS}allocateVolume`,
      filteredQqtyRow.map((item, index) => {
        return {
          id: item.id,
          company: item.company,
          customerId: item.customerId,
          customerName: item.customerName,
          subDealerId,
          subDealerName,
          billingMonth: item.billingMonth,
          productCode: item.productCode,
          productName: item.productCodeTranslate,
          billingQty: item.billingQty,
          remainingQty: item.remainingQty,
          autoAllocated: item.autoAllocated,
          manuallyAllocated: item.manuallyAllocated,
          sumAllocated: item.sumAllocated,
          expirationDate: item.expirationDate,
          selectedQuantity: item.selectedQuantity,
          manualAllocatedQuantity: item.manualAllocatedQuantity,
          pointsReceived: item.selectedQuantity * item.subDealerAllotPoints,
          expirationPoints: item.expirationPoints,
          salesOrg: item.salesOrg,
          materialGroup1: item.materialGroup1,
          materialPricingGroup: item.materialPricingGroup,
          billingNumber: item.billingNumber,
          modifiedOn: item.modifiedOn,
          createdOn: item.createdOn,
          modifiedBy: item.modifiedBy,
          Quantity: item.Quantity,
          billingType: item.billingType,
          distributionChannel: item.distributionChannel,
          itemCategory: item.itemCategory,
          isAutoAllocation: item.autoAllocation,
          isMarkDelete: item.isMarkDelete,
          activityType: item.activityType,
          billingDate: item.billingDate,
          subDealerAllotPoints: item.subDealerAllotPoints,
          billingmonthyear: item.billingmonthyear,
          division: item.division,
          isAdminModified: false,
          createdBy: userId,
        };
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
          "X-SOLD-TO-ID": localStorage.getItem("CustomerNumber"),
        },
      }
    )
      .then((response) => {
        // setShowLoading(false);
        if (response.data.message && response.data.message === "Success") {
          setConfirm(response);
        }
      })
      .catch((error) => {
        // setShowLoading(false);
        console.log("Allocate Volume Error : ", error);
      });
  };

  const onFilterChange = (filterObj) => {
    setFilter({ ...filterObj });
  };

  console.log("FIltered Rows : ", filteredRows);
  return (
    <>
      <div>
        <SearchForm
          setOpenPopup={true}
          recordForEdit={null}
          onFilterChange={onFilterChange}
        />
      </div>
      <div className="DataGridContainer">
        <DataGridProMUI
          rows={rows}
          columns={columns}
          shouldShowExportButton={false}
          loading={showLoading}
          components={{
            Toolbar: CustomToolbar,
          }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
        {!!filter?.subDealer && (
          <Grid container sx={{ marginTop: "9px", textAlign: "right" }}>
            <Grid item xs={12} md={12}>
              <Button
                sx={{ marginRight: "16px" }}
                variant="contained"
                onClick={handleClick}
                disabled={rows.some(
                  (row) => row.remainingQty < row.selectedQuantity
                )}
              >
                {t("submitAll")}
              </Button>
              <Button onClick={handleReset} variant="outlined">
                {t("reset")}
              </Button>
            </Grid>
          </Grid>
        )}
      </div>
      {show && (
        <Modal open={show} onClose={handleClose} sx={{ zIndex: 999 }}>
          <Box sx={style}>
            <div>
              <h5>{t("headerText")}</h5>
            </div>
            <div>
              {confirm && confirm.data.message ? (
                <div className="AlertMsg">
                  <Alert
                    action={
                      <Button
                        color="inherit"
                        size="small"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                    }
                  >
                    {confirm.data.message}
                  </Alert>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <DataGridProMUI
                rows={filteredQqtyRow}
                columns={getModalColumns({ t })}
                shouldShowExportButton={false}
                // loading={showLoading}
                components={{
                  Toolbar: CustomToolbar,
                }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
              />
            </div>
            <Grid container sx={{ marginTop: "20px", textAlign: "right" }}>
              <Grid item xs={12} md={12}>
                <Button
                  sx={{ marginRight: "16px" }}
                  variant="contained"
                  onClick={handleConfirm}
                  disabled={confirm ? true : false}
                >
                  {t("confirm")}
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  {t("cancel.button")}
                </Button>
              </Grid>
            </Grid>
            <div>
              <h5>
                {t("footerText1")} :{" "}
                {convertToCurrencyFormatQuantaty(
                  filteredQqtyRow.reduce(
                    (acc, item) =>
                      (Number(acc) + Number(item.selectedQuantity)).toFixed(3),
                    0
                  )
                )}
              </h5>
              <h6 style={{ color: "#f59a32" }}>{t("footerText2")}</h6>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default withTranslation()(AllocationVolume);
