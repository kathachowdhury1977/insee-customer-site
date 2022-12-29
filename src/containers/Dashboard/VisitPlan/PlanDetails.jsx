import React, {useState} from "react";
import { withTranslation, useTranslation } from "react-i18next";
import Header from "../../../components/Header/Header";
import PlanDetailToggleMenu from '../../../components/ToggleMenu/PlanDetailToggleMenu';
import PlanDetailsCard from "../../../components/PlanDetailsCard/PlanDetailsCard";


function PlanDetail(props) {
  const { t } = useTranslation();
  const [validate, setValidate] = useState(false);
  const selectedDay = (val) => {
    console.log(val);
  };
  function onToggleChange(checked) {
   
    setValidate(checked)
    }

  function handleChange(event, name) {
    console.log(event, "event target", name);
  }
  function onSelectChange(event) {
    console.log(event);
  }
  const data = [
    {
      id: "1",
      name: "One",
    },
    {
      id: "2",
      name: "Two",
    },
    {
      id: "3",
      name: "Three",
    },
    {
      id: "4",
      name: "Four",
    },
  ];
  return (
    <>
    <div className="content-wrapper">
      <Header />
      <div className="upcoming_detail_plan">

         <PlanDetailsCard/>
         
         <div className="plan_details">
         <section class="content-header">
            <h3 class="box-title">Information</h3>
            <PlanDetailToggleMenu/>
            
          </section>
           <div class="container-fluid information">
             <div className="row">
               <div className="col-3 info_sec">
                  <div className="sec-dt">
                    <div className="tiitle_name">Dealer Name</div>
                    <div  className="title_value">Distributor Pvt Ltd</div>
                  </div> 
                 </div>
               <div className="col-3 info_sec">
               <div className="sec-dt">
                  <div className="tiitle_name">Potential</div>
                   <div  className="title_value">3000 Bags</div>
                   </div>
               </div>

               <div className="col-3 info_sec">
               <div className="sec-dt">
                  <div className="tiitle_name">MTD Sale</div>
                  <div  className="title_value">1300 Bags</div>  
                  </div> 
                 </div>

               <div className="col-3 info_sec">
               <div className="sec-dt">
                <div className="tiitle_name">Last Month Sale</div>
                <div  className="title_value">1500 Bags</div>
                </div>
               </div>
             </div>

        

             <div className="row">
               <div className="col-3 info_sec">
               <div className="sec-dt">
                   <div className="tiitle_name">Shop Share</div>
                   <div  className="title_value">40% </div>
                   </div>
                 </div>
               <div className="col-3 info_sec">
               <div className="sec-dt">
                <div className="tiitle_name">Planned Objective</div>
                <div  className="title_value">Promotion</div>
                </div>
               </div>

               <div className="col-3 info_sec">
               <div className="sec-dt">
               <div className="tiitle_name">Credit Limit Available</div>
               <div  className="title_value">500000 Thai </div>
               </div>
               </div>
               <div className="col-3 info_sec">
               <div className="sec-dt">
                  <div className="tiitle_name">Credit Limit Consumed</div>
                  <div  className="title_value">40000 Thai</div>
                  </div>
                 </div>
             </div>
  

             <div className="row">
               <div className="col-3 info_sec">
               <div className="sec-dt">
                   <div className="tiitle_name">Invoice Due</div>
                   <div  className="title_value">5</div>
                   </div>
                 </div>
               <div className="col-3 info_sec">
               <div className="sec-dt">
                  <div className="tiitle_name">Invoice Over Due</div>
                  <div  className="title_value">3</div>
                  </div>
               </div>
               <div className="col-3 info_sec">
               <div className="sec-dt">
               <div className="tiitle_name">Pending Cases</div>
               <div  className="title_value">1</div>
               </div>
              
              </div>
              <div className="col-3">
              </div>
             </div>

           </div>
         </div>

           <div className="order_summary">
           <section class="content-header">
            <h3 class="box-title">Past Order Summary</h3>
          </section>

             
                <div className="container-fluid p-0">
                 
                 <div className="row">
                   <div className="col-7">
                   <div className="order_details">
                     <div className="container-fluid">
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
                   <div className="col-5 pl-0">
                     <div className="container-fluid discussion_step pl-0">
                       <div className="row">
                         <div className="col-12">
                         <div className="discussion_details">
                            <h3 className="box-title">Discussion Points</h3><br/>
                              <input type="text" class="effect-1" placeholder="enter text here ..."/>
                          </div>
                         </div>
                       </div>
                       <div className="row">
                         <div className="col-12">
                         <div className="step_details">
                            <h3 className="box-title">Next Step</h3><br/> 
                              <select>
                                <option value="volvo">select</option>
                                <option value="saab">Saab</option>
                              </select>  
                          </div>
                         </div>
                       </div>
                       
                       <div className="row">
                         <div className="col-12">
                           <div className="upload_document">
                           <label for="file-upload" class="custom-file-upload">
                              <i class="fa fa-cloud-upload"></i> Upload Image / Document
                           </label>
                             <input id="file-upload" type="file"/>
                           </div>
                         </div>
                       </div>

                     </div>
                   </div>
                 </div>              
             </div>      
             </div>

           </div>

           <div>


      </div> 
      </div>
    </>
  );
}

export default withTranslation()(PlanDetail);