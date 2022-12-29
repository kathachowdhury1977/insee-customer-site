import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { orderActions } from "../../_actions";
import { useDispatch, useSelector } from "react-redux";
import ItemImag from "../../assets/img/insee.jfif";
import CheckoutItem from "../../components/CheckoutItems/CheckoutItem";
import { withTranslation, useTranslation } from "react-i18next";
import "./Accordian.scss";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        borderRadius: '4px',
        boxShadow: '4px 1px 5px 0 rgba(0, 0, 0, 0.15)',
        backgroundColor: '#ffffff'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

function AccordianCheckout(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();
    const cartdata = useSelector((state) => state.cartdata);

    let userName = localStorage.getItem('userData');
    userName = JSON.parse(userName);
    localStorage.setItem('Shipping-Done','NO');
    // useEffect(() => {
    //     dispatch(orderActions.getCartData(userName.userName));
    // }, []);

    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };






    return (
        <>
            <div className="col-12 checkout-accordian p-0">

                <div className="col-12 pt-3">
                    <div className="row">
                        {cartdata.cartdata
                            ? cartdata.cartdata.map((carditem, index) => {
                                return (
                                    <CheckoutItem
                                        class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12"
                                        item={carditem}
                                        image={ItemImag}
                                        productImage={carditem.productImage}
                                        title={carditem.productName ? carditem.productName : "NA"}
                                        itemId={carditem.productId}
                                        quantity={carditem.quantity}
                                        inWeight={carditem.unitOfMeasure}
                                    />
                                );
                            })
                            : null}
                    </div>
                </div>


            </div>
        </>
    );
}
export default withTranslation()(AccordianCheckout);