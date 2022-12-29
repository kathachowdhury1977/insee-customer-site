import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withTranslation, useTranslation } from "react-i18next";
import Pagination from "@material-ui/lab/Pagination";
import { useDispatch, useSelector } from 'react-redux'
import { reportActions } from "../../_actions";
import Loading from '../Loader/Loading'
import '../../containers/Dashboard/ReportManagement/ReportManagement.scss'

function SalesOrderReportTable(props) {
    const { t } = useTranslation();
    let dispatch = useDispatch();

    const [page, setPage] = React.useState(1);
    const [startIndex, setStartIndex] = React.useState(1);
    const [endIndex, setEndIndex] = React.useState(10);

    const isPageLoading = useSelector((state) => state.getSalesOrderReport.loading)
    const getSalesReportData = useSelector((state) => state.getSalesOrderReport);
    const selectedLangCode = localStorage.getItem('lancode');

    const modifyDate = (curDate) => {
        var b = [curDate.slice(8, 10), "-", curDate.slice(5, 7), "-", curDate.slice(0, 4)].join('');
        return b;
    }
    const exportTable = () => {
        props.handleChangeExport(true)
    }

    const handleChangePage = (event, value) => { debugger
        let start = 1;
        let end = 2;
        if (value === 1) {
            setStartIndex(1)
            setEndIndex(2)
        }
        else {
            start = (value);
            end = value * 2;
            setStartIndex(value);
            setEndIndex(value * 2);
        }
        setPage(value);
        props.onChangeStartAndEndIndex(start, end, value);
    }

    const modifyMaterialNumber = (number) => {
        var n = number = (number * 1).toString();
        return n;
    }

    const decimalwithcoma = (num) => {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    };

    const mydivision = props.division;
  

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
                            
                              <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Contract Number")}</th>
                              <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("contract_name")}</th>
                             
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("po_date")}</th>
                            
                            {
                                mydivision && mydivision === 'CO' ? '' :
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("PO No")}</th>
                            }
                             
                            
                              
                            <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("order_number")}</th>
                            
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Ship-to Name")}</th>
                           
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>
                                    {mydivision === "CO" ?
                                        t("label.material_code") :
                                        t("ProductNameReport")
                                    }

                                </th>

                                {mydivision === "CO" ?
                                    <>
                                        <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("CU")}</th>
                                        <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("CY")}</th>
                                        <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("Special Instruction")}</th>
                                        </>
                                    : null
                                }

                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("ordered_quantity")}</th>
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("unit")}</th>
                               
                                {/* <th scope="col">{t("pre_do_qty")}</th> */}
                                {/* <th scope="col">{t("remaing_qty_with_pre_do")} </th> */}
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("remained_qty")} </th>
                               
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("deivered_qty")}</th>

                              
                                {/* <th scope="col">{t("Internal Note")} </th> */}
                                <th scope="col" style={{fontSize: `${SmallFontChanger}px`}}>{t("order_status.lable")} </th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isPageLoading ? (getSalesReportData && getSalesReportData.getSalesOrderReport && getSalesReportData.getSalesOrderReport.paginationdto
                                && getSalesReportData.getSalesOrderReport.paginationdto.results ? getSalesReportData.getSalesOrderReport.paginationdto.results.map((item, key) =>
                                    <tr>
                                        
                                        <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.contractNumber}</span></td>
                                        <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.contractName}</span></td>
                                      
                                        
                                        <td><span style={{fontSize: `${SmallFontChanger}px`}}>{modifyDate(item.poDate)}</span></td>
                                        {
                                             mydivision && mydivision === 'CO' ? '' :
                                             <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.poNo}</span></td> 
                                        }
                                         
                                        <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item.orderNo}</span></td>
                                       
                                        <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item && item.shipToName ?  selectedLangCode === 'en' || selectedLangCode === null ? item.shipToName.split(':')[1] : item.shipToName.split(':')[0]: ''}</span></td>
                                      
                                         {mydivision === "CO" ?
                                        <td><span style={{fontSize: `${SmallFontChanger}px`}}>{modifyMaterialNumber(item.materialCode)}</span></td> :
                                        <td><span style={{fontSize: `${SmallFontChanger}px`}}>{item && item.materialName ? selectedLangCode === 'en' || selectedLangCode === null ? item.materialName.split(':')[1] : item.materialName.split(':')[0]: ''}</span></td>
                                    }
                                        
                                        {
                                        mydivision === "CO" ?
                                            <>
                                                <td align="left"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.cu}</span></td>
                                                <td align="left"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.cy}</span></td>
                                                <td align="left"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.specialInstruction}</span></td> </>
                                            : null
                                        }
                                        <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{decimalwithcoma(item.orderedQuantity)}</span></td>
                                        <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{item.unit}</span></td>
                                       
                                        {/* <td align="right"><span>{decimalwithcoma(item.preDOQuantity)}</span></td> */}
                                        {/* <td align="right"> <span>{item.remainingQuantity}</span></td> */}
                                        <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{decimalwithcoma(item.remainingQuantity)}</span></td>
                                       
                                  
                                        <td align="right"><span style={{fontSize: `${SmallFontChanger}px`}}>{decimalwithcoma(item.deliveredQuantity)}</span></td>
                                        
                                        {/* <td><span>{item.internalNote}</span></td> */}
                                        <td><span style={{fontSize: `${SmallFontChanger}px`}}>{
                                        item.orderStatusth ? selectedLangCode === 'en' || selectedLangCode === null ?
                                        item.orderStatusth.split('-')[1] : item.orderStatusth.split('-')[0] : item.orderStatusth
                                        }</span></td>

                                    </tr>) :
                                !(getSalesReportData.getSalesOrderReport && getSalesReportData.getSalesOrderReport.length > 0)
                                    ? <div className="no_record_table">{t("lable.norecordfound")}</div> : null) :
                                <div className='loadingOne'>
                                    <Loading />
                                </div>
                                }

                        </tbody>
                    </table>

                </div>
            </div>

            <div className="row ">
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12">
                    {getSalesReportData.getSalesOrderReport && getSalesReportData.getSalesOrderReport.paginationdto && getSalesReportData.getSalesOrderReport.paginationdto.totalCount ?
                        <Pagination count={Math.ceil(getSalesReportData.getSalesOrderReport.paginationdto.totalCount / 20)} page={props.page} onChange={handleChangePage} />
                        : null}
                </div>
                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                </div>
                <div className="col-xl-2 col-lg-4 col-md-6 col-sm-12">
                    {
                        getSalesReportData && getSalesReportData.getSalesOrderReport && getSalesReportData.getSalesOrderReport.paginationdto
                        && getSalesReportData.getSalesOrderReport.paginationdto.results  ? getSalesReportData.getSalesOrderReport.paginationdto.results.length > 0 ? <button className="redButton" onClick={exportTable} style={{fontSize: `${FontChange}px`}}>{t("export")}</button>
                        : '' : ''
                    }
                   
                </div>
            </div>
        </>
    );
}
export default withTranslation()(SalesOrderReportTable);
