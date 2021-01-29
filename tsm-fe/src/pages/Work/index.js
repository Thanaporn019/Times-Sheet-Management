import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import DateBox from 'devextreme-react/date-box';
import { IoAddOutline } from "react-icons/io5";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HomeOutlined, EyeOutlined, PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import DropDownButton from 'devextreme-react/drop-down-button';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import moment from 'moment';
import AlertPopUp from "../../components/popup/alert_popup";
import ConfirmPopup from "../../components/popup/confirm_popup";
import {
  SimpleItem,
  GroupItem
} from 'devextreme-react/form';
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Paging,
  SearchPanel,
  Editing,
  Pager,
  Scrolling,
  Form,
  Button
} from 'devextreme-react/data-grid';
import AspNetData from 'devextreme-aspnet-data-nojquery';
import _ from "lodash";
import { Breadcrumb, Modal, TimePicker, Select } from 'antd';
import configService from '../../config';
const msgAlertTitle = configService.msgAlert;
const msgPopupTitle = configService.msgConfirm;
const msgValid = configService.validDateFill;
const url = 'https://js.devexpress.com/Demos/Mvc/api/TreeListTasks';
const format = "HH:mm A";
const Option = Select.Option;

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
      isDelete: false, // ใช้เช็คว่าเป็นการลบไหม
      data: [
        {
          'workId': '0001',
          'projectId': '0001',
          'projectName': 'test1',
          'projectPhase': '1',
          'typeId': '0001',
          'typeName': 'test1',
          'workDate': '01/01/2021',
          'workDetail': '....',
         // 'workUrl': '-',
         'workLinkPlan': 'https://bezkoder.com/node-express-sequelize-postgresql/',
         'workReference': 'http://lib.swu.ac.th/images/Documents/Researchsupport/APA6thNew.pdf',
          'workManhour': '8',
          'workTimeIn': '09:00 AM',
          'workTimeOut': '18:00 PM',
          'updateDate': null,
          'updateBy': null,
          'createDate': '20/11/2020',
        }, {
          'workId': '0002',
          'projectId': '0002',
          'projectName': 'test2',
          'projectPhase': '1',
          'typeId': '0002',
          'typeName': 'test2',
          'workDate': '02/01/2021',
          'workDetail': '....',
         // 'workUrl': '-',
         'workLinkPlan': 'https://bezkoder.com/node-express-sequelize-postgresql/',
         'workReference': 'http://lib.swu.ac.th/images/Documents/Researchsupport/APA6thNew.pdf',
          'workManhour': '8',
          'workTimeIn': '09:00 AM',
          'workTimeOut': '18:00 PM',
          'updateDate': null,
          'updateBy': null,
          'createDate': '20/11/2020',
          'createBy': 'joon',
        }, {
          'workId': '0003',
          'projectId': '0003',
          'projectName': 'test3',
          'projectPhase': '1',
          'typeId': '0003',
          'typeName': 'test3',
          'workDate': '03/01/2021',
          'workDetail': '....',
         // 'workUrl': '-',
         'workLinkPlan': 'https://bezkoder.com/node-express-sequelize-postgresql/',
         'workReference': 'http://lib.swu.ac.th/images/Documents/Researchsupport/APA6thNew.pdf',
          'workManhour': '8',
          'workTimeIn': '09:00 AM',
          'workTimeOut': '18:00 PM',
          'updateDate': null,
          'updateBy': null,
          'createDate': '20/11/2020',
          'createBy': 'joon',
        }, {
          'workId': '0004',
          'projectId': '0004',
          'projectName': 'test3',
          'projectPhase': '1',
          'typeId': '0003',
          'typeName': 'test3',
          'workDate': '03/01/2021',
          'workDetail': '....',
          // 'workUrl': '-',
          'workLinkPlan': 'https://bezkoder.com/node-express-sequelize-postgresql/',
          'workReference': 'http://lib.swu.ac.th/images/Documents/Researchsupport/APA6thNew.pdf',
          'workManhour': '8',
          'workTimeIn': '09:00 AM',
          'workTimeOut': '18:00 PM',
          'updateDate': null,
          'updateBy': null,
          'createDate': '20/11/2020',
          'createBy': 'joon',
        }],
      popOver: {
        workId: '',
        visible: false
      },
      popupEditVisable: false,
      updateData: {
        projectId: null,
        typeId: null,
        workDate: null,
        workDetail: null,
        workUrl: null,
        workManhour: null,
        workTimeIn: null,
        workTimeOut: null,
        projectPhase: null,
        timeIn: null,
        timeOut: null,
      }
    };

    this.dataPopup = [
      { id: 1, name: 'Edit', icon: 'edit' },
      { id: 2, name: 'Delete', icon: 'trash' },
    ];

    // ปั้นวันที่ตามเดือนปัจจุบัน start
    this.dateOfCurrentMouth = []
    for (let i = 0; i < moment().daysInMonth(); i++) {
      this.dateOfCurrentMouth.push({ workDate: `${(i + 1) >= 10 ? i + 1 : '0' + (i + 1)}/${moment().format('MM')}/${moment().format('YYYY')}` })
    }

    // this.keyDelete = [];
    // ปั้นวันที่ตามเดือนปัจจุบัน end
  }

  componentDidMount() {
    this.getProjectList()
    this.getJobtypeList()
    this.fnSetDefaultDate()
  }

  fnSetDefaultDate() {
    let temp = _.cloneDeep(this.dateOfCurrentMouth)
    // เอาค่าของ workDate ออกมา
    let dataWorkDate = this.state.data.map(r => r.workDate)
    // เอาค่าที่ไม่ซ้ำของ workDate
    temp = temp.filter(r => dataWorkDate.indexOf(r.workDate) === -1)
    for (const item of this.state.data) {
      temp.push(item)
    }
    console.log("TCL: fnSetDefaultDate -> temp", temp)
    this.setState({ data: temp })
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

    let resData = [
      {
        projectId: "001",
        projectName: "test1",
      },
      {
        projectId: "002",
        projectName: "test2",
      },
    ];
    let temp = [];
    for (let i = 0; i < resData.length; i++) {
      temp.push(
        <Option key={resData[i].projectId}> {resData[i].projectName} </Option>
      );
    }

    this.projectList = temp;
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

    let resData = [
      {
        typeId: "001",
        typeName: "test1",
      },
      {
        typeId: "002",
        typeName: "test2",
      },
    ];
    let temp = [];
    for (let i = 0; i < resData.length; i++) {
      temp.push(
        <Option key={resData[i].typeId}> {resData[i].typeName} </Option>
      );
      console.log(
        "ActionsWork -> getJobtypeList -> resData[i].typeId",
        resData[i].typeId
      );
    }

    this.typeList = temp;
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
    this.setState({
      filter: {
        dateFrom: new Date(),
        dateTo: new Date(),
        projectId: null,
        typeId: null
      }
    })
  }

  groupRender = (data) => {
    console.log("groupRender -> data", data)
    // ข้อความ ดำ > บันทึกแล้ว
    // ข้อความ แดง > ไม่บันทึก / ส - อ
    // ข้อความ น้ำเงิน > ปัจจุบัน
    let day = moment(data.value, 'DD/MM/YYYY').format('dddd')
    let id = data.data.items && data.data.items.length > 0 ? data.data.items[0].workId : data.data.collapsedItems && data.data.collapsedItems.length > 0 ? data.data.collapsedItems[0].workId : null
    let name = `DATE : ${data.value}  ${day}`
    let now = moment().format('DD/MM/YYYY');
    return (<div className="row">
      <div style={{ fontSize: '12pt' }} className={`col-6 ${day === 'Sunday' || day === 'Saturday' ? 'color-red' : data.value === now ? 'color-blue' : 'color-black'}`}>
        {name}
      </div>

      {/* ปุ่มบวก : */}

      {/* {data.data.items[0].workId} */}
      {data.data.items.length === 0 || data.data.items[0].workId === undefined ?
        <div className="col-6" style={{ textAlign: 'end' }}>
          <Link to='/work/{"action":"create"}'>
            <button className="btn-custom btn-search " style={{ width: '40px', hight: '13px', borderRadius: '50%', }}><span className="btn-icon"><IoAddOutline /></span> </button>

          </Link>
        </div> :
        <div className="col-6" style={{ textAlign: 'end'}}>
          <Link to={"/work" + `/{"action":"edit","workId":"${id}"}`}>
            <span className="custom-icon-group" style={{ color: 'black', fontSize: '12pt', marginRight: 20 }}><FormOutlined /></span>
          </Link>
          <a className="custom-icon-group" onClick={() => {
            this.setState({
              isOpen: true,
              isTypeShowConfirm: "del",
              isTextMsg: msgPopupTitle.deleted,
              isDataPopUp: [data.data, 'all'],
              isDelete: true,
            });
          }}><span style={{ color: '#111', fontSize: '12pt', marginRight: 20 }}><DeleteOutlined /></span></a>
        </div>}

    </div>
    )
  }

  actionRender = (data) => {
    return (<> {data.key && data.key.workId ?
      <DropDownButton
        text="..."
        dropDownOptions={{ width: 100 }}
        items={this.dataPopup}
        displayExpr="name"
        keyExpr="id"
        onItemClick={(e) => { this.onItemClick(e, data) }}
      /> : null}
    </>)
  }

  onItemClick = (e, data) => {
    console.log("TCL: onItemClick -> data", data)
    if (e.itemData.name === 'Edit') {
      this.setState({
        popupEditVisable: true, updateData: {
          ...data.data,
          workTimeIn: moment(data.data.workTimeIn, 'HH:mm A'),
          workTimeOut: moment(data.data.workTimeOut, 'HH:mm A'),
          timeIn: data.data.workTimeIn,
          timeOut: data.data.workTimeOut,
        }
      })

    } else if (e.itemData.name === 'Delete') {
      // call function delete
      this.setState({
        isOpen: true,
        isTypeShowConfirm: "del",
        isTextMsg: msgPopupTitle.deleted,
        isDataPopUp: [data.data, 'one'],
        isDelete: true,
      });
    }
  }

  onDeleteData = (data) => {
    if (data[1] === 'one') {
      let dataWorkDate = this.state.data.map(r => {
        if (r.workDate === data[0].workDate) {
          return r
        }
      })

      let newData = _.without(dataWorkDate, undefined);

      // ต้อง call api -------------------
      let tempDel = this.state.data.filter(r => data[0].workId.indexOf(r.workId) === -1)
      if (newData && newData.length <= 1) {
        tempDel.push({ workDate: data[0].workDate })
      }
      this.setState({ data: tempDel })
    } else {
      let tempDel = _.cloneDeep(this.state.data)
      for (let i = 0; i < data[0].items.length; i++) {
        const element = data[0].items[i];
        tempDel = tempDel.filter(r => element.workId.indexOf(r.workId) === -1)
      }
      tempDel.push({ workDate: data[0].key })
      this.setState({ data: tempDel })
    }
    this.setState({ isOpen: false })
    this.setState({ isPopupError: false })
    this.setState({ isPopupSuccess: true })
    this.setState({ isPopupMsg: msgAlertTitle.deleted })

  }

  onUpdateData = (data) => {
    console.log("TCL: onDeleteData -> data", data)
    let temp = _.cloneDeep(this.state.data)
    for (let i = 0; i < temp.length; i++) {
      const element = temp[i];
      if (element.workId === this.state.updateData.workId) {
        let splitTime = this.state.updateData.workManhour.split(':')
        temp[i] = this.state.updateData
        temp[i].workManhour = splitTime[0]
        temp[i].workTimeIn = this.state.updateData.timeIn
        temp[i].workTimeOut = this.state.updateData.timeOut
      }
    }

    this.setState({ popupEditVisable: false })
    this.setState({ data: temp })
    this.setState({ isOpen: false })
    this.setState({ isPopupError: false })
    this.setState({ isPopupSuccess: true })
    this.setState({ isPopupMsg: msgAlertTitle.updated })
  }

  onEditorPreparing(e) {
    console.log("TCL: onEditorPreparing -> e ===> ", e)
    if (e.parentType === 'dataRow' && e.dataField === 'Position') {
      e.editorOptions.readOnly = this.isChief(e.value);
    }
  }

  onEditorPrepared(e) {
    console.log("TCL: onEditorPrepared -> e ===> ", e)
  }

  onInitNewRow(e) {
    console.log("TCL: onInitNewRow -> e ===> ", e)
  }

  onContentReady(e) {
    console.log("TCL: onContentReady -> e ===> ", e)
  }

  onRowPrepared(e) {
    // แถบสี ม่วง > จ-ศ
    // แถบสี เทา > ส-อ
    if (e.rowType === 'group') {
      // console.log("TCL: onRowPrepared -> e ===> ", e)
      let day = moment(e.key[0], 'DD/MM/YYYY').format('dddd')
      if (day !== 'Sunday' && day !== 'Saturday') {
        e.rowElement.style.backgroundColor = 'rgb(232 211 255)';
      } else {
        e.rowElement.style.backgroundColor = '#ddd';
      }
      if (e.cells) {
        if (e.cells[0]) {
          if ((e.cells[0].data.collapsedItems && e.cells[0].data.collapsedItems[0] && e.cells[0].data.collapsedItems[0].workId) || (e.cells[0].data.items && e.cells[0].data.items[0] && e.cells[0].data.items[0].workId)) {
            // e.component.expandRow(e.component.getKeyByRowIndex(e.rowIndex));
          }
        }
      }
    }
  }

  checkValidData = () => {
    let validProject = this.checkValid('project')
    let validJobType = this.checkValid('job')
    let validTimeIn = this.checkValid('in')
    let validTimeOut = this.checkValid('out')
    let validManHours = this.checkValid('hours')
    let validDetail = this.checkValid('detail')
    let validGreater = this.checkGreaterTime()
    if (validProject && validJobType && validTimeIn && validTimeOut && validManHours && validDetail && validGreater) {
      this.setState({
        isOpen: true,
        isTypeShowConfirm: "save",
        isTextMsg: msgPopupTitle.saved,
        isDataPopUp: this.state.updateData,
        isDelete: false,
      });
    } else {

      console.log("TCL: ActionsWork -> checkValidData -> ", 'กรอกข้อมูลไม่ครบ')
    }
  }

  checkValid = (type) => {
    let temp = _.cloneDeep(this.state.updateData)
    let res = true;
    if (type === 'project') {
      const element = temp;
      let valid = this.state.isValid_projectName;
      if (!element.projectId || element.projectId === '') {
        res = false;
        valid = true;
        this.setState({ isValid_projectName: valid });
      }
    } else if (type === 'job') {
      const element = temp;
      let valid = this.state.isValid_jobType;
      if (!element.typeId || element.typeId === '') {
        res = false;
        valid = true;
        this.setState({ isValid_jobType: valid });

      }
    } else if (type === 'in') {
      const element = temp;
      let valid = this.state.isValid_timeIn;
      if (!element.workTimeIn || element.workTimeIn === '') {
        res = false;
        valid = true;
        this.setState({ isValid_timeIn: valid });

      }
    } else if (type === 'out') {
      const element = temp;
      let valid = this.state.isValid_timeOut;
      if (!element.workTimeOut || element.workTimeOut === '') {
        res = false;
        valid = true;
        this.setState({ isValid_timeOut: valid });

      }
    } else if (type === 'hours') {
      const element = temp;
      let valid = this.state.isValid_manHours;
      if (!element.workManhour || element.workManhour === '') {
        res = false;
        valid = true;
        this.setState({ isValid_manHours: valid });

      }
    } else if (type === 'detail') {
      const element = temp;
      let valid = this.state.isValid_detail;
      if (!element.workDetail || element.workDetail === '') {
        res = false;
        valid = true;
        this.setState({ isValid_detail: valid });

      }
    }

    return res;
  }

  checkGreaterTime() {
    let res = true
    if ((!this.state.updateData.timeIn || this.state.updateData.timeIn !== '') && (!this.state.updateData.timeOut || this.state.updateData.timeOut !== '')) {
      var start = moment(this.state.updateData.timeIn, 'HH:mm A').format('HH:mm');
      var end = moment(this.state.updateData.timeOut, 'HH:mm A').format('HH:mm');
      let validTimeIn = this.state.greaterTimeIn;
      let validTimeOut = this.state.greaterTimeOut;
      if (start > end) {
        validTimeIn = true;
        validTimeOut = true;
        this.setState({
          greaterTimeIn: validTimeIn,
          greaterTimeOut: validTimeOut,
        })
        res = false
      }
    }
    return res;
  }

  confirmSave = (data) => {
    console.log("TCL: ActionsWork -> confirmSave -> data", data)
    this.setState({ isOpen: false });
    this.setState({ isPopupError: false });
    this.setState({ isPopupSuccess: true });
    this.setState({ isPopupMsg: this.state.params.action === "edit" ? msgAlertTitle.updated : msgAlertTitle.saved });

  }

  onWorkManHoursChange = (event) => {
    let temp = _.cloneDeep(this.state.updateData)
    temp.workManhour = event.target.value

    let valid = this.state.isValid_timeOut;
    if (!event.target.value || event.target.value !== '') {
      valid = false;
    }

    this.setState({ updateData: temp, isValid_timeOut: valid });
  }

  onWorkUrlChange = (event) => {
    console.log("TCL: ActionsWork -> onWorkUrlChange -> event", event)
    let temp = _.cloneDeep(this.state.updateData)
    temp.workUrl = event.target.value
    console.log("TCL: ActionsWork -> onWorkUrlChange -> temp", temp)

    this.setState({ updateData: temp });
  }

  onWorkDetailChange = (event, index) => {
    let temp = _.cloneDeep(this.state.updateData)
    temp.workDetail = event.target.value

    let valid = this.state.isValid_detail;
    if (!event.target.value || event.target.value !== '') {
      valid = false;
    }
    this.setState({ updateData: temp, isValid_detail: valid });
  }

  // TODO :: Select
  // TODO :: Dropdown Project Name
  handleChangeProject = (value, index) => {
    let item = this.state.updateData;
    item.projectId = value;
    let valid = this.state.isValid_projectName;
    console.log("TCL: ActionsWork -> handleChangeProject -> valid", valid)
    if (!value || value !== '') {
      valid = false;
    }

    this.setState({ updateData: item, isValid_projectName: valid });

    console.log("TCL: ActionsWork -> handleChangeProject -> ", this.state)
  };

  // TODO :: Dropdown Job Type
  handleChangeType = (value, index) => {
    let item = this.state.updateData;
    item.typeId = value;

    let valid = this.state.isValid_jobType;
    if (!value || value !== '') {
      valid = false;
    }

    this.setState({ updateData: item, isValid_jobType: valid });
  };

  // TODO :: calculate man hours
  calManHours = () => {

    let temp = _.cloneDeep(this.state.updateData)
    console.log("TCL: calManHours -> temp", temp)
    let validIn = this.state.isValid_timeIn;
    let validOut = this.state.isValid_timeOut;


    if (!temp.timeIn || temp.timeIn === '' || !temp.timeOut || temp.timeOut === '') {
      if (!temp.timeOut || temp.timeOut === '') {
        validOut = true;
        this.setState({ isValid_timeOut: validOut });
      }
      if (!temp.timeIn || temp.timeIn === '') {
        validIn = true;
        this.setState({ isValid_timeIn: validIn });
      }
      return
    }

    if (this.checkGreaterTime() === false) {
      console.log("TCL: ActionsWork -> calManHours -> ", 'time out > time in')
      return
    }

    var start = moment(temp.timeIn, 'HH:mm A').format('HH:mm');
    var end = moment(temp.timeOut, 'HH:mm A').format('HH:mm');
    let tempTime = this.fnCallDiffTime(start, end)
    let time = '';
    let dataTime = tempTime.split(":");
    let tempStart = start.split(":");
    let tempEnd = end.split(":");
    if (start <= '12:00' && end >= '13:00') {
      let a = parseInt(dataTime[0]) - 1
      time = (a <= 9 ? "0" : "") + a + ":" + dataTime[1];
    } else if (start > '12:00' && start < '13:00') {
      if (end <= '13:00') {
        time = '00:00'
      } else if (end > '13:00') {
        if (parseInt(tempStart[1]) <= parseInt(tempEnd[1])) {
          let calHours = parseInt(dataTime[0]) - 1
          time = (calHours <= 9 ? "0" : "") + calHours + ":" + tempEnd[1];
        } else {
          let calMin = parseInt(tempEnd[1])
          let calHours = parseInt(dataTime[0])
          time = (calHours <= 9 ? "0" : "") + calHours + ":" + (calMin <= 9 ? "0" : "") + calMin;
        }
      }
    } else {
      time = tempTime;
    }

    temp.workManhour = time
    this.setState({ updateData: temp })
  };

  fnCallDiffTime = (start, end) => {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    if (hours < 0)
      hours = hours + 24;

    let time = (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
    return time;
  }

  // TODO :: Dropdown Time In
  onChangeTimeIn = (time, timestring) => {
    console.log("TCL: onChangeTimeIn -> timestring", timestring)
    console.log("TCL: onChangeTimeIn -> time", time)
    let item = this.state.updateData;
    item.workTimeIn = time;
    item.timeIn = timestring;
    let valid = this.state.isValid_timeIn;
    if (!timestring || timestring !== '') {
      valid = false;
    }

    this.setState({ updateData: item, isValid_timeIn: valid });
  };

  // TODO :: Dropdown Time Out
  onChangeTimeOut = (time, timestring) => {
    let item = this.state.updateData;
    item.workTimeOut = time;
    item.timeOut = timestring;
    let valid = this.state.isValid_timeOut;
    if (!timestring || timestring !== '') {
      valid = false;
    }

    this.setState({ updateData: item, isValid_timeOut: valid });
  };

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
                                  // console.log("Work -> render -> r", r)
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
                    <button className="btn-custom btn-search " style={{ width: 185 }}><span className="btn-icon"><IoAddOutline /></span> <span className="btn-txt-icon">Create Work</span></button>

                  </Link>
                </div>
                <div style={{ padding: 20 }} className="table-responsive">
                  <DataGrid
                    dataSource={this.state.data}
                    allowColumnReordering={false}
                    showBorders={true}
                    onEditorPreparing={this.onEditorPreparing}
                    onEditorPrepared={this.onEditorPrepared}
                    onInitNewRow={this.onInitNewRow}
                    onRowPrepared={this.onRowPrepared}
                    onContentReady={this.onContentReady}
                  // columnWidth={100}
                  >
                    <Editing
                      mode="row"
                      confirmDelete={false}
                    />
                    <Scrolling columnRenderingMode="virtual" />
                    <GroupPanel visible={false}
                    />
                    <SearchPanel visible={false} />
                    <Grouping autoExpandAll={true} allowCollapsing={true} />
                    <Paging defaultPageSize={10} />
                    <Pager
                      showPageSizeSelector={true}
                      allowedPageSizes={[100, 250, 500, 1000]}
                      showInfo={true}
                      showNavigationButtons={true}
                    />

                    <Column dataField="projectName" caption="Project" dataType="string" />
                    <Column dataField="projectPhase" caption="Phase" dataType="string" />
                    <Column dataField="typeName" caption="Type" dataType="string" />
                    <Column dataField="workDetail" caption="Detail" dataType="string" />
                    <Column dataField="workManhour" caption="Man Hours" dataType="string" />
                    <Column dataField="workTimeIn" caption="Time In" dataType="string" />
                    <Column dataField="workTimeOut" caption="Time Out" dataType="string" />
                    <Column caption="Edit Delete" alignment="center" width={110} cellRender={this.actionRender}>

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
          if (this.state.isDelete) {
            this.onDeleteData(e);
          } else {
            this.onUpdateData(e);
          }
        }}
      />

      <Modal centered
        footer={null}
        header={null}
        visible={this.state.popupEditVisable}
        width={1200}
        closable={false}
        onOk={() => {
          this.setState({ popupEditVisable: false })
        }}
      >
        {this.state.popupEditVisable ?
          <div className="box-title-search" style={{ paddingBottom: 0 }}>
            <p className="font-size-search"> Update Work </p>

            <div className="box-action-content">
              <div className="row form-group">
                <div className="col-6">
                  <div className="row">
                    <div className="col-4" style={{ textAlign: "right" }} >
                      <label className="title-field" for="ddlProjectName" >
                        Project Name <span style={{ color: "red" }}> * </span>
                      </label>
                    </div>
                    <div className={`col-8`} style={{ textAlign: 'start', padding: 0 }}>
                      <div className={`form-control div-select ${this.state.isValid_projectName && this.state.isSubmit ? 'has-error-input' : ''}`}>
                        <Select
                          showSearch
                          style={{ width: 200 }}
                          placeholder="Please selete project"
                          optionFilterProp="children"
                          onChange={(e) => {
                            this.handleChangeProject(e);
                          }}
                          filterOption={(input, option) =>
                            option.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          value={this.state.updateData.projectId}>
                          {this.projectList}
                        </Select>
                      </div>
                      {this.state.isValid_projectName && this.state.isSubmit ? <span className="color-red">{msgValid.work.validProjectName}</span> : null}
                    </div>
                  </div>
                </div>
                {/* Job Type */}
                <div className="col-6">
                  <div className="row">
                    <div className="col-4" style={{ textAlign: "right" }} >
                      <label className="title-field" for="ddlJobType" >
                        Job Type <span style={{ color: "red" }}> * </span>
                      </label>
                    </div>
                    <div className={`col-8`} style={{ textAlign: 'start', padding: 0 }}>
                      <div className={`form-control div-select ${this.state.isValid_projectName && this.state.isSubmit ? 'has-error-input' : ''}`}>
                        <Select
                          showSearch
                          style={{ width: 200 }}
                          placeholder="Please selete Type"
                          optionFilterProp="children"
                          onChange={(e) => {
                            this.handleChangeType(e);
                          }}
                          filterOption={(input, option) =>
                            option.props.children[1]
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          value={this.state.updateData.typeId}
                        >
                          {this.typeList}
                        </Select>
                      </div>
                      {this.state.isValid_jobType && this.state.isSubmit ? <span className="color-red">{msgValid.work.validJobType}</span> : null}

                    </div>
                  </div>
                </div>
              </div>

              {/* Time in */}
              <div className="row form-group" >
                <div className="col-6">
                  <div className="row">
                    <div className="col-4" style={{ textAlign: "right" }} >
                      <label className="title-field" for="ddlTimeIn" >
                        Time in <span style={{ color: "red" }}> * </span>
                      </label>
                    </div>
                    <div className="col-8" style={{ textAlign: 'start', padding: 0 }}>
                      <TimePicker
                        showNow={true}
                        className="font-12pt"
                        style={{ fontSize: "12pt" }}
                        use12Hours
                        placeholder="Select time in"
                        format={format}
                        value={this.state.updateData.workTimeIn}
                        showNow={true}
                        onChange={(time, timestring) => {
                          this.onChangeTimeIn(time, timestring);
                        }}
                        className={`${this.state.isValid_timeIn || this.state.greaterTimeIn ? 'has-error-input' : ''}`} />
                      {this.state.isValid_timeIn && !this.state.greaterTimeIn ? <span className="color-red">{msgValid.work.validTimeIn}</span> : null}
                      {this.state.greaterTimeIn && !this.state.isValid_timeIn ? <span className="color-red">{msgValid.work.validTimeInAndOut}</span> : null}

                    </div>
                  </div>
                </div>

                {/* Time out */}
                <div className="col-6">
                  <div className="row">
                    <div className="col-4" style={{ textAlign: "right" }} >
                      <label className="title-field" for="ddlTimeOut" >
                        Time out <span style={{ color: "red" }}> * </span>
                      </label>
                    </div>
                    <div className="col-8" style={{ textAlign: 'start', padding: 0 }}>
                      <TimePicker
                        showNow={true}
                        className="font-12pt"
                        style={{ fontSize: "12pt" }}
                        use12Hours
                        placeholder="Select Time out"
                        format={format}
                        value={this.state.updateData.workTimeOut}
                        showNow={true}
                        onChange={(time, timestring) => {
                          this.onChangeTimeOut(time, timestring);
                        }}
                        className={`${this.state.isValid_timeOut || this.state.greaterTimeOut ? 'has-error-input' : ''}`} />
                      {this.state.isValid_timeOut && !this.state.greaterTimeOut ? <span className="color-red">{msgValid.work.validTimeOut}</span> : null}
                      {this.state.greaterTimeOut && !this.state.isValid_timeOut ? <span className="color-red">{msgValid.work.validTimeInAndOut}</span> : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* Man hours */}
              <div className="row form-group">
                <div className="col-6">
                  <div className="row">
                    <div className="col-4" style={{ textAlign: "right" }} >
                      <label className="title-field" for="txtManHours" >
                        Man hours <span style={{ color: "red" }}> * </span>
                      </label>
                    </div>
                    <div className="col-6" style={{ textAlign: 'start', padding: 0 }}>
                      <input type="text" className={`form-control ${this.state.isValid_manHours && this.state.isSubmit ? 'has-error-input' : ''}`}
                        id="txtManHours" value={this.state.updateData.workManhour} onChange={(event) => { this.onWorkManHoursChange(event) }} />
                      {this.state.isValid_manHours && this.state.isSubmit ? <span className="color-red">{msgValid.work.validManHours}</span> : null}
                    </div>
                    <div className="col-2">
                      <button class="btn-custom btn-calculate" onClick={this.calManHours} >
                        Calculate
                      </button>
                    </div>
                  </div>
                </div>
 </div>
                {/* Url */}
                {/* <div className="col-6">
                  <div className="row">
                    <div className="col-4" style={{ textAlign: "right" }} >
                      <label className="title-field" for="txtUrl">
                        Url
                      </label>
                    </div>
                    <div className="col-8" style={{ textAlign: 'start', padding: 0 }}>
                      <input type="text" class="form-control" id="txtUrl" value={this.state.updateData.workUrl} onChange={(event) => { this.onWorkUrlChange(event) }} />
                    </div>
                  </div>
                </div> */}
             

              {/* Detail */}
              <div className="row form-group">
                <div className="col-12">
                  <div className="row">
                    <div className="col-2" style={{ textAlign: "right" }} >
                      <label className=" title-field" for="txtDetail" >
                        Detail <span style={{ color: "red" }}> * </span>
                      </label>
                    </div>
                    <div className="col-10" style={{ textAlign: 'start', padding: 0 }}>
                      <textarea rows="3" type="text" id="txtDetail"
                        className={`form-control ${this.state.isValid_detail && this.state.isSubmit ? 'has-error-input' : ''}`}
                        value={this.state.updateData.workDetail} onChange={(event) => { this.onWorkDetailChange(event) }}
                      />
                      {this.state.isValid_detail && this.state.isSubmit ? <span className="color-red">{msgValid.work.validWorkDetail}</span> : null}
                    </div>
                  </div>
                </div>
              </div>


                                                  {/* Link Plan */}
                                                        <div className="row form-group">
                                                            <div className="col-12">
                                                                <div className="row">
                                                                    <div className="col-2" style={{ textAlign: "right" }} >
                                                                        <label className="title-field" for="LinkPlan" >
                                                                        Link Plan  
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-10" style={{ textAlign: 'start', padding: 0 }}>

                                                                    <input type="text" class="form-control" id="txtLinkPlan" value={this.state.updateData.workLinkPlan} onChange={(event) => { this.onWorkLinkPlanChange(event) }} />
                                                                      
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                         {/* Reference */}
                                                         <div className="row form-group">
                                                            <div className="col-12">
                                                                <div className="row">
                                                                    <div className="col-2" style={{ textAlign: "right" }} >
                                                                        <label className="title-field" for="Reference" >
                                                                        Reference 
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-10" style={{ textAlign: 'start', padding: 0 }}>

                                                                    <input type="text" class="form-control" id="txtReference" value={this.state.updateData.workReference} onChange={(event) => { this.onWorkReferenceChange(event) }} />
                                                                      
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


              
            </div>

            <div className="row form-group" style={{ margin: 0 }}>
              <div className="col-12" style={{ textAlign: "right", padding: 20 }}>
                <button
                  class="btn-custom btn-reset"
                  style={{ marginRight: 20 }}
                  onClick={() => {
                    this.setState({ popupEditVisable: false })
                  }}
                >
                  CANCEL
                </button>
                <button
                  class="btn-custom btn-search"
                  style={{ marginRight: 0 }}
                  onClick={() => {
                    this.setState({ isSubmit: true })
                    this.checkValidData()

                  }}

                >
                  UPDATE
                </button>
              </div>
            </div>
          </div>
          : null}

      </Modal>
    </>);
  }
}


export default Work;
