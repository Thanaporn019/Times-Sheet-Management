import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from './JobType/Head';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { BsFillCalendarFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";

class App extends Component {
    render() {
        const style = {
            backgroundColor: 'white',
            front: 'inherit',
            border: '1x sold blue',
            padding: '8px',
            width: '1280px',
            height: '800px',
        };


        return (

            <>
                <Head></Head>
                <div className="App">
                    <div id="boxType" className="container-box-content">
                        <div className="row ">
                            <div className="col-12 text-left">
                                <h1><Navbar.Brand href="#Work" style={{ marginLeft: "140px" }}>Work</Navbar.Brand> / Update Work</h1>
                            </div>


                            <div className="col-12 box-search">
                                <div className="row">
                                    <div className="col-12">
                                        <p style={{ color: "#696969" }}>Update Work</p>
                                    </div>
                                    <div className="col-12">
                                        <div className="box-search-border">

                                            <div className="col-12 box-search"></div>
                                            <div className="row">
                                                <div className="col-12">

                                                    <form>
                                                        <div className="row form-group">
                                                            <div className="col-3"><p>Date *</p></div>
                                                            <div className="col-9"><input type="text" class="form-control" /></div>
                                                        </div>


                                                        <div className="col-3"><p>* Items marked with an asterisk are required </p></div>
                                                        <div className="row form-group">
                                                            <div className="col-3"><p>Project *</p></div>
                                                            <div>
                                                                <DropdownButton variant="btn btn-secondary" title="select">

                                                                    <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                    <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                    <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                    <NavDropdown.Divider />
                                                                    <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                                </DropdownButton>
                                                            </div></div>
                                                        <div className="row form-group">
                                                            <div className="col-3"><p>JobType *</p></div>
                                                            <div>
                                                                <DropdownButton variant="btn btn-secondary" title="select">

                                                                    <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                    <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                    <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                    <NavDropdown.Divider />
                                                                    <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                                </DropdownButton>
                                                            </div></div>
                                                        <div className="row form-group">
                                                            <div className="col-3"><p>TimeIn *</p></div>
                                                            <div>
                                                                <DropdownButton variant="btn btn-secondary" title="hour">

                                                                    <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                    <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                    <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                    <NavDropdown.Divider />
                                                                    <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                                </DropdownButton>

                                                                <DropdownButton variant="btn btn-secondary" title="minute">

                                                                    <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                    <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                    <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                    <NavDropdown.Divider />
                                                                    <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                                </DropdownButton>
                                                            </div></div>

                                                        <div className="row form-group">
                                                            <div className="col-3"><p>TimeOut *</p></div>
                                                            <div>
                                                                <DropdownButton variant="btn btn-secondary" title="hour">

                                                                    <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                    <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                    <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                    <NavDropdown.Divider />
                                                                    <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                                </DropdownButton>

                                                                <DropdownButton variant="btn btn-secondary" title="minute">

                                                                    <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                    <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                    <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                    <NavDropdown.Divider />
                                                                    <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                                </DropdownButton>
                                                            </div></div>
                                                        <div className="row form-group">
                                                            <div className="col-3"><p>ManHour *</p></div>
                                                            <button type="button" class="btn btn-primary" style={{ marginRight: "60px" }}>Calculate man hour</button>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-3"><p>Detail *</p></div>
                                                            <div className="col-9"><input type="text" class="form-control" /></div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-3"><p>URL </p></div>
                                                            <div className="col-9"><input type="text" class="form-control" /></div>
                                                        </div>
                                                        <div className="row form-group">

                                                            <div className="col-9">

                                                                <button type="button" class="btn btn-danger">DELETE</button>
                                                            </div>


                                                        </div>
                                                    </form>

                                                    {/* /////////////////////////////////////////////////////////////////////////////////// */}
                                                    <div className="row form-group">
                                                        <div className="col-3"><p>Project *</p></div>
                                                        <div>
                                                            <DropdownButton variant="btn btn-secondary" title="select">

                                                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                <NavDropdown.Divider />
                                                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                            </DropdownButton>
                                                        </div></div>
                                                    <div className="row form-group">
                                                        <div className="col-3"><p>JobType *</p></div>
                                                        <div>
                                                            <DropdownButton variant="btn btn-secondary" title="select">

                                                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                <NavDropdown.Divider />
                                                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                            </DropdownButton>
                                                        </div></div>
                                                    <div className="row form-group">
                                                        <div className="col-3"><p>TimeIn *</p></div>
                                                        <div>
                                                            <DropdownButton variant="btn btn-secondary" title="hour">

                                                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                <NavDropdown.Divider />
                                                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                            </DropdownButton>

                                                            <DropdownButton variant="btn btn-secondary" title="minute">

                                                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                <NavDropdown.Divider />
                                                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                            </DropdownButton>
                                                        </div></div>

                                                    <div className="row form-group">
                                                        <div className="col-3"><p>TimeOut *</p></div>
                                                        <div>
                                                            <DropdownButton variant="btn btn-secondary" title="hour">

                                                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                <NavDropdown.Divider />
                                                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                            </DropdownButton>

                                                            <DropdownButton variant="btn btn-secondary" title="minute">

                                                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                <NavDropdown.Divider />
                                                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                            </DropdownButton>
                                                        </div></div>
                                                    <div className="row form-group">
                                                        <div className="col-3"><p>ManHour *</p></div>
                                                        <button type="button" class="btn btn-primary" style={{ marginRight: "60px" }}>Calculate man hour</button>
                                                    </div>
                                                    <div className="row form-group">
                                                        <div className="col-3"><p>Detail *</p></div>
                                                        <div className="col-9"><input type="text" class="form-control" /></div>
                                                    </div>
                                                    <div className="row form-group">
                                                        <div className="col-3"><p>URL </p></div>
                                                        <div className="col-9"><input type="text" class="form-control" /></div>
                                                    </div>
                                                    <div className="row form-group">

                                                        <div className="col-9">

                                                            <button type="button" class="btn btn-danger">DELETE</button>
                                                        </div>


                                                    </div>

                                                    {/* // // // // //  */}
                                                    <div className="row form-group">
                                                        <div className="col-3"><p>Project *</p></div>
                                                        <div>
                                                            <DropdownButton variant="btn btn-secondary" title="select">

                                                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                <NavDropdown.Divider />
                                                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                            </DropdownButton>
                                                        </div></div>
                                                    <div className="row form-group">
                                                        <div className="col-3"><p>JobType *</p></div>
                                                        <div>
                                                            <DropdownButton variant="btn btn-secondary" title="select">

                                                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                <NavDropdown.Divider />
                                                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                            </DropdownButton>
                                                        </div></div>
                                                    <div className="row form-group">
                                                        <div className="col-3"><p>TimeIn *</p></div>
                                                        <div>
                                                            <DropdownButton variant="btn btn-secondary" title="hour">

                                                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                <NavDropdown.Divider />
                                                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                            </DropdownButton>

                                                            <DropdownButton variant="btn btn-secondary" title="minute">

                                                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                <NavDropdown.Divider />
                                                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                            </DropdownButton>
                                                        </div></div>

                                                    <div className="row form-group">
                                                        <div className="col-3"><p>TimeOut *</p></div>
                                                        <div>
                                                            <DropdownButton variant="btn btn-secondary" title="hour">

                                                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                <NavDropdown.Divider />
                                                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                            </DropdownButton>

                                                            <DropdownButton variant="btn btn-secondary" title="minute">

                                                                <Dropdown.Item as="button">Project1</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project2</Dropdown.Item>
                                                                <Dropdown.Item as="button">Project3</Dropdown.Item>
                                                                <NavDropdown.Divider />
                                                                <NavDropdown.Item as="button">Project</NavDropdown.Item>
                                                            </DropdownButton>
                                                        </div></div>
                                                    <div className="row form-group">
                                                        <div className="col-3"><p>ManHour *</p></div>
                                                        <button type="button" class="btn btn-primary" style={{ marginRight: "60px" }}>Calculate man hour</button>
                                                    </div>
                                                    <div className="row form-group">
                                                        <div className="col-3"><p>Detail *</p></div>
                                                        <div className="col-9"><input type="text" class="form-control" /></div>
                                                    </div>
                                                    <div className="row form-group">
                                                        <div className="col-3"><p>URL </p></div>
                                                        <div className="col-9"><input type="text" class="form-control" /></div>
                                                    </div>
                                                    
                                                    <div className="col-2 text-rigth"><p><AiOutlinePlusCircle/></p></div>
                                                    
                                                    <div className="row form-group">

                                                        <div className="col-9">

                                                            <button type="button" class="btn btn-danger">DELETE</button>
                                                        </div>


                                                    </div>

                                                    <div className="col-9">
                                                        <button type="button" class="btn btn-secondary" style={{ marginRight: "8px" }}>CANCEL</button>
                                                        <button type="button" class="btn btn-primary">UPDATE</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>




                        </div></div>
                </div>
            </>
        );

    }
}

export default UpdateW2;
