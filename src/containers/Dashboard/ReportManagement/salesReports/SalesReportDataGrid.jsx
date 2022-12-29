import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import moment from "moment";
import ReportDataGrid from "../../../../components/DataTable/ReportDataGrid";
import ReportDataGridPro from "../../../../components/DataTable/ReportDataGridPro";
import ReportDataGridProServer from "../../../../components/DataTable/ReportDataGridProServer";
import { commaFormatter } from "../../../../_constant";


const SalesReportDataGrid = ({ rows, filterState, setIsLoading, salesReports, loading, handlePagination, rowCount, pageSize, setPageSize, clearDensity }) => {
    const { t } = useTranslation();
    const lancode = localStorage.getItem('lancode');

    const columns = [
        {
            field: "contractNumber",
            headerName: t("report.contractNo"),
            headerAlign: "center",
            align: 'center',
            width: 120
        },
        {
            field: "contractName",
            headerName: t("report.contractName"),
            headerAlign: "center",
            align: 'left',
            width: 180
        },
        {
            field: "poDate",
            headerName: t("report.poDate"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            renderCell: ({ row }) => {
                return <div>{moment(row.poDate).format("DD-MM-YYYY")}</div>;
            },
            type: 'date',
            sortable: true
            // sortComparator: dayInMonthComparator,
        },
        {
            field: "poNo",
            headerName: t("report.poNo"),
            headerAlign: "center",
            align: 'center',
            width: 250
        },
        {
            field: "orderNo",
            headerName: t("report.soNo"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true
        },
        {
            field: "shipToNumber",
            headerName: t("report.shipNo"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{isNaN(row.shipToNumber) ? row.shipToNumber : row.shipToNumber*1}</div>;
              },
        },
        {
            field: lancode === "en" ? "shipToName" : "shipToNameTH",
            headerName: t("report.shipName"),
            headerAlign: "center",
            align: 'left',
            width: 300,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{lancode === "en" ? row.shipToName : row.shipToNameTH}</div>;
            },
        },
        {
            // field: "materialName",
            field:lancode === "en" ? "materialName" : "materialNameTH",
            headerName: t("report.productName"),
            headerAlign: "center",
            align: 'left',
            width: 300,
            // sortable: true,
            renderCell: ({ row }) => {
                return <div>{lancode === "en" ? row.materialName : row.materialNameTH}</div>;
            },
            // sortComparator: (a, b) => a - b
        },
        {
            field: "orderedQuantity",
            headerName: t("report.orderedQuantity"),
            headerAlign: "center",
            align: 'right',
            width: 150,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{commaFormatter(row.orderedQuantity, 3)}</div>;
            }
        },
        {
            field: "unit",
            headerName: t("report.unit"),
            headerAlign: "center",
            align: 'center',
            width: 100,
            sortable: true
        },
        {
            field: "shipmentQty",
            headerName: t("report.shipmentQuantity"),
            headerAlign: "center",
            align: 'right',
            width: 150,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{commaFormatter(row.shipmentQty, 3)}</div>;
            }
        }, {
            field: "remainingQuantity",
            headerName: t("report.remainingQuantity"),
            headerAlign: "center",
            align: 'right',
            width: 150,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{commaFormatter(row.remainingQuantity, 3)}</div>;
            }
        },
        {
            field: "remainingQtyWithShipment",
            headerName: t("report.remainingQuantityShipment"),
            headerAlign: "center",
            align: 'right',
            width: 250,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{commaFormatter(row.remainingQtyWithShipment, 3)}</div>;
            }
        },
        {
            field: "deliveredQuantity",
            headerName: t("report.deliveredQuantity"),
            headerAlign: "center",
            align: 'right',
            width: 150,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{commaFormatter(row.deliveredQuantity, 3)}</div>;
            }
        },
        {
            field: lancode === "en" ? "orderstatus" : "orderStatusth",
            headerName: t("report.orderStatus"),
            headerAlign: "center",
            align: 'center',
            width: 150,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{lancode === "en" ? row.orderstatus : row.orderStatusth}</div>;
            },
        }
    ];


    const columnsForCCO = [
        {
            field: "poDate",
            headerName: t("report.poDate"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true
        },
        {
            field: "requestedDeliveryDate",
            headerName: t("report.requestDeliveryDate"),
            headerAlign: "center",
            align: 'center',
            width: 200,
            sortable: true,
            type: 'date',
            renderCell: ({ row }) => {
                return <div>{row.requestedDeliveryDate}</div>;
            },
        },
        {
            field: "orderNo",
            headerName: t("report.soNo"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true
        },
        {
            field: "shipToNumber",
            headerName: t("report.shipNo"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{isNaN(row.shipToNumber) ? row.shipToNumber : row.shipToNumber*1}</div>;
              },
        },
        {
            field: lancode === "en" ? "shipToName" : "shipToNameTH",
            headerName: t("report.shipName"),
            headerAlign: "center",
            align: 'left',
            width: 300,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{lancode === "en" ? row.shipToName : row.shipToNameTH}</div>;
            },
        },
        {
            field: "plantCode",
            headerName: t("report.plantCode"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true
        },
        {
            field: lancode === "en" ? "plantNameEn" : "plantNameTh",
            headerName: t("report.plantName"),
            headerAlign: "center",
            align: 'left',
            width: 120,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{lancode === "en" ? row.plantNameEn : row.plantNameTh}</div>;
            },
        },
        {
            field: "materialCode",
            headerName: t("report.productCode"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true
        },
        {
            field: "cu",
            headerName: "CU",
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true
        },
        {
            field: "cy",
            headerName: "CY",
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true
        },
        {
            field: "orderedQuantity",
            headerName: t("report.orderedQuantity"),
            headerAlign: "center",
            align: 'right',
            width: 150,
            sortable: true,
            type: "number"
        },
        {
            field: "unit",
            headerName: t("report.unit"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true
        },
        {
            field: "deliveredQuantity",
            headerName: t("report.deliveredQuantity"),
            headerAlign: "center",
            align: 'right',
            width: 150,
            sortable: true,
            type: "number"
        },
        {
            field: "specialInstruction",
            headerName: t("report.specialInstruction"),
            headerAlign: "center",
            align: 'left',
            width: 350,
            sortable: true
        },
        {
            field: lancode === "en" ? "orderstatus" : "orderStatusth",
            headerName: t("report.orderStatus"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{lancode === "en" ? row.orderstatus : row.orderStatusth}</div>;
            },
        }
    ];


    const columnsWood = [
        {
            field: "contractNumber",
            headerName: t("report.contractNo"),
            headerAlign: "center",
            align: 'center',
            width: 120
        },
        {
            field: "contractName",
            headerName: t("report.contractName"),
            headerAlign: "center",
            align: 'left',
            width: 180
        },
        {
            field: "poDate",
            headerName: t("report.poDate"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{moment(row.poDate).format("DD-MM-YYYY")}</div>;
            },
            type: 'date',
        },
        {
            field: "poNo",
            headerName: t("report.poNo"),
            headerAlign: "center",
            align: 'center',
            width: 250,
            sortable: true
        },
        {
            field: "orderNo",
            headerName: t("report.soNo"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true
        },
        {
            field: "shipToNumber",
            headerName: t("report.shipNo"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{isNaN(row.shipToNumber) ? row.shipToNumber : row.shipToNumber*1}</div>;
              },
        },
        {
            field: lancode === "en" ? "shipToName" : "shipToNameTH",
            headerName: t("report.shipName"),
            headerAlign: "center",
            align: 'left',
            width: 300,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{lancode === "en" ? row.shipToName : row.shipToNameTH}</div>;
            },
        },
        {
            field: lancode === "en" ? "materialName" : "materialNameTH",
            headerName: t("report.productName"),
            headerAlign: "center",
            align: 'left',
            width: 300,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{lancode === "en" ? row.materialName : row.materialNameTH}</div>;
            },
        },
        {
            field: "orderedQuantity",
            headerName: t("report.orderedQuantity"),
            headerAlign: "center",
            align: 'right',
            width: 150,
            sortable: true
        },
        {
            field: "unit",
            headerName: t("report.unit"),
            headerAlign: "center",
            align: 'center',
            width: 100,
            sortable: true
        },
        {
            field: "preDOQuantity",
            headerName: t("report.preDOQuantity"),
            headerAlign: "center",
            align: 'right',
            width: 150,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{commaFormatter(row.preDOQuantity, 3)}</div>;
            }
        }, {
            field: "remainingQuantity",
            headerName: t("report.remainingQuantity"),
            headerAlign: "center",
            align: 'right',
            width: 150,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{commaFormatter(row.remainingQuantity, 3)}</div>;
            }
        },
        {
            field: "remainingQtyWithPreDo",
            headerName: t("report.remainingQuantityPreDo"),
            headerAlign: "center",
            align: 'right',
            width: 250,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{commaFormatter(row.remainingQtyWithPreDo, 3)}</div>;
            }
        },
        {
            field: "deliveredQuantity",
            headerName: t("report.deliveredQuantity"),
            headerAlign: "center",
            align: 'right',
            width: 150,
            sortable: true,
            type: "number"
        },
        {
            field: lancode === "en" ? "orderstatus" : "orderStatusth",
            headerName: t("report.orderStatus"),
            headerAlign: "center",
            align: 'center',
            width: 150,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{lancode === "en" ? row.orderstatus : row.orderStatusth}</div>;
            },
        }
    ];

    const [rowData, setRowData] = useState([])

    useEffect(() => {
        rows.length > 0 ? setRowData(rows) : setRowData([])
    }, [rows])

    const findUniqeRow = (data) => {
        const uniqueData = data.map((item, index) => {
            return ({
                ...item,
                id: index
            })
        })
        return Array.isArray(uniqueData) ? uniqueData : []
    }

    return (
        <>

            <ReportDataGridPro
                rows={findUniqeRow(rowData)}
                columns={(filterState.company === "SCCO" || filterState.company === "Conwood") ? (filterState.company === "Conwood" ? columnsWood : columnsForCCO) : columns}
                loading={loading}
                totalWithTitle={`${t("report.sumTotalOrderedQuantity")} : ${commaFormatter(salesReports?.salesReportList?.orderQty ?? 0, 3)}`}
            />

            {/* <ReportDataGridProServer
                rows={findUniqeRow(rowData)}
                loading={loading}
                columns={(filterState.company === "SCCO" || filterState.company === "Conwood") ? (filterState.company === "Conwood" ? columnsWood : columnsForCCO) : columns}
                totalWithTitle={`${t("report.sumTotalOrderedQuantity")} : ${commaFormatter(salesReports?.salesReportList?.orderQty ?? 0, 3)}`}
                // uniqueId={"orderNo"}
                handlePagination={handlePagination}
                rowCount={rowCount}
                pageSize={pageSize}
                setPageSize={setPageSize}
            /> */}

        </>
    )
}

export default withTranslation()(SalesReportDataGrid);