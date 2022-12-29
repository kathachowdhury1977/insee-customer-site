import React from "react";
import { withTranslation, useTranslation } from "react-i18next";
import Header from "../../../components/Header/Header";
import phone from '../../../assets/img/phone.svg';
import map from '../../../assets/img/map.svg';
import navigate from '../../../assets/img/add_map.svg';
import plan from '../../../assets/img/watch.svg';
import image from '../../../assets/img/banger.jpeg';
import ShiptoTabs from '../../../components/Tabs/ShiptoTabs';


function ShipToCreation(props) {
  const { t } = useTranslation();
  const selectedDay = val => {
    console.log(val);
  };
  return (
    <>
      <Header />
      <div className="content-wrapper upcoming_detail_plan shiptocreation">
          <section class="content-header">
            <h3 class="box-title">Chettinad Enterprises</h3>
          </section>
          <div className="ml-3 mr-3">
          <div className="card">
         {/* <span className="planned"><img src={plan}/> 10:00AM &nbsp; &nbsp; Planned</span> */}
          <div className="row">
            <div className="section-item mt-0">
                    <div className="col-sm-3 col-md-2">
                        {" "}
                        <img src={image} className="rounded" />{" "}
                    </div>
                    <div className="col-sm-6 col-md-7 sec_details">
                        <h4 className="mb-2"><span class="detail_title">Region :</span> North</h4>
                        <span className="number mb-2"><span class="detail_title">Province :</span> Bangkok</span><br/>
                        <span className="number mb-2"><span class="detail_title">Contact/Owner Name :</span> Willi Thum</span><br/>
                        <span className="number mb-2"><span class="detail_title">Phone Number :</span> +78 8627 874 673</span><br/>
                        <span className="focus"> Mortar</span>
                    </div>        
                    </div>
                </div>
                </div>
             </div>
         
           <div className="ship-creation">
           <ShiptoTabs/>
           </div>
            

           
        
    

           </div>
           <div>
        </div> 
 
    </>
  );
}

export default withTranslation()(ShipToCreation);
