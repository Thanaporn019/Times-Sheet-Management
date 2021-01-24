import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import DateBox from 'devextreme-react/date-box';
import { IoAddOutline } from "react-icons/io5";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HomeOutlined, EyeOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import DropDownButton from 'devextreme-react/drop-down-button';
import moment from 'moment';
import AlertPopUp from "../../components/popup/alert_popup";
import ConfirmPopup from "../../components/popup/confirm_popup";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Paging,
  SearchPanel,
  Editing,
  Pager,
  Button
} from 'devextreme-react/data-grid';
import AspNetData from 'devextreme-aspnet-data-nojquery';
import _ from "lodash";
import { Breadcrumb } from 'antd';
import configService from '../../config';
const msgAlertTitle = configService.msgAlert;
const msgPopupTitle = configService.msgConfirm;
const url = 'https://js.devexpress.com/Demos/Mvc/api/TreeListTasks';
{/* <span role="img" aria-label="delete" class="anticon anticon-delete"><svg viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg></span> */ }

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

let d = <FormOutlined />

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
      isPopupSuccess: false, // alert success case
      isPopupError: false,  // alert error case
      isPopupMsg: '',  // alert msg
      isOpen: false, // open popup confirm
      isTypeShowConfirm: '', // ประเภทของ popup : save , del
      isDataPopUp: {}, // ข้อมูลที่ใช้
      isTextMsg: '', // msg ของ Popup
      data: [
        {
          'id': 1,
          'workId': '0001',
          'projectId': '0001',
          'projectName': 'test1',
          'projectPhase': '1',
          'typeId': '0001',
          'typeName': 'test1',
          'workDate': '20/12/2020',
          'workDetail': '....',
          'workUrl': '-',
          'workManhour': '8',
          'workTimeIn': '09:00 AM',
          'workTimeOut': '18:00 PM',
          'updateDate': null,
          'updateBy': null,
          'createDate': '20/11/2020',
          'createBy': 'joon',
          'groupId': 0
        }, {
          'workId': '0002',
          'projectId': '0002',
          'projectName': 'test2',
          'projectPhase': '1',
          'typeId': '0002',
          'typeName': 'test2',
          'workDate': '25/01/2021',
          'workDetail': '....',
          'workUrl': '-',
          'workManhour': '8',
          'workTimeIn': '09:00 AM',
          'workTimeOut': '18:00 PM',
          'updateDate': null,
          'updateBy': null,
          'createDate': '20/11/2020',
          'createBy': 'joon',
          'groupId': 0,
          'id': 2
        }, {
          'workId': '0003',
          'projectId': '0003',
          'projectName': 'test3',
          'projectPhase': '1',
          'typeId': '0003',
          'typeName': 'test3',
          'workDate': '20/11/2020',
          'workDetail': '....',
          'workUrl': '-',
          'workManhour': '8',
          'workTimeIn': '09:00 AM',
          'workTimeOut': '18:00 PM',
          'updateDate': null,
          'updateBy': null,
          'createDate': '20/11/2020',
          'createBy': 'joon',
          'groupId': 0,
          'id': 3
        }, {
          'workId': '0003',
          'projectId': '0003',
          'projectName': 'test3',
          'projectPhase': '1',
          'typeId': '0003',
          'typeName': 'test3',
          'workDate': '20/02/2020',
          'workDetail': '....',
          'workUrl': '-',
          'workManhour': '8',
          'workTimeIn': '09:00 AM',
          'workTimeOut': '18:00 PM',
          'updateDate': null,
          'updateBy': null,
          'createDate': '20/11/2020',
          'createBy': 'joon',
          'groupId': 3,
          'id': 4
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

  groupRender = (data) => {
    console.log("groupRender -> data", data)
    let day = moment(data.value, 'DD/MM/YYYY').format('dddd')
    let id = data.data.items && data.data.items.length > 0 ? data.data.items[0].workId : data.data.collapsedItems && data.data.collapsedItems.length > 0 ? data.data.collapsedItems[0].workId : null
    let name = `DATE : ${data.value}  ${day}`
    let now = moment().format('DD/MM/YYYY');
    console.log("groupRender -> name", name)
    return <div className="row">
      <div style={{fontSize: '14pt'}}className={`col-6 ${day === 'Sunday' || day === 'Saturday' ? 'color-red' : data.value === now ? 'color-blue' : 'color-black'}`}>
        {name}
      </div>

      <div className="col-6" style={{ textAlign: 'end' }}>
        <Link to={"/work" + `/{"action":"edit","workId":"${id}"}`}>
          <span style={{ color: 'black', fontSize: '16pt', marginRight: 15 }}><FormOutlined /></span>
        </Link>
        <a onClick={() => {
          this.setState({ isOpen: true, isTypeShowConfirm: 'del', isTextMsg: msgPopupTitle.deleted, isDataPopUp: this.state.data })
          console.log("project -> DelcellRender -> data", id)
        }}><span style={{ color: '#111', fontSize: '16pt' }}><DeleteOutlined /></span></a>
      </div>

    </div>



  }

  render() {

    return (<>

      <div className="App">
        <div id="boxType" className="container-box-content">
          <div className="row wrap-container">
            <Breadcrumb>
              {/* <Breadcrumb.Item href="#"> */}
              <HomeOutlined />
              <span className="breadcrum-custom"> Work</span>
              {/* </Breadcrumb.Item> */}
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
                            <div className="col-4"><label for="ddlProjectName" className="title-field">Project Name</label></div>
                            <select class="form-control col-7" id="ddlProjectName" value={this.state.filter.projectId} onChange={this.handleProjectChange}>
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
                            <div className="col-4"><label for="ddlJobType" className="title-field">Job Type</label></div>
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
                            <div className="col-4"><label for="ddlDateFrom" className="title-field">Date : From</label></div>
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
                            <div className="col-4"><label for="ddlDateTo" className="title-field">Date : To</label></div>
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
                  <Link to='/work/{"action":"create"}'>
                    <button className="btn-custom btn-search " style={{ width: 250 }}><span className="btn-icon"><IoAddOutline /></span> <span className="btn-txt-icon">Create Work</span></button>

                  </Link>
                </div>
                <div style={{ padding: 20 }}>
                  <DataGrid
                    dataSource={this.state.data}
                    allowColumnReordering={false}
                    showBorders={true}
                  >
                    <Editing
                      allowUpdating={true}
                      allowDeleting={true}
                      // allowAdding={false}
                      mode="form"
                      useIcons={true}
                    />
                    <GroupPanel visible={false} />
                    <SearchPanel visible={false} />
                    <Grouping autoExpandAll={true} />
                    <Paging defaultPageSize={10} />
                    <Pager
                      showPageSizeSelector={true}
                      allowedPageSizes={[5, 10, 20]}
                      showInfo={true}
                      showNavigationButtons={true}
                    />

                    <Column dataField="projectName" caption="PROJECT" dataType="string" />
                    <Column dataField="projectPhase" caption="PHASE" dataType="string" />
                    <Column dataField="typeName" caption="TYPE" dataType="string" />
                    <Column dataField="workDetail" caption="DETAIL" dataType="string" />
                    <Column dataField="workManhour" caption="MANHOURS" dataType="string" />
                    <Column dataField="workTimeIn" caption="TIMEIN" dataType="string" />
                    <Column dataField="workTimeOut" caption="TIMEOUT" dataType="string" />
                    <Column type="buttons" caption="EDIT DELETE" width={110}>
                      <DropDownButton
                        text="..."
                        icon=""
                        dropDownOptions={{ width: 230 }}
                        items={['edit', 'delete']}
                        onItemClick={this.onItemClick}
                      />
                      <Button name="edit" />
                      <Button name="delete" />
                    </Column>
                    <Column className="color-red" dataField="workDate" groupIndex={0} groupCellRender={this.groupRender} />
                  </DataGrid>
                </div>
              </div>
            </div>
            {/* content end*/}



          </div>

        </div>
      </div>

      {/* POPUP */}
      <AlertPopUp successStatus={this.state.isPopupSuccess} errorStatus={this.state.isPopupError} message={this.state.isPopupMsg}
        clearActive={() => {
          this.setState({ isPopupError: false })
          this.setState({ isPopupSuccess: false })
        }} />

      <ConfirmPopup open={this.state.isOpen} type={this.state.isTypeShowConfirm} text={this.state.isTextMsg} data={this.state.isDataPopUp} del={false}
        onClose={() => { this.setState({ isOpen: false }) }}
        clearActive={(e) => { this.setState({ isOpen: false }) }}
        confirmActive={(e) => {
          this.setState({ isOpen: false })
          this.setState({ isPopupError: false })
          this.setState({ isPopupSuccess: true })
          this.setState({ isPopupMsg: msgAlertTitle.deleted })
          console.log("Work -> render -> e", e)
        }}
      />


      />

    </>
    );

  }
}


export default Work;
