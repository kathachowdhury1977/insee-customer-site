import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { withTranslation, useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

 function SimpleAccordion(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
    <span className="visit_date">{props.heading}</span>    
    <div className="view_visit_date">
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
              <div className="container-fluid">
                  <div className="row">
                       <div className="col-2"><div className="visit_items"><label>4</label> <p>{t("focus.label")}</p></div></div>
                       <div className="col-2"><div className="visit_items"><label>2</label> <p>{t("hunting.label")}</p></div></div>
                       <div className="col-2"><div className="visit_items"><label>1</label> <p>{t("farming.label")}</p></div></div>
                       <div className="col-2"><div className="visit_items"><label>2</label> <p>{t("small.label")}</p></div></div>
                       <div className="col-2"><div className="visit_items"><label>1</label> <p>{t("hot.label")}</p></div></div>
                       <div className="col-2"><div className="visit_items"><label>2</label> <p>{t("stand.label")}</p></div></div>
                  </div>
              </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="accordian_details">
            <div className="row">
                <div className="col-2"><span className="user_name">John Dore</span></div>
                <div className="col-2"><span className="category">Focus</span></div>
                <div className="col-2"><span className="time"><i class="fa fa-clock-o" aria-hidden="true"></i> 10 AM - 11 AM</span></div>
                <div className="col-5"><span className ="work_progress">Potential comes here</span></div>
            </div>
          </Typography>
          <Typography className="accordian_details">
            <div className="row">
                <div className="col-2"><span className="user_name">Vaibhav</span></div>
                <div className="col-2"><span className="category">Hunting</span></div>
                <div className="col-2"><span className="time"><i class="fa fa-clock-o" aria-hidden="true"></i> 12 PM - 01 PM</span></div>
                <div className="col-5"><span className ="work_progress">Potential comes here Potential</span> </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    </div>
    </>
  );
}
export default withTranslation()(SimpleAccordion);