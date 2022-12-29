import React, {useState} from "react";
import { withTranslation, useTranslation } from "react-i18next";
import image from "../../../../../assets/img/banger.jpeg";
import "../ListingDetail.scss";
import { Link } from "react-router-dom";


function ListingDetailCard(props) { 
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
 
  return (
    <>
          <div className="card detail_card">
          <div className="row">
            <div className="section-item">
              <div className="col-sm-2 col-md-2">
                {" "}
                <img src={image} className="rounded" />{" "}
              </div>
              <div className="col-sm-8 col-md-8 sec_details">
                <span className="high_head"><span class="detail_title">Customer Code :</span> HKJHD8398303</span>
                <br/>
                <span className="number"><span class="detail_title"> Province:</span> Delhi</span>
                <br/>
               
                <span className="number"><span class="detail_title"> District:</span> North Delhi</span>
                 <br/>
                <div className="cateory_map"><span class="detail_title">Category :</span> <span className="focus"> Focus</span>
                <br/>
                <span className="address"> <i class="fa fa-map-marker" aria-hidden="true"></i> New Delhi | Distributor</span>
                </div>

                <div className="varification_btn">
                    <Link>Send For Varification</Link>
                </div>
               
              </div>
                <div className="col-sm-2 col-md-2 checkin_sec">
                   <div className="edit_page">
                       <span><i className="fa fa-pencil"></i></span>
                   </div>
                </div>
            </div>
          </div>
        </div>
  
    </>
  );
}

export default withTranslation()(ListingDetailCard);