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
import _ from "lodash";
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';


const url = 'https://js.devexpress.com/Demos/Mvc/api/TreeListTasks';

const tasksData = AspNetData.createStore({
  key: 'Task_ID',
  loadUrl: `${url}/Tasks`,
  insertUrl: `${url}/InsertTask`,
  updateUrl: `${url}/UpdateTask`,
  deleteUrl: `${url}/DeleteTask`,
  onBeforeSend: function (method, ajaxOptions) {
    ajaxOptions.xhrFields = { withCredentials: true };
  }
});

const employeesData = AspNetData.createStore({
  key: 'ID',
  loadUrl: `${url}/TaskEmployees`
});

const statusesData = [
  'Not Started',
  'Need Assistance',
  'In Progress',
  'Deferred',
  'Completed'
];



class JobType extends React.Component {
  state = {
    isOpen: false
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });


  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      itembar: [false, false, false],
      filter: {
        dateFrom: new Date(),
        dateTo: new Date(),
        projectId: null,
        typeId: null
      },
      projectList: [],
      jobtypeList: []
    };
  }

  componentDidMount() {
    this.getProjectList()
    this.getJobtypeList()
  }

  getProjectList() {
    this.setState({
      projectList: [{
        projectId: '001',
        projectName: 'test1'
      },
      {
        projectId: '002',
        projectName: 'test2'
      }]
    })
  }

  getJobtypeList() {
    this.setState({
      jobtypeList: [{
        typeId: '001',
        typeName: 'test1'
      },
      {
        typeId: '002',
        typeName: 'test2'
      }]
    })
    console.log("Work -> getJobtypeList -> this.state.jobtypeList", this.state.jobtypeList)
  }

  handleProjectChange = (event) => {

    let temp = _.cloneDeep(this.state.filter)
    temp.projectId = event.target.value
    this.setState({
      filter: {
        dateFrom: temp.dateFrom,
        dateTo: temp.dateTo,
        typeId: temp.typeId,
        projectId: event.target.value
      }
    });
  }
  handleTypeChange = (event) => {

    let temp = _.cloneDeep(this.state.filter)
    temp.typeId = event.target.value
    this.setState({
      filter: {
        dateFrom: temp.dateFrom,
        dateTo: temp.dateTo,
        typeId: temp.typeId,
        projectId: temp.projectId
      }
    });
  }

  handleChangeDate = (event, type) => {
    let temp = _.cloneDeep(this.state.filter)
    if (type === 'from') {
      this.setState({
        filter: {
          dateFrom: event.value,
          dateTo: temp.dateTo,
          typeId: temp.typeId,
          projectId: temp.projectId
        }
      });
    } else {
      this.setState({
        filter: {
          dateFrom: temp.dateFrom,
          dateTo: event.value,
          typeId: temp.typeId,
          projectId: temp.projectId
        }
      });

    }
  }

  handleReset = () => {
    console.log("Work -> handleReset -> this.state.filter", this.state.filter)
    this.setState({
      filter: {
        dateFrom: new Date(),
        dateTo: new Date(),
        projectId: null,
        typeId: null
      }
    })
    setTimeout(() => {
      console.log("Work -> handleReset -> ll", this.state.filter)
    }, 100);
  }



  render() {


    function initNewRow(e) {
      e.data.Task_Status = 'Not Started';
      e.data.Task_Start_Date = new Date();
      e.data.Task_Due_Date = new Date();
    }



    return (<>

      <div className="App">
        <div id="boxType" className="container-box-content">
          <div className="row wrap-container">
            <Breadcrumb>
              <Breadcrumb.Item href="#">
                <HomeOutlined />
                <span className="breadcrum-custom">job type</span>
              </Breadcrumb.Item>
            </Breadcrumb>

            <div className="wrap-content">
              <div className="box-search">
                <div className="box-title-search">
                  <p className="font-size-search">Search Job Type</p>

                </div>
                <div className="box-content">
                  <div className="box-search-border">
                    <form>

                      {/* <div className="box-action-content"> */}

                      <div className="row form-group">
                        <div className="col-4" style={{ textAlign: 'right' }}>

                        </div>


                      </div>
                      {/* Job Type Name */}
                      <div className="row form-group">
                        <div className="col-4" style={{ textAlign: 'right' }}><label for="txtJob Type">Job Type<span style={{ color: 'red' }}>*</span></label></div>
                        <input type="text" class="form-control col-3" id="txtJob Type" />
                        {/* <div class="col-3">
        <button type="button" class="btn btn-custom-color" style={{ marginRight: 20 }} onClick={this.calManHours}>Calculate</button></div> */}
                      </div>

                      {/* Code */}
                      <div className="row form-group">
                        <div className="col-4" style={{ textAlign: 'right' }}><label for="txtCode">Code <span style={{ color: 'red' }}>*</span></label></div>
                        <input type="text" class="form-control col-3" id="txtCode" />

                      </div>



                      {/* </div> */}

                    </form>

                    <div className="row form-group">
                      <div className="col-12" style={{ textAlign: 'center' }}>
                        <button type="button" class="btn btn-secondary" style={{ marginRight: 20 }} onClick={this.handleReset}>RESET</button>
                        <button type="button" class="btn btn-custom-color">SEARCH</button>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* content start*/}
            <div className="wrap-content">
              <div className="box-search" style={{ padding: 30 }}>
                <div style={{ textAlign: 'end', padding: 15 }}>
                  <Link to="/JobType/create">
                    <Button variant="btn btn-custom-color" onClick={this.openModal}><IoAddOutline style={{ width: '16px' }} /> Create Job Type</Button>
                  </Link>
                </div>


                <table class="table text-center">
                  <table class="table ">
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
                        <td>Coding</td>
                        <td>ECT</td>
                        <td><FaClipboardList /></td>
                        <td onClick={this.openModal}><BsFillTrashFill /></td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Coding</td>
                        <td>ECT</td>
                        <td><FaClipboardList /></td>
                        <td onClick={this.openModal}><BsFillTrashFill /></td>
                      </tr>
                    </tbody>
                  </table>

                </table>




                {/* <div style={{padding: 20}}>
              <DataGrid
                  dataSource={customers}
                  showBorders={true}
                >
                  <GroupPanel visible={true} />
                  {/* <Grouping autoExpandAll={this.state.autoExpandAll} /> */}
                {/* <Paging defaultPageSize={10} />

                  <Column dataField="PROJECT" dataType="string" />
                  <Column dataField="PHASE" dataType="string" />
                  <Column dataField="TYPE" dataType="string" />
                  <Column dataField="DETAIL" dataType="string" />
                  <Column dataField="MANHOUR" dataType="string" />
                  <Column dataField="TIME IN" dataType="string" />
                  <Column dataField="TIME OUT" dataType="string" />
                  <Column dataField="EDIT DELETE" dataType="string" />
                  <Column dataField="State" dataType="string" groupIndex={0} />

                </DataGrid>
              // </div> */}

              </div>
            </div>
            {/* content end*/}



          </div>

        </div>
      </div>
    </>
    );

  }
}

export default JobType;
