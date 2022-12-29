import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { commaFormatter } from "../../../../_constant";
import { useTranslation } from "react-i18next";

const InvoiceReportDetails = ({ row }) => {
  const { t } = useTranslation();
    const columns = [
      { field: "id", hide: true },
      {
        field: "materialcode",
        headerName: t("Product No."),
        headerAlign: "center",
        width: 150,
        align: "center",
      },
      {
        field: "material",
        headerName: t("report.productName"),
        headerAlign: "center",
        width: 230,
        align: "left",
        renderCell: ({ row }) => {
          const lancode = localStorage.getItem('lancode');
          return <div>{lancode === "en" ? row.material : row.materialLocal}</div>;
      },
      },
      {
        field: "qty",
        headerName: t("report.quantity"),
        headerAlign: "center",
        width: 100,
        align: "right",
        renderCell: ({ row }) => {
            return <div>{commaFormatter(row.qty, 3)}</div>;
        },
      },
      {
        field: "unit",
        headerName: t("unit"),
        headerAlign: "center",
        width: 100,
        align: "center",
      },
      {
        field: "itemCategory",
        // headerName: "Item Category",
        headerName: t("Item Category"),
        headerAlign: "center",
        width: 150,
        align: "left",
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
        width: 100,
        align: "right",
        renderCell: ({ row }) => {
            return <div>{commaFormatter(row.tax, 2)}</div>;
        },
      },
      {
        field: "totalamount",
        headerName: t("report.totalAmount"),
        headerAlign: "center",
        width: 100,
        align: "right",
        renderCell: ({ row }) => {
          return <div>{commaFormatter(row.totalamount, 2)}</div>;
        },
      },
    ];

    return (
        <DataGrid
            style={{ fontSize: "12px" }}
            rows={row.summary}
            columns={columns}
            hideFooter={true}
            autoHeight={true}
            density="compact"
            getRowId={(row) =>Math.random()}
            disableColumnMenu={true}
        />
    );
}

export default InvoiceReportDetails;