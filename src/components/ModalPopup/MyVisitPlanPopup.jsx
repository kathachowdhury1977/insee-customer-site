import React,{useState} from "react";
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar'


function MyVisitPlanPopup(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
  
    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button> */}
  
        <Modal
          // show={props.show}
          // onHide={props.handleClose}
          backdrop="static"
          keyboard={false}
          className ="my_visit-plan_popup"
        >
            <Modal.Header closeButton>
              <Modal.Title>My Visit Report</Modal.Title>
            </Modal.Header>
           <Modal.Body className="visit_sec">
                <div container-fluid>
                    
                    <div className="row report_head">
                        <div className="col-4"><h6></h6></div>
                        <div className="col-4"><h6>MTD</h6></div>
                        <div className="col-4"><h6>Today</h6></div>
                    </div>

                    <div className="row ml-3 mr-3 mt-3">
                            <div className="col-4"><p className="visit_name">Planned</p></div>
                            <div className="col-4"><p className="visit_number">50</p></div>
                            <div className="col-4"><p className="visit_number">5</p></div>                           
                    </div>

                    <div className="row ml-3 mr-3 mt-2">
                            <div className="col-4"><p className="visit_name">Actual</p></div>
                            <div className="col-4"><p className="visit_number">37</p></div>
                            <div className="col-4"><p className="visit_number">3</p></div>
                    </div>

                    <div className="row ml-3 mr-3 mt-2">
                            <div className="col-4"><p className="visit_name">Unplanned</p></div>
                            <div className="col-4"><p className="visit_number">4</p></div>
                            <div className="col-4"><p className="visit_number">1</p></div>
                    </div>
                </div>

                <div  className="container-fuild">
                  <div className="row">
                    <div className="col-12 process_sec">
                      <div className="row mt-3">
                        <div className="col-4"><span>Achievable</span></div>
                        <div className="col-4"><span>Near Achievable</span></div>
                        <div className="col-4"><span>Not Achievable</span></div>
                      </div>
                      <div className="progess_bar">
                      <ProgressBar>
                          <ProgressBar  variant="success" now={35.33} key={1} />
                          <ProgressBar variant="warning" now={35.33} key={2} />
                          <ProgressBar  variant="danger" now={35.33} key={3} />
                        </ProgressBar>
                      </div>
                      <span className="chance_sec">Chances of completion of monthly visit target based on Avg daily visit rate</span>
                    </div>
                  </div>
                </div>

            
               </Modal.Body>
              {/* <Modal.Footer>
            <Button className="add_visit_btn"><Link to ="/AddVisit">Add Visit</Link></Button>
             <Button onClick={props.handleClose} className="cancel">Cancel </Button>
          </Modal.Footer> */}
        </Modal>
      </>
    );
  }
  
  export default MyVisitPlanPopup;