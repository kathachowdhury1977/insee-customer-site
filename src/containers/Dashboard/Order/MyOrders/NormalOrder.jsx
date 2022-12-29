import React, { useEffect } from "react";
import { orderActions, masterActions } from "../../../../_actions";
import { useDispatch, useSelector } from 'react-redux';
import { withTranslation, useTranslation } from "react-i18next";
import './MyOrders.scss'
import OrderSummaryItems from "../../../../components/OrderSummary/OrderSummaryItems"
import MyorderOrderItem from "../../../../components/MyorderOrderItem/MyorderOrderItem";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Loading from '../../../../components/Loader/Loading'
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

function NormalOrder(props) {
    const allOrdersList = useSelector(state => state.getAllOrdersList.getAllOrdersList);
    const isPageLoading = useSelector((state) => state.getAllOrdersList.getAllOrdersList.loading)
    const { t } = useTranslation();
    const dispatch = useDispatch();
    let userName = localStorage.getItem('userData');
    userName = JSON.parse(userName);
    const classes = useStyles();
    var searchbyPoNoData = useSelector((state) => state.searchByNoValue.searchByNoValue);
    var searchByOrderNoData = useSelector((state) => state.searchByOrderNo.searchByOrderNo);
console.log(allOrdersList, 'allOrdersList')
    return (
        <>
            <div className="row mb-4">
           
                {   
                
                !isPageLoading ?
                
                allOrdersList && allOrdersList.totalCount > 0 || allOrdersList && allOrdersList.length === 0
                    ? 
                    allOrdersList && allOrdersList.results ?
                    searchbyPoNoData ?
                    allOrdersList.results   
                    // .filter(order => { 
                    //     return order.header1.ponumber.toLowerCase().indexOf(searchbyPoNoData.toLowerCase()) !== -1
                    // })      
                    .map((order) => { 
                        if(order.orderItemListObject !== null && order.orderItemListObject !== undefined && order.orderItemListObject !== [] && order.orderItemListObject.length > 0){
                            return (
                                <MyorderOrderItem
                                tab={props.tab} 
                                searchStatusData={props.searchStatusData}
                                orderdata={order}
                                isBorderCustomer = {order.orderItemListObject != null ? order.orderItemListObject && order.orderItemListObject && order.orderItemListObject[0].Currency === null ? ' ' : order.orderItemListObject[0].Currency : ''}
                                porefnumber={order.header1.ponumber}
                                sostatus={order.header1.salesOrderStatus}
                                orderitems={order.items}
                                totalamount={order.orderListObject && order.orderListObject.Total_After_Tax__c ? order.orderListObject.Total_After_Tax__c : 'NA'}
                                totalqty={order.header1.totalQuantity}
                                sonumber={order.orderItemListObject && order.orderItemListObject[0].ccrz__Order__r.ccrz__OrderId__c ? order.orderItemListObject[0].ccrz__Order__r.ccrz__OrderId__c : 'NA'}
                                sodate={order.header1.requestDeliveryDate}
                                plant={"NA"}
                                // plant={order.items[0].Plant ?? "NA"}
                                ordertype={order.header1.salesOrderType}
                                sotime={order.header1.soTime}
                                unit = {order && order.items != [] || order && order.items != null || order && order.items != undefined ? order.items[0].UnitOfMeasure : ''}
                            />
                                              

                        );
                        }
                        else{
                            return(
                                <MyorderOrderItem
                                tab={props.tab} 
                                searchStatusData={props.searchStatusData}
                                orderdata={order}
                                isBorderCustomer = {order.orderItemListObject != null ? order.orderItemListObject && order.orderItemListObject && order.orderItemListObject[0].Currency === null ? ' ' : order.orderItemListObject[0].Currency : ''}
                                porefnumber={order.header1.ponumber}
                                sostatus={order.header1.salesOrderStatus}
                                orderitems={order.items}
                                totalqty={order.header1.totalQuantity}
                                sodate={order.header1.requestDeliveryDate}
                                plant={"NA"}
                                ordertype={order.header1.salesOrderType}
                                sotime={order.header1.soTime}
                                unit = {order && order.items != [] || order && order.items != null || order && order.items != undefined ? order.items[0].UnitOfMeasure : ''}
                                />
                            )
                        }
                    })
                    : searchByOrderNoData ?
                    allOrdersList.results 
                    // .filter(order => {  debugger
                    //     if(order.orderItemListObject && order.orderItemListObject.length != 0){
                    //         return order.orderItemListObject && order.orderItemListObject[0].ccrz__Order__r.ccrz__OrderId__c.toLowerCase().indexOf(searchByOrderNoData.toLowerCase()) !== -1
                    //     }
                       
                    // })         
                    .map((order) => {
                        if(order.orderItemListObject !== null && order.orderItemListObject !== undefined && order.orderItemListObject !== [] && order.orderItemListObject.length > 0){

                        return (
                            <MyorderOrderItem
                            tab={props.tab} 
                            searchStatusData={props.searchStatusData}
                            isBorderCustomer = {order.orderItemListObject != null ? order.orderItemListObject && order.orderItemListObject && order.orderItemListObject[0].Currency === null ? ' ' : order.orderItemListObject[0].Currency : ''}
                                orderdata={order}
                                porefnumber={order.header1.ponumber}
                                sostatus={order.header1.salesOrderStatus}
                                orderitems={order.items}
                                totalamount={order.orderListObject && order.orderListObject.Total_After_Tax__c ? order.orderListObject.Total_After_Tax__c : 'NA'}
                                totalqty={order.header1.totalQuantity}
                                sonumber={order.orderItemListObject && order.orderItemListObject[0].ccrz__Order__r.ccrz__OrderId__c ? order.orderItemListObject[0].ccrz__Order__r.ccrz__OrderId__c : 'NA'}
                                sodate={order.header1.requestDeliveryDate}
                                plant={'NA'}
                                ordertype={order.header1.salesOrderType}
                                sotime={order.header1.soTime}
                                unit = {order && order.items != [] || order && order.items != null || order && order.items != undefined ? order.items[0].UnitOfMeasure : ''}
                            />

                        );
                        }
                        else{
                            return(
                                <MyorderOrderItem
                                tab={props.tab} 
                                searchStatusData={props.searchStatusData}
                                orderdata={order}
                                porefnumber={order.header1.ponumber}
                                sostatus={order.header1.salesOrderStatus}
                                orderitems={order.items}
                                totalqty={order.header1.totalQuantity}
                                sodate={order.header1.requestDeliveryDate}
                                plant={'NA'}
                                ordertype={order.header1.salesOrderType}
                                sotime={order.header1.soTime}
                                isBorderCustomer = {order.orderItemListObject != null ? order.orderItemListObject && order.orderItemListObject && order.orderItemListObject[0].Currency === null ? ' ' : order.orderItemListObject[0].Currency : ''}
                                unit = {order && order.items != [] || order && order.items != null || order && order.items != undefined ? order.items[0].UnitOfMeasure : ''}
                            />
                            )
                        }
                        
                    })
                    :
                    allOrdersList.results             
                    .map((order, index) => {
                        if(order.orderItemListObject !== null && order.orderItemListObject !== undefined && order.orderItemListObject !== [] && order.orderItemListObject.length > 0){

                        return (
                            <MyorderOrderItem
                            tab={props.tab} 
                            searchStatusData={props.searchStatusData}
                                orderdata={order}
                                porefnumber={order.header1.ponumber}
                                replicateNotReceived={order.header1.replicateNotReceived}
                                isBorderCustomer = {order.orderItemListObject != null ? order.orderItemListObject && order.orderItemListObject && order.orderItemListObject[0].Currency === null ? ' ' : order.orderItemListObject[0].Currency : ''}
                                sostatus={order.header1.salesOrderStatus}
                                orderitems={order.items}
                                totalamount={order.orderListObject && order.orderListObject.Total_After_Tax__c ? order.orderListObject.Total_After_Tax__c : 'NA'}
                                totalqty={order.header1.totalQuantity}
                                productCategory={order.header1.productCategory}
                                totalQtyInKg={order.orderListObject && order.orderListObject.totalQuantityInKg ? order.orderListObject && order.orderListObject.totalQuantityInKg: ''}
                                sonumber={order.orderItemListObject && order.orderItemListObject[0].ccrz__Order__r.ccrz__OrderId__c ? order.orderItemListObject[0].ccrz__Order__r.ccrz__OrderId__c : 'NA'}
                                sodate={order.header1.requestDeliveryDate}
                                plant={'NA'}
                                unit = {order && order.items != [] || order && order.items != null || order && order.items != undefined ? order.items[0].UnitOfMeasure : ''}
                                ordertype={order.header1.salesOrderType}
                                sotime={order.header1.soTime}
                               // itemCategory = {order.orderItemListObject && order.orderItemListObject[0].ccrz__Order__r.ccrz__OrderId__c ? order.orderItemListObject[0].ccrz__Order__r.ccrz__OrderId__c : 'NA'}

                            />

                        );
                        }
                        else{
                            return(
                                <MyorderOrderItem
                                tab={props.tab} 
                                searchStatusData={props.searchStatusData}
                                orderdata={order}
                                isBorderCustomer = { order.orderItemListObject != null ? order.orderItemListObject && order.orderItemListObject && order.orderItemListObject[0].Currency === null ? ' ' : order.orderItemListObject[0].Currency : ''}
                                porefnumber={order.header1.ponumber}
                                sostatus={order.header1.salesOrderStatus}
                                replicateNotReceived={order.header1.replicateNotReceived}
                                orderitems={order.items}
                                totalqty={order.header1.totalQuantity}
                                productCategory={order.header1.productCategory}
                                totalQtyInKg={order.orderListObject && order.orderListObject.totalQuantityInKg ? order.orderListObject && order.orderListObject.totalQuantityInKg: ''}
                                sodate={order.header1.requestDeliveryDate}
                                plant={'NA'}
                                unit = {order && order.items != [] || order && order.items != null || order && order.items != undefined ? order.items[0].UnitOfMeasure : ''}
                                ordertype={order.header1.salesOrderType}
                                sotime={order.header1.soTime}
                               // itemCategory = {order.orderItemListObject && order.orderItemListObject[0].ccrz__Order__r.ccrz__OrderId__c ? order.orderItemListObject[0].ccrz__Order__r.ccrz__OrderId__c : 'NA'}

                            />
                                // <div className="container-fluid mt-2 mb-2 noDataAv">Order data not available.</div>
                            )
                        }

                    })                   
                    :  <div className="noDataFound">{t('lable.norecordfound')}</div>
                    :  <div className="loading"> <Loading /></div>
                    :<div className="loading"> <Loading /></div>
                    
                    
                    }

                <div className="col-md-12 text-right mt-4 mb-4">
                    {
                        searchbyPoNoData || searchByOrderNoData ? '' :
                        <Pagination count={Math.ceil(allOrdersList && allOrdersList.totalCount/10)} page={props.page} onChange={props.handleChangePage} />
                    }
                </div>
               
            </div>
        </>
    );
}

export default withTranslation()(NormalOrder);
