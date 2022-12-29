import React, { useEffect } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import ReportHeader from "../../../components/OpenItemsReport/OpenItemReportHeader";
import ReportTable from "../../../components/OpenItemsReport/OpenItemReportTable";
import Header from "../../../components/Header/Header";
// import "../CaseReports";
import { reportActions } from "../../../_actions";
function TaxInvoiceReport() {
    const event = useSelector(state => state);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);
    const [startIndex, setStartIndex] = React.useState(1);
    const [endIndex, setEndIndex] = React.useState(10);
    const [division, setDivision] = React.useState('DryMix');

    useEffect(() => {
        dispatch(reportActions.getOpenItemsReport(localStorage.getItem('CustomerNumber'), division, startIndex, endIndex));
    }, [startIndex, endIndex, division])

    const handlePagnation=(start, end,pageNo)=> {
        setStartIndex(start);
        setEndIndex(end);
        setPage(pageNo);
    }
    const handleDivision=(event) =>{
        setStartIndex(1);
        setEndIndex(10);
        setPage(1);
        setDivision(event);
    }
    return (
        <>
            <div className="content-wrapper">
                <Header title="Report" />
                <div className="row">
                    <div className="mainScroll">
                        <div className="reports-landing-container">
                            <ReportHeader
                                onChangeDivision={handleDivision}
                                division={division} />

                            <ReportTable
                                onChangeStartAndEndIndex={handlePagnation}
                                page={page}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation()(TaxInvoiceReport);
