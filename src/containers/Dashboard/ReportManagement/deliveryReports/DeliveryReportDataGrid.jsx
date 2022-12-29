import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import moment from "moment";
import DownloadIcon from "@mui/icons-material/Download";
import PinDropIcon from "@mui/icons-material/PinDrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
// import ReportDataGridProServer from "../../../../components/DataTable/ReportDataGridProServer";
import ReportDataGridPro from "../../../../components/DataTable/ReportDataGridPro";
import Axios from "axios";
import ExportPopup from "../../../../components/exportPopup/ExportPopup";
import { commaFormatter, sortingDateFormatter } from "../../../../_constant";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
};

const DeliveryReportDataGrid = ({
  rows,
  filterState,
  loading,
  setIsLoading,
  handlePagination,
  rowCount,
  pageSize,
  setPageSize,
  addQuantity,
}) => {
  const { t } = useTranslation();
  const customerId = localStorage.getItem("CustomerNumber");
  const [openDispatched, setOpenDispatched] = useState(false);
  const [deliveredData, setDeliveredData] = useState(null);
  const [dispatchData, setDispatchData] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const lancode = localStorage.getItem("lancode");
  const [dwnReportName, setDWNReportName] = useState("");

  const handleOpenDispatched = (params) => {
    Axios({
      method: "GET",
      url:
        process.env.REACT_APP_API_URL_RS +
        `/report/gps/getLocation?truckLicense=${params.truckLicence}&doNumber=${params.doNumber}`,
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
        "X-SOLD-TO-ID": customerId,
      },
    })
      .then(async (response) => {
        if (response.data.data) {
          setDispatchData({ ...params, ...response.data.data });
          setOpenDispatched(true);
        } else {
          setErrorData(params);
          setOpenError(true);
        }
      })
      .catch((err) => {
        setErrorData(params);
        setOpenError(true);
      });
  };
  const handleCloseDispatched = (params) => {
    setOpenDispatched(false);
  };

  const [openDelivered, setOpenDelivered] = React.useState(false);

  const handleOpenDelivered = (params) => {
    Axios({
      method: "GET",
      url:
        process.env.REACT_APP_API_URL_RS +
        `/report/gps/getLocation?truckLicense=${params.truckLicence}&doNumber=${params.doNumber}`,

      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
        "X-SOLD-TO-ID": customerId,
      },
    })
      .then(async (response) => {
        if (response.data.data) {
          setDeliveredData({ ...params, ...response.data.data });
          setOpenDelivered(true);
        } else {
          setErrorData(params);
          setOpenError(true);
        }
      })
      .catch((err) => {
        setErrorData(params);
        setOpenError(true);
      });
  };

  const handleCloseDelivered = () => setOpenDelivered(false);

  const [openError, setOpenError] = React.useState(false);
  const handleOpenError = () => setOpenError(true);
  const handleCloseError = () => setOpenError(false);

  const [openExportPopup, setOpenExportPopup] = useState(null);
  // Export Excel
  const [exportState, setExportState] = useState({
    btnName: "EXPORT",
    linkToDownload: null,
  });

  const downloadReporta = (params) => {
    setExportState({ btnName: "Exporting..." });
    setIsLoading(true);
    setDWNReportName(`Delivery_SCCC_${params.doNumber}`)
    Axios({
      method: "GET",
      url:
        process.env.REACT_APP_API_URL_RS +
        `/report/download/deliveryDms?customercode=${customerId}&donumber=${params.doNumber}`,
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": localStorage.getItem("x-auth-token"),
        "X-SOLD-TO-ID": customerId,
      },
    })
      .then(async (response) => {
        setIsLoading(false);
        setOpenExportPopup(true);
        setExportState({ btnName: "EXPORT", linkToDownload: response.data });
      })
      .catch((err) => {
        setExportState({ btnName: "EXPORT" });
      });
  };

  const columns = [
    {
      field: "download",
      headerName: t("report.download"),
      headerAlign: "center",
      align: "center",
      width: 100,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <DownloadIcon
            className="cursorPointer"
            onClick={() => downloadReporta(row)}
          />
        );
      },
    },
    {
      field: "poNumber",
      headerName: t("report.poNo"),
      headerAlign: "center",
      align: "center",
      width: 250,
      sortable: true,
    },
    {
      field: "contractNumber",
      headerName: t("report.contractNo"),
      headerAlign: "center",
      align: "center",
      width: 120,
    },

    {
      field: "contractName",
      headerName: t("report.contractName"),
      headerAlign: "center",
      align: "left",
      width: 150,
    },
    {
      field: "soNumber",
      headerName: t("report.soNo"),
      headerAlign: "center",
      align: "center",
      width: 150,
      sortable: true,
    },
    {
      field: "shipmentNumber",
      headerName: t("report.shipmentNo"),
      headerAlign: "center",
      align: "center",
      width: 150,
      sortable: true,
    },
    {
      field: "doNumber",
      headerName: t("report.doNo"),
      headerAlign: "center",
      align: "center",
      width: 120,
      sortable: true,
    },
    {
      field: "po_date",
      headerName: t("report.poDate"),
      headerAlign: "center",
      align: "center",
      width: 120,
      sortable: true,
      type: "date",
      renderCell: ({ row }) => {
        return <div>{moment(row.po_date).format("DD-MM-YYYY")}</div>;
      },
    },
    {
      field: lancode === "en" ? "shipmentStatus" : "shipmentStatusTH",
      headerName: t("report.shipmentStatus"),
      headerAlign: "center",
      align: "center",
      width: 140,
      sortable: true,
      renderCell: ({ row }) => {
        const lancode = localStorage.getItem("lancode");
        return (
          <div>
            {lancode === "en" ? row.shipmentStatus : row.shipmentStatusTH}
          </div>
        );
      },
    },
    {
      field: "shipToNumber",
      headerName: t("report.shipNo"),
      headerAlign: "center",
      align: "center",
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
      align: "left",
      width: 250,
      sortable: true,
      renderCell: ({ row }) => {
        const lancode = localStorage.getItem("lancode");
        return (
          <div>{lancode === "en" ? row.shipToNameEN : row.shipToNameTH}</div>
        );
      },
    },
    {
      field: lancode === "en" ? "plantNameEn" : "plantNameTh",
      headerName: t("report.plantName"),
      headerAlign: "center",
      align: "center",
      width: 150,
      sortable: true,
      renderCell: ({ row }) => {
        const lancode = localStorage.getItem("lancode");
        return (
          <div>{lancode === "en" ? row.plantNameEn : row.plantNameTh}</div>
        );
      },
    },
    {
      field: lancode === "en" ? "shippingConditionEn" : "shippingConditionTh",
      headerName: t("report.shippingCondition"),
      headerAlign: "center",
      align: "center",
      width: 150,
      sortable: true,
      renderCell: ({ row }) => {
        const lancode = localStorage.getItem("lancode");
        return (
          <div>
            {lancode === "en"
              ? row.shippingConditionEn
              : row.shippingConditionTh}
          </div>
        );
      },
    },
    {
      field: lancode === "en" ? "shippingTypeEn" : "shippingTypeTh",
      headerName: t("report.shipmentType"),
      headerAlign: "center",
      align: "center",
      width: 250,
      sortable: true,
      renderCell: ({ row }) => {
        const lancode = localStorage.getItem("lancode");
        return (
          <div>
            {lancode === "en" ? row.shippingTypeEn : row.shippingTypeTh}
          </div>
        );
      },
    },
    {
      field: "product",
      headerName: t("report.productNo"),
      headerAlign: "center",
      align: "center",
      width: 150,
      sortable: true,
    },
    {
      field: lancode === "en" ? "productNameEn" : "productNameTh",
      headerName: t("report.productName"),
      headerAlign: "center",
      align: "left",
      width: 300,
      sortable: true,
      renderCell: ({ row }) => {
        const lancode = localStorage.getItem("lancode");
        return (
          <div>{lancode === "en" ? row.productNameEn : row.productNameTh}</div>
        );
      },
    },
    {
      field: "quantityBag",
      headerName: t("report.quantity"),
      headerAlign: "center",
      align: "right",
      width: 150,
      sortable: true,
      renderCell: ({ row }) => {
        return <div>{commaFormatter(row.quantityBag, 3)}</div>;
      },
    },
    {
      field: "unit",
      headerName: t("report.unit"),
      headerAlign: "center",
      align: "center",
      width: 100,
      sortable: true,
    },
    {
      field: "truckLicence",
      headerName: t("report.TruckNo"),
      headerAlign: "center",
      align: "center",
      width: 150,
      sortable: true,
    },
    {
      field: "gateIn",
      headerName: t("report.geteIn"),
      headerAlign: "center",
      align: "center",
      width: 150,
      sortable: true,
      renderCell: ({ row }) => {
        return row.gateIn ? (
          <div>{moment(row.gateIn).format("DD-MM-YYYY HH:mm:ss")}</div>
        ) : (
          ""
        );
      },
    },
    {
      field: "checkIn",
      headerName: t("report.checkIn"),
      headerAlign: "center",
      align: "center",
      width: 150,
      sortable: true,
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
      headerAlign: "center",
      align: "center",
      width: 150,
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
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: ({ row }) => {
        return row.weightOut ? (
          <div>{moment(row.weightOut).format("DD-MM-YYYY HH:mm:ss")}</div>
        ) : (
          ""
        );
      },
    },
    {
      field: "timeSpentInPlant",
      headerName: t("report.timeSpent"),
      headerAlign: "center",
      align: "center",
      width: 220,
      sortable: true,
    },
    {
      field: "truckLocation",
      headerName: t("report.truckLocation"),
      headerAlign: "center",
      align: "center",
      width: 150,
      sortable: false,
      renderCell: ({ row }) => {
        if (
          (row.shipmentStatus === "Dispatched" && row.shipmentNumber != "" && row.shipmentNumber != null &&
            (row.shippingCondition ===
              "จัดส่ง + อุปกรณ์ขนถ่าย - Delivery + MHE" ||
              row.shippingCondition === "จัดส่ง - Delivery" ||
              row.shippingCondition === "จัดส่ง+ขนลง - Delivery + Labor")) ||
          (row.shipmentStatus === "Delivered" &&
            (row.shippingCondition ===
              "จัดส่ง + อุปกรณ์ขนถ่าย - Delivery + MHE" ||
              row.shippingCondition === "จัดส่ง - Delivery" ||
              row.shippingCondition === "จัดส่ง+ขนลง - Delivery + Labor"))
        ) {
          function clickDrop() {
            if (row.shipmentStatus === "Dispatched") {
              handleOpenDispatched(row);
            } else if (row.shipmentStatus === "Delivered") {
              handleOpenDelivered(row);
            } else {
              handleOpenError();
            }
          }
          return <PinDropIcon onClick={clickDrop} className="cursorPointer" />;
        }
      },
    },
  ];

  function makeUniqueRow(rows) {
    const uniqueRow =
      rows &&
      rows.length > 0 &&
      rows.map((item, index) => {
        return {
          ...item,
          id: index,
          po_date: sortingDateFormatter(item.orderDate),
          quantityBag: Number(item.quantityBag),
          product: Number(item.product),
        };
      });
    console.log("uniqueRow  ", uniqueRow);
    return Array.isArray(uniqueRow) ? uniqueRow : [];
  }

  function remarkThaiToggle() {
    const lancode = localStorage.getItem("lancode");
    return lancode === "en" ? `**Remarks: Please check status of your delivery order on shipment
    date for data accuracy because the estimated time of shipment will
    be only calculated from the distance and the average speed of
    carrier, excluding traffic condition, long distance break, force
    majeure (such as natural disasters or abnormal weather conditions),
    and other factors.` : `**หมายเหตุ: โปรดตรวจสอบสถานะการจัดส่งด้วยวันที่จัดส่งเพื่อความถูกต้องของข้อมูล เนื่องจากเวลาจัดส่งโดยประมานจะคำนวนจากระยะทางและความเร็วเฉลี่ยของผู้ให้บริการ, ไม่รวมสภาพการจราจร, การหยุดพักระยะไกล, เหตุสุดวิสัย (เช่นภัยธรรมชาติ หรือสภาพอากาศไม่ปกติ) และปัจจัยอื่น ๆ`;
  }

  function serviceNotFound() {
    const lancode = localStorage.getItem("lancode");
    return lancode === "en" ? ` Service is temporarily unable to service your service.
    Please try again later. Sorry for your inconvenience.`: "ไม่สามารให้บริการได้ชั่วคราว โปรดลองอีกครั้งในภายหลัง ขออภัยในความไม่สะดวก";
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
        loading={loading}
        totalWithTitle={`${t("report.sumTotalQuantity")} : ${commaFormatter(
          addQuantity,
          3
        )}`}
      />
      {/* <ReportDataGridProServer
        rows={makeUniqueRow(rows)}
        columns={columns}
        totalWithTitle={`${t("report.sumTotalQuantity")} : ${commaFormatter(
          addQuantity,
          3
        )}`}
        loading={loading}
        handlePagination={handlePagination}
        rowCount={rowCount}
        pageSize={pageSize}
        setPageSize={setPageSize}
      /> */}


      <Modal
        open={openDispatched}
        onClose={handleCloseDispatched}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>{t("PO Number")} : {dispatchData?.poNumber}</p>
          <p>{t("do_number")} : {dispatchData?.doNumber}</p>
          <p>
            {t("Destination")} : {(dispatchData?.shipToNumber * 1).toString()}-
            {lancode === "en"
              ? dispatchData?.shipToNameEN
              : dispatchData?.shipToNameTH}
          </p>
          <p>Truck License : {dispatchData?.truckLicence}</p>
          <p>{t("Current Truck Location")} : {dispatchData?.location}</p>
          <p>{"Estimated Arrival Time"} : {dispatchData?.eta}</p>
          <p className="remark">
            {remarkThaiToggle()}
          </p>
          <p className="text-right text-justify small">
            Request Time : {moment().format("DD/MM/YYYY HH:mm")}
          </p>
          <Button
            variant="contained"
            className="btncolor"
            size="small"
            sx={{ m: 1 }}
            style={{ margin: "0 auto", display: "flex" }}
            onClick={handleCloseDispatched}
          >
            {t("CLOSE")}
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openDelivered}
        onClose={handleCloseDelivered}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>{t("PO Number")} : {deliveredData?.poNumber}</p>
          <p>{t("do_number")} : {deliveredData?.doNumber}</p>
          <p>
            {t("Destination")} : {deliveredData?.shipToNumber * 1}-
            {lancode === "en"
              ? deliveredData?.shipToNameEN
              : deliveredData?.shipToNameTH}
          </p>
          <p className="remark-status">{t("Shipment Delivered")}</p>
          <p className="text-right text-justify small">
            Request Time : {moment().format("DD/MM/YYYY HH:mm")}
          </p>
          <Button
            variant="contained"
            className="btncolor"
            size="small"
            sx={{ m: 1 }}
            style={{ margin: "0 auto", display: "flex" }}
            onClick={handleCloseDelivered}
          >
            {t("CLOSE")}
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openError}
        onClose={handleCloseError}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>{t("PO Number")} : {errorData?.poNumber}</p>
          <p>{t("do_number")} : {errorData?.doNumber}</p>
          <p>
            {t("Destination")} : {errorData?.shipToNumber * 1}-
            {lancode === "en"
              ? errorData?.shipToNameEN
              : errorData?.shipToNameTH}
          </p>
          <p className="remark">
            {/* Service is temporarily unable to service your service.
            <br />
            Please try again later. Sorry for your inconvenience. */}
            {serviceNotFound()}
          </p>
          <p className="text-right text-justify small">
            Request Time : {moment().format("DD/MM/YYYY HH:mm")}
          </p>
          <Button
            variant="contained"
            className="btncolor"
            size="small"
            sx={{ m: 1 }}
            style={{ margin: "0 auto", display: "flex" }}
            onClick={handleCloseError}
          >
            {t("CLOSE")}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default withTranslation()(DeliveryReportDataGrid);
