import React from 'react';
import ReportDataGridProServer from '../../../../components/DataTable/ReportDataGridProServer';
import ReportDataGridPro from '../../../../components/DataTable/ReportDataGridPro';
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from '@mui/material/IconButton';
import { useTranslation } from "react-i18next";
import moment from 'moment';
import { commaFormatter } from '../../../../_constant';
import { downloadTaxReport } from '../../../../_services';
import { useDispatch } from 'react-redux';

const InvoiceReportDataGrid = ({ rows, totalAmount, handlePagination, rowCount, pageSize, setPageSize, loading }) => {
  const dispatch = useDispatch()
  const lancode = localStorage.getItem('lancode');
  
  const downloadFile = (invoiceNo) => {
    dispatch(downloadTaxReport(invoiceNo, "SCCC"))
  };

  const dateFormatter = (date) => {
    return new Date(date);
  }


  const { t } = useTranslation();
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
      width: 150,
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
      // field: "productName",
      field: lancode === "en" ? "material" : "materialLocal",
      headerName: t("report.productName"),
      headerAlign: "center",
      width: 250,
      align: "left",
      renderCell: ({ row }) => {
        const lancode = localStorage.getItem('lancode');
        return <div>{lancode === "en" ? row.material : row.materialLocal}</div>;
      },
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
      }
    },
    {
      field: "tax",
      headerName: t("report.tax"),
      headerAlign: "center",
      width: 120,
      align: "right",
      renderCell: ({ row }) => {
        return <div>{commaFormatter(row.tax, 2)}</div>;
      }
    },
    {
      field: "totalamount",
      headerName: t("report.totalAmount"),
      headerAlign: "center",
      width: 120,
      align: "right",
      renderCell: ({ row }) => {
        return <div>{commaFormatter(row.totalamount, 2)}</div>;
      }
    },
  ];

  function makeUniqueRow(rows) {
    const uniqueRow = rows.length > 0 && rows.map((item, index) => {
      return ({
        ...item,
        id: index
      })
    })
    return Array.isArray(uniqueRow) ? uniqueRow : []
  }

  return (
    <>
      <ReportDataGridPro
        rows={makeUniqueRow(rows)}
        columns={columns}
        totalWithTitle={`${t("report.sumTotalAmount")} : ${commaFormatter(totalAmount, 2)}`}
        loading={loading}
      />

      {/* <ReportDataGridProServer
        rows={makeUniqueRow(rows)}
        columns={columns}
        totalWithTitle={`${t("report.sumTotalAmount")} : ${commaFormatter(totalAmount, 2)}`}
        handlePagination={handlePagination}
        rowCount={rowCount}
        pageSize={pageSize}
        setPageSize={setPageSize}
        loading={loading}
      /> */}
    </>
  )
}

export default InvoiceReportDataGrid