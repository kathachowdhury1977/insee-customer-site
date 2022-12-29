import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import moment from "moment";
import DownloadIcon from "@mui/icons-material/Download";
// import ReportDataGridProServer from "../../../../components/DataTable/ReportDataGridProServer";
import ReportDataGridPro from "../../../../components/DataTable/ReportDataGridPro";
import Axios from 'axios';
import ExportPopup from "../../../../components/exportPopup/ExportPopup";
import { commaFormatter, sortingDateFormatter } from "../../../../_constant";

const DeliveryReportDataGridSCCO = ({ rows, filterState, setIsLoading, loading, handlePagination, rowCount, pageSize, setPageSize, addQuantity }) => {
    const { t } = useTranslation();
    const customerId = localStorage.getItem('CustomerNumber');
    const [dwnReportName, setDWNReportName] = useState("");
    const [openExportPopup, setOpenExportPopup] = useState(null);
    const lancode = localStorage.getItem('lancode');
    const [exportState, setExportState] = useState({
        btnName: "EXPORT",
        linkToDownload: null,
    });

    const downloadReporta = (params) => {
        setExportState({ btnName: "Exporting..." });
        setIsLoading(true)
        setDWNReportName(`Delivery_SCCO_${params.doNumber}`)
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
            sortable: false,
            renderCell: ({ row }) => {
                return (
                    <DownloadIcon className="cursorPointer" onClick={() => downloadReporta(row)} />
                );
            },
        },
        {
            field: "deliveryDate",
            headerName: t("report.deliveryDate"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            type: "date",
            renderCell: ({ row }) => {
                return row.po_date ? <div>{moment(row.po_date).format("DD-MM-YYYY")}</div> : "";
            },
        },
        {
            field: "preDoNumber",
            headerName: t("report.ticketNo"),
            headerAlign: "center",
            align: 'center',
            width: 120
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
            field: "plantCode",
            headerName: t("report.plantCode"),
            headerAlign: "center",
            align: 'center',
            width: 150,
            sortable: true
        },
        {
            field: lancode === "en" ? "plantNameEn" : "plantNameTh",
            headerName: t("report.plantName"),
            headerAlign: "center",
            align: 'left',
            width: 150,
            sortable: true,
            renderCell: ({ row }) => {
                const lancode = localStorage.getItem('lancode');
                return <div>{lancode === "en" ? row.plantNameEn : row.plantNameTh}</div>;
            },
        },
        {
            field: "product",
            headerName: t("report.productCode"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true
        },
        {
            field: "slumpCc",
            headerName: t("report.slump"),
            headerAlign: "center",
            align: 'center',
            width: 130,
            sortable: true
        },
        {
            field: "cu",
            headerName: t("report.cu"),
            headerAlign: "center",
            align: 'center',
            width: 100,
            sortable: true
        },
        {
            field: "cy",
            headerName: t("report.cy"),
            headerAlign: "center",
            align: 'center',
            width: 100,
            sortable: true
        },
        {
            field: "quantityBag",
            headerName: t("report.quantity"),
            headerAlign: "center",
            align: 'right',
            width: 100,
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
        {
            field: "minimumLoadCharge",
            headerName: t("report.minimumLoadCharge"),
            headerAlign: "center",
            align: 'right',
            width: 180,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{commaFormatter(row.minimumLoadCharge, 2)}</div>;
            },
        },
        {
            field: "amountBeforeTax",
            headerName: t("report.amountBeforeTax"),
            headerAlign: "center",
            align: 'right',
            width: 150,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{commaFormatter(row.amountBeforeTax, 2)}</div>;
            }
        },
        {
            field: "tax",
            headerName: t("report.tax"),
            headerAlign: "center",
            align: 'right',
            width: 120,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{commaFormatter(row.tax, 2)}</div>;
            }
        },
        {
            field: "totalAmout",
            headerName: t("report.totalAmount"),
            headerAlign: "center",
            align: 'right',
            width: 120,
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{commaFormatter(row.totalAmout, 2)}</div>;
            }
        },
        {
            field: "truckNo",
            headerName: t("report.TruckNo"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            sortable: true
        },
        {
            field: "departureDate",
            headerName: t("report.departureDate"),
            headerAlign: "center",
            align: 'center',
            width: 120,
            type: "date",
            renderCell: ({ row }) => {
                return row.po_date ? <div>{moment(row.po_date).format("DD-MM-YYYY")}</div> : "";
            },
        },
        {
            field: "specialInstruction",
            headerName: t("report.specialInstruction"),
            headerAlign: "center",
            align: 'left',
            width: 150
        }
    ];

    function makeUniqueRow(rows) {
        const uniqueRow =
            rows &&
            rows.length > 0 &&
            rows.map((item, index) => {
                return {
                    ...item,
                    id: index,
                    po_date: sortingDateFormatter(item.deliveryDate),
                    quantityBag: Number(item.quantityBag),
                    minimumLoadCharge: Number(item.minimumLoadCharge),
                    amountBeforeTax: Number(item.amountBeforeTax),
                    departureDate: sortingDateFormatter(item.departureDate),
                };
            });
        return Array.isArray(uniqueRow) ? uniqueRow : [];
    }


    return (
        <>
            <ExportPopup
                title={t("delivery_report.lable")}
                fileName={dwnReportName}
                openPopup={openExportPopup}
                setOpenExportPopup={setOpenExportPopup}
                linkToDownload={exportState.linkToDownload}
            />

            <ReportDataGridPro
                rows={makeUniqueRow(rows)}
                columns={columns}
                totalWithTitle={`${t("report.sumTotalQuantity")} :  ${commaFormatter(addQuantity, 3)}`}
                loading={loading}
            />

            {/* <ReportDataGridProServer
                rows={makeUniqueRow(rows)}
                columns={columns}
                totalWithTitle={`${t("report.sumTotalQuantity")} :  ${commaFormatter(addQuantity, 3)}`}
                loading={loading}
                handlePagination={handlePagination}
                rowCount={rowCount}
                pageSize={pageSize}
                setPageSize={setPageSize}
            /> */}
        </>
    )
}

export default withTranslation()(DeliveryReportDataGridSCCO);
