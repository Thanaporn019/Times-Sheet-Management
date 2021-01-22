import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillCalendarFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { AiOutlineStepBackward } from "react-icons/ai";
import { AiFillStepForward } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import DateBox from 'devextreme-react/date-box';
import { IoAddOutline } from "react-icons/io5";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TreeList, { RemoteOperations, Column, SearchPanel, HeaderFilter, Editing, RequiredRule, Lookup } from 'devextreme-react/tree-list';
import AspNetData from 'devextreme-aspnet-data-nojquery';

import { AiTwotoneEye } from "react-icons/ai";
// import { Modal, Button } from "react-bootstrap";
// import SearchField from "react-search-field";
// import { IoAddOutline } from "react-icons/io5";
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

// const url = 'https://js.devexpress.com/Demos/Mvc/api/TreeListTasks';

// const tasksData = AspNetData.createStore({
//   key: 'Task_ID',
//   loadUrl: `${url}/Tasks`,
//   insertUrl: `${url}/InsertTask`,
//   updateUrl: `${url}/UpdateTask`,
//   deleteUrl: `${url}/DeleteTask`,
//   onBeforeSend: function (method, ajaxOptions) {
//     ajaxOptions.xhrFields = { withCredentials: true };
//   }
// });

// const employeesData = AspNetData.createStore({
//   key: 'ID',
//   loadUrl: `${url}/TaskEmployees`
// });

// const statusesData = [
//   'Not Started',
//   'Need Assistance',
//   'In Progress',
//   'Deferred',
//   'Completed'
// ];

class BackupWork extends React.Component {
  // render() {

  //   // function initNewRow(e) {
  //   //   e.data.Task_Status = 'Not Started';
  //   //   e.data.Task_Start_Date = new Date();
  //   //   e.data.Task_Due_Date = new Date();
  //   }
  state = {
    isOpen: false
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  render() {
    return (<>

      <div className="App">
        <div id="boxType" className="container-box-content">
          <div className="row wrap-container">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item" active aria-current="page"><a>Work</a></li>
              </ol>
            </nav>
            <div className="wrap-content">
              <div className="box-search">
                <div className="box-title-search">
                  <p className="font-size-search">Search Work</p>

                </div>
                <div className="box-content">
                  <div className="box-search-border">
                    <form>

                      {/*  Dropdown */}
                      <div className="row">
                        <div className="col-6">
                          <div className="row form-group">

                          
                            <div className="col-4"><label for="ddlProjectName">Project Name</label></div>
                            <select class="form-control col-7" id="ddlProjectName">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row form-group">
                            <div className="col-4"><label for="ddlJobType">Job Type</label></div>
                            <select class="form-control col-7" id="ddlJobType">
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/*  วันที่ */}
                      <div className="row">
                        <div className="col-6">
                          <div className="row form-group">
                            <div className="col-4"><label for="ddlProjectName">Date : From</label></div>
                            <div className="col-7" style={{ paddingLeft: 0, paddingRight: 0 }}>
                              <DateBox defaultValue={this.dateFrom}
                                type="date" />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row form-group">
                            <div className="col-4"><label for="ddlJobType">Date : To</label></div>
                            <div className="col-7" style={{ paddingLeft: 0, paddingRight: 0 }}>
                              <DateBox defaultValue={this.dateTo}
                                type="date" />
                            </div>
                          </div>
                        </div>


                      </div>
                    </form>

                    <div className="row form-group">
                      <div className="col-12" style={{ textAlign: 'center' }}>
                        <button type="button" class="btn btn-secondary" style={{ marginRight: 20 }}>RESET</button>
                        <button type="button" class="btn btn-primary">SEARCH</button>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            <div className="wrap-content">
            <div className="box-search">
              <div style={{textAlign: 'end', padding: 15}}>
              <Link to="/Work/create">
              <Button variant="primary" onClick={this.openModal}><IoAddOutline style={{ width: '16px' }} /> Create Work</Button>
              </Link>
              </div>

                <table class="table text-center">
                  <table class="table ">
                    <thead class="thead-light">

                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">ProjectName</th>
                        <th scope="col">Phase</th>
                        <th scope="col">View</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>SSB-SRFC</td>
                        <td>Phase 1.0</td>
                        <td><AiTwotoneEye /></td>
                        <td><FaClipboardList /></td>
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
                        <td>SSB-SRFC</td>
                        <td>Phase 1.0</td>
                        <td><AiTwotoneEye /></td>
                        <td><FaClipboardList /></td>
                        <td onClick={this.openModal}><BsFillTrashFill /></td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>SSB-SRFC</td>
                        <td>Phase 1.0</td>
                        <td><AiTwotoneEye /></td>
                        <td><FaClipboardList /></td>
                        <td onClick={this.openModal}><BsFillTrashFill /></td>
                      </tr>
                    </tbody>
                  </table>

                </table>





              </div></div>

          </div>
        </div>

      </div>



      {/* </div> */}
      <br />

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

export default BackupWork;
