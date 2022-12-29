import React from "react";
import { withTranslation, useTranslation } from "react-i18next";
import Header from "../../../components/Header/Header";
import phone from '../../../assets/img/phone.svg';
import map from '../../../assets/img/map.svg';
import navigate from '../../../assets/img/add_map.svg';
import plan from '../../../assets/img/watch.svg';
import image from '../../../assets/img/banger.jpeg'



function PlanDetail(props) {
  const { t } = useTranslation();
  const selectedDay = val => {
    console.log(val);
  };
  return (
    <>
      <Header />
      <div className="upcoming_detail_plan">
          <section class="content-header">
            <h3 class="box-title">Bungur Enterprises</h3>
          </section>
          <div className="card">
         <span className="planned"><img src={plan}/> 10:00AM &nbsp; &nbsp; Planned</span>
          <div className="row">
            <div className="section-item">
              <div className="col-sm-3 col-md-2">
                {" "}
                <img src={image} className="rounded" />{" "}
              </div>
              <div className="col-sm-6 col-md-7 sec_details">
                <h4 className="mb-2"><span class="detail_title">Customer Code :</span> HKJHD8398303</h4>
                <span className="number mb-2"><span class="detail_title">Micro Market :</span> North Delhi</span>
                  <br></br>
                <span class="detail_title">Category :</span> <span className="focus"> Focus</span>
                <br />
                <span className="address"> <img src={navigate}/> New Delhi | Distributor</span>
              </div>
              <div className=" col-sm-3 col-md-4 sec_details text-left">

                <div class="information">
                <span className="navigation">
                <img src={map}/><span>{"Navigate"}</span>
                </span>
                <span className="call">
                  <img src={phone}/><span>{"Call"}</span>
                </span>
                </div>
              </div>
            </div>
          </div>

        </div>
         
         <div className="plan_details">
           <div class="container-fluid">
             <div className="row">
               <div className="col-6 text-left">
                   <div className="tiitle_name">Dealer Name</div>
                 </div>
               <div className="col-6">
               <div  className="title_value">Distributor Pvt Ltd</div>
               </div>
             </div>

             <div className="row">
               <div className="col-6 text-left">
                   <div className="tiitle_name">Potential</div>
                 </div>
               <div className="col-6">
               <div  className="title_value">3000 Bags</div>
               </div>
             </div>

             <div className="row">
               <div className="col-6 text-left">
                   <div className="tiitle_name">MTD Sale</div>
                 </div>
               <div className="col-6">
               <div  className="title_value">1300 Bags</div>
               </div>
             </div>

             <div className="row">
               <div className="col-6 text-left">
                   <div className="tiitle_name">Last Month Sale</div>
                 </div>
               <div className="col-6">
               <div  className="title_value">1500 Bags</div>
               </div>
             </div>

             <div className="row">
               <div className="col-6 text-left">
                   <div className="tiitle_name">Shop Share</div>
                 </div>
               <div className="col-6">
               <div  className="title_value">40% </div>
               </div>
             </div>

             <div className="row">
               <div className="col-6 text-left">
                   <div className="tiitle_name">Planned Objective</div>
                 </div>
               <div className="col-6">
               <div  className="title_value">Promotion</div>
               </div>
             </div>

             <div className="row">
               <div className="col-6 text-left">
                   <div className="tiitle_name">Credit Limit Available</div>
                 </div>
               <div className="col-6">
               <div  className="title_value">500000 Thai </div>
               </div>
             </div>

             <div className="row">
               <div className="col-6 text-left">
                   <div className="tiitle_name">Credit Limit Consumed</div>
                 </div>
               <div className="col-6">
               <div  className="title_value">40000 Thai</div>
               </div>
             </div>

             <div className="row">
               <div className="col-6 text-left">
                   <div className="tiitle_name">Invoice Due</div>
                 </div>
               <div className="col-6">
               <div  className="title_value">5</div>
               </div>
             </div>

             <div className="row">
               <div className="col-6 text-left">
                   <div className="tiitle_name">Invoice Over Due</div>
                 </div>
               <div className="col-6">
               <div  className="title_value">3</div>
               </div>
             </div>
             <div className="row">
               <div className="col-6 text-left">
                   <div className="tiitle_name">Pending Cases</div>
                 </div>
               <div className="col-6">
               <div  className="title_value">1</div>
               </div>
             </div>
           </div>
         </div>

           <div className="order_summary">
           <section class="content-header">
            <h3 class="box-title">Past Order Summary</h3>
          </section>

              <div className="order_details">
                <div className="container">

               
              <div className="row">
               <div className="col-4">
                   <div className="order_txt">20/10/2020</div>
                 </div>
               <div className="col-4">
               <div  className="order_txt">100 Bags</div>
               </div>
               <div className="col-4">
               <div  className="order_txt pending_status">In Process</div>
               </div>
             </div>
             <div className="row">
               <div className="col-4">
                   <div className="order_txt">20/10/2020</div>
                 </div>
               <div className="col-4">
               <div  className="order_txt">100 Bags</div>
               </div>
               <div className="col-4">
               <div  className="order_txt done_status">Done</div>
               </div>
             </div>
             <div className="row">
               <div className="col-4">
                   <div className="order_txt">20/10/2020</div>
                 </div>
               <div className="col-4">
               <div  className="order_txt">100 Bags</div>
               </div>
               <div className="col-4">
               <div  className="order_txt done_status">Done</div>
               </div>
             </div>
             </div>
              </div>   
           </div>
            <div className="discussion_step">
             <div className="row">
               <div className="col-6">
                 <div className="discussion_details">
                   <h3 className="box-title">Discussion Points</h3><br/>
                     <input type="text" class="effect-1" placeholder="enter text here ..."/>
                 </div>
               </div>
               <div className="col-6">
               <div className="step_details">
                   <h3 className="box-title">Next Step</h3><br/>
                  
                    <select>
                      <option value="volvo">select</option>
                      <option value="saab">Saab</option>
                    </select>
                   
                   
                 </div>
                
               </div>
             </div>
             
           </div>
            <div className='upload_img'>          
                <label class="file">
                <input type="file" id="file" aria-label="File browser example"/>
                <span class="file-custom"></span>
              </label>
             </div>
             <div className="text-right">
             <button className="swipe_btn">Swipe right to check</button>
             </div>
             

           </div>

           <div>


      </div> 
 
    </>
  );
}

export default withTranslation()(PlanDetail);
