import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loader/Loading'
import Axios, { AxiosResponse } from 'axios';
//import { process.env.REACT_APP_API_URL_PAYMENTOFFLINE } from '../../constant'
import moment from "moment";
import "moment-timezone";
import '../../containers/Dashboard/ReportManagement/ReportManagement.scss'

function TaxInvoiceReportTable(props) {
    const { t } = useTranslation();

    const [page, setPage] = React.useState(1);
    const [startIndex, setStartIndex] = React.useState(1);
    const [endIndex, setEndIndex] = React.useState(10);
    const selectedLangCode = localStorage.getItem("lancode");
    const isPageLoading = useSelector((state) => state.getTaxInvoiceReports.loading);
    const getTaxInvoiceReportsFilter = useSelector((state) => state.getTaxInvoiceReports.getTaxInvoiceReports);

    let userData = localStorage.getItem('userData')
    userData = JSON.parse(userData)
    let custmerNo = userData && userData.soldTo ? userData.soldTo[0] : 0
    const [summaryOpen, setSummaryOpen] = useState({});

    const handleChangePage = (event, value) => {
        let start = 1;
        let end = 10;
        if (value === 1) {
            setStartIndex(1)
            setEndIndex(10)
        }
        else {
            start = ((value - 1) * 10) + 1;
            end = value * 10;
            setStartIndex(((value - 1) * 10) + 1);
            setEndIndex(value * 10);
        }
        setPage(value);
        props.onChangeStartAndEndIndex(start, end, value);
    }
    const exportTaxInvoicesReports = () => {
        props.setIsLoading(true)
        var thText = selectedLangCode && selectedLangCode === 'th' ? 'TH' : 'EN'
        // setSetloading(true)
        Axios({
            method: "GET", url: process.env.REACT_APP_API_URL_PAYMENTOFFLINE + `/downloadTaxInvoiceReport?countrycode=${thText}&customercode=${custmerNo}&division=${props.division}&filter=${props.filterDataValue}&fromdate=${props.fromDate}&search=${props.filterData}&todate=${props.toDate}&type=${props.filterType}`, responseType: 'arraybuffer', headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
                'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
            }
        })
            // .then((res) => res.json())
            .then(async (response) => {
                //setSetloading(false)
                var link = document.createElement('a');
                const file = new Blob([response.data], { type: 'application/.xlsx' });
                const fileURL = await URL.createObjectURL(file);
                link.href = window.URL.createObjectURL(file);
                link.download = "TaxInvoicesReports" + ".xlsx";
                link.click();
                // setIsLoadingDownload(false)
                return response.data;
            })
            setTimeout(() => {
                props.setIsLoading(false)
                  }, 3000);

    }

    const decimalwithcoma = (num) => {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    };

    const downLoadInvoice = (invoiceNo) => {
        props.setIsLoading(true)
        // setSetloading(true)
        Axios({
            method: "GET", url: process.env.REACT_APP_API_URL_PAYMENTOFFLINE + `/taxdms?customercode=${custmerNo}&inv=${invoiceNo}`, responseType: 'arraybuffer', headers: {
                "Content-Type": "application/json",
                'X-AUTH-TOKEN': localStorage.getItem('x-auth-token'),
                'X-SOLD-TO-ID': localStorage.getItem('CustomerNumber')
            }
        })
            // .then((res) => res.json())
            .then(async (response) => {
                //setSetloading(false)
                var link = document.createElement('a');
                const file = new Blob([response.data], { type: 'application/.pdf' });
                const fileURL = await URL.createObjectURL(file);
                link.href = window.URL.createObjectURL(file);
                link.download = "TaxInvoice_" + invoiceNo + ".pdf";
                link.click();
                // setIsLoadingDownload(false)
                return response.data;
            })
            setTimeout(() => {
                props.setIsLoading(false)
                  }, 4000);
    }


    const summaryOpenToggle = (id) => {
        if (summaryOpen[`childTable${id}`]) {
          setSummaryOpen({ ...summaryOpen, [`childTable${id}`]: false });
        } else {
          setSummaryOpen({ ...summaryOpen, [`childTable${id}`]: true });
        }
      };

      const modifyMaterialNumber = (number) => {
        var n = number = (number * 1).toString();
        return n;
    }

      console.log(props.division, 'hello789')

      const SmallFontChanger = useSelector((state) => state.smallfontchanger.smallfontchanger);
      const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
      const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger)

    return (
        <>
            <div className="row mt-3 case-report-table">
                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 pl-0 pr-0">
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                {
                                     props.division && props.division === 'Conwood' ?
                                     <th scope="col">{t("")}</th> : ''
                                }
                                
                                <th scope="col">{t("")}</th>
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Tax Invoice Number")}</th>
                                {
                                   props.division && props.division === 'Concrete' ? '' :
                                    <>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Contract Number")}</th>
                                     <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("contract_name")}</th>
                                    </>

                                }
                                

                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Tax Invoice Date")}</th>
                                {
                                    props.division && props.division === 'Concrete' ? 
                                    <>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Ship To No.")}</th>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Ship-to Name")}</th>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Plant Code")}</th> 
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("plantname.reports")}</th>
                                    <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("label.material_code")}</th> 
                                    </>
                                    : ''
                                }
                               

                                {
                                     props.division && props.division === 'Concrete' ? ' ' :
                                     <>
                                     <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("shipmanagement.donumber")}</th>
                                     <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("PO No")}</th>
                                     <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("SO No")}</th>
                                     <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("ProductNameReport")}</th>
                                     </>
                                }
                               
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Truck Licence")}</th>
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("qty")}</th>
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("unit")}</th>
                                {
                                     props.division && props.division === 'Concrete' ? 
                                     <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Minimum load charge")}</th>
                                     : '' 
                                }
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Amount Before Tax")}</th>
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Tax")}</th>
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Total Amount")}</th>
                                {/* <th scope="col">{t("Actions")}</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            {!isPageLoading ? (getTaxInvoiceReportsFilter && getTaxInvoiceReportsFilter.totalCount > 0 ?
                                getTaxInvoiceReportsFilter && getTaxInvoiceReportsFilter.results && getTaxInvoiceReportsFilter.results.map((row) =>
                                   <>
                                   <tr>
                                        {
                                            props.division && props.division === 'Conwood' ?
                                            <td><span style={{ cursor: 'pointer' }} 
                                            onClick={(e) => summaryOpenToggle(row.invoiceNo)}
                                           >
                                              <i className="fa fa-plus" style={{fontSize: `${SmallFontChanger}px`}}></i>
                                          </span>
                                          </td>
                                             : ''
                                        }
                                         
                                        <td><span style={{ cursor: 'pointer' }} onClick={() => downLoadInvoice(row.invoiceNo)}>
                                            <i className="fa fa-download" style={{fontSize: `${SmallFontChanger}px`}}></i>
                                        </span>
                                        </td>
                                        <td scope="row">
                                            <span className="text-red">
                                                <b><span  style={{fontSize: `${SmallFontChanger}px`}}>{row.invoiceNo}</span></b>
                                            </span>
                                        </td>
                                        {
                                             props.division && props.division === 'Concrete' ? '' :
                                             <>
                                              <td><span style={{fontSize: `${SmallFontChanger}px`}}>{row.contractNo}</span></td>
                                                <td><span style={{fontSize: `${SmallFontChanger}px`}}>{row.contractName}</span></td>
                                             </>
                                        }
                                       
                                        <td><span> {moment(row.invoiceDate).format(
                                            "DD-MM-YYYY"
                                        )}
                                        </span></td>
                                        {
                                            props.division && props.division === 'Concrete' ? 
                                            <>
                                            <td><span style={{fontSize: `${SmallFontChanger}px`}}>{row.shiptonumber ? row.shiptonumber.replace(/^0+/, '') : ''}</span></td>
                                             <td><span style={{fontSize: `${SmallFontChanger}px`}}>{row.shiptoname}</span></td>
                                             <td><span style={{fontSize: `${SmallFontChanger}px`}}>{row.plantcode}</span></td>
                                             <td><span style={{fontSize: `${SmallFontChanger}px`}}>{row.plantname}</span></td>
                                             <td><span style={{fontSize: `${SmallFontChanger}px`}}>{modifyMaterialNumber(row.materialcode)}</span></td>
                                            </>
                                            : ''
                                        }
                                       
                                          {
                                            props.division && props.division === 'Concrete' ? ' ' : 
                                            <>
                                            <td><span style={{fontSize: `${SmallFontChanger}px`}}>{row.doNumber}</span></td>
                                            <td><span style={{fontSize: `${SmallFontChanger}px`}}>{row.poNumber}</span></td>
                                            <td><span style={{fontSize: `${SmallFontChanger}px`}}>{row.soNumber}</span></td>
                                            <td><span style={{fontSize: `${SmallFontChanger}px`}}>{
                                            row && row.material ? selectedLangCode === 'en' || selectedLangCode === null ? row.material : row.materialLocal : ''
                                            }</span></td> 
                                            </>
                                        }
                                        <td><span style={{fontSize: `${SmallFontChanger}px`}}>{row.trucklicense}</span></td>
                                        <td style={{textAlign: 'right',fontSize: `${SmallFontChanger}px`}}><span>{decimalwithcoma(row.qty)}</span></td>
                                        <td><span style={{fontSize: `${SmallFontChanger}px`}}>{row.unit}</span></td>
                                        {
                                            props.division && props.division === 'Concrete' ? 
                                            <td  style={{textAlign: 'right',fontSize: `${SmallFontChanger}px`}}><span>{row.minimumloadcharge ? decimalwithcoma(parseFloat(row.minimumloadcharge).toFixed(2)):''}</span></td>
                                            : ''
                                        }
                                        <td style={{textAlign: 'right', fontSize: `${SmallFontChanger}px`}}><span>{decimalwithcoma(row.amountBeforeTax)}</span></td>
                                        <td style={{textAlign: 'right', fontSize: `${SmallFontChanger}px`}}><span>{decimalwithcoma(row.tax)}</span></td>
                                        <td style={{textAlign: 'right', fontSize: `${SmallFontChanger}px`}}><span>{decimalwithcoma(row.totalamount)}</span></td>

                                        {/* <td><i className="fa fa-file-pdf-o"></i></td> */}
                                    </tr>
                                    
                                  
                                    </>

                                )
                                : <div className="noBankFound">{t("lable.norecordfound")}</div>) : 
                                <div className='loadingOne'>
                                <Loading />
                                </div>

                            }
                        </tbody>
                    </table>

                </div>
            </div>

            <div className="row ">

                <div className="col-xl-10 col-lg-10 col-md-6 col-sm-12">
                    <Pagination
                        count={Math.ceil(getTaxInvoiceReportsFilter && getTaxInvoiceReportsFilter.totalCount / 10)}
                        page={props.page}
                        onChange={handleChangePage}
                    />
                </div>
                <div className="col-xl-2 col-lg-2 col-md-6 col-sm-12">
                    {
                        getTaxInvoiceReportsFilter && getTaxInvoiceReportsFilter.totalCount > 0 ?
                        getTaxInvoiceReportsFilter && getTaxInvoiceReportsFilter.results && getTaxInvoiceReportsFilter.results.length > 0 ?
                        <button className="redButton" style={{fontSize: `${FontChange}px`}} onClick={exportTaxInvoicesReports}>{t("export")}</button> : '' : ''
                    }
                    

                </div>
            </div>

        </>
    );
}
export default withTranslation()(TaxInvoiceReportTable);
