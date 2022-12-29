import React, {useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Loading from '../../components/Loader/Loading'
import { paymentofflineActions } from "../../_actions";
import { withTranslation, useTranslation } from "react-i18next";
import "./table.scss";
import moment from "moment";
import "moment-timezone";
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {

    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

const rows = [
    createData('09/11/2021', 'Offset', 6.0, 24, 4.0),
   
  ];

const useStyles = makeStyles({
    loading: {

    },
    table: {
        minWidth: 700,
      
    },
    textRight : {
        textAlign: 'right !important'
    },
    SummaryTd: {
        background: '#ccc',
        '& th' : {
            fontSize: '12px !important',
            padding: '10px !important', 
        },
        '& td': {
            fontSize: '12px !important',
            padding: '10px !important', 
        }
    },
    tableBody : {
        '& th' : {
            fontSize: '12px !important',
            padding: '10px !important', 
        },
        '& td': {
            fontSize: '12px !important',
            padding: '10px !important', 
        }
    }
});


    const OffInvoiceCharge = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    var storedNames = JSON.parse(localStorage.getItem("paymentid"));
    let custmerNo = localStorage.getItem('CustomerNumber');
    const selectedLangCode = localStorage.getItem('lancode');
    useEffect(() =>{

        dispatch(paymentofflineActions.getPendingPaymentStatus("check", custmerNo));
    },[]);

  

  
    console.log(rows, 'rows789')
    return (
        <div className="table-resp">

<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Payment Date</StyledTableCell>
            <StyledTableCell align="right">Payment Method</StyledTableCell>
            <StyledTableCell align="right">Amount Before VAT (VND)</StyledTableCell>
            <StyledTableCell align="right">Amount After VAT (VND)</StyledTableCell>
            <StyledTableCell align="right">Billing No</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name} className={classes.tableBody}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    );
}


export default withTranslation()(OffInvoiceCharge);