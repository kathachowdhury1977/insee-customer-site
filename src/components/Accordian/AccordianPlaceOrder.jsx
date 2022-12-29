import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import PlaceOrderSummary from "../../components/PlaceOrderSummary/PlaceOrderSummary";
import "./Accordian.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius: '4px',
    boxShadow: '4px 1px 5px 0 rgba(0, 0, 0, 0.15)',
    backgroundColor: '#ffffff'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

 function AccordianPlaceOrder(props) {
  // const orderCreditInfo = useSelector((state) => state.getOrderCreditInfo.getOrderCreditInfo);
  const { t } = useTranslation();
  const classes = useStyles();

  
  // console.log(orderCreditInfo && orderCreditInfo);

  return (
    <>
    <span className="visit_date">{props.heading}</span>    
    <div className="view_visit_date mt-4">
    <div className={classes.root}>
         <PlaceOrderSummary/>   
    </div>
    </div>
    </>
  );
}
export default withTranslation()(AccordianPlaceOrder);