import React, { useState } from "react";
import { withTranslation, useTranslation } from "react-i18next";
import image from "../../assets/img/banger.jpeg";

function PlanDetailsCard(props) {
  const { t } = useTranslation();
  const [validate, setValidate] = useState(false);
  const selectedDay = (val) => {
    console.log(val);
  };
  function onToggleChange(checked) {
    setValidate(checked);
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
            <div className="col-sm-1 col-md-1">
              {" "}
              <img src={image} className="rounded" />{" "}
            </div>
            <div className="col-sm-11 col-md-11 sec_details">
              <div className="row">
                <div className="col-4">
                  <span className="high_head">
                    <span class="detail_title">Customer Code :</span>{" "}
                    HKJHD8398303
                  </span>
                </div>

                <div className="col-4">
                  <span className="number">
                    <span class="detail_title"> Province:</span> Delhi
                  </span>
                </div>

                <div className="col-4">
                  <span className="number">
                    <span class="detail_title"> District:</span> North Delhi
                  </span>
                </div>

                <div className="col-4">
                  <div className="cateory_map">
                    <span class="detail_title">Category :</span>{" "}
                    <span className="focus"> Focus</span>
                  </div>
                </div>

                <div className="col-4">
                  <div className="cateory_map">
                    <span className="address">
                      {" "}
                      <i class="fa fa-map-marker" aria-hidden="true"></i> New
                      Delhi | Distributor
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
}

export default withTranslation()(PlanDetailsCard);
