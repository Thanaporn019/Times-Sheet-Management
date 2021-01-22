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
// import { BsFillCalendarFill } from "react-icons/bs";
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

class View extends Component {
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
                <p><Navbar.Brand href="#Job Type" style={{ marginLeft: "140px" }}>Project</Navbar.Brand>/  Detail Project</p>

              </div>

              <div className="col-12 box-search">
                <div className="row">
                  <div className="col-12">
                    <p style={{ color: "#696969" }}>Detail Project</p>
                  </div>
                  <div className="col-12">
                    <div className="box-search-border">

                      <form>
                        <div className="row form-group">
                          <div className="col-3"><p>StartDate </p></div>
                          <div className="col-9"><input type="text" class="form-control" /></div>
                        </div>
                        <div className="row form-group">
                          <div className="col-3"><p>EndDate </p></div>
                          <div className="col-9"><input type="text" class="form-control" /></div>
                        </div>
                        <div className="row form-group">
                          <div className="col-3"><p>Project </p></div>
                          <div className="col-9"><input type="text" class="form-control" /></div>
                        </div>

                        <div className="row form-group">
                          <div className="col-3"><p>Phase </p></div>
                          <div className="col-9"><input type="text" class="form-control" /></div>
                        </div>
                        <div className="row form-group">
                          <div className="col-3"><p>Detail </p></div>
                          <div className="col-9"><input type="text" class="form-control" /></div>
                        </div>
                        <div className="row form-group">
                          <div className="col-3"><p>Manday </p></div>
                          <div className="col-9"><input type="text" class="form-control" /></div>
                        </div>
                        <div className="row form-group">
                          <div className="col-3"><p>CustomerEmail </p></div>
                          <div className="col-9"><input type="text" class="form-control" /></div>
                        </div>
                        <div className="row form-group">
                          <div className="col-3"><p>CreateDate </p></div>
                          <div className="col-9"><input type="text" class="form-control" /></div>
                        </div>
                        <div className="row form-group">
                          <div className="col-3"><p>CreateBy </p></div>
                          <div className="col-9"><input type="text" class="form-control" /></div>
                        </div>
                        <div className="row form-group">
                          <div className="col-3"><p>UpdateDate </p></div>
                          <div className="col-9"><input type="text" class="form-control" /></div>
                        </div>
                        <div className="row form-group">
                          <div className="col-3"><p>UpdateBy </p></div>
                          <div className="col-9"><input type="text" class="form-control" /></div>
                        </div>

                        <div className="row form-group">

                          <div className="col-12" >


                          </div>






                        </div>
                      </form>


                    </div>
                  </div>
                </div>

              </div>
              <div className="col-9 text-rigth" >
                <Button variant="primary" onClick={this.openModal}>BACK
                     </Button>
                <div className="col-12 box-search">
                  <div className="row table-ui">

                  </div>
                </div></div>


            </div></div>
        </div>
      </>
    );

  }
}

export default View;
