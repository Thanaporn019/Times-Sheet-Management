import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from './JobType/Head';
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
import SearchField from "react-search-field";

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
import customers from './Work/data';
class App extends Component {
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

        <Head></Head>
        <div className="App">
          <div id="boxType" className="container-box-content">
            <div className="row ">
              <div className="col-12 text-left">
                <h1 > <Navbar.Brand href="#Job Type" style={{ marginLeft: "140px" }}>Job Type</Navbar.Brand>
                </h1>
              </div>

              <div className="col-12 box-search">
                <div className="row">
                  <div className="col-12">
                    <p style={{ color: "#696969" }}>Search Job Type</p>
                  </div>
                  <div className="col-12">
                    <div className="box-search-border">

                      <form>
                        <div className="row form-group">
                          <div className="col-3"><p>Job Type</p></div>
                          <SearchField
                            placeholder="JobType Name "
                            // onChange={onChange}
                            searchText=""
                            classNames="test-class"
                          />
                          {/* <div className="col-9"><input type="text" class="form-control" /></div> */}
                        </div>


                        <div className="row form-group">
                          <div className="col-3"><p>Code</p></div>
                          {/* <div className="col-9"><input type="text" class="form-control" /></div> */}
                          <SearchField
                            placeholder="Code"
                            // onChange={onChange}
                            searchText=""
                            classNames="test-class"
                          />

                        </div>


                        <div className="row form-group">
                          <div className="col-3"></div>
                          <div className="col-9">
                            <button type="button" class="btn btn-secondary" style={{ marginRight: "20px" }}>RESET</button>
                            <button type="button" class="btn btn-primary" style={{ marginRight: "60px" }}>SEARCH</button>
                          </div>


                        </div>
                      </form>


                    </div>
                  </div>
                </div>

              </div>

              <div className="col-12 box-search">
                <div className="row table-ui">
                  <div className="col-12 text-rigth">

                    {/* <button type="button" class="btn btn-primary" > + Create Job Type </button> */}
                    {/* <!-- Button trigger modal --> */}


                    <Button variant="primary" onClick={this.openModal}>+ Create Job Type
                     </Button>
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


                  {/* <Modal show={this.state.isOpen} onHide={this.closeModal}>

                    <Modal.Header closeButton>

                      <Modal.Title style={{ padding: "0rem 11rem" }}>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: "center" }}>You completed the transaction.</Modal.Body>

                    <Modal.Footer style={{ justifyContent: "center" }}>
                      <Button variant="primary" onClick={this.closeModal}>
                        OK</Button >
                    </Modal.Footer >
                  </Modal> */}

                  <table class="table text-center">
                    <thead class="thead-light">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Job Type</th>
                        <th scope="col">Code</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Coding</td>
                        <td>ECT</td>


                        <td onClick={this.openModal}><FaClipboardList /></td>
                        {/* <Modal show={this.state.isOpen} onHide={this.closeModal}>
                           <Modal.Header closeButton>
                             <Modal.Title style={{ padding: "1rem 11rem" }}>Confirm</Modal.Title>
                           </Modal.Header>
                           <Modal.Body style={{ textAlign: "center" }}>Please confirm your configuration.</Modal.Body>

                           <Modal.Footer style={{ borderTop: "0px" }} style={{ justifyContent: "center" }}>
                             <Button variant="btn btn-secondary" onClick={this.closeModal}>
                               NO</Button>

                             <Button variant="primary" onClick={this.openModal}>
                               YES</Button>
                           </Modal.Footer>
                         </Modal>  */}

                        <td onClick={this.openModal}><BsFillTrashFill /></td>


                        <Modal show={this.state.isOpen} onHide={this.closeModal}>
                          <Modal.Header closeButton style={{ color: "#bb1717" }}>
                            <Modal.Title style={{ padding: "1rem 11rem" }}>Confirm</Modal.Title>
                          </Modal.Header>
                          <Modal.Body style={{ textAlign: "center" }}>Are you sure you want to delete this?</Modal.Body>

                          <Modal.Footer style={{ borderTop: "0px" }} style={{ justifyContent: "center" }}>
                            <Button variant="btn btn-secondary" onClick={this.closeModal}>
                              ON</Button>

                            <Button variant="danger" onClick={this.openModal}>
                              YES</Button>

                          </Modal.Footer>

                        </Modal>
                      </tr>
                      <tr>

                        <th scope="row">2</th>
                        <td>Coding</td>
                        <td>ECT</td>
                        <td onClick={this.openModal}><FaClipboardList /></td>
                        <td onClick={this.openModal}><BsFillTrashFill /></td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Coding</td>
                        <td>ECT</td>
                        <td onClick={this.openModal}><FaClipboardList /></td>
                        <td onClick={this.openModal}><BsFillTrashFill /></td>
                      </tr>
                    </tbody>
                  </table>


                </div></div>

            </div>
          </div>




        </div><br />



        <Navbar bg="btn btn-light" expand="lg" style={{ height: "40px" }} >
          <Navbar.Brand href="#Result : 1-10 of 10" style={{ marginLeft: "400px" }}>Resulft : 1-10 of 10</Navbar.Brand>

          <Nav className="mr-auto">
            <Nav.Link href="#AiOutlineStepBackward" style={{ marginLeft: "200px" }}> <AiOutlineStepBackward /></Nav.Link>
            <Nav.Link href="#1" style={{ marginLeft: "20px" }}>  1  </Nav.Link>
            <Nav.Link href="#2" style={{ marginLeft: "10px" }}>  2  </Nav.Link>
            <Nav.Link href="#3" style={{ marginLeft: "10px" }}>  3  </Nav.Link>
            <Nav.Link href="#AiFillStepForward" style={{ marginLeft: "30px" }}><AiFillStepForward /> </Nav.Link>

          </Nav>




          <Nav.Link href="#Row per page :" style={{ marginLeft: "300px" }}>Row per page :</Nav.Link>



          <NavDropdown title="10" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">10</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">20</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">50</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">100</NavDropdown.Item>
          </NavDropdown>



          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">




          </Navbar.Collapse>
        </Navbar>


      </>
    );

  }
}

export default App;
