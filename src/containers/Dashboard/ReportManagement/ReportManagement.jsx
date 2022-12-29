import React, { useEffect, useState } from 'react'
import { eventActions, orderActions, masterActions } from '../../../_actions'
import { withTranslation, useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../../components/Header/Header'
import '.././Dashboard.scss'
import dashboardBanner from '../../../assets/img/dashboard-banner-image.png'
import placeOrderImage from '../../../assets/img/place-order.png'
import createShipmentImage from '../../../assets/img/create-shipment.png'
import trackShipmentImage from '../../../assets/img/track-shipment.png'
import salesReportImage from '../../../assets/img/salesOrderReport.svg'
import deliveryReportImage from '../../../assets/img/DeliveryReport.svg'
import creditNoteReportImage from '../../../assets/img/CreditNoteReport.svg'
import taxInvoiceReportImage from '../../../assets/img/TaxInvoice.svg'
import openItemReportImage from '../../../assets/img/OpenItemReport.svg'
import recieptReportImage from '../../../assets/img/ListOfReceiptReport.svg'
import incentivePaymentReportImage from '../../../assets/img/IncentivePaymentReport.svg'
import customerStatementReportImage from '../../../assets/img/CustomerStatementReport.svg'
import { Avatar } from '@material-ui/core'
import DashboardChart from '../../../components/DashboardChart/DashboardChart'
import { useHistory } from 'react-router'
import Slider from '.././slider'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

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
})

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    back_button: {
        backgroundColor: '#000 !important',
        color: '#fff !important',
        marginRight: '8px !important',
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}))

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant='h6'>{children}</Typography>
            {onClose ? (
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

function ReportManagement() {
    let userName = localStorage.getItem('userData')
    userName = JSON.parse(userName)
    const loginData = userName
    const countryCode = userName ? userName.countryCode : ''
    const CustomerSoldToNo = userName && userName.soldTo ? userName.soldTo[0] : 0

    console.log(userName, 'userName---')
    localStorage.setItem('CustomerNumber', CustomerSoldToNo)
    const getShipmentDetails = useSelector(
        (state) => state.getShipmentDetailsByInseePlusId
    )
    const selectedLangCode = localStorage.getItem('lancode');
    const shipmentFilterList = useSelector((state) => state.shipmentStatusFilterList)
    const getCustomerBySoldTo = useSelector((state) => state.getCustomerBySoldTo)
    const isloggedin = useSelector((state) => state.isLoggedIn.isLoggedIn)
    const deliveryOrderStatus = useSelector((state) => state.deliveryOrderStatus)
    const [open, setOpen] = useState(false)
    const { t } = useTranslation()
    const dispatch = useDispatch()
    let history = useHistory()
    var customerNumber = localStorage.getItem('CustomerNumber')
    useEffect(() => {
        dispatch(
            masterActions.deliveryOrderStatus(
                localStorage.getItem('CustomerNumber'),
                countryCode
            )
        )
        dispatch(
            masterActions.getCustomerBySoldTo(customerNumber)
        )
        dispatch(
            masterActions.getAllDashBoardImages(countryCode, "CUSTOMER", "WEB")
        )
        dispatch(masterActions.shipmentStatusFilterList(countryCode));
    }, [customerNumber])

    console.log(getCustomerBySoldTo && getCustomerBySoldTo, 'getCustomerBySoldTo')
    useEffect(() => {
        if (deliveryOrderStatus.deliveryOrderStatus !== undefined) {
            let inseePlusUID =
                deliveryOrderStatus.deliveryOrderStatus.length > 0
                    ? deliveryOrderStatus.deliveryOrderStatus[0].inseePlusUID
                    : 0
            dispatch(eventActions.shipmentDetails(countryCode, inseePlusUID))

        }
        ///dispatch(eventActions.shipmentDetails(countryCode,inseeplusUID));
    }, [deliveryOrderStatus.deliveryOrderStatus])

    localStorage.removeItem('PLANTCODE')
    localStorage.removeItem('CATEGORY')
    localStorage.removeItem('SUBCATEGORY')
    localStorage.removeItem('SHIPTOCODE')
    localStorage.removeItem('CONTRACTNUMBER')
    localStorage.removeItem('Shipping-Done')
    localStorage.removeItem('QuantityEditFlag')
    localStorage.removeItem('QuantitySaveFlag')
    localStorage.removeItem('total-qty')
    localStorage.removeItem('matchedSalesArea')
    localStorage.removeItem('PLACE-ORDER-FILTER-CHANGED')
    localStorage.removeItem('ORDER-ADDED')

    const navigateToPlace = (navTo) => {
        history.push(navTo)
    }

    const boxClass = {
        cursor: 'pointer',
    }
    var dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    useEffect(() => {
        if (userName && userName.roles != null && userName.roles.toLowerCase() === 'owner') {
            if (localStorage.getItem('CustomerNumber')) {
                setOpen(false)
            } else {
                setOpen(true)
            }
        } else {
            setOpen(false)
            localStorage.setItem('CustomerNumber', userName ? userName.soldTo[0] : 0)

            localStorage.setItem('CustomerName', getCustomerBySoldTo && getCustomerBySoldTo ? getCustomerBySoldTo.customerDetailById && getCustomerBySoldTo.customerDetailById.accountName : 0)
            localStorage.setItem('CustomerNameTh', getCustomerBySoldTo && getCustomerBySoldTo ? getCustomerBySoldTo.customerDetailById && getCustomerBySoldTo.customerDetailById.accountNameLocal : 0)
        }

    }, [userName])

    const userRole = JSON.parse(localStorage.userData).userRole;
    const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
    const HeadingFontChange = useSelector((state) => state.headerfontchanger.headerfontchanger);
    const MyNewClass = useSelector((state) => state.addclasswithstyle.addclasswithstyle);

    return (
        <>
            <div className='content-wrapper'>
                <Header title={t('reports.lable')} />
                {/* {  userRole === 'Retailer' ? null :     */}
                <div className={"row ipad_css " + MyNewClass}>
                    <div className='mainScroll'>
                        <div className='dashboard-container mt-3' style={{ padding: "20px" }}>
                            <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 pr-0 pl-0' style={{ marginLeft: "10px" }}>
                                <h5 style={{ fontSize: `${HeadingFontChange}px` }}><b>{t("reports.lable")}</b></h5>
                            </div>
                            <div className='row mt-3 mb-3'
                                style={{ padding: "10px" }} >

                                {/* Sales Order */}
                                {/* comment sales order report for production */}
                                <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3'>
                                    <div onClick={() => navigateToPlace('/SalesOrderReports')} className='Rectangle-2221' style={boxClass}>
                                        <img

                                            alt='Vehicle Management'
                                            src={salesReportImage}
                                        />
                                        <p className='third-text' style={{ fontSize: `${HeadingFontChange}px` }}>{t('report.title')}</p>
                                    </div>
                                </div>


                                {/* Delivery Report Module */}
                                {/* comment delivery report for production */}
                                <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3'>
                                    <div
                                        className='Rectangle-2221'
                                        onClick={() => navigateToPlace('/DeliveryReportNew')}
                                        style={boxClass}
                                    >
                                        <img

                                            alt='Place Order'
                                            src={deliveryReportImage}
                                        />
                                        <p className='second-text' style={{ fontSize: `${HeadingFontChange}px` }}>{t('delivery_report.lable')}</p>
                                    </div>
                                </div>


                                {/* Invoice txt report */}
                                {/* comment sales order report for production */}
                                <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3'>
                                    <div onClick={() => navigateToPlace('/TaxInvoiceReportNew')} className='Rectangle-2221' style={boxClass}>
                                        <img

                                            alt='Vehicle Management'
                                            src={taxInvoiceReportImage}
                                        />
                                        <p className='third-text' style={{ fontSize: `${HeadingFontChange}px` }}>{t('tax_invoice_report.lable')}</p>
                                    </div>
                                </div>


                                {/* {<div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3'>
                                    <div
                                        className='Rectangle-2221'
                                        onClick={() => navigateToPlace('/SalesReport')}
                                        style={boxClass}
                                    >
                                        <img
                                            alt='Place Order'
                                            src={salesReportImage}
                                        />
                                        <p className='first-text' style={{fontSize: `${HeadingFontChange}px`}}>{t('sales_order.lable')}</p>
                                    </div>
                                </div> }*/}

                                {/* <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3'>
                                    <div onClick={() => navigateToPlace('/CreditNoteReport')} className='Rectangle-2221' style={boxClass}>
                                        <img
                                            alt='Vehicle Management'
                                            src={creditNoteReportImage}
                                        />
                                        <p className='third-text' style={{ fontSize: `${HeadingFontChange}px` }}>{t('creditnote.lable')}</p>
                                    </div>
                                </div> */}

                                <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3'>
                                    <div onClick={() => navigateToPlace('/CreditNoteReportNew')} className='Rectangle-2221' style={boxClass}>
                                        <img
                                            alt='Vehicle Management'
                                            src={creditNoteReportImage}
                                        />
                                        <p className='third-text' style={{ fontSize: `${HeadingFontChange}px` }}>{t('creditnotereport.lable')}</p>
                                    </div>
                                </div>



                                {/* <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3'>
                                            <div onClick={() => navigateToPlace('/TaxInvoiceReport')} className='Rectangle-2221' style={boxClass}>
                                                <img

                                                    alt='Vehicle Management'
                                                    src={taxInvoiceReportImage}
                                                />
                                                <p className='third-text' style={{ fontSize: `${HeadingFontChange}px` }}>{t('tax_invoice.lable')}</p>
                                            </div>
                                        </div> */}
                                {/* {countryCode === "VN" ? <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3'>
                                    <div
                                        className='Rectangle-2221'
                                        onClick={() => navigateToPlace('/OpenItemReport')}
                                        style={boxClass}
                                    >
                                        <img
                                            alt='Place Order'
                                            src={openItemReportImage}
                                        />
                                        <p className='first-text' style={{ fontSize: `${HeadingFontChange}px` }}>{t('open_item_report.lable')}</p>
                                    </div>
                                </div> : null} */}
                                {/* <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3'>
                                    <div
                                        className='Rectangle-2221'
                                        onClick={() => navigateToPlace('/ReceiptReport')}
                                        style={boxClass}
                                    >
                                        <img
                                            alt='Place Order'
                                            src={recieptReportImage}
                                        />
                                        <p className='second-text' style={{ fontSize: `${HeadingFontChange}px` }}>{t('list_of_receipt_report.lable')}</p>
                                    </div>
                                </div> */}
                                {/* Receipt Report new*/}
                                <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3'>
                                    <div
                                        className='Rectangle-2221'
                                        onClick={() => navigateToPlace('/ReceiptReportNew')}
                                        style={boxClass}
                                    >
                                        <img
                                            alt='Place Order'
                                            src={recieptReportImage}
                                        />
                                        <p className='second-text' style={{ fontSize: `${HeadingFontChange}px` }}>{t('receipt.ReceiptReport')}</p>
                                    </div>
                                </div>



                                {/* {countryCode === "VN" ?
                                    <div className='col-sm-3 col-md-3 col-lg-3 mb-3'>
                                        <div onClick={() => navigateToPlace('/IncentivePaymentReport')} className='Rectangle-2224' style={boxClass}>
                                            <img
                                                className='trackShipmentImg'
                                                alt='Vehicle Management'
                                                src={trackShipmentImage}
                                            />
                                            <p className='third-text' style={{ fontSize: `${HeadingFontChange}px` }}>{t('Incentive Payment Report')}</p>
                                        </div>
                                    </div> : ''} */}

                                {/* <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3'>
                                    <div onClick={() => navigateToPlace('/CustomerStatement')} className='Rectangle-2221' style={boxClass}>
                                        <img
                                            alt='Vehicle Management'
                                            src={customerStatementReportImage}
                                        />
                                        <p className='third-text' style={{ fontSize: `${HeadingFontChange}px` }}>{t('customer_statement.lable')}</p>
                                    </div>
                                </div> */}


                                {/* new customer Reports */}
                                <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3'>
                                    <div onClick={() => navigateToPlace('/CustomerStatementNew')} className='Rectangle-2221' style={boxClass}>
                                        <img

                                            alt='Vehicle Management'
                                            src={customerStatementReportImage}
                                        />
                                        <p className='third-text' style={{ fontSize: `${HeadingFontChange}px` }}>{t('customer_statement.lable')}</p>
                                    </div>
                                </div>
                                {/* Delivery Report Module */}

                                {/* <div className='col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-3'>
                                    <div
                                        className='Rectangle-2221'
                                        onClick={() => navigateToPlace('/DeliveryReport')}
                                        style={boxClass}
                                    >
                                        <img

                                            alt='Place Order'
                                            src={deliveryReportImage}
                                        />
                                        <p className='second-text' style={{ fontSize: `${HeadingFontChange}px` }}>{t('delivery_report.lable')}</p>
                                    </div>
                                </div> */}



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default withTranslation()(ReportManagement)
