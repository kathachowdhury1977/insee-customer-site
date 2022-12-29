import React, { useState } from "react";
import {
  DataGridPro,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  gridVisibleSortedRowIdsSelector,
  useGridApiRef,
  gridPaginatedVisibleSortedGridRowIdsSelector,
} from "@mui/x-data-grid-pro";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Axios from "axios";
import { withTranslation, useTranslation } from "react-i18next";
import ExportPopup from "../exportPopup/ExportPopup";

// import { API_URL_ADMIN, API_URL_LMS } from "../../Constant/index";
import { ExportDataGrid } from "../../_helpers/commonFunctions";
import UploadIcon from "@mui/icons-material/Upload";

const DataGridProMUI = (props) => {
  const [openExportPopup, setOpenExportPopup] = useState(null);

  const [exportState, setExportState] = useState({
    btnName: "EXPORT",
    linkToDownload: null,
  });
  //const [visibleRows, setVisibleRows] = React.useState();
  const apiRef = useGridApiRef();
  const { t } = useTranslation();
  const onExportClick = () => {
    let dataToExport = getExportData();
    ExportDataGrid(
      props.ExpFilecolHeadings,
      props.ExpFilecolKeys,
      dataToExport,
      props.ExportDateFormatIndexes,
      props.ExportFileName,
      props.excelFormating,
      props.excelDataTransformConfig
    );
  };

  // const CustomToolbar = () => {
  //   return (
  //     <GridToolbarContainer>
  //       <GridToolbarColumnsButton />
  //       <GridToolbarDensitySelector />
  //       <div className="ExportAndSearchContainer">
  //         {props.enableUpload && (
  //           <Button
  //             variant="outlined"
  //             startIcon={<UploadIcon />}
  //             onClick={props.enableUpload}
  //           >
  //             {"Upload"}
  //           </Button>
  //         )}
  //         <Button
  //           variant="outlined"
  //           startIcon={<DownloadIcon />}
  //           onClick={onExportClick}
  //         >
  //           Export
  //         </Button>
  //         {props.enableQuickSearch && <GridToolbarQuickFilter />}
  //       </div>
  //     </GridToolbarContainer>
  //   );
  // };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarDensitySelector />
        <div className="ExportAndSearchContainer">
          {props.enableUpload && (
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              onClick={props.enableUpload}
            >
              {"Upload"}
            </Button>
          )}
          {(props?.shouldShowExportButton ?? true) && (
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={onExportClick}
            >
              {t("Export")}
            </Button>
          )}
          {props.enableQuickSearch && <GridToolbarQuickFilter />}
        </div>
      </GridToolbarContainer>
    );
  };

  // returns the data which are displyed on DataGrid
  const getExportData = () => {
    let finalRows = [];
    const visibleRows = gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);
    console.log("visibleRows", visibleRows);
    for (let i = 0; i < visibleRows.length; i++) {
      let curRow = props.rows.filter((r) => {
        return r.id == visibleRows[i];
      });
      finalRows.push(curRow[0]);
    }
    console.log("finalRows", finalRows);
    return finalRows;
  };

  const getDetailPanelHeight = React.useCallback(() => "auto", []);

  return (
    <div>
      <DataGridPro
        style={{ fontSize: "14px" }}
        rows={props.rows}
        columns={props.columns}
        components={{ Toolbar: CustomToolbar }}
        pageSize={props.pageSize}
        rowsPerPageOptions={props.rowsPerPageOptions}
        labelRowsPerPage={t(props.labelRowsPerPage)}
        getDetailPanelHeight={getDetailPanelHeight}
        pagination={true}
        loading={props.loading}
        onPageSizeChange={props.onPageSizeChange}
        localeText={{
          noRowsLabel: t("label.No_Data"),
          MuiTablePagination: {
            labelDisplayedRows: ({ from, to, count }) =>
              `${from} - ${to} ${t("of")} ${count}`,
          },
        }}
        componentsProps={{
          pagination: {
            labelRowsPerPage: t("report.perPage"),
          },
        }}
        // onStateChange={(state) => {
        //   const newRows = gridVisibleSortedRowIdsSelector(state);
        //   //console.log("visible Rows", newRows);
        //   //setVisibleRows(newRows);
        // }}
        apiRef={apiRef}
        autoHeight={true}
      />

      <ExportPopup
        title={""}
        openPopup={openExportPopup}
        setOpenExportPopup={setOpenExportPopup}
        linkToDownload={exportState.linkToDownload}
      />
    </div>
  );
};

DataGridProMUI.defaultProps = {
  pageSize: 25,
  rowsPerPageOptions: [25, 50, 75, 100],
  pagination: true,
  labelRowsPerPage: "lable.RowsPerPage",
  enableQuickSearch: true,
  enableMasterDetail: false, //make it true and also pass detailComponent as props that will be displayed on click of '+' button in each row.
  style: { display: "flex", height: "350px", marginTop: "10px" },
  noRowsLabel: "No rows",
  loading: false,
};

export default DataGridProMUI;
