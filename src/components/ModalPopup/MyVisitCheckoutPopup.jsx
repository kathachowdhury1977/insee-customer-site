import React,{useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function MyVisitCheckoutPopup(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
  
    return (
      <>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button> */}
  
        <Modal
          show={props.show}
          onHide={props.handleClose}
          backdrop="static"
          keyboard={false}
          className ="my_visit-plan_popup"
        >
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
           <Modal.Body className="visit_sec">
                <div container-fluid>
                    <div className="row">
                        <div className="col-12 text-center">
                           <h5>Are You sue, You Want to <br/>
                             <b>Check Out ?</b></h5>
                        </div>
                    </div>
                </div>

            
               </Modal.Body>
              <Modal.Footer>
            <Button className="add_visit_btn"><Link to ="/AddVisit">Yes</Link></Button>
             <Button onClick={props.handleClose} className="cancel">No </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default MyVisitCheckoutPopup;