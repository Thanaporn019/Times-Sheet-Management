import React, { Component } from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Head from './JobType/Head';
// import Dashboard from './JobType/Dashboard';

import { BsFillTrashFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { AiOutlineStepBackward } from "react-icons/ai";
import { AiFillStepForward } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
// import { handleShow } from "module";
// import { show } from "module";
// import { handleClose } from "module";
import { BsFillCalendarFill } from "react-icons/bs";
// import { AiOutlinePlusCircle } from "react-icons/ai";


import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import Dropdown from "react-bootstrap/Dropdown";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// import JobType from './JobType/๋JobType';

class CreateP extends Component {
  state = {
    isOpen: false
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  render() {
    // const style = {
    //   backgroundColor: 'white',
    //   front: 'inherit',
    //   border: '1x sold blue',
    //   padding: '8px',
    //   width: '1280px',
    //   height: '800px',
    // };


    return (


      <>
        {/* <Head></Head> */}
        <div className="App">
          <div id="boxType" className="container-box-content">
            <div className="row ">
              <div className="col-12 text-left">
                <p><Navbar.Brand href="#Job Type" style={{ marginLeft: "140px" }}>Project</Navbar.Brand>/ Create Project</p>
              </div>

              <div className="col-12 box-search">
                <div className="row">
                  <div className="col-12">
                    <p style={{ color: "#696969" }}>Create Project</p>
                  </div>
                  <div className="col-12">
                    <div className="box-search-border">

                      <form>
                        <div className="row form-group">
                          <div className="col-3"><p>StartDate</p></div>
                          <div className="col-1"><p style={{ color: "red" }}> *</p></div>
                          <div className="col-6"><input type="text" class="form-control" /></div>
                          <p > <BsFillCalendarFill /> </p>

                        </div>
                        <div className="row form-group">
                          <div className="col-3"><p>EndDate</p></div>
                          <div className="col-1"><p style={{ color: "red" }}> *</p></div>
                          <div className="col-6"><input type="text" class="form-control" /></div>
                          <p > <BsFillCalendarFill /> </p>
                        </div>
                        <div className="row form-group">
                          <div className="col-3"><p>Project</p></div>
                          <div className="col-1"><p style={{ color: "red" }}> *</p></div>
                          <div className="col-6"><input type="text" class="form-control" /></div>
                        </div>

                        <div className="row form-group">
                          <div className="col-3"><p>Phase</p></div>
                          <div className="col-1"><p style={{ color: "red" }}> *</p></div>
                          <div className="col-6"><input type="text" class="form-control" /></div>
                        </div>
                        <div className="col-12 row form-group">
                          <div className="col-4"><p>Manday </p></div>
                          <div className="col-7"><input type="text" class="form-control" /></div>
                        </div>
                        <div className="col-12 row form-group">
                          <div className="col-3"><p>Detail</p></div>
                          <div className="col-1"><p style={{ color: "red" }}> *</p></div>
                          <div className="col-7"><input type="text" class="form-control" /></div>
                        </div>

                        <div className="col-12 row form-group">
                          <div className="col-4"><p>CustomerEmail </p></div>
                          <div className="col-7"><input type="text" class="form-control" /></div>
                        </div>
                        <div className="col-12 row form-group">
                          <div className="col-3"><p style={{ color: "red" }}> *</p></div>
                          <div className="col-9"><p>  Items marked with an asterisk are required </p></div>
                          <div className="col-12">

                          </div>

                          <Modal show={this.state.isOpen} onHide={this.closeModal}>
                            <Modal.Header closeButton>
                              <Modal.Title style={{ padding: "1rem 11rem" }}>Confirm</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ textAlign: "center" }}>Please confirm your configuration.</Modal.Body>

                            <Modal.Footer style={{ borderTop: "0px" }} style={{ justifyContent: "center" }}>
                              <Button variant="btn btn-secondary" onClick={this.closeModal}>
                                NO</Button>
                              {/* <button type="button" class="btn btn-primary" > + Create Job Type </button> */}
                              {/* <!-- Button trigger modal --> */}
                              <div>



                                <Button variant="primary" onClick={this.openModal}>
                                  YES</Button>
                              </div>
                            </Modal.Footer>
                          </Modal>



                          {/* </div> */}




                        </div>
                      </form>


                    </div>
                  </div>
                </div>

              </div>

              <div className="col-9 text-right">
                <button type="button" class="btn btn-secondary" style={{ marginRight: "8px" }}>CANCEL</button>
                {/* <button type="button" class="btn btn-primary" style={{ marginRight: "18px" }}>CREATE</button> */}

                <Button variant="primary" onClick={this.openModal}>CREATE
                     </Button>
              </div>
              <div className="col-12 box-search">
                <div className="row table-ui">


                </div></div>


            </div></div>
        </div>
      </>
    );

  }
}

export default CreateP;
