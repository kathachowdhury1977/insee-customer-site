import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import moment from "moment";
import Axios from "axios";
import {
  DataGridPro,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-pro";
//import { process.env.REACT_APP_API_URL_CONFIRMPAYMENT } from '../../../../constant';
import DownloadIcon from "@mui/icons-material/Download";
import CreditNoteReportDetails from "./CreditNoteReportDetails";
import IconButton from "@mui/material/IconButton";
import ExportPopup from "../../../../components/exportPopup/ExportPopup";
import { commaFormatter, sortingDateFormatter } from "../../../../_constant";
import { customStableSort } from "../../../../_helpers";

const CreditNoteReportDataGrid = ({
  creditReports,
  rows,
  filterState,
  setIsLoading,
  clearDensity,
  setClearDensity,
}) => {
  const { t } = useTranslation();
  const customerId = localStorage.getItem("CustomerNumber");
  const [rowData, setRowData] = useState([]);
  const [dwnReportName, setDWNReportName] = useState("");
  const [sortModel, setSortModel] = React.useState([]);

  const [openExportPopup, setOpenExportPopup] = useState(null);
  // Export Excel
  const [exportState, setExportState] = useState({
    btnName: "EXPORT",
    linkToDownload: null,
  });

  function division() {
    let divType = "Cement";
    if (filterState.company === "SCCO") {
      divType = "Concrete";
    }
    if (filterState.company === "Conwood") {
      divType = "Conwood";
    }
    return divType;
  }

  const downloadReporta = (params) => {
    console.log("params=>", params);
    setExportState({ btnName: "Exporting..." });
    setIsLoading(true);
    setDWNReportName(`Credit_Note_${filterState.company}_${params.DocumentNo}`)
    const yyyy = params.PostingDate.slice(6, 10);
    const docNo = params.DocumentType === "R8" ? params.DocumentNo : params.FIDocument
    Axios({
      method: "GET",
      url:
        process.env.REACT_APP_API_URL_CONFIRMPAYMENT +
        `/reports/downloadCreditNoteDms?customercode=${customerId}&division=${division(
          filterState.company
        )}&docType=${params.DocumentType}&document=${docNo}&year=${yyyy}`,
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
        "X-SOLD-TO-ID": customerId,
      },
    })
      .then(async (response) => {
        setIsLoading(false);
        setOpenExportPopup(true);
        setExportState({ btnName: "EXPORT", linkToDownload: response.data });
      })
      .catch((err) => {
        setExportState({ btnName: "EXPORT" });
      });
  };

  const columns = [
    { field: "id", hide: true },
    {
      field: "action",
      headerName: t("report.downloadReceipt"),
      headerAlign: "center",
      width: 100,
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton>
            <DownloadIcon onClick={() => downloadReporta(row)} />
          </IconButton>
        );
      },
      sortable: false,
    },
    {
      field: "DocumentNo",
      headerName: t("Document No."),
      headerAlign: "center",
      width: 155,
      align: "center",
    },
    {
      field: "posting_date",
      headerName: t("Date"),
      headerAlign: "center",
      width: 130,
      align: "center",
      type: "date",
      sortable: true,
      renderCell: ({ row }) => {
        return <div>{row.posting_date ? moment(row.posting_date).format('DD-MM-YYYY') : ""}</div>;
      }
    },
    {
      field: "Net_Due_Date",
      headerName: t("net_due_date"),
      headerAlign: "center",
      width: 125,
      align: "center",
      renderCell: ({ row }) => {
        return <div>{row.NetDueDate}</div>;
      },
    },
    {
      field: "Description",
      headerName: t("label.description"),
      headerAlign: "center",
      width: 300,
      align: "left",
    },
    {
      field: "DocAmount",
      headerName: t("label.amount"),
      headerAlign: "center",
      width: 100,
      align: "right",
      type: "number",
      renderCell: ({ row }) => {
        return <div>{commaFormatter(row.DocAmount, 2)}</div>;
      },
    },
    {
      field: "WithholdingTaxDocAmtCur",
      headerName: t("wht"),
      headerAlign: "center",
      width: 100,
      align: "right",
      type: "number",
      renderCell: ({ row }) => {
        return <div>{commaFormatter(row.WithholdingTaxDocAmtCur, 2)}</div>;
      },
    },
    {
      field: "NetAmount",
      headerName: t("Net Amount"),
      headerAlign: "center",
      width: 120,
      align: "right",
      type: "number",
      renderCell: ({ row }) => {
        return <div>{commaFormatter(row.NetAmount, 2)}</div>;
      },
    },
    {
      field: "Status",
      headerName: t("Status"),
      headerAlign: "center",
      width: 150,
      align: "right",
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  }

  const getDetailPanelContent = React.useCallback(({ row }) => {
    return row.TaxInvoice ? <CreditNoteReportDetails row={row} /> : null;
  }, []);

  const getDetailPanelHeight = React.useCallback(() => "auto", []);
  const [pageSize, setPageSize] = React.useState(20);

  const [detailPanelExpandedRowIds, setDetailPanelExpandedRowIds] = React.useState(
    [],
  );

  const handleDetailPanelExpandedRowIdsChange = React.useCallback((newIds) => {
    setDetailPanelExpandedRowIds(newIds);
  }, []);

  useEffect(() => {
    setRowData(rows);
    setClearDensity("");
    setDetailPanelExpandedRowIds([])
  }, [rows]);

  function customSortModel(model) {
    setRowData(customStableSort(rows, model))
    setSortModel(model)
  }

  return (
    <>
      <ExportPopup
        title={t("creditnotereport.lable")}
        fileName={dwnReportName}
        openPopup={openExportPopup}
        setOpenExportPopup={setOpenExportPopup}
        linkToDownload={exportState.linkToDownload}
      />
      <DataGridPro
        style={{ fontSize: "14px" }}
        rows={rowData}
        disableColumnMenu={true}
        disableColumnReorder={true}
        disableColumnSelector={true}
        getRowId={(row) => row.DocumentNo}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pageSize={pageSize}
        rowsPerPageOptions={[20, 50, 75, 100]}
        getDetailPanelHeight={getDetailPanelHeight}
        getDetailPanelContent={getDetailPanelContent}

        detailPanelExpandedRowIds={detailPanelExpandedRowIds}
        onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}

        pagination={true}
        autoHeight={true}
        componentsProps={{
          pagination: {
            labelRowsPerPage: t("report.perPage"),
          },
        }}
        localeText={{
          noRowsLabel: t("report.noData"),
        }}
        density={clearDensity}
        disableSelectionOnClick={true}

        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => customSortModel(newSortModel)}
      />
    </>
  );
};

export default withTranslation()(CreditNoteReportDataGrid);
