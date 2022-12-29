import React, { useState, useEffect } from "react";
import { DataGridPro, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarDensitySelector } from '@mui/x-data-grid-pro';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import InvoiceReportDetails from "./InvoiceReportDetails";
import ReportFooter from "../../../../components/Footer/ReportFooter";
import { useTranslation } from "react-i18next";
import { commaFormatter } from "../../../../_constant";
import moment from "moment";
import { downloadTaxReport } from '../../../../_services';
import { useDispatch } from "react-redux";
import { customStableSort } from "../../../../_helpers";

const InvoiceReportDataGridconwood = ({ rows, totalAmount, handlePagination, rowCount, pageSize, setPageSize, loading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const [sortModel, setSortModel] = React.useState([]);
  const [sortedRow, setSortedRow] = useState([])

  const downloadFile = (invoiceNo) => {
    console.log('hello', invoiceNo);
    dispatch(downloadTaxReport(invoiceNo, "Conwood"))
  };

  const dateFormatter = (date) => {
    return new Date(date);
  }

  const columns = [
    { field: "id", hide: true },
    {
      field: "action",
      headerName: t("report.download"),
      headerAlign: "center",
      width: 120,
      align: "center",
      renderCell: (row) => {
        return (
          <IconButton onClick={() => downloadFile(row.row.invoiceNo)}>
            <DownloadIcon />
          </IconButton>
        );
      },
      sortable: false,
    },
    {
      field: "invoiceNo",
      headerName: t("report.taxInvoiceNumber"),
      headerAlign: "center",
      width: 120,
      align: "center",
    },
    {
      field: "contractNo",
      headerName: t("report.contractNo"),
      headerAlign: "center",
      width: 120,
      align: "center",
    },
    {
      field: "contractName",
      headerName: t("report.contractName"),
      headerAlign: "center",
      width: 150,
      align: "left",
    },
    {
      field: "invoiceDate",
      headerName: t("Tax Invoice Date"),
      headerAlign: "center",
      width: 120,
      align: "center",
      renderCell: ({ row }) => {
        return <div>{moment(dateFormatter(row.invoiceDate)).format("DD-MM-YYYY")}</div>;
      },
      type: 'date',
      sortable: true
    },
    {
      field: "doNumber",
      headerName: t("report.doNo"),
      headerAlign: "center",
      width: 120,
      align: "center",
    },
    {
      field: "poNumber",
      headerName: t("PO No"),
      headerAlign: "center",
      width: 250,
      align: "center",
    },
    {
      field: "soNumber",
      headerName: t("SO No"),
      headerAlign: "center",
      width: 120,
      align: "center",
    },
    {
      field: "trucklicense",
      headerName: t("report.TruckNo"),
      headerAlign: "center",
      width: 120,
      align: "center",
    },
    {
      field: "qty",
      headerName: t("report.quantity"),
      headerAlign: "center",
      width: 120,
      align: "right",
      renderCell: ({ row }) => {
        return <div>{commaFormatter(row.qty, 3)}</div>;
      }
    },
    {
      field: "unit",
      headerName: t("report.unit"),
      headerAlign: "center",
      width: 120,
      align: "center",
      type: "number",
    },
    {
      field: "amountBeforeTax",
      headerName: t("report.amountBeforeTax"),
      headerAlign: "center",
      width: 150,
      align: "right",
      renderCell: ({ row }) => {
        return <div>{commaFormatter(row.amountBeforeTax, 2)}</div>;
      },
    },
    {
      field: "tax",
      headerName: t("report.tax"),
      headerAlign: "center",
      width: 120,
      align: "right",
      renderCell: ({ row }) => {
        return <div>{commaFormatter(row.tax, 2)}</div>;
      },
    },
    {
      field: "totalamount",
      headerName: t("report.totalAmount"),
      headerAlign: "center",
      width: 120,
      align: "right",
      type: "number",
      renderCell: ({ row }) => {
        console.log("row.totalamount=>", row.totalamount)
        return <div>{commaFormatter(row.totalamount, 2)}</div>;
      },
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

  const getDetailPanelContent = React.useCallback(
    ({ row }) => <InvoiceReportDetails row={row} />,
    [],
  );

  const getDetailPanelHeight = React.useCallback(() => 'auto', []);
  // const orderCount = rows.reduce(function (acc, obj) { return acc + (obj.amountBeforeTax + obj.tax); }, 0);

  // const [pageSize, setPageSize] = React.useState(20);

  React.useEffect(() => {
    setPageSize(20)
  }, [rows])

  const [page, setPage] = React.useState(0);
  rowCount = rowCount ?? 0;
  function handlePageSizeChange(newPageSize) {
    if (rowCount) {
      handlePagination(newPageSize, 0)
    }
    setPageSize(newPageSize)
    setPage(0)
  }

  function handleNewPage(p) {
    setPage(p)
    handlePagination(pageSize, p)
  }


  function makeUniqueRow(rows) {
    const uniqueRow = rows.length > 0 && rows.map((item, index) => {
      return ({
        ...item,
        id: index
      })
    })
    return Array.isArray(uniqueRow) ? uniqueRow : []
  }


  function customSortModel(model) {
    setSortedRow(customStableSort(rows, model))
    setSortModel(model)
  }


  useEffect(() => {
    setSortedRow(rows)
  }, [rows])

  return (
    <>

      <DataGridPro
        rows={makeUniqueRow(sortedRow)}
        columns={columns}
        components={{ Toolbar: CustomToolbar }}
        getDetailPanelHeight={getDetailPanelHeight}
        getDetailPanelContent={getDetailPanelContent}
        pagination={true}
        autoHeight={true}
        disableColumnMenu={true}
        disableColumnReorder={true}
        disableColumnSelector={true}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[20, 50, 75, 100]}
        loading={loading}
        localeText={{
          noRowsLabel: t("report.noData"),
        }}
        componentsProps={{
          pagination: {
            labelRowsPerPage: t("report.perPage"),
          },
        }}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => customSortModel(newSortModel)}
      />

      {/* <DataGridPro
        page={page}
        rows={makeUniqueRow(rows)}
        columns={columns}
        onPageChange={(newPage) => handleNewPage(newPage)}
        components={{ Toolbar: CustomToolbar }}
        getDetailPanelHeight={getDetailPanelHeight}
        getDetailPanelContent={getDetailPanelContent}
        pagination={true}
         disableColumnReorder={true}
        componentsProps={{
          pagination: {
            labelRowsPerPage: t('report.perPage')
          }
        }}
        localeText={{
          noRowsLabel: t("report.noData")
        }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => handlePageSizeChange(newPageSize)}
        autoHeight={true}
        // getRowId={(row) => row.invoiceNo}
        rowCount={rowCount}
        paginationMode="server"
        rowsPerPageOptions={[20, 50, 75, 100]}
        loading={loading ? loading : false}
      /> */}
      <ReportFooter title={`${t("report.sumTotalAmount")} : ${commaFormatter(totalAmount, 2)}`} />
    </>
  );
}

export default InvoiceReportDataGridconwood; 