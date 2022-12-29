import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { withTranslation, useTranslation } from "react-i18next";
import { commaFormatter } from "../../../../_constant";
import moment from "moment";

const CreditNoteReportDetails = ({ row }) => {
  const { t } = useTranslation();
  // const [pageSize, setPageSize] = React.useState(20);

  const columns = [
    { field: "id", hide: true },
    {
      field: "TaxInvoiceNumber",
      headerName: t("report.taxInvoiceNumber"),
      headerAlign: "center",
      width: 170,
      align: "center",
    },
    {
      field: "Month",
      headerName: t("Month"),
      headerAlign: "center",
      width: 100,
      align: "center",
      renderCell: ({ row }) => {
        // console.log('hello', row?.Month);
        return (
          <div>
            {row?.Month?.toString().slice(4, 6)}-
            {row?.Month?.toString().slice(0, 4)}
          </div>
        );
      },
    },
    {
      field: "Material",
      headerName: t("Product No."),
      headerAlign: "center",
      width: 120,
      align: "center",
      renderCell: ({ row }) => {
        return <div>{row.Material * 1}</div>;
      },
    },
    {
      field: "CondBaseValue",
      headerName: t("receipr.condBaseValue"),
      headerAlign: "center",
      width: 120,
      align: "right",
      type: "number",
      renderCell: ({ row }) => {
        return <div>{commaFormatter(row.CondBaseValue, 3)}</div>;
      }
    },
    {
      field: "Rate",
      headerName: t("Rate"),
      headerAlign: "center",
      width: 100,
      align: "right",
      type: "number",
      renderCell: ({ row }) => {
        return <div>{commaFormatter(row.Rate, 2)}</div>;
      }
    },
    {
      field: "RebateAccrualsValue",
      headerName: t("Accurals"),
      headerAlign: "center",
      width: 100,
      align: "right",
      type: "number",
      renderCell: ({ row }) => {
        return <div>{commaFormatter(row.RebateAccrualsValue, 2)}</div>;
      },
    },
  ];

  const newRow =
    row.TaxInvoice &&
    row.TaxInvoice.map((item, index) => {
      return {
        ...item,
        id: index,
      };
    });

  return (
    <DataGrid
      style={{ fontSize: "12px" }}
      rows={newRow}
      autoHeight={true}
      columns={columns}
      hideFooter={true}
      // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      // pageSize={pageSize}
      // rowsPerPageOptions={[20, 50, 75, 100]}
      density="compact"
    />
  );
};

export default CreditNoteReportDetails;
