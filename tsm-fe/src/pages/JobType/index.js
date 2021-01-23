import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillCalendarFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { AiOutlineStepBackward } from "react-icons/ai";
import { AiFillStepForward } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
// import 'devextreme/dist/css/dx.common.css';
// import 'devextreme/dist/css/dx.light.css';
import DateBox from 'devextreme-react/date-box';
import { IoAddOutline } from "react-icons/io5";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AspNetData from 'devextreme-aspnet-data-nojquery';
import _ from "lodash";
import { Breadcrumb } from 'antd';
import { HomeOutlined, EyeOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import DataGrid, { Column, Pager, Paging } from 'devextreme-react/data-grid';

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
      jobtypeList: [],
      data: [{
        typeId: '0001',
        typeName: 'test',
        typeCode: 'T0001',
        updateDate: '01/12/2020',
        updateBy: 'joon',
        createDate: '01/11/2020',
        createBy: 'joon',
      }, {
        typeId: '0002',
        typeName: 'test2',
        typeCode: 'T0002',
        updateDate: '01/12/2020',
        updateBy: 'joon',
        createDate: '01/11/2020',
        createBy: 'joon',
      }, {
        typeId: '0003',
        typeName: 'test3',
        typeCode: 'T0003',
        updateDate: '01/12/2020',
        updateBy: 'joon',
        createDate: '01/11/2020',
        createBy: 'joon',
      }, {
        typeId: '0004',
        typeName: 'test4',
        typeCode: 'T0004',
        updateDate: '01/12/2020',
        updateBy: 'joon',
        createDate: '01/11/2020',
        createBy: 'joon',
      }, {
        typeId: '0005',
        typeName: 'test5',
        typeCode: 'T0005',
        updateDate: '01/12/2020',
        updateBy: 'joon',
        createDate: '01/11/2020',
        createBy: 'joon',
      }]
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
                <span className="breadcrum-custom">Job Type</span>
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

                      <div className="row form-group">
                        <div className="col-4" style={{ textAlign: 'right' }}>

                        </div>

                      </div>
                      {/* Job Type Name */}
                      <div className="row form-group">
                        <div className="col-4" style={{ textAlign: 'right' }}><label for="txtJobType" className="title-field">Job Type<span style={{ color: 'red' }}>*</span></label></div>
                        <input type="text" class="form-control col-3" id="txtJobType" />
                      </div>

                      {/* Code */}
                      <div className="row form-group">
                        <div className="col-4" style={{ textAlign: 'right' }}><label for="txtCode" className="title-field">Code <span style={{ color: 'red' }}>*</span></label></div>
                        <input type="text" class="form-control col-3" id="txtCode" />

                      </div>

                    </form>

                    <div className="row form-group">
                      <div className="col-12" style={{ textAlign: 'center' }}>
                        <button class="btn-custom btn-reset " style={{ marginRight: 20 }} onClick={this.handleReset}>RESET</button>
                        <button class="btn-custom btn-search ">SEARCH</button>
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
                  <Link to='/jobtype/{"action":"create"}'>
                    <button className="btn-custom btn-search " style={{ width: 250 }} ><span className="btn-icon"><IoAddOutline /></span> <span className="btn-txt-icon">Create Job Type</span></button>
                  </Link>
                </div>

                <div style={{ padding: 20 }}>
                  <DataGrid
                    dataSource={this.state.data}
                    showBorders={true}
                    showRowLines={true}
                  >
                    <Paging defaultPageSize={3} />
                    <Pager
                      showPageSizeSelector={true}
                      allowedPageSizes={[5, 10, 20]}
                      showInfo={true}
                      showNavigationButtons={true}
                    />

                    <Column width="100" caption="No" alignment="center" cellRender={noCellRender} dataType="string" />
                    <Column caption="Job Type" dataField="typeName" dataType="string" />
                    <Column caption="Code" dataField="typeCode" dataType="string" />
                    <Column width="100" alignment="center" caption="Edit" cellRender={editCellRender} />
                    <Column width="100" alignment="center" cellRender={delCellRender} caption="Delete" />

                  </DataGrid>
                </div>

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

function delCellRender(data) {
  console.log("JobType -> DelcellRender -> data", data)
  return <a onClick={() => {
    console.log("JobType -> DelcellRender -> data", data.data.typeId)
  }}><span style={{ color: '#111', fontSize: '16pt' }}><DeleteOutlined /></span></a>;
}
function editCellRender(data) {
  return <Link to={"/jobtype" + `/{"action":"edit","jobTypeId":"${data.data.typeId}"}`}>
    <span style={{ color: 'black', fontSize: '16pt' }}><FormOutlined /></span>
  </Link>
}
function noCellRender(data) {
  return <span style={{ color: 'black', fontSize: '16pt' }}>  {data.component.pageIndex() * data.component.pageSize() + data.rowIndex + 1}</span>

}


export default JobType;
