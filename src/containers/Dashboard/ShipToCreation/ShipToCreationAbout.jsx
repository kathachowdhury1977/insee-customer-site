import React from 'react';
import QuickSummary from '../../../containers/Dashboard/ShipToCreation/ShipToCreationAboutTab/QuickSummary';
import Cases from '../../../containers/Dashboard/ShipToCreation/ShipToCreationAboutTab/Cases';
import MarketMovementData from '../../../containers/Dashboard/ShipToCreation/ShipToCreationAboutTab/MarketMovementData';
import RewardPoint from '../../../containers/Dashboard/ShipToCreation/ShipToCreationAboutTab/RewardPoint';
import BasicInformation from '../../../containers/Dashboard/ShipToCreation/ShipToCreationAboutTab/BasicInformation';
import "./ShipToCreationAbout.scss";
import ShipToInformation from '../../../containers/Dashboard/ShipToCreation/ShipToCreationAboutTab/ShipToInformation';
import VisitInformation from '../../../containers/Dashboard/ShipToCreation/ShipToCreationAboutTab/VisitInformation';
import Retailer from '../../../containers/Dashboard/ShipToCreation/ShipToCreationAboutTab/Retailer';
import Contact from '../../../containers/Dashboard/ShipToCreation/ShipToCreationAboutTab/Contact';
import PurchaseHabits from '../../../containers/Dashboard/ShipToCreation/ShipToCreationAboutTab/PurchaseHabits';
import BarChart from "../ShipToCreation/ShipToTabs/BarChart";
import OrderSummary from "../../../components/OrderSummary/OrderSummary";

const ShipToCreationAbout = (props) => {
    return (
        <>
           <div className="ship_to_about">
                <div className="plan-detail-card-container">
                </div>
                <div className="container-fluid p-0">
                    <div className="main-box-container">
                        <div className="box-container-left">
                            <QuickSummary />
                            <Cases />
                            <MarketMovementData />
                            <RewardPoint />
                        </div>

                        <div className="box-container-right">
                           
                            
                             {
                                 props.type === "account" ? (
                                    <OrderSummary  />
                                 ): null
                             }
                         
                        <div className="order_summary product_brand_section">
                            <h5 className="product_heading mb-4">Order Summary</h5>
                             <BarChart Width="620" Height="200"/>
                         </div>  

                            <BasicInformation />
                            <PurchaseHabits />
                            <div className="ThirdRow">
                                <div className="boxbody-leftchild">
                                    <ShipToInformation/>
                                </div>
                                <div className="boxbody-rightchild">
                                    <VisitInformation />
                                </div>
                            </div>
                            

                            <div className="ThirdRow">
                                <div className="boxbody-leftchild">
                                    <Retailer />
                                </div>
                                <div className="boxbody-rightchild">
                                    <Contact />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
               
        </>
    ); 

}
   export default ShipToCreationAbout;