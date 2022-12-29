import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import "./ExportPopup.scss";
import moment from "moment";
import { useTranslation } from "react-i18next";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    whiteSpace: "nowrap",
    padding: "4px",
  },
}));

const ExportExcelPopup = (props) => {
  const { open, setOpen, exportExcelFile, fileUrl, exportFiles } = props;
  const { t } = useTranslation();

  const downloadFile = (url) => {
    var link = document.createElement("a");
    link.href = url;
    link.click();

    // var link = document.createElement('a');
    // const file = new Blob([url], { type: 'application/.pdf' });
    // link.href = window.URL.createObjectURL(file);
    // link.download = fileName + ".pdf";
    // link.click();
  };

  React.useEffect(()=>{
    exportExcelFile(fileUrl);
  },[fileUrl])

  return (

    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "720px!important",
        },
      }}
    >
      <DialogContent>
        <div className="exportHeader">
          {/* <b>{t("report.Note")}:</b> {t("report.refresh")}{" "}
          {moment().add(1, 'hours').format('MMM DD YYYY hh:mm A')}. */}
         <b>{t("report.Note")}:</b>  {t("fileWillForDownload")}
        </div>

        <TableContainer
          component={Paper}
          style={{ borderRadius: 0 }}
          className="tableContinerExport"
        >
          <Table sx={{ minWidth: "600px" }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell width="15%" align="center">
                  {t('Sr. No')}
                </StyledTableCell>
                <StyledTableCell align="center">{t('File')}</StyledTableCell>
                <StyledTableCell width="20%" align="center">
                {t('Size')}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exportFiles && exportFiles.length > 0 ? (
                exportFiles.map((row) => (
                  <StyledTableRow key={row["Sr.No"]}>
                    <StyledTableCell
                      className="styledTableCell"
                      width="15%"
                      component="th"
                      scope="row"
                      align="center"
                    >
                      {row["Sr.No"]}
                    </StyledTableCell>
                    <StyledTableCell
                      className="styledTableCell"
                      align="left"
                      sx={{ color: "primary.main" }}
                    >
                      <span
                        onClick={() => downloadFile(row.url)}
                        className="exportPointer"
                      >
                        {row.url.split("/").pop().split("?").shift()}
                      </span>
                    </StyledTableCell>
                    
                    <StyledTableCell
                      className="styledTableCell"
                      width="20%"
                      align="center"
                    >
                      {row.size}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <TableRow> <TableCell align="center" colSpan={3}> {t("report.noData")} </TableCell> </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <Grid item md xs display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          className="btncolor"
          size="small"
          sx={{ m: 1 }}
          onClick={() => exportExcelFile(fileUrl)}
        >
          <RefreshIcon /> {t('Refresh')}
        </Button>
        <Button
          // variant="contained"
          className="btncolor"
          size="small"
          sx={{ m: 1, backgroundColor: '#f5f5f5' }}
          onClick={() => setOpen(false)}
        >
          {t('CLOSE')}
        </Button>
      </Grid>
    </Dialog>
  );
};

export default ExportExcelPopup;
