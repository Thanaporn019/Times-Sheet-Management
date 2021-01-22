import React, { Component } from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Head from './JobType/Head';
import { Modal, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { BsFillCalendarFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";

class CreateW extends Component {
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
                <p><Navbar.Brand href="#Work" style={{ marginLeft: "140px" }}>Work</Navbar.Brand>/ Create Work</p>
              </div>


              <div className="col-12 box-search">
                <div className="row">
                  <div className="col-12">
                    <p style={{ color: "#696969" }}>Create Work</p>
                  </div>
                  <div className="col-12">
                    <div className="box-search-border">

                      <div className="col-12 box-search"></div>
                      <div className="row">
                        <div className="col-12">

                          <form>



                            <div className="row form-group">
                              <div className="col-3"><p>Date</p></div>
                              <div className="col-1"><p style={{ color: "red" }}> *</p></div>
                              <div className="col-6"><input type="text" class="form-control" /></div>
                              <p><BsFillCalendarFill /></p>
                            </div>

                            <div className="col-12 row form-group">
                          <div className="col-1"><p style={{ color: "red" }}> *</p></div>
                          <div className="col-6 "><p>  Items marked with an asterisk are required </p></div></div>
                            
                            <div className="row form-group">
                              <div className="col-3"><p>Project </p></div>
                              <div className="col-1"><p style={{ color: "red" }}> *</p></div>
                              <div>
                                <DropdownButton variant="btn btn-light" title="select">

                                  <Dropdown.Item as="button">Project1</Dropdown.Item>
                                  <Dropdown.Item as="button">Project2</Dropdown.Item>
                                  <Dropdown.Item as="button">Project3</Dropdown.Item>
                                  <NavDropdown.Divider />
                                  <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                </DropdownButton>
                              </div></div>
                            <div className="row form-group">
                              <div className="col-3"><p>JobType</p></div>
                              <div className="col-1"><p style={{ color: "red" }}> *</p></div>
                              <div>
                                <DropdownButton variant="btn btn-light" title="select">

                                  <Dropdown.Item as="button">Project1</Dropdown.Item>
                                  <Dropdown.Item as="button">Project2</Dropdown.Item>
                                  <Dropdown.Item as="button">Project3</Dropdown.Item>
                                  <NavDropdown.Divider />
                                  <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                </DropdownButton>
                              </div></div>
                            <div className="row form-group">
                              <div className="col-3"><p>TimeIn</p></div>
                              <div className="col-1"><p style={{ color: "red" }}> *</p></div>

                              <DropdownButton variant="btn btn-light" style={{ marginRight: "20px" }} title="hour">

                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                              </DropdownButton>

                              <DropdownButton variant="btn btn-light" title="minute">

                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                              </DropdownButton>
                            </div>

                            <div className="row form-group">
                              <div className="col-3"><p>TimeOut</p></div>
                              <div className="col-1"><p style={{ color: "red" }}> *</p></div>

                              <DropdownButton variant="btn btn-light" style={{ marginRight: "20px" }} title="hour">

                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                              </DropdownButton>

                              <DropdownButton variant="btn btn-light" title="minute">

                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                              </DropdownButton>
                            </div>
                            <div className=" row form-group">
                              <div className="col-3"><p>ManHour</p></div>
                              <div className="col-1"><p style={{ color: "red" }}> *</p></div>

                              <div className="col-5"><input type="text" class="form-control" /></div>


                              <button type="button" class="btn btn-primary" style={{ marginRight: "60px" }}>Calculate man hour</button>
                            </div>
                            <div className="row form-group">
                              <div className="col-3"><p>Detail</p></div>
                              <div className="col-1"><p style={{ color: "red" }}> *</p></div>
                              <div className="col-8"><input type="text" class="form-control" /></div>
                            </div>
                            <div className="row form-group">
                              <div className="col-3"><p>URL </p></div>
                              <div className="col-1"><p style={{ color: "red" }}> *</p></div>
                              <div className="col-8"><input type="text" class="form-control" /></div>
                            </div>


                          </form>


                        </div>
                      </div>
                    </div>
                  </div>

                  <Nav className="col-2 text-rigth mr-auto">
                    <Nav.Link href="#AiOutlineStepBackward" > <AiOutlinePlusCircle /></Nav.Link>


                  </Nav>
                  {/* <div className="col-2 text-rigth"><p><AiOutlinePlusCircle /></p></div> */}
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




                  <div className="row form-group">




                  </div>

                  <div className="col-12 text-rigth">
                
                <button type="button" class="btn btn-secondary" style={{ marginRight: "8px" }}>CANCEL</button>
                {/* <button type="button" class="btn btn-primary" style={{ marginRight: "18px" }}>CREATE</button> */}

                <Button variant="primary" onClick={this.openModal}>CREATE
                     </Button>
              </div>

                  <div className="col-12 box-search">
                    <div className="row table-ui">

                    </div>
                  </div></div>
              </div>




            </div></div>
        </div>
      </>
    );

  }
}

export default CreateW;
