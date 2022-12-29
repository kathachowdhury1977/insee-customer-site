import React, { useEffect } from "react";
import ReportFooter from "../Footer/ReportFooter";
import { useTranslation } from "react-i18next";

import {
  DataGridPro,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-pro";
const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
};

const ReportDataGridProServer = ({
  rows,
  columns,
  loading,
  totalWithTitle,
  uniqueId,
  handlePagination,
  rowCount,
  pageSize,
  setPageSize,
}) => {
  const { t } = useTranslation();
  // const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(0);
  rowCount = rowCount ?? 0;
  const [sortModel, setSortModel] = React.useState([]);

  function handlePageSizeChange(newPageSize) {
    if (rowCount) {
      handlePagination(newPageSize, 0);
    }
    console.log("endCount=>", newPageSize)
    setPageSize(newPageSize);
    setPage(0);
  }

  function handleNewPage(p) {
    setPage(p);
    console.log("endCount=>", pageSize)
    handlePagination(pageSize, p);
  }

  useEffect(() => {
    setSortModel([]);
  }, [rows]);

  return (
    <>
      <DataGridPro
        page={page}
        components={{ Toolbar: CustomToolbar }}
        rows={Array.isArray(rows) ? rows : []}
        columns={columns}
        loading={loading ? loading : false}
        onPageChange={(newPage) => handleNewPage(newPage)}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => handlePageSizeChange(newPageSize)}
        rowsPerPageOptions={[20, 50, 75, 100]}
        disableSelectionOnClick
        autoHeight={true}
        disableColumnMenu={true}
        disableColumnReorder={true}
        pagination={true}
        componentsProps={{
          pagination: {
            labelRowsPerPage: t("report.perPage"),
          },
        }}
        localeText={{
          noRowsLabel: t("report.noData"),
        }}
        {...(uniqueId && { getRowId: (row) => row[uniqueId] })}
        // {...(rowCount && {rowCount: rowCount} )}
        rowCount={rowCount}
        paginationMode="server"
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
      />
      {totalWithTitle && <ReportFooter title={totalWithTitle} />}
    </>
  );
};

export default React.memo(ReportDataGridProServer);
