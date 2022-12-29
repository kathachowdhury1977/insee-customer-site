import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { masterActions, eventActions } from '../../_actions'
import { useHistory } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
// import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { useDispatch, useSelector } from 'react-redux'
import { withTranslation, useTranslation } from 'react-i18next'
// import FormSelectbox from '../FormSelectbox/FormSelectbox'
import FormInput from '../FormInput/FormInput'
import '../CreateShipmentForm/CreateShipmentForm.scss'
import CreatePickupPopup from '../../components/ModalPopup/CreatePickupSchdulePopup'
// import { Link } from 'react-router-dom'
// import { any } from 'joi'
import Timepicker from '../../components/Timepicker/Timepicker';
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    borderBottom: '1px solid rgba(196, 196, 196, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
//   button: {
//     marginTop: theme.spacing(1),
//     marginRight: theme.spacing(1),
//   },
//   back_button: {
//     backgroundColor: '#000 !important',
//     color: '#fff !important',
//     marginRight: '8px !important',
//   },
//   actionsContainer: {
//     marginBottom: theme.spacing(2),
//   },
//   resetContainer: {
//     padding: theme.spacing(3),
//   },
// }))

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose,hideCloseButton, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose && !hideCloseButton ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(() => ({
  root: {
    padding: '25px',
    textAlign: 'center',
    width: '417px',
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    // margin: 0,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginTop: '20px',
    display: 'block',
  },
}))(MuiDialogActions)
let ShippingTypeObj=[{"key":"S1","value":"10.20","shipingTYpe":"Truck 6W (10Tons)"},{"key":"S2","value":"17.00","shipingTYpe":"Truck 10W (17Tons)"},{"key":"S3","value":"37.00","shipingTYpe":"Truck 18W (28-35Tons)"},{"key":"S4","value":"22.00","shipingTYpe":"Bulk 10W (18Tons)"},{"key":"S5","value":"36.00","shipingTYpe":"Bulk 18W (30-32Tons)"},{"key":"S6","value":"4.00","shipingTYpe":"Truck 4W (3Tons)"},
{"key":"M4","value":"35.00","shipingTYpe":"Bulk truck"},{"key":"M5","value":"35.00","shipingTYpe":"Bag truck"},
{"key":"M6","value":"10000000.00","shipingTYpe":"Bulk barge"},{"key":"M7","value":"10000000.00","shipingTYpe":"Bag barge"}
];

function CreateDeliveryForm(props) {
  let currentDtae = new Date();
  let currentHour = currentDtae.getHours();
  let currentMinut = currentDtae.getMinutes();
  let userName = localStorage.getItem("userData");
  const [expected_arrival_date, setExpectedArrivalDate] = useState("");
  const [expected_arrival_time, setExpectedArrivalTime] = useState(
    currentHour + ":" + currentMinut
  );
  const [choosetransporter, setChoosetransporter] = useState("");
  const [preferedTrucktype, setPreferedTrucktype] = useState("");
  const [SpecialProject, setSpecialProject] = useState("");
  const [contactname, setContactName] = useState("");
  const [shipcpacityvalue, setShipCpacityValue] = useState("");
  const [CapacityError, setCapacityError] = useState("");
  const [ShippingType, setShippingType] = useState("");
  const [deliveryDataPlace, setDeliveryDataPlace] = useState();
  const [contactno, setContactno] = useState("");
  const [remark, setRemark] = useState("");
  const [showMinimumChar, setShowMinimumChar] = useState("");
  const [open, setOpen] = useState(false);
  const [erropen, setErropen] = useState(false);
  const [sub_delaer, setSubDelaer] = useState("");
  const [retailerCode, setRetailerCode] = useState("");
  const [shipingTypeSelected, setShipingTypeSelected] = useState("");
  const [frequency, setFrequency] = useState(1);
  const [errors, setError] = useState({});
  let history = useHistory();
  userName = JSON.parse(userName);
  console.log("userName", userName);
  const selectedLangCode = localStorage.getItem("lancode");
  const countryCode = userName ? userName.countryCode : "TH";
  const soldToNumber = userName ? userName.soldTo[0] : "0110000039";
  const preftrucktype = useSelector((state) => state.preftrucktype);
  const chooseTransporter = useSelector((state) => state.chooseTransporter);
  const getSubdealer = useSelector((state) => state.getSubdealer);

  const specialpro = useSelector((state) => state.specialpro);
  const createDelivery = useSelector((state) => state.createDelivery);
  const productSubCategoryValue = useSelector(
    (state) => state.getShipCatValue.getShipCatValue
  );
  const selectedSubCat =
    (productSubCategoryValue &&
      productSubCategoryValue === "Bag CMT %26 Mortar") ||
    productSubCategoryValue === undefined
      ? "BAG"
      : "BULK";
  console.log(selectedSubCat, productSubCategoryValue, "selectedSubCat789");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedProductId = props.productIds;
  const selectedShipTiId = props.shipToId;
  const selProductCode = props.selectedProductsCode;
  const selectedShippingTypeKey = props.ShippingType;
  console.log(createDelivery, "createDelivery789");
  const [isCheckedWeight, setIsCheckedWeight] = useState(false);
  console.log(expected_arrival_time, "expected_arrival_time----");
  useEffect(() => {
    let getShippingTypeObj = ShippingTypeObj.find(
      (data) => data.key === props.ShippingType
    );
    let shipingCpacityValue =
      getShippingTypeObj !== undefined || null ? getShippingTypeObj.value : 0;
    let shipingTypleValue =
      getShippingTypeObj !== undefined || null
        ? getShippingTypeObj.shipingTYpe
        : "";
    //let selectedShippingType = getShippingTypeObj.key
    setShipCpacityValue(shipingCpacityValue);
    setShippingType(shipingTypleValue);

    dispatch(
      masterActions.prefaredTruckType(
        countryCode,
        selectedShippingTypeKey,
        selectedShipTiId,
        selectedSubCat
      )
    );
    dispatch(masterActions.Subdealer(soldToNumber));
  }, []);
  useEffect(() => {
    dispatch(masterActions.chooseTransporter(countryCode, soldToNumber));
  }, []);

  let getShippingTypeObj = ShippingTypeObj.find(
    (data) => data.key === props.ShippingType
  );
  let selectedShippingType = getShippingTypeObj.key;
  var data = {
    productCodes: selProductCode,
    shipToId: selectedShipTiId,
    shippingType: selectedShippingType,
  };
  useEffect(() => {
    dispatch(masterActions.specialProject(countryCode, data));
  }, []);
  function handleChange(event, name) {
    //setNewvalue(event, name)
    switch (name) {
      case "expected_arrival_date":
        setExpectedArrivalDate(event);
        break;
      case "expected_arrival_time":
        setExpectedArrivalTime(event);
        break;
      case "contactname":
        setContactName(event);
        break;
    }
  }
  const isNumberVal = (e) => {
    switch (e.target.name) {
      case "frequency":
        setFrequency(e.target.value.replace(/[^\d]/g, ""));
        break;

      case "contactno":
        setContactno(e.target.value.replace(/[^\d]/g, ""));
        break;
    }
  };
  const IsAlphaNumeric = (e) => {
    let words = e.target.value.length;
    if (parseInt(words - 1) < 100) {
      setShowMinimumChar(parseInt(100 - words) + " character remaining");
      setRemark(e.target.value.replace(/[\/\\,'"]/g, "").slice(0, 100));
    } else {
      setShowMinimumChar("");
    }
  };

  function onSelectChange(e) {
    console.log(e.target.name, "event target", e.target.value);
    switch (e.target.name) {
      case "choosetransporter":
        setChoosetransporter(e.target.value);

        break;
      case "preferedTrucktype":
        setPreferedTrucktype(e.target.value);
        break;
      case "SpecialProject":
        setSpecialProject(e.target.value);
        break;
      case "sub_delaer":
        setSubDelaer(e.target.value);
        let index = e.target.selectedIndex;
        let optionElement = e.target.childNodes[index];
        let option = optionElement.getAttribute("retailer-code");
        setRetailerCode(option);
        break;
    }
  }
  console.log(props.productData, "props.productData8888");
  const handleSubmit = (e) => {
    e.preventDefault();

    setShowMinimumChar("");
    let selectedQuantityQ = document.querySelector(
      ".selected_quantity_section"
    );
    let selectedQuantityTQ = document.querySelectorAll(".selectedQty");
    let selectedQuantityErr = [];
    for (let df = 0; df < selectedQuantityTQ.length; df++) {
      console.log(
        "selectedQuantityTQselectedQuantityTQ",
        selectedQuantityTQ[df].value
      );
      //console.log(parseInt(selectedQuantityTQ[qt].value*parseInt(frequency!=''?frequency:1))>=parseInt(selectedQuantityTQ[qt].getAttribute("totalQty")),'condection',track_capacity,'track_capacity',selectedQuantityTQ[qt].value,'frequency',frequency,'selectedQuantityTQselectedQuantityTQ',selectedQuantityTQ[qt].getAttribute("totalQty"));
      if (selectedQuantityTQ[df].value > 0) {
        selectedQuantityErr.push(true);
        ///setCapacityError("Quantity should not be greater than truck capacity");
      } else {
        selectedQuantityErr.push(false);
      }
    }
    console.log("selectedQuantityErr", selectedQuantityErr);
    document.getElementById("TrackCapacity").innerHTML = "";
    document.getElementById("selectedQtyMessage").style.display = "none";
    if (selectedQuantityErr.indexOf(false) !== -1) {
      document.getElementById("selectedQtyMessage").style.display = "block";
      setError({ default_quantity: t("Please enter a valid quantity") });
      document.getElementById("TrackCapacity").innerHTML = t(
        "Please enter a valid quantity"
      );
    } else if (expected_arrival_date === "") {
      setError({
        expected_arrival_date: t(
          "Please select expected arrival date to plant"
        ),
      });
    } else if (expected_arrival_time === "") {
      setError({
        expected_arrival_time: "Please select expected arrival time to plant",
      });
    } else {
      setError({});
      let shipToProduct = props.productData;
      // let selectedQuantityTQArgs = [];
      let selectedQuantityTQObj = {};
      for (let qt = 0; qt < selectedQuantityTQ.length; qt++) {
        selectedQuantityTQObj[selectedQuantityTQ[qt].name] =
          selectedQuantityTQ[qt].value;
        ///selectedQuantityTQArgs.push(selectedQuantityTQObj);
      }
      let shipToProductArr = [];
      let QuentityTotal = 0;
      let total_quantity = 0;
      let selectedQuantity = 0;
      for (let i = 0; i < shipToProduct.length; i++) {
        let prodObj = {};
        prodObj["poReferenceNumber"] = shipToProduct[i].header1.ponumber;
        let itemArr = [];
        let items = shipToProduct[i].items;
        let unitOfMeasure = "";
        for (let k = 0; k < items.length; k++) {
          if (props.productIds.indexOf(items[k].soLineNo) !== -1) {
            let itemObj = {};
            itemObj["plantCode"] = items[k].Plant;
            itemObj["productId"] = items[k].MaterialNumber;
            itemObj["productImage"] = items[k].MaterialImage;
            itemObj["productName"] = items[k].MaterialName;
            itemObj["remainingQuantity"] = items[k].ItemRemainingQuantity;
            itemObj["selectedQuantity"] =
              selectedQuantityTQObj[
                "selectedQuantity-" + shipToProduct[i].id + "-" + k
              ];
            selectedQuantity =
              parseFloat(selectedQuantity) +
              parseFloat(
                selectedQuantityTQObj[
                  "selectedQuantity-" + shipToProduct[i].id + "-" + k
                ]
              );
            total_quantity = shipToProduct[i].header1.totalQuantity;
            itemObj["totalQuantity"] = items[k].OrderQuantity;
            ///totalQty=parseFloat(totalQty)+parseFloat(items[k].OrderQuantity);
            ////totalRemaiQty=parseFloat(totalRemaiQty)+parseFloat(+items[k].ItemRemainingQuantity);
            itemObj["soLineNo"] = items[k].soLineNo;
            ////itemObj['totalQuantity']=shipToProduct[i].header1.totalQuantity;
            itemObj["unitOfMeasure"] = items[k].UnitOfMeasure;
            // unitOfMeasure = items[k].UnitOfMeasure
            itemArr.push(itemObj);
          }
        }
        prodObj["productList"] = itemArr;
        prodObj["shippingCondition"] =
          shipToProduct[i].header1.shippingCondition;
        prodObj["shippingType"] = shipToProduct[i].header1.shippingType;
        prodObj["division"] = shipToProduct[i].header1.division;
        prodObj["soId"] = shipToProduct[i].orderListObject.ccrz__OrderId__c;
        prodObj["totalQuantity"] = shipToProduct[i].header1.totalQuantity;
        QuentityTotal = shipToProduct[i].header1.totalQuantity;
        prodObj["totalRemainingQuantity"] =
          shipToProduct[i].header1.totalRemainingQuantity;
        prodObj["shipToId"] =
          userName && userName.countryCode === "VN"
            ? shipToProduct[i].partnerFunction.shipToNumber
            : "";
        ///prodObj['unitOfMeasure']=unitOfMeasure;
        shipToProductArr.push(prodObj);
      }

      const deliveryData = {
        countryCode: countryCode,
        customerId: soldToNumber,
        doNumber: "",
        userId: userName && userName.userId,
        shipToId:
          userName && userName.countryCode === "VN" ? "" : props.shipToId,
        deliveryDTO: {
          contact: {
            name: contactname,
            number: contactno,
          },
          loadPerRequest: false,
          remarks: remark,
          specialProjectType: SpecialProject,
          subDealerCode: retailerCode,
          subDealerName: sub_delaer,
          transporter: choosetransporter,
          truckType: preferedTrucktype,
          isLoadPerRequest:
            isCheckedWeight && isCheckedWeight === true ? "N" : "",
        },
        expectedDate: format(new Date(expected_arrival_date), "yyyy-MM-dd"),
        expectedTime: expected_arrival_time,
        inseePlusUID: "",
        pickUpDTO: {
          driver: {
            licenseNo: "",
            mobileNo: "",
            name: "",
          },
          frequency: frequency !== "" ? parseInt(frequency) : 1,
          remarks: remark,
          subDealerName: "",
          transport: {
            district: "",
            province: "",
          },
          truck: {
            capacityInTons: 0,
            licenseNo: "",
            trailerId: "",
            truckTypeId: "",
          },
        },
        quantity: QuentityTotal,
        salesOrderList: shipToProductArr,
      };
      if (selectedQuantity > shipcpacityvalue) {
        setErropen(true);
        setCapacityError(
          "Quantity can not be greater than selected shiping type " +
            ShippingType
        );
      } else {
        ///console.log(selectedQuantity,'deliveryData',deliveryData);
        dispatch(eventActions.createDelivery(countryCode, deliveryData));
        setDeliveryDataPlace(deliveryData);
        setOpen(true);
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
    setErropen(false);
  };
  const confirmDelevery = () => {
    history.push("/MyShipments");
  };

  // const preftrucktypeList =
  //   preftrucktype && preftrucktype.preftrucktype
  //     ? preftrucktype.preftrucktype.map((data) => {
  //         return {
  //           id: data.name,
  //           name: data.value,
  //         };
  //       })
  //     : [
  //         {
  //           id: "0",
  //           name: "Data is not available",
  //         },
  //       ];

  const subDelerData =
    getSubdealer && getSubdealer.getSubdealer !== undefined
      ? getSubdealer.getSubdealer.results.map((data) => {
          return {
            id: data.retailerName,
            retailerCode: data.retailerCode,
            name: data.retailerCode + "-" + data.retailerName,
          };
        })
      : [
          {
            id: "0",
            name: "Data is not available",
          },
        ];

  const handleChangeCheckBox = (e) => {
    setIsCheckedWeight(!isCheckedWeight);
  };

  // const SmallFontChanger = useSelector(
  //   (state) => state.smallfontchanger.smallfontchanger
  // );

  const FontChange = useSelector(
    (state) => state.fontsizechanger.fontsizechanger
  );

  // const HeadingFontChange = useSelector(
  //   (state) => state.headerfontchanger.headerfontchanger
  // );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="select_shipment">
          <div className="form_section">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div className="inputBox">
                  <label style={{ fontSize: `${FontChange}px` }}>
                    {t("Expected Delivery Date")}{" "}
                    <spam style={{ color: "red" }}>*</spam>
                  </label>
                  <FormInput
                    type={"date"}
                    class={"input"}
                    name={"expected_arrival_date"}
                    onChange={handleChange}
                    label={t("Expected Delivery Date")}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors && errors["expected_arrival_date"] ? (
                    <span style={{ color: "red", fontSize: `${FontChange}px` }}>
                      {errors["expected_arrival_date"]}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div className="inputBox">
                  <label style={{ fontSize: `${FontChange}px` }}>
                    {t("Expected Delivery Time")}{" "}
                    <spam style={{ color: "red" }}>*</spam>
                  </label>

                  <Timepicker
                    setExpectedArrivalTime={setExpectedArrivalTime}
                    selectedDate={expected_arrival_date}
                  />
                  {/*<FormInput
                    type={'time'}
                    class={'input'}
                    name={'expected_arrival_time'}
                    onChange={handleChange}
                    label={t('eventname.label')}
                  />*/}
                  {errors && errors["expected_arrival_time"] ? (
                    <span style={{ color: "red", fontSize: `${FontChange}px` }}>
                      {errors["expected_arrival_time"]}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {userName && userName.countryCode === "VN" ? (
                ""
              ) : (
                <>
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div className="inputBox">
                      <label style={{ fontSize: `${FontChange}px` }}>
                        {t("Please select Transporter")}
                      </label>
                      <select
                        className="input"
                        name="choosetransporter"
                        onChange={onSelectChange}
                      >
                        <option
                          value=""
                          style={{ fontSize: `${FontChange}px` }}
                        >
                          {t("Please select Transporter")}
                        </option>
                        {chooseTransporter.chooseTransporter ? (
                          chooseTransporter.chooseTransporter.map(
                            (transporter) => {
                              return (
                                <option
                                  value={transporter.transporterCode}
                                  style={{ fontSize: `${FontChange}px` }}
                                >
                                  {transporter.transporterName}
                                </option>
                              );
                            }
                          )
                        ) : (
                          <option
                            value={0}
                            style={{ fontSize: `${FontChange}px` }}
                          >
                            No Data available
                          </option>
                        )}
                      </select>
                      {errors && errors["choosetransporter"] ? (
                        <span
                          style={{ color: "red", fontSize: `${FontChange}px` }}
                        >
                          {errors["choosetransporter"]}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div className="inputBox">
                      <label style={{ fontSize: `${FontChange}px` }}>
                        {t("Preferred Truck type")}
                      </label>
                      <select
                        className="input"
                        name="preferedTrucktype"
                        onChange={onSelectChange}
                        style={{ fontSize: `${FontChange}px` }}
                      >
                        <option
                          value=""
                          style={{ fontSize: `${FontChange}px` }}
                        >
                          {t("Please select Preferred Truck type")}
                        </option>
                        {preftrucktype.preftrucktype ? (
                          preftrucktype.preftrucktype.map((preftrucktype) => {
                            return (
                              <option
                                value={preftrucktype.value}
                                style={{ fontSize: `${FontChange}px` }}
                              >
                                {preftrucktype.value}
                              </option>
                            );
                          })
                        ) : (
                          <option
                            value={0}
                            style={{ fontSize: `${FontChange}px` }}
                          >
                            No Data available
                          </option>
                        )}
                      </select>
                      {errors && errors["preferedTrucktype"] ? (
                        <span
                          style={{ color: "red", fontSize: `${FontChange}px` }}
                        >
                          {errors["preferedTrucktype"]}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div className="inputBox">
                      <label style={{ fontSize: `${FontChange}px` }}>
                        {t("pickupform.specialproject")}
                      </label>
                      <select
                        className="input"
                        name="SpecialProject"
                        onChange={onSelectChange}
                        style={{ fontSize: `${FontChange}px` }}
                      >
                        <option
                          value=""
                          style={{ fontSize: `${FontChange}px` }}
                        >
                          {t("Please select Special Project")}
                        </option>
                        {specialpro.specialpro ? (
                          // specialpro.specialpro.map((specialpro) => {
                          //   return (
                          //     <option value={specialpro.value}>
                          //       {specialpro.value}

                          //     </option>
                          //   )
                          // })

                          <option
                            value={specialpro && specialpro.specialpro.value}
                            style={{ fontSize: `${FontChange}px` }}
                          >
                            {specialpro && specialpro.specialpro.value}
                          </option>
                        ) : (
                          <option
                            value={0}
                            style={{ fontSize: `${FontChange}px` }}
                          >
                            No Data available
                          </option>
                        )}
                      </select>
                      {errors && errors["SpecialProject"] ? (
                        <span
                          style={{ color: "red", fontSize: `${FontChange}px` }}
                        >
                          {errors["SpecialProject"]}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div className="inputBox">
                      <label style={{ fontSize: `${FontChange}px` }}>
                        {t("Sub dealer")}
                      </label>
                      <select
                        className="input"
                        name="sub_delaer"
                        onChange={onSelectChange}
                        style={{ fontSize: `${FontChange}px` }}
                      >
                        <option
                          value=""
                          style={{ fontSize: `${FontChange}px` }}
                        >
                          {t("Please select sub dealer (if have)")}
                        </option>
                        {subDelerData ? (
                          subDelerData.map((data) => {
                            ///console.log('datadata',data);
                            return (
                              <option
                                retailer-code={data.retailerCode}
                                value={data.id}
                                style={{ fontSize: `${FontChange}px` }}
                              >
                                {data.name}
                              </option>
                            );
                          })
                        ) : (
                          <option
                            value={0}
                            style={{ fontSize: `${FontChange}px` }}
                          >
                            No Data available
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="inputBox">
                  <label style={{ fontSize: `${FontChange}px` }}>
                    {t("Contact Name")}
                  </label>
                  <FormInput
                    type={"text"}
                    class={"input"}
                    name={"contactname"}
                    onChange={handleChange}
                    label={t("Please input Contact Name (if have)")}
                  />
                  {errors && errors["contactname"] ? (
                    <span style={{ color: "red", fontSize: `${FontChange}px` }}>
                      {errors["contactname"]}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="inputBox">
                  <label style={{ fontSize: `${FontChange}px` }}>
                    {t("Contact Number")}
                  </label>
                  <input
                    style={{ fontSize: `${FontChange}px` }}
                    placeholder={t("Please input Contact Number (if have)")}
                    onChange={isNumberVal}
                    type="text"
                    name="contactno"
                    className="input"
                    value={contactno}
                  />
                  {errors && errors["contactno"] ? (
                    <span style={{ color: "red", fontSize: `${FontChange}px` }}>
                      {errors["contactno"]}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {userName && userName.countryCode === "VN" ? (
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                  <div className="inputBox">
                    <label>{t("pickupform.frequency")}</label>
                    <input
                      placeholder={t("Please input number")}
                      className="input"
                      onChange={isNumberVal}
                      type="text"
                      name="frequency"
                      value={frequency}
                    />
                    {errors && errors["frequency"] ? (
                      <span style={{ color: "red" }}>
                        {errors["frequency"]}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}

              {userName && userName.countryCode === "VN" ? (
                ""
              ) : productSubCategoryValue === "Bulk CMT" ? (
                <div className="col-12">
                  <div className="inputBox">
                    <input
                      type="checkbox"
                      id="topping"
                      name="topping"
                      class="checkbox-custom"
                      value=""
                      checked={isCheckedWeight}
                      onChange={handleChangeCheckBox}
                    />
                    <label
                      for={"hello"}
                      style={{
                        textTransform: "uppercase",
                        position: "relative",
                        left: 0,
                      }}
                      className="checkbox-custom-label"
                    >
                      {t("Load Exact Weight")}
                    </label>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                <div className="inputBox">
                  <spam
                    style={{
                      color: "red",
                      float: "right",
                      fontSize: `${FontChange}px`,
                    }}
                  >
                    {t("100 Words")}
                  </spam>
                  <label style={{ fontSize: `${FontChange}px` }}>
                    {t("pickupform.remark")}
                  </label>
                  <input
                    style={{ fontSize: `${FontChange}px` }}
                    type="text"
                    name="remark"
                    className="input"
                    onChange={IsAlphaNumeric}
                    placeholder={t("COMMENTS")}
                    value={remark}
                  />
                  {showMinimumChar !== "" ? (
                    <span style={{ color: "red" }}>{showMinimumChar}</span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {
                <div
                  className="col-12 d-flex"
                  style={{ fontSize: `${FontChange}px` }}
                >
                  {errors && Object.keys(errors).length > 0 ? (
                    <span style={{ color: "red" }}>
                      {t("Please fill required fields")}
                    </span>
                  ) : (
                    ""
                  )}
                  {/*<div className='select_checkbox'>
                  <input type='checkbox'></input>
                  <label>{t('loadexactlyasperrequest.checkboxlabel')}</label>
                </div>*/}
                </div>
              }

              <div className="create_link">
                <CreatePickupPopup
                  modal={t("pickupform.cancelbtn")}
                  cancel={t("pickupform.no")}
                  done={t("pickupform.yes")}
                  url="/ShipmentManagement"
                />
                <button
                  type="submit"
                  className="create"
                  style={{ fontSize: `${FontChange}px` }}
                >
                  {t("pickupform.createbtn")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="select_shipment_boxes">
        <Dialog
          style={{ borderRadius: "15px" }}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            hideCloseButton={true}
          >
            {t("")}
          </DialogTitle>
          <DialogContent>
            <Typography>
              {createDelivery && createDelivery.error !== undefined ? (
                <p style={{ color: "red" }}>
                  {selectedLangCode === "en" || selectedLangCode === null
                    ? createDelivery.error.split("-")[0]
                    : createDelivery.error.split("-")[1]}
                </p>
              ) : (
                ""
              )}
              {createDelivery && createDelivery.createDelivery !== undefined ? (
                userName && userName.countryCode === "VN" ? (
                  <p style={{ color: "green" }}>
                    {t("Shipment request submitted.")}
                  </p>
                ) : (
                  <p style={{ color: "green" }}>
                    {t("Delivery created successfully")}
                  </p>
                )
              ) : (
                ""
              )}
            </Typography>
            <DialogActions>
              <div className="create_link d-flex">
                {createDelivery && createDelivery.error !== undefined ? (
                  ""
                ) : (
                  <button
                    className="create pl-5 pr-5"
                    onClick={confirmDelevery}
                  >
                    {t("ok")}
                  </button>
                )}
              </div>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
      <Dialog
        style={{ borderRadius: "15px" }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={erropen}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Error
        </DialogTitle>
        <DialogContent>
          <Typography>{CapacityError}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default withTranslation()(CreateDeliveryForm)