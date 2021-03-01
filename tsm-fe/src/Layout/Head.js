import React, { Component } from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { IoPersonCircleOutline } from "react-icons/io5";
import { NavLink, Link } from 'react-router-dom'
// import { GrWorkshop } from "react-icons/gr";
import { PartitionOutlined, ProjectOutlined, FundProjectionScreenOutlined  } from '@ant-design/icons';

import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { VscGroupByRefType } from "react-icons/vsc";

class Head extends Component {
  render() {
    return (
      <>
        <div class="gx-header-horizontal gx-header-horizontal-dark gx-below-header-horizontal" style={{position: 'sticky', top: 0, zIndex: 9999}}>
          <header class="ant-layout-header gx-header-horizontal-main">
            <div class="gx-container">
              <div class="gx-header-horizontal-main-flex">
                <div class="gx-header-search gx-d-none gx-d-lg-flex">
                  <div class="gx-search-bar gx-lt-icon-search-bar-lg">
                    <div class="gx-form-group">
                      {/* <input class="ant-input" type="search" placeholder="Search in app..." value="" />
                      <span class="gx-search-icon gx-pointer">
                        <i class="icon icon-search"></i>
                      </span> */}

                      <span style={{ color: '#fff', fontSize: '22pt', fontWeight: 700 }}>SMARTADMIN</span>

                    </div>
                  </div>
                </div>

                <ul class="gx-header-notifications gx-ml-auto">
                  <li class="gx-notify" style={{fontSize: '20pt'}}>
                  <Link to="/work" >
                    <span class="gx-pointer gx-d-block">

              {/* Icon Work*/} 
                        <span className="icon-header"> < PartitionOutlined style={{color: '#fff'}}/>  </span>
                      Work
                    </span>

                </Link>
                  </li>
                  <li class="gx-msg" style={{fontSize: '20pt'}}>
                  <Link to="/project" >
                    <span class="gx-pointer gx-status-pos gx-d-block">
                     
            {/* Icon  Project*/}
            <span className="icon-header"> < ProjectOutlined/>  </span>
            
                      Project
                    </span>
                    </Link>
                  </li>
                  <li class="gx-msg">
                  <Link to="/jobtype" style={{fontSize: '20pt'}}>
                    <span class="gx-pointer gx-status-pos gx-d-block">

          {/* Icon Job type */}
                    <span className="icon-header">  < FundProjectionScreenOutlined  />  </span>
                    
                      Job type
                    </span>
                    </Link>
                  </li>
                  <li class="gx-msg" style={{color: '#fff'}}>
                    <span style={{color: '#fff', fontSize: 36}} class="gx-pointer gx-status-pos gx-d-block">
                    <IoPersonCircleOutline />
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </header>
        </div>
        {/* <Navbar className="Navbar-color" expand="lg" >
          <Navbar.Brand href="/" className="Navbar-brand-Style">SMARTADMIN</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/work" style={{ marginLeft: "600px" }}>work</Nav.Link>

              <Nav.Link href="/projects" style={{ marginLeft: "20px" }}>project</Nav.Link>

              <Nav.Link href="/jobtype" style={{ marginLeft: "20px" }}>job type</Nav.Link>
            </Nav>

            <Form inline>
            </Form>
          </Navbar.Collapse>
        </Navbar> */}

        {/* <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar> */}
      </>
    );
  }
}
export default Head;