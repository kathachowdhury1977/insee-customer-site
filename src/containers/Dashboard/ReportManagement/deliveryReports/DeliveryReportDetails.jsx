import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { commaFormatter } from "../../../../_constant";
import moment from "moment";
import { customStableSort } from '../../../../_helpers';

const DeliveryReportDetails = ({ row }) => {
    const { t } = useTranslation();
    const lancode = localStorage.getItem('lancode');
    const [sortModel, setSortModel] = React.useState([]);
    const [sortedRow, setSortedRow] = useState([])

    const columns = [
        { field: "id", hide: true },
        {
            field: "product",
            headerName: t("report.productNo"),
            headerAlign: 'center',
            width: 150, align: "center"
        },
        {
            field: lancode === "en" ? "productNameInEN" : "productNameInTH",
            headerName: t("report.productName"),
            headerAlign: 'center', width: 350, align: "left",
            renderCell: ({ row }) => {
                const lancode = localStorage.getItem('lancode');
                return <div>{lancode === "en" ? row.productNameInEN : row.productNameInTH}</div>;
            },
        },
        {
            field: "quantityBag",
            headerName: t("report.quantity"),
            headerAlign: 'center', width: 120, align: "right",
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{commaFormatter(row.quantityBag, 3)}</div>;
            }
        },
        {
            field: "unit",
            headerName: t("unit"),
            headerAlign: 'center', width: 120, align: "center"
        },
        {
            field: "checkIn",
            headerName: t("report.checkIn"),
            headerAlign: 'center', width: 170, align: "center",
            renderCell: ({ row }) => {
                return row.checkIn ? (
                    <div>{moment(row.checkIn).format("DD-MM-YYYY HH:mm:ss")}</div>
                ) : (
                    ""
                );
            },
        },
        {
            field: "weightIn",
            headerName: t("report.weightIn"),
            headerAlign: 'center', width: 170, align: "center",
            renderCell: ({ row }) => {
                return row.weightIn ? (
                    <div>{moment(row.weightIn).format("DD-MM-YYYY HH:mm:ss")}</div>
                ) : (
                    ""
                );
            },
        },
        {
            field: "weightOut",
            headerName: t("report.weightOut"),
            headerAlign: 'center', width: 170, align: "center",
            renderCell: ({ row }) => {
                return row.weightOut ? (
                    <div>{moment(row.weightOut).format("DD-MM-YYYY HH:mm:ss")}</div>
                ) : (
                    ""
                );
            },
        }
    ];

    const newRow =
        row.childTableSummary &&
        row.childTableSummary.map((item, index) => {
            return {
                ...item,
                id: index,
                quantityBag: Number(item.quantityBag),
                product: Number(item.product)
            };
        });

    function customSortModel(model) {
        console.log(model)
        setSortedRow(customStableSort(newRow, model))
        setSortModel(model)
    }

    useEffect(() => {

        setSortedRow(newRow)
    }, [row.childTableSummary])


    return (

        <DataGrid
            style={{ fontSize: "12px" }}
            rows={sortedRow}
            columns={columns}
            hideFooter={true}
            autoHeight={true}
            density="compact"
            disableColumnMenu={true}
            sortModel={sortModel}
            onSortModelChange={(newSortModel) => customSortModel(newSortModel)}
            sortingMode="server"
        />

    );
}

export default DeliveryReportDetails;