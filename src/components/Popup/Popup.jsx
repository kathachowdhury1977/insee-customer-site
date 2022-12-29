import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

const Popup = (props) => {
  const {
    title,
    children,
    openPopup,
    setOpenPopup,
    width,
    height,
    pt,
    pr,
    pb,
    pl,
    maxWidth
  } = props;

  return (
    <Dialog
      open={openPopup}
      maxWidth={maxWidth ? maxWidth : "md"}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: width || "auto",
            height: height || "auto",

            "& .MuiDialogContent-root": {
              pt: pt !== undefined ? pt : "",
              pr: pr !== undefined ? pr : "",
              pb: pb !== undefined ? pb : "",
              pl: pl !== undefined ? pl : "",
            },
          },
        },
      }}
    >
      {/* if  there is a title then only we display the title */}
      {title != "" && (
        <DialogTitle>
          <div>{title}</div>
        </DialogTitle>
      )}
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default Popup;
