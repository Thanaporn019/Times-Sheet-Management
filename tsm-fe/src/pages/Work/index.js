import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import AlertPopUp from "../../components/popup/alert_popup";
import ConfirmPopup from "../../components/popup/confirm_popup";

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



class Work extends React.Component {

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
      jobtypeList: [],
      isPopupSuccess: false,
      isPopupError: false,
      isPopupMsg: 'Please contact your administrator.',
      isOpen: true,
      isTypeShowConfirm: 'del',
      isDataPopUp: {},
      isTextMsg: 'Are you sure you want to delete this?',
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
                <span className="breadcrum-custom">  work</span>
              </Breadcrumb.Item>
            </Breadcrumb>

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
                            <select class="form-control col-7" id="ddlProjectName" value={this.state.filter.projectId} onChange={this.handleProjectChange}>
                              {/* <option value={this.state.filter.projectId} selected={this.state.filter.projectId == null}>-- Please select project --</option> */}
                              {
                                this.state.projectList.map(r => {
                                  console.log(r, r.projectId == this.state.filter.projectId)
                                  return <option value={r.projectId} selected={r.projectId == this.state.filter.projectId}>{r.projectName}</option>

                                })
                              }
                            </select>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row form-group">
                            <div className="col-4"><label for="ddlJobType">Job Type</label></div>
                            <select class="form-control col-7" id="ddlJobType" value={this.state.filter.typeId} onChange={this.handleTypeChange}>
                              {
                                this.state.jobtypeList.map(r => {
                                  console.log("Work -> render -> r", r)
                                  return <option value={r.typeId} selected={r.typeId == this.state.filter.typeId}>{r.typeName}</option>
                                })
                              }
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
                              <DateBox
                                value={this.state.filter.dateFrom}
                                type="date" onValueChanged={(e) => {
                                  this.handleChangeDate(e, 'from')
                                }} />
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row form-group">
                            <div className="col-4"><label for="ddlJobType">Date : To</label></div>
                            <div className="col-7" style={{ paddingLeft: 0, paddingRight: 0 }}>
                              <DateBox value={this.state.filter.dateTo}
                                type="date" type="date" onValueChanged={(e) => {
                                  this.handleChangeDate(e, 'to')
                                }} />
                            </div>
                          </div>
                        </div>


                      </div>
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
                  <Link to='/work/{"action":"create","projectId":"rrrr4444"}'>
                    <Button variant="btn btn-custom-color"><IoAddOutline style={{ width: '16px' }} /> Create Work</Button>
                  </Link>
                </div>

                <TreeList
                  id="tree-list"
                  dataSource={tasksData}
                  keyExpr="Task_ID"
                  parentIdExpr="Task_Parent_ID"
                  hasItemsExpr="Has_Items"
                  defaultExpandedRowKeys={[1, 2]}
                  showRowLines={true}
                  showBorders={true}
                  columnAutoWidth={true}
                  wordWrapEnabled={true}
                  onInitNewRow={initNewRow}>
                  <RemoteOperations filtering={true} sorting={true} grouping={true} />
                  {/* <SearchPanel visible={true} /> */}
                  <HeaderFilter visible={true} />
                  <Editing
                    mode="row"
                    allowUpdating={true}
                    allowDeleting={true} />
                  <Column dataField="PROJECT" minWidth={250}>
                    <RequiredRule />
                  </Column>
                  <Column dataField="Task_PHASE" caption="PHASE" minWidth={120}>
                    <Lookup dataSource={employeesData} valueExpr="ID" displayExpr="Name" />
                    <RequiredRule />
                  </Column>
                  <Column dataField="Task_DETAIL" caption="DETAIL" minWidth={120}>
                    <Lookup dataSource={statusesData} />
                  </Column>
                  <Column dataField="Task_MANHOUR" caption="MANHOUR" minWidth={120}>
                    <Lookup dataSource={statusesData} />
                  </Column>
                  <Column dataField="Task_TIME_IN" caption="TIME IN" dataType="date" />
                  <Column dataField="Task_TIME_OUT" caption="TIME OUT" dataType="date" />
                  <Column dataField="Task_EDIT_DELETE" caption="EDIT DELETE" minWidth={120}>
                    <Lookup dataSource={statusesData} />
                  </Column>
                </TreeList>
              </div>
            </div>
            {/* content end*/}



          </div>

        </div>
      </div>

      <AlertPopUp successStatus={this.state.isPopupSuccess} errorStatus={this.state.isPopupError} message={this.state.isPopupMsg}
        clearActive={() => {
          this.setState({ isPopupError: false })
          this.setState({ isPopupSuccess: false })
        }} />

        <ConfirmPopup open={this.state.isOpen} type={this.state.isTypeShowConfirm} text={this.state.isTextMsg} data={this.state.isDataPopUp} del={false}
            onClose={() => { this.setState({ isOpen: false }) }}
            clearActive={(e) => { this.setState({ isOpen: false }) }}
            confirmActive={(e) => {
              console.log("Work -> render -> e", e)
            }}
          />

    </>
    );

  }
}

export default Work;
