import React from "react";
import ReportDataGridProServer from "../../../../components/DataTable/ReportDataGridProServer";
import ReportDataGridPro from "../../../../components/DataTable/ReportDataGridPro";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "react-i18next";
import { commaFormatter } from "../../../../_constant";
import moment from "moment";
import { useDispatch } from "react-redux";
import { downloadTaxReport } from '../../../../_services';

const InvoiceReportDataGridscco = ({ rows, totalAmount, handlePagination, rowCount, pageSize, setPageSize, loading }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch()
  const lancode = localStorage.getItem('lancode');
  const downloadFile = (invoiceNo) => {
    dispatch(downloadTaxReport(invoiceNo, "SCCO"))
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
      field: "invoiceDate",
      headerName: t("Tax Invoice Date"),
      headerAlign: "center",
      width: 150,
      align: "center",
      renderCell: ({ row }) => {
        return <div>{moment(dateFormatter(row.invoiceDate)).format("DD-MM-YYYY")}</div>;
      },
      sortable: true,
      type: "date"
    },
    {
      field: "shiptonumber",
      headerName: t("report.shipNo"),
      headerAlign: "center",
      width: 120,
      align: "center",
      renderCell: ({ row }) => {
        return <div>{isNaN(row.shiptonumber) ? row.shiptonumber : row.shiptonumber * 1}</div>;
      },
    },
    {
      field: lancode === "en" ? "shiptonameEn" : "shiptonameTh",
      headerName: t("report.shipName"),
      headerAlign: "center",
      width: 160,
      align: "left",
      renderCell: ({ row }) => {
        const lancode = localStorage.getItem('lancode');
        return <div>{lancode === "en" ? row.shiptonameEn : row.shiptonameTh}</div>;
      },
    },
    {
      field: "plantcode",
      headerName: t("report.plantCode"),
      headerAlign: "center",
      width: 120,
      align: "center",
    },
    {
      field: lancode === "en" ? "plantnameEn" : "plantnameTh",
      headerName: t("report.plantName"),
      headerAlign: "center",
      width: 120,
      align: "left",
      renderCell: ({ row }) => {
        const lancode = localStorage.getItem('lancode');
        return <div>{lancode === "en" ? row.plantnameEn : row.plantnameTh}</div>;
      },
    },
    {
      field: "materialcode",
      headerName: t("report.productCode"),
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
      },
    },
    {
      field: "unit",
      headerName: t("report.unit"),
      headerAlign: "center",
      width: 120,
      align: "center",
    },
    {
      field: "minimumloadcharge",
      headerName: t("report.minimumLoadCharge"),
      headerAlign: "center",
      width: 180,
      align: "right",
      renderCell: ({ row }) => {
        return <div>{commaFormatter(row.minimumloadcharge, 2)}</div>;
      },
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
        return <div>{commaFormatter(row.totalamount, 2)}</div>;
      },
    },
  ];


  function makeUniqueRow(rows) {
    const uniqueRow = rows.length > 0 && rows.map((item, index) => {

      return ({
        ...item,
        id: index,
        minimumloadcharge: Number(item.minimumloadcharge)
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
      // uniqueId="invoiceNo"
      handlePagination={handlePagination}
      rowCount={rowCount}
      pageSize={pageSize}
      setPageSize={setPageSize}
      loading={loading}
    /> */}
    </>
  );
};

export default InvoiceReportDataGridscco;
