import React,{useState} from "react";
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar'


function NextMonthProgressPopup(props) {
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
              <Modal.Title>My Progress</Modal.Title>
            </Modal.Header>
           <Modal.Body className="visit_sec">
               

                <div  className="container-fuild">
                  <div className="row">
                    <div className="col-12 process_sec">
                      <div className="row mt-3">
                        <div className="col-12"><span>Completed Task</span></div>               
                      </div>
                      <div className="progess_bar">
                      <ProgressBar>
                          <ProgressBar  variant="danger" now={70} key={3} />
                        </ProgressBar>
                      </div>
                      <span className="chance_sec">You have planned visit 70% <b>as per the visit guideline matrix</b></span>
                      <span className="chance_sec">You have missed <b>2 visits for focus & 1 visit for standard target</b></span>
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
  
  export default NextMonthProgressPopup;