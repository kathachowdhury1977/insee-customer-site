import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { visuallyHidden } from '@mui/utils';
import Collapse from '@mui/material/Collapse';
// import AddIcon from '@mui/icons-material/Add';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


function Row(props) {
    const { row, collapseColumns, columns } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell >
                    {row.history && row.history.length > 0 &&
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <RemoveIcon /> : <AddIcon />}
                        </IconButton>
                    }
                </TableCell>
                {/* <TableCell>
                    <DownloadIcon />

                </TableCell> */}
                {/* <TableCell align="center" className='border-left'>{row.documentNumber}</TableCell>
                <TableCell align="left">
                    {row.date}
                </TableCell> */}

                {columns && columns.length > 0 &&
                    columns.map((cal) => {
                        // console.log(cal.renderCell === undefined)
                        if (cal.renderCell === undefined) {
                            return (
                                <TableCell align="left">{row[cal.name]}</TableCell>
                            )
                        } else {
                            return (

                                <TableCell align="left" onClick={() => cal.renderCell(row)}>{cal.renderCell(row)}</TableCell>
                            )
                        }
                    }

                    )
                }


                {/* <TableCell align="left">{row.newDueDate}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.wht}</TableCell>
                <TableCell align="right">{row.netAmount}</TableCell>
                <TableCell align="right">{row.price}</TableCell> */}
            </TableRow>
            {collapseColumns && collapseColumns.length > 0 &&
                <TableRow >
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ marginTop: 1, marginBottom: 1, marginLeft: 5, marginRight: 50, borderLeft: 1, borderRight: 1, borderColor: "#D5DBDB" }}>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            {collapseColumns.map((head) =>
                                                <TableCell
                                                    key={head.name}
                                                >
                                                    {head.label}
                                                </TableCell>
                                            )}
                                            {/* <TableCell>Tax Invoice Number</TableCell>
                                        <TableCell>Month</TableCell>
                                        <TableCell align="right">Product</TableCell>
                                        <TableCell align="right">Cond Base Value</TableCell>
                                        <TableCell align="right">Rate</TableCell>
                                        <TableCell align="right">Accurals</TableCell> */}
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {row.history.map((historyRow, index) => (
                                            <TableRow key={historyRow.txtInvoiceNumber}>
                                                <TableCell>{historyRow.txtInvoiceNumber}</TableCell>
                                                <TableCell>{historyRow.month}</TableCell>
                                                <TableCell>{historyRow.productNo}</TableCell>
                                                <TableCell>{historyRow.condBaseValue}</TableCell>
                                                <TableCell>{historyRow.rate} </TableCell>
                                                <TableCell> {historyRow.accurals}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            }
        </React.Fragment>
    );
}




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
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort, columns } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {columns.map((headCell) => (
                    <TableCell
                        key={headCell.name}
                        align={headCell.align}
                        padding={'normal'}
                        sortDirection={orderBy === headCell.name ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.name}
                            direction={orderBy === headCell.name ? order : 'asc'}
                            onClick={createSortHandler(headCell.name)}
                            style={{
                                width: headCell.width ?? 100
                            }}
                        >
                            {headCell.label}
                            {orderBy === headCell.name ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


export default function ReportDataGridAdvance({ columns, collapseColumns, rows }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            columns={columns}
                            collapseColumns={collapseColumns}
                        />
                        <TableBody>

                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) =>
                                    <Row key={row.name} row={row} columns={columns} collapseColumns={collapseColumns} />
                                )}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Box>
    );
}
