import React, { useEffect, useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import {
    DataGridPro,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    useGridApiContext,
    useGridSelector,
    gridFilteredDescendantCountLookupSelector,
} from '@mui/x-data-grid-pro';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DownloadIcon from "@mui/icons-material/Download";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Axios from 'axios';
import ReportFooter from "../../../../components/Footer/ReportFooter";
import DeliveryReportDetails from "./DeliveryReportDetails";
import ExportPopup from "../../../../components/exportPopup/ExportPopup";
import { commaFormatter, sortingDateFormatter } from "../../../../_constant";

export const isNavigationKey = (key) =>
    key === 'Home' ||
    key === 'End' ||
    key.indexOf('Arrow') === 0 ||
    key.indexOf('Page') === 0 ||
    key === ' ';


const DeliveryReportDataGridWOOD = ({ rows, filterState, setIsLoading, loading, handlePagination, rowCount, addQuantity }) => {
    const { t } = useTranslation();
    const customerId = localStorage.getItem('CustomerNumber');
    const [dwnReportName, setDWNReportName] = useState("");
    const [openExportPopup, setOpenExportPopup] = useState(null);
    const [sortModel, setSortModel] = React.useState([]);
    const [sortedRow, setSortedRow] = useState([])
    const lancode = localStorage.getItem('lancode');
    const [exportState, setExportState] = useState({
        btnName: "EXPORT",
        linkToDownload: null,
    });

    const downloadReporta = (params) => {
        setExportState({ btnName: "Exporting..." });
        setIsLoading(true)
        setDWNReportName(`Delivery_Conwood_${params.doNumber}`)
        Axios({
            method: "GET", url: process.env.REACT_APP_API_URL_RS + `/report/download/deliveryDms?customercode=${customerId}&donumber=${params.doNumber}`,
            responseType: 'arraybuffer',
            headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
                'X-SOLD-TO-ID': customerId
            }
        })
            .then(async (response) => {
                setIsLoading(false)
                setOpenExportPopup(true);
                setExportState({ btnName: "EXPORT", linkToDownload: response.data });

            }).catch((err) => {
                setExportState({ btnName: "EXPORT" });
            })
    }

    const columns = [
        {
            field: "download",
            headerName: t("report.download"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            renderCell: ({ row }) => {
                return (
                    <DownloadIcon className="cursorPointer" onClick={() => downloadReporta(row)} />
                );
            },
        },
        {
            field: "poNumber",
            headerName: t("report.poNo"),
            headerAlign: "center",
            align: 'center',
            width: 250,
            sortable: true
        },
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
            width: 150
        },
        {
            field: "soNumber",
            headerName: t("report.soNo"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true
        },
        {
            field: "preDoNumber",
            headerName: t("report.preDoNo"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true
        },
        {
            field: "doNumber",
            headerName: t("report.doNo"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true
        },
        {
            field: "po_date",
            headerName: t("report.poDate"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{row.orderDate}</div>;
            },
        },
        {
            field: "shipToNumber",
            headerName: t("report.shipNo"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{isNaN(row.shipToNumber) ? row.shipToNumber : row.shipToNumber * 1}</div>;
            },
        },
        {
            field: lancode === "en" ? "shipToNameEN" : "shipToNameTH",
            headerName: t("report.shipName"),
            headerAlign: "center",
            align: 'left',
            width: 150,
            sortable: true,
            renderCell: ({ row }) => {
                const lancode = localStorage.getItem('lancode');
                return <div>{lancode === "en" ? row.shipToNameEN : row.shipToNameTH}</div>;
            },
        },
        {
            field: lancode === "en" ? "shippingConditionEn" : "shippingConditionTh",
            headerName: t("report.shippingCondition"),
            headerAlign: "center",
            align: 'center',
            width: 150,
            sortable: true,
            renderCell: ({ row }) => {
                const lancode = localStorage.getItem('lancode');
                return <div>{lancode === "en" ? row.shippingConditionEn : row.shippingConditionTh}</div>;
            },
        },
        {
            field: lancode === "en" ? "shippingTypeEn" : "shippingTypeTh",
            headerName: t("report.shipmentType"),
            headerAlign: "center",
            align: 'center',
            width: 250,
            sortable: true,
            renderCell: ({ row }) => {
                const lancode = localStorage.getItem('lancode');
                return <div>{lancode === "en" ? row.shippingTypeEn : row.shippingTypeTh}</div>;
            },
        },
        {
            field: "truckLicence",
            headerName: t("report.TruckNo"),
            headerAlign: "center",
            align: 'center',
            width: 150,
            sortable: true
        },
        {
            field: "quantityBag",
            headerName: t("report.quantity"),
            headerAlign: "center",
            align: 'right',
            width: 150,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{commaFormatter(row.quantityBag, 3)}</div>;
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
        ({ row }) => row.childTableSummary ? <DeliveryReportDetails row={row} /> : null,
        [],
    );

    const getDetailPanelHeight = React.useCallback(() => 'auto', []);
    const [pageSize, setPageSize] = React.useState(20);

    // rows = Array.isArray(rows) ? rows : [];


    function makeUniqueRow(rows) {
        const uniqueRow =
            rows &&
            rows.length > 0 &&
            rows.map((item, index) => {
                return {
                    ...item,
                    id: index,
                    po_date: sortingDateFormatter(item.orderDate),
                    quantityBag: Number(item.quantityBag)
                };
            });
        return Array.isArray(uniqueRow) ? uniqueRow : [];
    }


    // ===================  Custom Functions for thai sorting ============================
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? function (a, b) { return descendingComparator(a, b, orderBy); }
            : function (a, b) { return -descendingComparator(a, b, orderBy); };
    }

    function stableSort(array, comparator) {
        var stabilizedThis = array.map(function (el, index) { return [el, index]; });
        stabilizedThis.sort(function (a, b) {
            var order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map(function (el) { return el[0]; });
    }

    function customSortModel(model) {
        if (model[0]) {
            const { field, sort } = model[0]
            setSortedRow(stableSort(rows, getComparator(sort, field)))
        }
        setSortModel(model)
    }

    useEffect(() => {
        setSortedRow(rows)
    }, [rows])


    return (
        <>
            <ExportPopup
                title={t("delivery_report.lable")}
                fileName={dwnReportName}
                openPopup={openExportPopup}
                setOpenExportPopup={setOpenExportPopup}
                linkToDownload={exportState.linkToDownload}
            />

            <DataGridPro
                // rows={makeUniqueRow(rows)}
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
                sortModel={sortModel}
                onSortModelChange={(newSortModel) => customSortModel(newSortModel)}
                sortingMode="server"
            />

            {/* <DataGridPro
                rows={makeUniqueRow(rows)}
                columns={columns}
                components={{ Toolbar: CustomToolbar }}
                getDetailPanelHeight={getDetailPanelHeight}
                getDetailPanelContent={getDetailPanelContent}
                pagination={true}
                autoHeight={true}
                disableColumnMenu={true}
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
            /> */}

            <ReportFooter title={`${t("report.sumTotalQuantity")} : ${commaFormatter(addQuantity, 3)}`} />
        </>
    )
}

export default withTranslation()(DeliveryReportDataGridWOOD);
