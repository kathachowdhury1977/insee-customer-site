import React, { useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import ReportFooter from "../Footer/ReportFooter";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
};

const ReportDataGrid = ({ rows, columns, loading, totalWithTitle }) => {
  const { t } = useTranslation();
  const [pageSize, setPageSize] = React.useState(20);
  const [page, setPage] = React.useState(0);
  const [sortModel, setSortModel] = React.useState([]);

  useEffect(() => {
    setPage(0);
    setPageSize(20);
    setSortModel([]);
  }, [rows]);

  return (
    <>
      <DataGrid
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        rows={rows}
        columns={columns}
        loading={loading ? loading : false}
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        components={{
          Toolbar: CustomToolbar,
        }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
        }}
        rowsPerPageOptions={[20, 50, 75, 100]}
        disableSelectionOnClick
        autoHeight={true}
        disableColumnMenu={true}
        disableColumnSelector={true}
        componentsProps={{
          pagination: {
            labelRowsPerPage: t("report.perPage"),
          },
        }}
        localeText={{
          noRowsLabel: t("report.noData"),
        }}
      />
      {totalWithTitle && <ReportFooter title={totalWithTitle} />}
    </>
  );
};

export default ReportDataGrid;
