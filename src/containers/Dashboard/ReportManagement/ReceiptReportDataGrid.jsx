import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import DownloadIcon from "@mui/icons-material/Download";
import Axios from 'axios';
import { useSelector } from 'react-redux'
import ReportDataGridPro from "../../../components/DataTable/ReportDataGridPro";
import { commaFormatter, sortingDateFormatter } from "../../../_constant";
import ExportPopup from "../../../components/exportPopup/ExportPopup";

const ReceiptReportDataGrid = ({ rows, filterState, setIsLoading, clearDensity }) => {
    const { t } = useTranslation();
    const [openExportPopup, setOpenExportPopup] = useState(null);
    const [dwnReportName, setDWNReportName] = useState("");
    // Export Excel
    const [exportState, setExportState] = useState({
        btnName: "EXPORT",
        linkToDownload: null,
    });
    var customerNo = localStorage.getItem('CustomerNumber')
    const receiptReports = useSelector((state) => state.receiptReports)


    function division(company) {
        let divType = "Cement";
        if (company === "SCCO") {
            divType = "Concrete"
        }
        if (company === "Conwood") {
            divType = "Conwood"
        }
        return divType
    }

    const downLoadInvoice = (params) => {
        setIsLoading(true)
        setExportState({ btnName: "Exporting..." });
        const { Receipt_Date, Receipt_Doc } = params;
        setDWNReportName(`Receipt_${filterState.company}_${params.Receipt_Doc}`)

        let getYear = moment(sortingDateFormatter(Receipt_Date)).format("YYYY");
        var getData = moment().format("DDMMYYYY");
        let searchUrl = `/reports/downloadReceiptDms?customercode=${customerNo}&date=${getYear}&division=${division(filterState.company)}&receiptNo=${Receipt_Doc}`;
        Axios({
            method: "GET", url: process.env.REACT_APP_API_URL_CONFIRMPAYMENT + searchUrl,
            responseType: 'arraybuffer',
            headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
                'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
            }
        })
            .then(async (response) => {
                setIsLoading(false);
                setOpenExportPopup(true);
                setExportState({ btnName: "EXPORT", linkToDownload: response.data });
            })
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
    }

    const columns = [
        {
            field: "downloadReceipt",
            headerName: t("report.downloadReceipt"),
            headerAlign: "center",
            align: 'center',
            width: 150,
            renderCell: ({ row }) => {
                return (
                    <DownloadIcon onClick={() => downLoadInvoice(row)} className="cursorPointer" />
                );
            },
            sortable: false,
        },
        {
            field: "Receipt_Doc",
            headerName: t("report.receiptNumber"),
            headerAlign: "center",
            align: 'center',
            width: 150
        },
        {
            field: "receiptDate",
            headerName: t("report.receiptDate"),
            headerAlign: "center",
            align: 'center',
            width: 140,
            type: "date",
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{row.receiptDate ? moment(row.receiptDate).format('DD-MM-YYYY') : ""}</div>;
            }
        },
        {
            field: "valueDate",
            headerName: t("report.receiptValueDate"),
            headerAlign: "center",
            align: 'center',
            width: 150,
            type: "date",
            sortable: true,
            renderCell: ({ row }) => {
                return <div>{row.valueDate ? moment(row.valueDate).format('DD-MM-YYYY') : ""}</div>;
            }
        },
        {
            field: "Description",
            headerName: t("report.description"),
            headerAlign: "center",
            align: 'left',
            width: 330,
        },
        {
            field: "Amount_In_Doc_Currency",
            headerName: t("report.receiptAmount"),
            headerAlign: "center",
            align: 'right',
            width: 120,
            renderCell: ({ row }) => {
                return <div>{commaFormatter(row.Amount_In_Doc_Currency, 2)}</div>;
            }
            // renderCell: ({ row }) => {
            //     let am = Number(parseFloat(row.Amount_In_Doc_Currency).toFixed(2)).toLocaleString('en', {
            //         minimumFractionDigits: 2
            //     })
            //     return <div>{am}</div>;
            // },
        },
        {
            field: "Doc_Currency_Key",
            headerName: t("report.currency"),
            headerAlign: "center",
            align: 'left',
            width: 120,
        }
    ];

    function convetAmount(rows) {
        const rowData = rows && rows.length > 0 && rows.map((item, index) => {
            return ({
                ...item,
                Amount_In_Doc_Currency: Number(item.Amount_In_Doc_Currency),
                id: index,
                receiptDate: item.Receipt_Date ? sortingDateFormatter(item.Receipt_Date) : "",
                valueDate: item.Value_Date ? sortingDateFormatter(item.Value_Date) : "",
                Description: item.Description ?? ""
            })
        })
        return Array.isArray(rowData) ? rowData : []
    }

    // console.log('hello',);

    return (
        <>
            <ExportPopup
                title={t("receipt.ReceiptReport")}
                fileName={dwnReportName}
                openPopup={openExportPopup}
                setOpenExportPopup={setOpenExportPopup}
                linkToDownload={exportState.linkToDownload}
            />

            <ReportDataGridPro
                rows={convetAmount(rows)}
                columns={columns}
                loading={receiptReports.isLoading}
                // uniqueId={"id"}
                clearDensity={clearDensity}
            />

        </>
    )
}

export default ReceiptReportDataGrid