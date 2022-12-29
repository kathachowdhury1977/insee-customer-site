import * as React from "react";
import { Paper, Popper } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      alignItems: "center",
      lineHeight: "24px",
      width: "100%",
      height: "100%",
      position: "relative",
      display: "flex",
      "& .MuiRating-root": {
        marginRight: theme.spacing(1),
      },
      "& .cellValue": {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
  })
);
const CellExpand = React.memo(function CellExpand(props) {
  const { width, value, align } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);
  function isOverflown(element) {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }
  const showCell = React.useCallback(() => {
    setShowFullCell(true);
  }, []);
  const hideCell = React.useCallback(() => {
    setShowFullCell(false);
  }, []);
  React.useEffect(() => {
    if (cellDiv.current) {
      setAnchorEl(cellDiv.current);
    }
  }, []);
  React.useEffect(() => {
    if (cellValue && cellValue.current) {
      const isCurrentlyOverflown = isOverflown(cellValue.current);
      setShowPopper(isCurrentlyOverflown);
    }
  }, [width]);
  return React.createElement(
    "div",
    {
      ref: wrapper,
      className: classes.root,
      onMouseEnter: showCell,
      onMouseLeave: hideCell,
    },
    React.createElement("div", {
      ref: cellDiv,
      style: {
        height: 1,
        width,
        display: "block",
        position: "absolute",
        top: 0,
      },
    }),
    React.createElement(
      "div",
      {
        ref: cellValue,
        className: "cellValue",
        style: { textAlign: align, width: "100%" },
      },
      value
    ),
    showPopper &&
      React.createElement(
        Popper,
        {
          id: "123",
          open: showFullCell && anchorEl != null,
          anchorEl: anchorEl,
          style: { width, marginLeft: -17, zIndex: 1000 },
        },
        React.createElement(
          Paper,
          {
            elevation: 1,
            style: {
              minHeight: wrapper.current.offsetHeight - 2,
              zIndex: 1000,
            },
          },
          React.createElement("div", { style: { padding: 5 } }, value)
        )
      )
  );
});
export function RenderCellExpand(params) {
  return React.createElement(CellExpand, {
    value: params.value ? params.value.toString() : "",
    width: params.colDef.width,
    align: params.align,
  });
}
