import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { paymentofflineActions, masterActions } from "../../_actions";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import EyeLogo from "../../assets/img/eyeIcon.png";
import moment from "moment";
import { withTranslation, useTranslation } from "react-i18next";
import "moment-timezone";
import "./table.scss";

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
  root: {},
}))(TableRow);

function createData(
  docname,
  doctype,
  pono,
  docdate,
  duedate,
  noofdueday,
  totalamount,
  status,
  action
) {
  return {
    docname,
    doctype,
    pono,
    docdate,
    duedate,
    noofdueday,
    totalamount,
    status,
    action,
  };
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  containerTable: {
 //   maxHeight: 1000,
  },

  table: {
    minWidth: 700,
  },
  tableBody: {
    "& th": {
     
      padding: "10px !important",
    },
    "& td": {
     
      padding: "10px !important",
    },
  },
  textRight: {
    textAlign: "right !important",
  },
  childtableBody: {
    background: "#ccc",
    "& th": {
     
      padding: "10px !important",
    },

    "& td": {
     
      padding: "10px !important",
    },
    ".text-right": {
      textAlign: "center",
    },
  },
});
const PaymentTable = (props) => {
  debugger;

  let custmerNo = localStorage.getItem("CustomerNumber");
  const classes = useStyles();
  const getpendingpay = useSelector((state) => state.getpendingpay);
  const dispatch = useDispatch();
  const selectedLangCode = localStorage.getItem("lancode");
  const tablePending = props.Pending;
  const [isChecked, setIsChecked] = useState({});
  const [summaryOpen, setSummaryOpen] = useState({});
  const { t } = useTranslation();
  let userName = localStorage.getItem('userData');
  userName = JSON.parse(userName);
  const summaryOpenToggle = (id) => {
    if (summaryOpen[`childTable${id}`]) {
      setSummaryOpen({ ...summaryOpen, [`childTable${id}`]: false });
    } else {
      setSummaryOpen({ ...summaryOpen, [`childTable${id}`]: true });
    }
  };
  // let dataArr =
  //   tablePending &&
  //   tablePending.results.map((item) => {
  //     if (item.soiNumber == null) {
  //       return [item, item];
  //     } else {
  //       return [item.soiNumber, item];
  //     }
  //   });

  // let maparr = new Map(dataArr);
  // let pendingresultData = [...maparr.values()];

  let pendingresultData =  tablePending &&  tablePending.results
  console.log(pendingresultData, "result789");

  let page = props.page;

  const totalAmountForSummary = (totalSummaryAmount, currentValue) => {
    return Number(
      parseFloat(totalSummaryAmount) +
        parseFloat(currentValue.amountDocCurrency)
    ).toFixed(2);
  };

  const totalDueDaaysForSummary = (totalSummaryDuedays, currentDays) => {
    return Number(
      parseFloat(totalSummaryDuedays) + parseFloat(currentDays.overdueDays)
    );
  };

  const decimalwithcoma = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  };
  const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)

  return (
    <div className="table-resp">
     
      <Paper className={classes.root}>
        <TableContainer className={classes.containerTable} >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>{t("Document No.")}</StyledTableCell>
                <StyledTableCell align="right"  style={{fontSize:`${SmallFontChanger}px`}}>
                  {t("Document Type")}
                </StyledTableCell>
                <StyledTableCell align="center"  style={{fontSize:`${SmallFontChanger}px`}}>
                  {t("PO Number/Cheque Number")}
                </StyledTableCell>
                <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>
                  <span style={{cursor:'pointer'}} onClick={props.sortDocumentDate}>
                  {t("Document Date")} 
                  <i class="fa fa-fw fa-sort"></i>
                  </span>
                  
                </StyledTableCell>
                <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>
                <span style={{cursor:'pointer'}} onClick={props.sortDueDate}>
                {t("Due Date")}
                  <i class="fa fa-fw fa-sort"></i>
                  </span>
                  
                  
                </StyledTableCell>
                <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>
                  
                  <span style={{cursor:'pointer'}} onClick={props.sortNoOfDueDate}>
                  {t("Numbers of Due Days")}
                  <i class="fa fa-fw fa-sort"></i>
                  </span>
                </StyledTableCell>
                <StyledTableCell align="center" className={classes.textRight} style={{fontSize:`${SmallFontChanger}px`}}>
                  {t("label.total_amount")}{" "}
                  {selectedLangCode === "en" || selectedLangCode === null
                    ? `(${
                        pendingresultData && pendingresultData && pendingresultData.length > 0
                          ? pendingresultData && 
                            pendingresultData[0].docCurrency
                          : ""
                      })`
                    : pendingresultData && pendingresultData.length > 0 && 
                      pendingresultData[0].docCurrency === "THB"
                    ? "(บาท)"
                    : pendingresultData && pendingresultData.length > 0 && 
                      pendingresultData[0].docCurrency === "USD"
                    ? "(ดอลล่าร์)"
                    : `(${
                        pendingresultData && pendingresultData.length > 0
                          ? pendingresultData &&
                            pendingresultData[0].docCurrency
                          : ""
                      })`}
                </StyledTableCell>
                <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="center">{t('Status')}</StyledTableCell>
                <StyledTableCell  style={{fontSize:`${SmallFontChanger}px`}} align="right">{t("Actions")}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingresultData && pendingresultData.length > 0 ? (
                pendingresultData &&
                pendingresultData.map((row, i) => (
                  <>
                    <StyledTableRow
                      key={row.name}
                      className={classes.tableBody}
                    >
                      <StyledTableCell align="center"  style={{fontSize:`${SmallFontChanger}px`}}>
                        {row.soiNumber ? row.soiNumber : row.invoiceDoc}
                      </StyledTableCell>
                      <StyledTableCell align="center"  style={{fontSize:`${SmallFontChanger}px`}}>
                        {row.soiNumber
                          ? "Summary"
                          : `${
                              row.DocumentType === "C/N" ? "Credit Note" : ""
                            } ${row.DocumentType === "INV" ? "Invoice" : ""} 
                            ${
                              row.DocumentType === "D/N" ? "Debit Note" : ""
                            }
                                ${
                                  row.DocumentType === "CQR"
                                    ? "Cheque returned"
                                    : ""
                                }
                                `}
                      </StyledTableCell>
                      <StyledTableCell align="center"  style={{fontSize:`${SmallFontChanger}px`}}>
                        {row.customerPONumber}
                      </StyledTableCell>
                      <StyledTableCell align="center  " style={{fontSize:`${SmallFontChanger}px`}}>
                        {moment(row.documentDate).format("DD-MM-YYYY")}
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>
                        {moment(row.netDueDate).format("DD-MM-YYYY")}
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{fontSize:`${SmallFontChanger}px`}}>
                        {row.duedays}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className={classes.textRight}
                        style={{fontSize:`${SmallFontChanger}px`}}
                      >
                        {row.soiNumber
                          ? row.summary.length > 0
                            ? decimalwithcoma(
                                row.summary.reduce(totalAmountForSummary, 0)
                              )
                            : ""
                          : decimalwithcoma(row.amountDocCurrency)}
                      </StyledTableCell>
                      <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right"><span className="sattled-color">{'Pending'}</span></StyledTableCell>
                      <StyledTableCell style={{fontSize:`${SmallFontChanger}px`}} align="right">
                        {row.status === "In-Progress" ||
                        row.status === "Receipt" ? (
                          ""
                        ) : row.soiNumber ? (
                          <>
                            <div className="add-payment">
                              {
                                <input
                                  type="checkbox"
                                  id={row.soiNumber}
                                  type="checkbox"
                                  checked={
                                    props.ischeckedSoiValue &&
                                    props.ischeckedSoiValue.indexOf(
                                      row.soiNumber
                                    ) != -1
                                  }
                                  class="checkbox-custom"
                                  onChange={(e) =>
                                    props.handleCheckAllPayment(e, row, 0)
                                  }
                                />
                              }

                              <label
                                for={row.soiNumber}
                                style={{ textTransform: "uppercase" }}
                                className="checkbox-custom-label"
                              ></label>
                            </div>
                            <span
                              style={{ color: "#0089ff" }}
                              onClick={(e) => summaryOpenToggle(row.invoiceDoc)}
                              class="checkbox-custom-label"
                            >
                              Summary{" "}
                              <img style={{ width: "14px" }} src={EyeLogo} />
                            </span>
                          </>
                        ) : (
                          <div className="add-payment">
                            {
                              <input
                                type="checkbox"
                                id={row.invoiceDoc}
                                checked={
                                  props.isChecked &&
                                  props.isChecked.indexOf(row.invoiceDoc) != -1
                                }
                                value={row.total_amt}
                                type="checkbox"
                                class="checkbox-custom"
                                onChange={(e) =>
                                  props.handleCheckPayment(
                                    e,
                                    row,
                                    row.amountDocCurrency
                                  )
                                }
                              />
                            }

                            {
                              userName.countryCode === "VN" ? 
                              <label
                              for={row.invoiceDoc}
                              style={{ textTransform: "uppercase" }}
                              className="checkbox-custom-label"
                            >
                              {t("")}
                            </label>
                              : 
                              <label
                                for={row.invoiceDoc}
                                style={{ textTransform: "uppercase" }}
                                className="checkbox-custom-label"
                                style={{fontSize:`${SmallFontChanger}px`}}
                              >
                                {t("Add for payment")}
                              </label>
                            }
                          </div>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                    {summaryOpen[`childTable${row.invoiceDoc}`]
                      ? row.soiNumber
                        ? row &&
                          row.summary.map((item, index) => {
                            return (
                              <StyledTableRow
                                key={row.documentNo_FI}
                                className={classes.childtableBody}
                              >
                                <StyledTableCell component="th" scope="row">
                                  {item.invoiceDoc}
                                </StyledTableCell>

                                <StyledTableCell align="right"  style={{fontSize:`${SmallFontChanger}px`}}>
                                  {item.DocumentType === "C/N"
                                    ? "Credit Note"
                                    : ""}
                                  {item.DocumentType === "INV" ? "Invoice" : ""}{" "}
                                  {item.DocumentType === "D/N"
                                    ? "Debit Note"
                                    : ""}
                                  {row.DocumentType === "CQR"
                                    ? "Cheque returned"
                                    : ""}
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:`${SmallFontChanger}px`}}>
                                  {item.customerPONumber}
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:`${SmallFontChanger}px`}}>
                                  {moment(item.documentDate).format(
                                    "DD-MM-YYYY"
                                  )}
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:`${SmallFontChanger}px`}}>
                                  {moment(item.netDueDate).format("DD-MM-YYYY")}
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{fontSize:`${SmallFontChanger}px`}}>
                                  {item.duedays}
                                </StyledTableCell>
                               
                                <StyledTableCell
                                  align="right"
                                  className={classes.textRight}
                                  style={{fontSize:`${SmallFontChanger}px`}}
                                >
                                  {decimalwithcoma(item.amountDocCurrency)}
                                </StyledTableCell>

                                <StyledTableCell align="right"  style={{fontSize:`${SmallFontChanger}px`}}>
                                  {(item.status &&
                                    item.status === "In-Progress") ||
                                  row.status === "Receipt" ? (
                                    ""
                                  ) : (
                                    <div className="add-payment">
                                      {
                                        <input
                                          type="checkbox"
                                          id={item.invoiceDoc}
                                          checked={
                                            props.isChecked &&
                                            props.isChecked.indexOf(
                                              item.invoiceDoc
                                            ) != -1
                                          }
                                          value={item.total_amt}
                                          type="checkbox"
                                          class="checkbox-custom"
                                          onChange={(e) =>
                                            props.handleCheckPayment(
                                              e,
                                              item,
                                              item.amountDocCurrency,
                                              item.soiNumber
                                                ? item.soiNumber
                                                : ""
                                            )
                                          }
                                        />
                                      }

                                      <label
                                        for={item.invoiceDoc}
                                        style={{ textTransform: "uppercase" }}
                                        className="checkbox-custom-label"
                                        style={{fontSize:`${SmallFontChanger}px`}}
                                      >
                                        {t("Add for payment")}
                                      </label>
                                    </div>
                                  )}
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          })
                        : ""
                      : ""}
                  </>
                ))
              ) : (
                <StyledTableRow className={classes.tableBody}>
                  <div className="noBankFound">{t("Data not available")}</div>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="col-md-12 text-right mt-4">
          {
            <Pagination
              count={Math.ceil(tablePending && tablePending.totalCount / 10)}
              page={page}
              onChange={props.handleChangePage}
            />
          }
        </div>
      </Paper>
    </div>
  );
};

export default withTranslation()(PaymentTable);
