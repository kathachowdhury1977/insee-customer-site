import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { masterActions } from "../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import FormInput from "../FormInput/FormInput";
import FormSelectbox from "../FormSelectbox/FormSelectbox";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(() => ({
  root: {
    padding: "25px",
    textAlign: "center",
    width: "517px"
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    // margin: 0,
    padding: theme.spacing(1),
    textAlign: "center",
    marginTop: "20px",
    display: "block"
  },
}))(MuiDialogActions);

export default function CreateOrderPopup(props) {
  const [open, setOpen] = React.useState(false);
  const shipTo = useSelector((state) => state.getShipToByAccNum);
  const shipmentStatus = useSelector((state) => state.shipmentstatus);
  const shippingCondition = useSelector((state) => state.shippingcondition);
  const shippingType = useSelector((state) => state.shippingtype);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const event = useSelector((state) => state);
  let countryCode = localStorage.getItem('userData');
  countryCode = JSON.parse(countryCode);
  let userName = localStorage.getItem('userData');
  userName = JSON.parse(userName);

  useEffect(() => {
    dispatch(masterActions.getShipToByAccNum(userName.userName));
    dispatch(masterActions.getShipmentStatus(countryCode.countryCode));
    dispatch(masterActions.getShippingCondition(countryCode.countryCode));
    dispatch(masterActions.getShippingType(countryCode.countryCode));
  }, []);

  console.log(shipTo)
  const shipToData = shipTo.getShipToByAccNum
  ? shipTo.getShipToByAccNum.map((element) => {
    return {
      id: element.shipToId,
      name: element.shipToName,
    };
  })
  : [
    {
      id: "0",
      name: "Data is not available",
    },
  ];

  const shipmentStatusData = shipmentStatus.shipmentstatus
    ? shipmentStatus.shipmentstatus.map((element) => {
      return {
        id: element.key,
        name: element.value,
      };
    })
    : [
      {
        id: "0",
        name: "Data is not available",
      },
    ];

  const shippingConditionData = shippingCondition.shippingcondition
    ? shippingCondition.shippingcondition.map((element) => {
      return {
        id: element.id,
        name: element.value,
      };
    })
    : [
      {
        id: "0",
        name: "Data is not available",
      },
    ];

  const shippingTypeData = shippingType.shippingtype
    ? shippingType.shippingtype.map((element) => {
      return {
        id: element.id,
        name: element.value,
      };
    })
    : [
      {
        id: "0",
        name: "Data is not available",
      },
    ];

  function onSelectChange(event) {
    console.log(event);
  }

  function handleChange(event, name) {
    //setNewvalue(event, name)
    console.log(event, "event target", name);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <span onClick={handleClickOpen}>
        {props.modal}
      </span>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>

        </DialogTitle>
        <DialogContent>
          <Typography>
            <div className="col-12 form_section p-0">
              <div className="row">
                <div className="col-6">
                  <div className="inputBox">
                    <label>{t("shipto.label")}</label>
                    <FormSelectbox
                      name={"visitobjective"}
                      class={"input"}
                      onSelectChange={onSelectChange}
                      label={t("Select")}
                      data={shipToData}
                    />
                  </div>
                </div>
                <div className="col-6">

                  <div className="inputBox">
                    <label>{t("searchbystatus.label")}</label>
                    <FormSelectbox
                      name={"visitobjective"}
                      class={"input"}
                      onSelectChange={onSelectChange}
                      label={t("Select")}
                      data={shipmentStatusData}
                    />
                  </div>

                </div>
                <div className="col-6">
                  <div className="inputBox">
                    <label>{t("soldto.label")}</label>
                    <FormSelectbox
                      name={"visitobjective"}
                      class={"input"}
                      onSelectChange={onSelectChange}
                      label={t("Select")}
                      data={"data"}
                    />
                  </div>

                </div>
                <div className="col-6">
                  <div className="inputBox">
                    <label>{t("shippingcondition.label")}</label>
                    <FormSelectbox
                      name={"visitobjective"}
                      class={"input"}
                      onSelectChange={onSelectChange}
                      label={t("Select")}
                      data={shippingConditionData}
                    />
                  </div>

                </div>
                <div className="col-6">
                  <div className="inputBox">
                    <label>{t("shippingtype.label")}</label>
                    <FormSelectbox
                      name={"visitobjective"}
                      class={"input"}
                      onSelectChange={onSelectChange}
                      label={t("Select")}
                      data={shippingTypeData}
                    />
                  </div>

                </div>
                <div className="col-6">
                  <div className="inputBox ">
                    <label>{t("daterange.label")}</label>

                    <FormInput
                      type={"date"}
                      class={"input mt-2"}
                      name={"eventname"}
                      onChange={handleChange}
                      label={t("Select")}
                    />
                  </div>

                </div>
              </div>
            </div>

          </Typography>
          <DialogActions>
            <div className="create_link">
              <button onClose={handleClose} className="cancel">{t("clear.button")}</button>
              <button className="create">
                <Link className="text-white" to={props.url}>{t("done.button")}</Link>
              </button>
            </div>
          </DialogActions>
        </DialogContent>

      </Dialog>
    </div>
  );
}
