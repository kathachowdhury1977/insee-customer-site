import React,{useState} from "react";
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function NextMonthPopup(props) {
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
          className ="modal_popup"
        >
          <Modal.Header closeButton>
            <Modal.Title>Visit Time</Modal.Title>
            <span> Tuesday 6 Oct 10 : 00 AM <i class="fa fa-clock-o"></i></span>
          </Modal.Header>
          <Modal.Body className="form_section">
            <div className="formBox">
                            <form>
                                    <div className="row">
                                        
                                       <div className="col-sm-12">
                                            <div className="inputBox">
                                              <label>Time</label>
                                                <input type="time" name="" className="input"/>
                                            </div>
                                        </div>


                                        <div className="col-sm-12">
                                            <div className="inputBox">
                                            <label>Visit Objective</label>
                                                <select className="input">
                                                    <option value="">Select Objective</option>
                                                    <option value="">Objective</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-sm-12">
                                            <div className="inputBox">
                                            <label>Interaction Mode</label>
                                            <select className="input">
                                                  <option value="">Select Mode</option>
                                                    <option value="">Offline</option>
                                                    <option value="">Online</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                            </form>
                        </div>    
          </Modal.Body>
          <Modal.Footer>
            <Button className="add_visit_btn"><Link to ="/AddVisit">Add Visit</Link></Button>
             <Button onClick={props.handleClose} className="cancel">Cancel </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default NextMonthPopup;