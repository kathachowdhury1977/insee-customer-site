import React, { useEffect, useState } from 'react';
import ReportFooter from '../Footer/ReportFooter';
import { useTranslation } from "react-i18next";

import { DataGridPro, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarDensitySelector, nlNL } from '@mui/x-data-grid-pro';
import { customStableSort } from '../../_helpers';
const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
        </GridToolbarContainer>
    );
};

const ReportDataGridPro = ({ rows, columns, loading, totalWithTitle, uniqueId, handlePagination, rowCount, clearDensity }) => {
    const { t } = useTranslation();
    const [pageSize, setPageSize] = React.useState(20);
    const [sortModel, setSortModel] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [sortedRow, setSortedRow] = useState([])


    useEffect(() => {
        setPage(0);
        setPageSize(20)
        setSortModel([])
        setSortedRow(rows)
    }, [rows])

    // ===============================================
    // function descendingComparator(a, b, orderBy) {
    //     if (b[orderBy] < a[orderBy]) {
    //         return -1;
    //     }
    //     if (b[orderBy] > a[orderBy]) {
    //         return 1;
    //     }
    //     return 0;
    // }
    // ===================================================

    // function getComparator(order, orderBy) {
    //     return order === 'desc'
    //         ? function (a, b) { return descendingComparator(a, b, orderBy); }
    //         : function (a, b) { return -descendingComparator(a, b, orderBy); };
    // }

    // =================================================

    // function stableSort(array, comparator) {
    //     var stabilizedThis = array.map(function (el, index) { return [el, index]; });
    //     stabilizedThis.sort(function (a, b) {
    //         var order = comparator(a[0], b[0]);
    //         if (order !== 0) {
    //             return order;
    //         }
    //         return a[1] - b[1];
    //     });
    //     return stabilizedThis.map(function (el) { return el[0]; });
    // }


    // ===============================================
    function customSortModel(model) {
        // if (model[0]) {
        //     const { field, sort } = model[0]
        //     setSortedRow([...stableSort(rows, getComparator(sort, field))])
        // }
        setSortedRow(customStableSort(rows, model))
        setSortModel(model)
    }

    return (
        <>
            <DataGridPro
                components={{ Toolbar: CustomToolbar }}
                rows={Array.isArray(sortedRow) ? sortedRow : []}
                columns={columns}
                sortingMode="server"
                loading={loading ? loading : false}
                page={page}
                onPageChange={(newPage) => setPage(newPage)}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[20, 50, 75, 100]}
                disableSelectionOnClick
                autoHeight={true}
                disableColumnMenu={true}
                disableColumnReorder={true}
                disableColumnSelector={true}
                pagination={true}
                componentsProps={{
                    pagination: {
                        labelRowsPerPage: t('report.perPage')
                    },
                }}
                localeText={{
                    noRowsLabel: t("report.noData")
                }}
                {...(uniqueId && { getRowId: (row) => row[uniqueId] })}
                rowCount={rowCount}
                // paginationMode="server"
                sortModel={sortModel}
                onSortModelChange={(newSortModel) => customSortModel(newSortModel)}
                {...(clearDensity && { density: clearDensity })}
            // density={clearDensity}
            />
            {totalWithTitle &&
                <ReportFooter title={totalWithTitle} />
            }
        </>
    )
}

export default React.memo(ReportDataGridPro);