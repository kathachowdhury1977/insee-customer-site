import React from "react";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import Popup from "../Popup/Popup";
import "./ExportPopup.scss";
import { useTranslation } from "react-i18next";

const ExportPopup = (props) => {
  const { linkToDownload, title, fileName, openPopup, setOpenExportPopup } = props;
  const { t } = useTranslation();

  const downloadFile = () => {
    var link = document.createElement('a');
    const file = new Blob([linkToDownload], { type: 'application/.pdf' });
    link.href = window.URL.createObjectURL(file);
    link.download = fileName + ".pdf";
    link.click();
    setOpenExportPopup(false);
  };

  const lang = localStorage.getItem('lancode');
 
  return (
    <Popup
      title={title}
      openPopup={openPopup}
      setOpenPopup={setOpenExportPopup}
    >
      <div className="ExpClsIcon">
        <CloseIcon
          onClick={() => {
            setOpenExportPopup(false);
          }}
        />
      </div>
      <div className="ExportDwnldBtnContainer">
        <h6>{lang === "en" ? "Your file is ready for download." : "ไฟล์ของคุณพร้อมที่จะดาวน์โหลด"}</h6>
        <Button
          variant="outlined"
          size="small"
          startIcon={<DownloadIcon />}
          style={{ textTransform: "none" }}
          onClick={downloadFile}
          className="ExpDwnldBtn"
        >
          {t("report.download")}
        </Button>
      </div>
    </Popup>
  );
};

export default ExportPopup;
