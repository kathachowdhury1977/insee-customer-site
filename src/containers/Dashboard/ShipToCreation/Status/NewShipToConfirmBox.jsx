import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";

function NewShipToConfirmBox(props) {
    const { t } = useTranslation();
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)

    const redButton = {
        textTransform: 'uppercase',
        marginTop: '8px',
        background: '#ef0000',
        padding: '10px 60px',
        border: 'none',
        borderRadius: '4px',
        fontWeight: '600',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        '&:hover': {
            color: '#fff',
            background: '#ef0000',
        }
    };

    const blackButton = {
        textTransform: 'uppercase',
        marginTop: '8px',
        background: '#000000',
        fontWeight: '600',
        padding: '10px 60px',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        '&:hover': {
            color: '#fff',
            background: '#000000',
        }
    };

    const darkText = {
        color: '#000000',
        fontWeight: '600'
    };

    const lightText = {
        fontWeight: '600',
        color: 'rgb(130 129 129)'
    };

    const redText = {
        color: 'red'
    };


    return (
        <>
            <div className="product_brand_section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 text-right">
                            <p style={lightText}>Entered Ship-To Name</p>
                            <p style={darkText}>XYZ Distributor</p>
                        </div>
                        <div className="col-6 text-left">
                            <p style={lightText}>Entered Mobile Number</p>
                            <p style={darkText}>XYZ Distributor</p>
                        </div>
                        <div className="col-12 text-center">
                            <p style={redText}>Do you still want to go ahead with new ship-to creation?</p>
                        </div>
                        <div className="col-12 text-center">
                            <button style={blackButton}>Cancel</button>
                    &nbsp;&nbsp;
                        <button style={redButton}>
                                Yes
                        </button>


                        </div>
                    </div>

                </div>
            </div>

        </>
    );
}

export default withTranslation()(NewShipToConfirmBox);