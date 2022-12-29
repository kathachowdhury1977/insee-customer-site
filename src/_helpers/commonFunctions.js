import * as XLSX from "xlsx";
import moment from "moment";

export const EXCEL_DATE_FORMAT = "dd-mm-yyyy";

export const isRequired = (val) => {
  if (val && val.toString().trim().length > 0) {
    return true;
  }
  return false;
};

export const handleZero = (data) => {
  const inputData = data ? data.toString() : "";
  if (inputData && inputData[0] != "0") {
    return `0${inputData}`;
  }
  return inputData;
};

// remove all proceding zeros from a number
export const DataFormat = (inputData) => {
  if (inputData) {
    return inputData.toString().replace(/^0+/, "");
  }
  return "";
};

// format date javascript
// operator - or / or .
export const dateFormater = (date, separator = "-") => {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  // show date and month in two digits
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  // now we have day, month and year
  // use the separator to join them
  return year + separator + month + separator + day;
};

// convert date into time as integer
export const getDateTime = (date) => {
  return new Date(date).getTime();
};

// remove empty or undefined property from object
export const removeObjectEmpty = (obj) => {
  return Object.keys(obj)
    .filter((key) => obj[key])
    .reduce((newObj, key) => {
      newObj[key] = obj[key];
      return newObj;
    }, {});
};

// export file columnwise date Formatting
/*
  ws: worksheet object
  C: 0-based index of the column you want to change, C = 1 means column "B"
  Z: number format string
*/
export const ExportFileDatecolumnformat = (ws, C, Z) => {
  var range = XLSX.utils.decode_range(ws["!ref"]);
  /* this loop starts on the second row, as it assumes the first row is a header */
  for (var R = range.s.r + 1; R <= range.e.r; ++R) {
    var cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
    if (cell == "" || cell.v == null) continue;
    cell.t = "d";
    cell.v = new Date(cell.v);
    cell.z = Z;
  }
};

// export data from Data Grid
export const ExportDataGrid = (
  Heading,
  colKeys,
  dataToExp,
  dateFormatIndexes,
  ExportFileName,
  exportformatting
) => {
  let data = dataToExp;
  //function to filter the required feilds
  const DataToExport = (data, arr) => {
    return data.map((item) => {
      return Object.keys(item)
        .filter((k) => arr.includes(k))
        .reduce((acc, key) => ((acc[key] = item[key]), acc), {});
    });
  };
  //create a new workbook and then add the header
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet([]);
  XLSX.utils.sheet_add_aoa(ws, Heading);
  //Starting in the second row to avoid overriding and skipping headers
  XLSX.utils.sheet_add_json(ws, DataToExport(data, colKeys), {
    origin: "A2",
    header: colKeys,
    skipHeader: true,
    cellDates: true,
    dateNF: "YYYYMMDD hh:mm:ss",
  });
  //formatting the date columns
  if (exportformatting && exportformatting.length > 0) {
    exportformatting.forEach((element) => {
      // ExportFileDatecolumnformat(ws, element, "dd-mm-yyyy");
      ExportFileDatecolumnformat(
        ws,
        colKeys.indexOf(Object.keys(element)[0]),
        Object.values(element)[0] == "date" ? EXCEL_DATE_FORMAT : ""
      );
    });
  }
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb, ExportFileName + ".xlsx");
};

//comma seperated and 2 digit after decimal for Points
export const convertToCurrencyFormat = (value = 0) => {
  value = value === "null" ? 0 : value;
  const currency = Intl.NumberFormat("en-us").format(Number(value).toFixed(2));
  let afterDecimal = currency.includes(".") ? currency.split(".")[1] : "00";
  if (afterDecimal.length === 1) {
    afterDecimal = `${afterDecimal}0`;
  }

  return `${currency.split(".")[0]}.${afterDecimal}`;
};

//comma seperated and 3 digit after decimal for Quantity
export const convertToCurrencyFormatQuantaty = function (value = 0) {
  value = value === "null" ? 0 : value;
  const currency = Intl.NumberFormat("en-us").format(Number(value).toFixed(3));

  let afterDecimal = currency.includes(".") ? currency.split(".")[1] : "000";
  if (afterDecimal.length === 1) {
    afterDecimal = `${afterDecimal}00`;
  } else if (afterDecimal.length === 2) {
    afterDecimal = `${afterDecimal}0`;
  }

  return `${currency.split(".")[0]}.${afterDecimal}`;
};

export const DATE_FORMAT = "DD-MM-YYYY";
export const DATE_TIME_FORMAT = "DD-MM-yyyy HH:mm";

export const millisecondsToStringDate = (milisecond, format) => {
  return milisecond && !Number.isNaN(Number(milisecond))
    ? moment(Number(milisecond)).format(format)
    : "";
};


// custom sorting function 

// ===============================================
function descendingComparator(a, b, orderBy) {
  let p =a[orderBy] ? (typeof a[orderBy] === "string" ? a[orderBy].toLowerCase() : a[orderBy]) : "";
  let k = b[orderBy] ? (typeof b[orderBy] === "string" ? b[orderBy].toLowerCase() : b[orderBy]) :"";
  if (k < p) {
    return -1;
  }
  if (k > p) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? function (a, b) { return descendingComparator(a, b, orderBy); }
    : function (a, b) { return -descendingComparator(a, b, orderBy); };
}

function stableSort(array, comparator) {
  var stabilizedThis = array.map(function (el, index) { return [el, index]; });
  stabilizedThis.sort(function (a, b) {
    var order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(function (el) { return el[0]; });
}

export function customStableSort(rows, model) {
  if (model[0]) {
    const { field, sort } = model[0]
    return stableSort(rows, getComparator(sort, field))
  }
  return rows;
}
