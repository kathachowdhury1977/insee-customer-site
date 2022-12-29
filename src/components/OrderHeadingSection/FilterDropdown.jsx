import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { masterActions, orderActions } from "../../_actions";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation, useTranslation } from "react-i18next";
import "react-tabs/style/react-tabs.css";
// import FormSelectbox from "../FormSelectbox/FormSelectbox";
import "./OrderHeadingSection.scss";
import RadioButtonItem from "../RadioButtonGroup/RadioButtonItem";
import RadioButtonCategory from "../RadioButtonGroup/RadioButtonCategory";
import RadioButtonType from "../RadioButtonGroup/RadioButtonType";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { includes } from "lodash";
function FilterDropdown(props) {
  var categoryName = useSelector(
    (state) => state.getConwoodCategory.getConwoodCategory
  );
  const isShipToSelected = useSelector(
    (state) => state.isShipToSelected.isShipToSelected
  );
  const isPlantsSelected = useSelector(
    (state) => state.isPlantsSelected.isPlantsSelected
  );

  const isSelectedShippingCond = useSelector(
    (state) => state.ShipingCondSelected.ShipingCondSelected
  );

  const isSelectedShippingType = useSelector(
    (state) => state.ShipingTypeSelected.ShipingTypeSelected
  );

  const getShippingCondForVn = useSelector(
    (state) => state.getShippingCondForVn.getShippingCondForVn
  );
  const getShippingTypeVn = useSelector(
    (state) => state.getShippingTypeForVn.getShippingTypeForVn
  );
  let categorys = localStorage.getItem("CATEGORY");
  let subcategorys = localStorage.getItem("SUBCATEGORY");
  // console.log('CATEGORY HEREEEEEE=>>>>>> ', category)
  if (categorys === null) {
    localStorage.setItem("CATEGORY", "CMT");
  }
  if (subcategorys === null) {
    localStorage.setItem("SUBCATEGORY", "BAG");
  }
  categorys = localStorage.getItem("CATEGORY");
  subcategorys = localStorage.getItem("SUBCATEGORY");
  // localStorage.setItem('CONTRACTNUMBER', 'null')
  ///categoryName = "CMT"

  const contractbyAcc = useSelector((state) => state.contractbyacc);
  const shiptobycount = useSelector((state) => state.shiptobycount);
  const plantbycount = useSelector((state) => state.plantbycount);
  const plantbycountVt = useSelector(
    (state) => state.plantbyCountryForVN.plantbyCountryForVN
  );

  const selectedLangCode = localStorage.getItem("lancode");
  const productCatOrder = useSelector(
    (state) => state.getProductCatLevel.getProductCatLevel
  );
  const selectValueProductValue = useSelector(
    (state) => state.getProductCatLevelValue.getProductCatLevelValue
  );

  const subProductValueOrder = useSelector(
    (state) => state.getProductSubCatLevel.getProductSubCatLevel
  );
  const selectedSubProductValue = useSelector(
    (state) => state.getProductSubCatLevelValue.getProductSubCatLevelValue
  );

  const [contractNo, setContractNo] = useState("");
  const [shipToCode, setShipToCode] = useState("");
  var isSearch = localStorage.getItem("isSearch");
  //const [productCatValue, setProductCatValue] = useState("");
  const [plantCode, setPlantCode] = useState("");
  const [checkSearch, setCheckSearch] = useState(false);
  const [shipNameState, setShipName] = useState("");
  const [categName, setCategName] = useState("");
  const [concatName, setConcatName] = useState("");
  const [consubcatName, setConsubcatName] = useState("");
  const [concatID, setConcatID] = useState("");
  const [consubcatID, setConsubcatID] = useState("");
  const [contractNameState, setContractName] = useState("");
  const [plantNameState, setPlantName] = useState("");
  const [shippingCondVn, setShippingCondVn] = useState("");
  const [shippingTypedVn, setShippingTypeVn] = useState("");
  const FontChange = useSelector(
    (state) => state.fontsizechanger.fontsizechanger
  );
  const HeadingFontChange = useSelector(
    (state) => state.headerfontchanger.headerfontchanger
  );

  var contractNumber;
  var shipTo;
  var plant;
  var category;
  var subcategory;
  let contractData = [];
  let accountData = [];

  const { t } = useTranslation();
  const dispatch = useDispatch();
  let userName = localStorage.getItem("userData");
  userName = JSON.parse(userName);
  // localStorage.setItem('PLACE-ORDER-FILTER-CHANGED', 'NO');
  // console.log(userName.userName)
  let changedFilter = false;
  contractNumber = localStorage.getItem("CONTRACTNUMBER");
  shipTo = localStorage.getItem("SHIPTOCODE");
  let countryCode = localStorage.getItem("userData");

  const soldToNoVn = localStorage.getItem("CustomerNumber");
  countryCode = JSON.parse(countryCode);
  // var shiptoValue = JSON.stringify(localStorage.getItem("SHIPTOCODEVALUE"));

  useEffect(() => {
    // let contractno = (contractNumber === 'null') ? "" : contractNumber;
    if (isSearch !== undefined && isSearch != null) {
      // console.log(isSearch.split(",")[0], "isSearch45555");

      if (
        isSearch.split(",")[0] === "true" &&
        new Date().getTime() < parseFloat(isSearch.split(",")[1] + 1000)
      ) {
        setCheckSearch(true);

        if (
          localStorage.getItem("CONTRACTNUMBER") !== null &&
          localStorage.getItem("CONTRACTNUMBER") !== undefined &&
          localStorage.getItem("CONTRACTNUMBER") !== ""
        ) {
          if (
            localStorage.getItem("CONTRACTNAME") !== null &&
            localStorage.getItem("CONTRACTNAME") !== undefined &&
            localStorage.getItem("CONTRACTNAME") !== ""
          ) {
            setContractName(localStorage.getItem("CONTRACTNAME"));
          }
        }

        categoryName = localStorage.getItem("CATEGORY");
        setCategName(categoryName);
        setShipName(localStorage.getItem("SHIPNAME"));
        setPlantName(localStorage.getItem("PLANTNAME"));

        if (categoryName === "CONWOOD") {
          setConcatName(localStorage.getItem("CONCATNAME"));
          setConsubcatName(localStorage.getItem("CONSUBCATNAME"));
          setConcatID(localStorage.getItem("CONCATID"));
          setConsubcatID(localStorage.getItem("CONSUBCATID"));
          //localStorage.setItem("SUBCATEGORY",localStorage.getItem("CONSUBCATID"))
        }
        searchProductsAfterSearch();
      }
    }
    loadDataOnlyOnce();
  }, []);
  let soldToNo = userName && userName.soldTo[0];
  // console.log(categoryName, "jbcbdjbjbjcj");

  const loadDataOnlyOnce = () => {
    userName.countryCode === "VN" || userName.countryCode === "LK"
      ? dispatch(masterActions.contractsbyAcc(soldToNoVn))
      : dispatch(masterActions.contractsbyAcc(userName.soldTo[0]));
    userName.countryCode === "VN" || userName.countryCode === "LK"
      ? dispatch(masterActions.shiptobyCountryAccount("True", soldToNoVn))
      : dispatch(
          masterActions.shiptobyCountryAccount("True", userName.soldTo[0])
        );

    dispatch(orderActions.getConwoodCategory("CMT", userName.countryCode));
    userName.countryCode === "VN" || userName.countryCode === "LK"
      ? dispatch(masterActions.plantbyCountryForVN(soldToNoVn, ""))
      : dispatch(masterActions.plantbyCountry(userName.countryCode, ""));
    dispatch(masterActions.getProductCatLevel(2));
    dispatch(masterActions.getProductSubCatLevel(selectValueProductValue, 3));
  };

  setTimeout(async () => {
    if (checkSearch === false) {
      try {
        const close = await document.getElementsByClassName(
          "MuiAutocomplete-clearIndicator"
        )[(0, 1)];
        if (close !== undefined) {
          close.addEventListener("click", () => {
            localStorage.removeItem("CONTRACTNUMBER");
            localStorage.removeItem("SHIPTOCODE");
            userName.countryCode === "VN" || userName.countryCode === "LK"
              ? dispatch(
                  masterActions.shiptobyCountryAccount("True", soldToNoVn)
                )
              : dispatch(
                  masterActions.shiptobyCountryAccount(
                    "True",
                    userName.soldTo[0]
                  )
                );
            userName.countryCode === "VN" || userName.countryCode === "LK"
              ? dispatch(masterActions.plantbyCountryForVN(soldToNoVn, ""))
              : dispatch(
                  masterActions.plantbyCountry(
                    userName.countryCode,
                    categoryName ? categoryName : "CMT"
                  )
                );
          });
        }
      } catch {}
    }
  }, 1000);

  const onChangeContract = async (event, value) => {
    try {
      setContractNo(value.name);
      localStorage.removeItem("SHIPTOCODE");
      dispatch(orderActions.placeOrderFilterSearchClicked(false));
      let e = value.id;

      if (e !== "Select Contract") {
        contractNumber = e;
        await localStorage.setItem("CONTRACTNUMBER", contractNumber);
        await localStorage.setItem("CONTRACTNAME", value.name);
        setShipToCode(null);
        setPlantCode("");
        accountData = [];
        localStorage.removeItem("SHIPTOCODE");
        localStorage.removeItem("PLANTCODE");
        //localStorage.removeItem("CATEGORY")
        //localStorage.removeItem("SUBCATEGORY")

        contractNumber = localStorage.getItem("CONTRACTNUMBER");
        shipTo = "";
        plant = "";
        //category = ""
        //subcategory = ""

        category =
          localStorage.getItem("CATEGORY") === null ||
          localStorage.getItem("CATEGORY") === undefined
            ? ""
            : localStorage.getItem("CATEGORY");

        subcategory =
          localStorage.getItem("SUBCATEGORY") === null ||
          localStorage.getItem("SUBCATEGORY") === undefined
            ? ""
            : localStorage.getItem("SUBCATEGORY");

        dispatch(masterActions.shiptobyCountryAccount("False", contractNumber));

        if (localStorage.getItem("ORDER-ADDED") === "YES") {
          localStorage.setItem("PLACE-ORDER-FILTER-CHANGED", "YES");
        }

        changedFilter = true;
      } else {
        localStorage.removeItem("CONTRACTNUMBER");
        localStorage.removeItem("SHIPTOCODE");
        localStorage.removeItem("PLANTCODE");

        shipTo = "";
        plant = "";

        category =
          localStorage.getItem("CATEGORY") === null ||
          localStorage.getItem("CATEGORY") === undefined
            ? ""
            : localStorage.getItem("CATEGORY");

        subcategory =
          localStorage.getItem("SUBCATEGORY") === null ||
          localStorage.getItem("SUBCATEGORY") === undefined
            ? ""
            : localStorage.getItem("SUBCATEGORY");

        dispatch(masterActions.contractsbyAcc(userName.soldTo[0]));
        userName.countryCode === "VN" || userName.countryCode === "LK"
          ? dispatch(masterActions.shiptobyCountryAccount("True", soldToNoVn))
          : dispatch(
              masterActions.shiptobyCountryAccount("True", userName.soldTo[0])
            );
      }
    } catch (err) {
      console.log("error" + err);
    }
  };

  const onChangeShipTo = async (event, value) => {
    try {
      setShipToCode(value);
      let e = value.id;
      if (e !== "Select Ship-To") {
        shipTo = e;

        await localStorage.setItem("SHIPTOCODE", shipTo);
        await localStorage.setItem("SHIPNAME", value.name);

        contractNumber =
          localStorage.getItem("CONTRACTNUMBER") === null ||
          localStorage.getItem("CONTRACTNUMBER") === undefined
            ? ""
            : localStorage.getItem("CONTRACTNUMBER");
        shipTo =
          localStorage.getItem("SHIPTOCODE") === null ||
          localStorage.getItem("SHIPTOCODE") === undefined
            ? ""
            : localStorage.getItem("SHIPTOCODE");
        plant =
          localStorage.getItem("PLANTCODE") === null ||
          localStorage.getItem("PLANTCODE") === undefined
            ? ""
            : localStorage.getItem("PLANTCODE");
        category =
          localStorage.getItem("CATEGORY") === null ||
          localStorage.getItem("CATEGORY") === undefined
            ? ""
            : localStorage.getItem("CATEGORY");
        subcategory =
          localStorage.getItem("SUBCATEGORY") === null ||
          localStorage.getItem("SUBCATEGORY") === undefined
            ? ""
            : localStorage.getItem("SUBCATEGORY");

        dispatch(orderActions.isShipToSelected(true));
        // let contractno = (contractNumber === 'null') ? "" : contractNumber;
        userName.countryCode === "VN" || userName.countryCode === "LK"
          ? dispatch(masterActions.plantbyCountryForVN(soldToNoVn, shipTo))
          : dispatch(
              masterActions.plantbyCountry(
                userName.countryCode,
                categoryName ? categoryName : "CMT"
              )
            );

        if (localStorage.getItem("ORDER-ADDED") === "YES") {
          localStorage.setItem("PLACE-ORDER-FILTER-CHANGED", "YES");
        }

        changedFilter = true;
      } else {
        localStorage.removeItem("SHIPTOCODE");
      }
    } catch (err) {
      console.log("error" + err);
      //loadDataOnlyOnce();
    }
  };

  var plantName = localStorage.getItem("PLANTNAME");
  // console.log(plantName, "plantName555");

  const onChangePlants = (event, id) => {
    let plantname = event.target.value.split('-')[1].trimStart()
    localStorage.setItem("PLANTNAME", plantname);
    console.log('hello', event.target.value, plantname );
    setPlantCode(event.target.value);
    // console.log('hello', id.props.id);
    // let e = event.target.value;
    let e = id.props.id;
    if (e !== "Select Plant") {
      plant = e;
      localStorage.setItem("PLANTCODE", plant);
      contractNumber =
        localStorage.getItem("CONTRACTNUMBER") === null ||
        localStorage.getItem("CONTRACTNUMBER") === undefined
          ? ""
          : localStorage.getItem("CONTRACTNUMBER");
      shipTo =
        localStorage.getItem("SHIPTOCODE") === null ||
        localStorage.getItem("SHIPTOCODE") === undefined
          ? ""
          : localStorage.getItem("SHIPTOCODE");
      plant =
        localStorage.getItem("PLANTCODE") === null ||
        localStorage.getItem("PLANTCODE") === undefined
          ? ""
          : localStorage.getItem("PLANTCODE");
      category =
        localStorage.getItem("CATEGORY") === null ||
        localStorage.getItem("CATEGORY") === undefined
          ? ""
          : localStorage.getItem("CATEGORY");
      subcategory =
        localStorage.getItem("SUBCATEGORY") === null ||
        localStorage.getItem("SUBCATEGORY") === undefined
          ? ""
          : localStorage.getItem("SUBCATEGORY");

      dispatch(orderActions.isPlantsSelected(true));
      // let contractno = (contractNumber === 'null') ? "" : contractNumber;
      // dispatch(orderActions.getAllProductCatalog(contractNumber, userName.soldTo[0], plant, shipTo, category, subcategory));
      if (localStorage.getItem("ORDER-ADDED") === "YES") {
        //localStorage.setItem("PLACE-ORDER-FILTER-CHANGED", "YES");
      }
      changedFilter = true;
    } else {
      localStorage.removeItem("PLANTCODE");
    }
    if (userName.countryCode === "VN" || userName.countryCode === "LK") {
      dispatch(orderActions.getShippingCondForVn(soldToNoVn, plant, shipTo));
      dispatch(orderActions.getShippingTypeForVn(soldToNoVn, plant, shipTo));
    }
  };

  contractData = contractbyAcc.contractbyacc
    ? contractbyAcc.contractbyacc.map((contractData) => {
        // console.log(contractData);
        return {
          id: contractData.contractId,
          name: contractData.contractId + "-" + contractData.contractName,
        };
      })
    : [];

  accountData = shiptobycount.shiptobycount
    ? shiptobycount.shiptobycount.map((accountData) => {
        if (selectedLangCode === "en" || selectedLangCode === null) {
          return {
            id: accountData.shipToId,
            name: accountData.shipToId + "-" + accountData.shipToName,
          };
        } else {
          if (selectedLangCode === "vt" || selectedLangCode === null) {
            return {
              id: accountData.shipToId,
              name: accountData.shipToId + "-" + accountData.shipToName,
            };
          } else {
            return {
              id: accountData.shipToId,
              name: accountData.shipToId + "-" + accountData.shipToNameInLocal,
            };
          }
        }
      })
    : [
        {
          id: "0",
          name: `${t("lable.norecordfound")}`,
        },
      ];

  const shippingCondVnData = getShippingCondForVn
    ? getShippingCondForVn.map((shipCond) => {
        return {
          id: shipCond.key,
          name: shipCond.value,
        };
      })
    : [
        {
          id: "0",
          name: `${t("lable.norecordfound")}`,
        },
      ];

  const getShippingTypeForVnData = getShippingTypeVn
    ? getShippingTypeVn.map((shipCond) => {
        return {
          id: shipCond.key,
          name: shipCond.value,
        };
      })
    : [
        {
          id: "0",
          name: `${t("lable.norecordfound")}`,
        },
      ];

  var dataFilterData = [];
  accountData.map((element) => {
    // console.log(element);
    var dataFilter = {
      id: element.id,
      name: element.name,
    };
    dataFilterData.push(dataFilter);
  });

  const plantData =
    userName.countryCode === "VN" || userName.countryCode === "LK"
      ? plantbycountVt && plantbycountVt
        ? plantbycountVt &&
          plantbycountVt.map((plantData) => {
            return {
              id: plantData.plantCode,
              name: plantData.plantName,
            };
          })
        : [
            {
              id: "0",
              name: `${t("lable.norecordfound")}`,
            },
          ]
      : plantbycount.plantbycount
      ? plantbycount.plantbycount.map((plantData) => {
          return {
            id: plantData.plantCode,
            name: plantData.plantName,
          };
        })
      : [
          {
            id: "0",
            name: `${t("lable.norecordfound")}`,
          },
        ];

  const productCategoryLavel =
    productCatOrder && productCatOrder
      ? productCatOrder &&
        productCatOrder.map((item) => {
          return {
            id: item.key,
            name: item.value,
          };
        })
      : [
          {
            id: "0",
            name: `${t("lable.norecordfound")}`,
          },
        ];

  const productSubCategoryLavel =
    subProductValueOrder && subProductValueOrder
      ? subProductValueOrder &&
        subProductValueOrder.map((item) => {
          return {
            id: item.key,
            name: item.value,
          };
        })
      : [
          {
            id: "0",
            name: `${t("lable.norecordfound")}`,
          },
        ];

  // useEffect(() => {

  //   dispatch(
  //     orderActions.getAllProductCatalog(
  //       contractNumber,
  //       '810002085',
  //       '2140',
  //       '830001596',
  //       'CMT',
  //       'BAG',
  //       'P1',
  //       'M5'
  //     )
  //   )
  // }, [])

  const searchProducts = (e) => {
    e.preventDefault();
    if (userName.countryCode === "VN" || userName.countryCode === "LK") {
      if (
        isShipToSelected === true &&
        isPlantsSelected === true &&
        isSelectedShippingCond &&
        isSelectedShippingCond === true &&
        isSelectedShippingType &&
        isSelectedShippingType === true
      ) {
        props.setSearchcount(props.searchcount + 1);
        props.setYesAddToCart(true);
        contractNumber =
          localStorage.getItem("CONTRACTNUMBER") === null ||
          localStorage.getItem("CONTRACTNUMBER") === undefined
            ? ""
            : localStorage.getItem("CONTRACTNUMBER");
        shipTo =
          localStorage.getItem("SHIPTOCODE") === null ||
          localStorage.getItem("SHIPTOCODE") === undefined
            ? ""
            : localStorage.getItem("SHIPTOCODE");
        plant =
          localStorage.getItem("PLANTCODE") === null ||
          localStorage.getItem("PLANTCODE") === undefined
            ? ""
            : localStorage.getItem("PLANTCODE");
        category =
          localStorage.getItem("CATEGORY") === null ||
          localStorage.getItem("CATEGORY") === undefined
            ? ""
            : localStorage.getItem("CATEGORY");
        subcategory =
          localStorage.getItem("SUBCATEGORY") === null ||
          localStorage.getItem("SUBCATEGORY") === undefined
            ? ""
            : localStorage.getItem("SUBCATEGORY");
        dispatch(orderActions.placeOrderFilterSearchClicked(true));
        dispatch(
          orderActions.getAllProductCatalog(
            contractNumber,
            soldToNoVn,
            plant,
            shipTo,
            category,
            subcategory ? subcategory : selectedSubProductValue,
            shippingCondVn ? shippingCondVn : "",
            shippingTypedVn ? shippingTypedVn : ""
          )
        );

        var searchData = ["true", new Date().getTime()];
        localStorage.setItem("isSearch", searchData);
        return;
      } else {
        toast.dark(t("PleaseSelectShipToPlantVN"), {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      if (isShipToSelected === true && isPlantsSelected === true) {
        props.setSearchcount(props.searchcount + 1);
        props.setYesAddToCart(true);
        contractNumber =
          localStorage.getItem("CONTRACTNUMBER") === null ||
          localStorage.getItem("CONTRACTNUMBER") === undefined
            ? ""
            : localStorage.getItem("CONTRACTNUMBER");
        shipTo =
          localStorage.getItem("SHIPTOCODE") === null ||
          localStorage.getItem("SHIPTOCODE") === undefined
            ? ""
            : localStorage.getItem("SHIPTOCODE");
        plant =
          localStorage.getItem("PLANTCODE") === null ||
          localStorage.getItem("PLANTCODE") === undefined
            ? ""
            : localStorage.getItem("PLANTCODE");
        category =
          localStorage.getItem("CATEGORY") === null ||
          localStorage.getItem("CATEGORY") === undefined
            ? ""
            : localStorage.getItem("CATEGORY");
        subcategory =
          localStorage.getItem("SUBCATEGORY") === null ||
          localStorage.getItem("SUBCATEGORY") === undefined
            ? ""
            : localStorage.getItem("SUBCATEGORY");
        dispatch(orderActions.placeOrderFilterSearchClicked(true));

        dispatch(
          orderActions.getAllProductCatalog(
            contractNumber,
            userName.soldTo[0],
            plant,
            shipTo,
            category,  
            subcategory ? subcategory : selectedSubProductValue,
            shippingCondVn ? shippingCondVn : "",
            shippingTypedVn ? shippingTypedVn : ""
          )
        );

        var searchData = ["true", new Date().getTime()];
        localStorage.setItem("isSearch", searchData);
      } else {
        toast.dark(t("PleaseSelectShipToPlant"), {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const searchProductsAfterSearch = () => {
    dispatch(orderActions.placeOrderFilterSearchClicked(true));
    dispatch(orderActions.isShipToSelected(true));
    dispatch(orderActions.isPlantsSelected(true));
    setShipToCode(localStorage.getItem("SHIPTOCODE"));
    props.setSearchcount(props.searchcount + 1);
    props.setYesAddToCart(true);
    contractNumber =
      localStorage.getItem("CONTRACTNUMBER") === null ||
      localStorage.getItem("CONTRACTNUMBER") === undefined
        ? ""
        : localStorage.getItem("CONTRACTNUMBER");
    shipTo =
      localStorage.getItem("SHIPTOCODE") === null ||
      localStorage.getItem("SHIPTOCODE") === undefined
        ? ""
        : localStorage.getItem("SHIPTOCODE");
    plant =
      localStorage.getItem("PLANTCODE") === null ||
      localStorage.getItem("PLANTCODE") === undefined
        ? ""
        : localStorage.getItem("PLANTCODE");
    category =
      localStorage.getItem("CATEGORY") === null ||
      localStorage.getItem("CATEGORY") === undefined
        ? ""
        : localStorage.getItem("CATEGORY");
    subcategory =
      localStorage.getItem("SUBCATEGORY") === null ||
      localStorage.getItem("SUBCATEGORY") === undefined
        ? ""
        : localStorage.getItem("SUBCATEGORY");
    dispatch(orderActions.placeOrderFilterSearchClicked(true));

    if (category === "CONWOOD") {
      // console.log("major " + category);
      // console.log("major " + consubcatID);

      var consub = localStorage.getItem("CONSUBCATID");

      // console.log("mxx " + consub);

      dispatch(
        orderActions.getAllProductCatalog(
          contractNumber,
          userName.soldTo[0],
          plant,
          shipTo,
          category,
          consub
        )
      );
    } else {
      dispatch(
        orderActions.getAllProductCatalog(
          contractNumber,
          userName.soldTo[0],
          plant,
          shipTo,
          category,
          subcategorys
        )
      );
    }
  };

  const onChangeProduuctCatValue = (event) => {
    dispatch(masterActions.getProductCatLevelValue(event.target.value));
    dispatch(masterActions.getProductSubCatLevel(event.target.value, 3));
  };
  const onChangeProductSubCat = (event) => {
    dispatch(masterActions.getProductSubCatLevelValue(event.target.value));

    localStorage.setItem("CONSUBCATID", event.target.value);

    // console.log("PLANT BY COUNTRY");

    contractNumber =
      localStorage.getItem("CONTRACTNUMBER") === null ||
      localStorage.getItem("CONTRACTNUMBER") === undefined
        ? ""
        : localStorage.getItem("CONTRACTNUMBER");

    category =
      localStorage.getItem("CATEGORY") === null ||
      localStorage.getItem("CATEGORY") === undefined
        ? ""
        : localStorage.getItem("CATEGORY");

    userName.countryCode === "VN" || userName.countryCode === "LK"
      ? dispatch(masterActions.plantbyCountryForVN(soldToNoVn, ""))
      : dispatch(
          masterActions.plantbyCountry(
            userName.countryCode,
            categoryName ? categoryName : "CMT"
          )
        );
  };

  const saveCat = (e) => {
    // console.log("EXX " + e.currentTarget.getAttribute("value"));

    localStorage.setItem("CONCATNAME", e.currentTarget.getAttribute("name"));
  };

  const saveSubCat = (e) => {
    // console.log("EXX " + e.currentTarget.getAttribute("value"));

    localStorage.setItem("CONSUBCATNAME", e.currentTarget.getAttribute("name"));
  };

  const clearSearch = () => {
    //localStorage.removeItem("CATEGORY");
    localStorage.removeItem("CONTRACTNUMBER");
    localStorage.removeItem("SHIPTOCODE");
    localStorage.removeItem("PLANTCODE");
    localStorage.setItem("SUBCATEGORY", "BAG");
    localStorage.setItem("CATEGORY", "CMT");
    localStorage.removeItem("isSearch");
    localStorage.removeItem("shipingCondForVn");
    localStorage.removeItem("shipingTypeForVn");

    window.location.reload();
  };
  const defaultProps = {
    options: accountData,
    getOptionLabel: (option) => option && option.name.replace(/^0+/, ""),
  };

  const onChangeShippingCond = (event, value) => {
    const data = {
      id: value.id,
      name: value.name,
      selected: true,
    };
    localStorage.setItem("shipingCondForVn", JSON.stringify(data));
    dispatch(orderActions.ShipingCondSelected(true));
    setShippingCondVn(value.id);
  };

  const onChangeShippingType = (event, value) => {
    const data = {
      id: value.id,
      name: value.name,
      selected: true,
    };
    localStorage.setItem("shipingTypeForVn", JSON.stringify(data));
    dispatch(orderActions.ShipingTypeSelected(true));
    setShippingTypeVn(value.id);
  };

  const sortPlantByName = (data) => {
    let name = [];
    data?.map((item) => {
      return name.push({
        id: item.id,
        first: item.name.split("-")[0],
        last: item.name.split("-")[1],
      });
    });
    const sortName = name.sort((a, b) => a.last.localeCompare(b.last));
    return sortName ? sortName : [];
    // console.log('hello', data, name, sortName)
  };

  function getPlantFilterData(plant){
    const showList = ["1010", "1041", "1012", "1013"]
    plant = plant && plant.filter((item)=>showList.includes(item.id))
    return plant
  }

  return (
    <>
      {checkSearch === true ? (
        <div className="col-12">
          <div className="title_head order_heading">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-12">
                    <h3
                      className="currentSearch"
                      style={{ fontSize: `${HeadingFontChange}px` }}
                    >
                      {t("currentSearch")}
                    </h3>
                  </div>
                </div>
                <div className="row">
                  {countryCode.countryCode === "VN" ||
                  countryCode.countryCode === "LK" ? (
                    ""
                  ) : (
                    <div className="col-4">
                      <p style={{ fontSize: `${FontChange}px` }}>
                        <strong>{t("Contract")}:</strong>{" "}
                        {contractNameState === "" ||
                        contractNameState === undefined ||
                        contractNameState === null
                          ? t("notSelected")
                          : contractNameState}
                      </p>
                    </div>
                  )}

                  <div className="col-4">
                    <p style={{ fontSize: `${FontChange}px` }}>
                      <strong>{t("shipTo")}: </strong>
                      {shipNameState === "" ||
                      shipNameState === undefined ||
                      shipNameState === null
                        ? t("notSelected")
                        : shipNameState.replace(/^0+/, "")}
                    </p>
                  </div>
                </div>
              </div>
              {categName === "CONWOOD" ? (
                <div className="col-12">
                  <div className="row">
                    <div className="col-12">
                      <p style={{ fontSize: `${FontChange}px` }}>
                        <strong>{t("product")}:</strong>{" "}
                        {categName === "" ||
                        categName === undefined ||
                        categName === null
                          ? t("notSelected")
                          : categName}
                      </p>
                    </div>
                    <div className="col-12">
                      <div className="row">
                        <div className="col-4">
                          <p style={{ fontSize: `${FontChange}px` }}>
                            <strong>{t("category")}:</strong>{" "}
                            {concatName === "" ||
                            concatName === undefined ||
                            concatName === null
                              ? t("notSelected")
                              : concatName}
                          </p>
                        </div>
                        <div className="col-4">
                          <p style={{ fontSize: `${FontChange}px` }}>
                            <strong>{t("subcategory")}:</strong>{" "}
                            {consubcatName === "" ||
                            consubcatName === undefined ||
                            consubcatName === null
                              ? t("notSelected")
                              : consubcatName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-12">
                  <div className="row">
                    <div className="col-12">
                      <p style={{ fontSize: `${FontChange}px` }}>
                        <strong>{t("product")}:</strong>{" "}
                        {categName === "" ||
                        categName === undefined ||
                        categName === null
                          ? t("notSelected")
                          : categName}
                      </p>
                    </div>
                    <div className="col-12">
                      <p style={{ fontSize: `${FontChange}px` }}>
                        <strong>{t("category")}:</strong>{" "}
                        {subcategorys === "" ||
                        subcategorys === undefined ||
                        subcategorys === null
                          ? t("notSelected")
                          : t(
                              subcategorys === "BAG"
                                ? `bag.radio`
                                : "bulk.radio"
                            )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-12">
                <div className="row">
                  <div
                    className="col-4"
                    style={{ fontSize: `${FontChange}px` }}
                  >
                    <strong> {t("plant")}: </strong>{" "}
                    {plantNameState === "" ||
                    plantNameState === undefined ||
                    plantNameState === null
                      ? t("notSelected")
                      : plantNameState}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row">
                <Button
                  className="clearSearch"
                  onClick={clearSearch}
                  style={{ fontSize: `${FontChange}px` }}
                >
                  {t("Clear Search")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-12">
          <div className="title_head order_heading">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                {props.field === "form" ? (
                  <div className="row form_section">
                    {userName.countryCode === "VN" ||
                    userName.countryCode === "LK" ? (
                      ""
                    ) : (
                      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <label style={{ fontSize: `${FontChange}px` }}>
                          {t("Select Contract")}
                        </label>
                        <Autocomplete
                          id="contract"
                          options={contractData}
                          noOptionsText={t("lable.norecordfound")}
                          onChange={onChangeContract}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              //label={t('Select Contract')}
                              variant="outlined"
                            />
                          )}
                        />
                      </div>
                    )}

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                      <label style={{ fontSize: `${FontChange}px` }}>
                        {t("Select Ship-To")}
                        <spam style={{ color: "red" }}>*</spam>
                      </label>
                      <Autocomplete
                        {...defaultProps}
                        id="select-ship-to"
                        noOptionsText={t("lable.norecordfound")}
                        value={shipToCode}
                        onChange={onChangeShipTo}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            //label={t('Select Ship-To')}
                            variant="outlined"
                          />
                        )}
                      />
                    </div>

                    <div className="col-12 mt-3">
                      <RadioButtonItem />
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      {categoryName && categoryName === "CONWOOD" ? (
                        // <RadioButtonCategory />

                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="row">
                            <div className="col-4 pl-0">
                              <FormControl fullWidth>
                                <InputLabel
                                  id="select-ship-to"
                                  style={{ fontSize: `${FontChange}px` }}
                                >
                                  {t("Category")}
                                </InputLabel>
                                <Select
                                  labelId="select-ship-to"
                                  onChange={(event) =>
                                    onChangeProduuctCatValue(event)
                                  }
                                >
                                  {productCategoryLavel.map((data) => (
                                    <MenuItem
                                      onClick={(event) => saveCat(event)}
                                      name={data.name}
                                      value={data.id}
                                      key={data.id}
                                    >
                                      {data.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </div>
                            <div className="col-4 pl-0">
                              <FormControl fullWidth>
                                <InputLabel
                                  id="select-ship-to"
                                  style={{ fontSize: `${FontChange}px` }}
                                >
                                  {t("Sub Category")}
                                </InputLabel>
                                <Select
                                  labelId="select-ship-to"
                                  onChange={(event) =>
                                    onChangeProductSubCat(event)
                                  }
                                >
                                  {productSubCategoryLavel.map((data) => (
                                    <MenuItem
                                      onClick={(event) => saveSubCat(event)}
                                      name={data.name}
                                      value={data.id}
                                      key={data.id}
                                    >
                                      {data.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {userName.countryCode === "LK" ? (
                        ""
                      ) : categoryName === undefined ||
                        categoryName === "CMT" ||
                        categoryName === "MORTAR" ||
                        categoryName === "DM" ? (
                        <RadioButtonType categoryName={categoryName} />
                      ) : null}
                    </div>

                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 mt-2">
                      <label style={{ fontSize: `${FontChange}px` }}>
                        {t("Select Plant")}
                        <spam style={{ color: "red" }}>*</spam>
                      </label>
                      <FormControl fullWidth>
                        {/* <InputLabel id='select-plant'>
                          {t('Select Plant')}
                        </InputLabel> */}
                        {/* {console.log("plantData=>", getPlantFilterData(plantData))} */}
                        <Select
                          // labelId='select-plant'
                          value={plantCode}
                          defaultValue={plantName}
                          onChange={onChangePlants}
                        >
                          {/* {sortPlantByName(getPlantFilterData(plantData)).map((item) => { */}
                          {plantData.map((item) => {
                            return (
                              <MenuItem
                                value={item.name}
                                id={item.id}
                                key={item.id}
                              >
                                {item.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                    {userName.countryCode === "VN" ||
                    userName.countryCode === "LK" ? (
                      <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 mt-2">
                        <Autocomplete
                          id="shipingCond"
                          options={shippingCondVnData}
                          noOptionsText={t("lable.norecordfound")}
                          // value={shipToCode}
                          getOptionLabel={(option) => option.name}
                          onChange={onChangeShippingCond}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={t("label.shipping_condition")}
                              variant="outlined"
                            />
                          )}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    {userName.countryCode === "VN" ||
                    userName.countryCode === "LK" ? (
                      <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 mt-2">
                        <Autocomplete
                          id="shipingType"
                          options={getShippingTypeForVnData}
                          noOptionsText={t("lable.norecordfound")}
                          // value={shipToCode}
                          getOptionLabel={(option) => option.name}
                          onChange={onChangeShippingType}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={t("shippingtype.label")}
                              variant="outlined"
                            />
                          )}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="col-12"></div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12 clear-all-link p-3">
                      <button
                        className="create_btn"
                        id="SearchProdBtn"
                        onClick={searchProducts}
                        type="button"
                        style={{ fontSize: `${FontChange}px` }}
                      >
                        {t("Search")}
                      </button>
                      <br />
                      <span
                        className="text-red"
                        onClick={clearSearch}
                        style={{ fontSize: `${FontChange}px` }}
                      >
                        {t("Clear Search")}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withTranslation()(FilterDropdown);
