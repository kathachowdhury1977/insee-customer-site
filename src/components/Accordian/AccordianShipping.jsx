import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withTranslation, useTranslation } from "react-i18next";
import "./Accordian.scss";
import ShippingForm from "../ShippingForm/ShippingForm";
import { orderActions } from "../../_actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: "4px",
    boxShadow: "4px 1px 5px 0 rgba(0, 0, 0, 0.15)",
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function AccordianShipping(props) {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  

  return (
    <>
      {/* <span>{props.heading}</span>
      <div>
        <div className={classes.root}>       */}
              <ShippingForm />      
        {/* </div>
      </div> */}
    </>
  );
}
export default withTranslation()(AccordianShipping);
