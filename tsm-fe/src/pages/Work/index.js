import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import DateBox from 'devextreme-react/date-box';
import { IoAddOutline } from "react-icons/io5";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HomeOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
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
  Scrolling,
} from 'devextreme-react/data-grid';
import _ from "lodash";
import { Breadcrumb, Modal, TimePicker, Select } from 'antd';
import configService from '../../config';
import axios from 'axios'
import { LoadPanel } from 'devextreme-react/load-panel';

import { extendMoment } from 'moment-range';

const momentEx = extendMoment(moment);

const msgAlertTitle = configService.msgAlert;
const msgPopupTitle = configService.msgConfirm;
const msgValid = configService.validDateFill;

const format = "HH:mm A";
const Option = Select.Option;
const api = configService.appIp + configService.apiUrlPrefix
const position = { of: '#App' };

class Work extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      itembar: [false, false, false],
      filter: {
        dateFrom: moment().clone().startOf('month').toDate(),
        dateTo: moment().clone().endOf('month').toDate(),
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
        ],
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
      },
      loadPanelVisible: false
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



const range = momentEx.range(this.state.filter.dateFrom, this.state.filter.dateTo);
console.log("🚀 ~ file: index.js ~ line 103 ~ Work ~ constructor ~ range", range)
    // this.keyDelete = [];
    // ปั้นวันที่ตามเดือนปัจจุบัน end
  }

  async componentDidMount() {
    try {
      this.setState({ loadPanelVisible: true })
      await this.getProjectList()
      await this.getJobtypeList()
      this.fnSetDefaultDate()
      await this.fnGetData();
      this.setState({ loadPanelVisible: false })
    } catch (error) {
      console.log("TCL: componentDidMount -> error", error)
    }
  }

  fnSetDefaultDate() {
    let temp = _.cloneDeep(this.dateOfCurrentMouth)
    // เอาค่าของ workDate ออกมา
    setTimeout(() => {
      let dataWorkDate = this.state.data.map(r => r.workDate)
      // เอาค่าที่ไม่ซ้ำของ workDate
      temp = temp.filter(r => dataWorkDate.indexOf(r.workDate) === -1)
      for (const item of this.state.data) {
        temp.push(item)
  
      }
      // console.log("TCL: fnSetDefaultDate -> temp", temp)
      this.setState({ data: temp })
    }, 150);
  }

  
  async getProjectList() {
    return new Promise(async (resolve, reject) => {
      try {
        let resData = []
        let filter = {
          "fields": "projectId,projectName,projectPhase"
          
        }
        const response = await axios.get(api + '/project', { params: filter })
        if (response && response.status === 200) {
          if (response.data && response.data.resultCode === "20000") {

            // const result = numbers.map((number) => {
            //   return number*2
            // })
          // ** Map Phase **
            response.data.resultData = response.data.resultData.map((phase) => {
              phase.projectName = `${phase.projectName} ${phase.projectPhase}`
              return phase
            })

            this.setState({ projectList: response.data.resultData })
            console.log("🚀 ~ file: index.js ~ line 219 ~ Work ~ returnnewPromise ~ response.data.resultData", response.data.resultData)
            resData = response.data.resultData
          } else {
            this.setState({ projectList: response.data.resultData ? response.data.resultData : [] })
            resData = response.data.resultData || [];
          }

          let temp = [];
          for (let i = 0; i < resData.length; i++) {
            temp.push(
              <Option key={resData[i].projectId}> {resData[i].projectName} </Option>
            );
          }

          this.projectList = temp;
        }
        resolve();
      } catch (error) {
        console.log("TCL: getProjectList -> error", error)
        reject(error)
      }
    });
  }

  async getJobtypeList() {
    return new Promise(async (resolve, reject) => {
      try {
        let resData = []
        let filter = {
          "fields": "typeId,typeName"
        }
        const response = await axios.get(api + '/type', { params: filter })
        if (response && response.status === 200) {
          if (response.data && response.data.resultCode === "20000") {
            this.setState({ jobtypeList: response.data.resultData })
            resData = response.data.resultData
          } else {
            this.setState({ jobtypeList: response.data.resultData ? response.data.resultData : [] })
            resData = response.data.resultData || [];
          }

          let temp = [];
          for (let i = 0; i < resData.length; i++) {
            temp.push(
              <Option key={resData[i].typeId}> {resData[i].typeName} </Option>
            );
          }

          this.jobtypeList = temp;
        }
        resolve();
      } catch (error) {
        console.log("TCL: getProjectList -> error", error)
        reject(error)
      }
    });
  }
  
  handleProjectChange = (event) => {
    this.setState({
      filter: {
        ...this.state.filter,
        projectId: event.target.value
      }
    });
  }

  handleTypeChange = (event) => {
    this.setState({
      filter: {
        ...this.state.filter,
        typeId: event.target.value
      }
    });
  }

  handleChangeDate = (event, type) => {
    if (type === 'from') {
      this.setState({
        filter: {
          ...this.state.filter,
          dateFrom: event.value,
        }
      });
    } else {
      this.setState({
        filter: {
          ...this.state.filter,
          dateTo: event.value
        }
      });

    }
  }

  handleChangeDateEdit  = (event) => {
    let temp = _.cloneDeep(this.state.data)
    for (let i = 0; i < temp.length; i++) {
        const element = temp[i];
        element.workDate = event.value
    }

    if (!event.value || event.value !== '') {
        this.setState({ isValid_workDate: false });
    }
    this.setState({ workDate: event.value, data: temp })
}

  handleReset = () => {
    this.setState({
      filter: {
        dateFrom: moment().clone().startOf('month').toDate(),
        dateTo: moment().clone().endOf('month').toDate(),
        projectId: null,
        typeId: null
      }
    })
  }

  onSearch = () => {
    this.setState({ loadPanelVisible: true })
    this.fnGetData();
}


  groupRender = (data) => {
    // console.log("groupRender -> data", data)
    // ข้อความ ดำ > บันทึกแล้ว
    // ข้อความ แดง > ไม่บันทึก / ส - อ
    // ข้อความ น้ำเงิน > ปัจจุบัน
    let day = moment(data.value, 'DD/MM/YYYY').format('dddd')
    let id = data.data.items && data.data.items.length > 0 ? data.data.items[0].workId : data.data.collapsedItems && data.data.collapsedItems.length > 0 ? data.data.collapsedItems[0].workId : null
    let name = `DATE : ${data.value}  ${day}`
    let now = moment().format('DD-MM-YYYY');
    let workDate = '"' + data.value.replace(/\//g, "%2F") + '"'
      

    console.log("TCL: groupRender -> workDate", workDate)
    return (<div className="row">
      <div style={{ fontSize: '12pt' }} className={`col-6 ${day === 'Sunday' || day === 'Saturday' ? 'color-red' : data.value === now ? 'color-blue' : 'color-black'}`}>
        {name}
      </div>

      {/* ปุ่มบวก : */}

      {/* {data.data.items[0].workId} */}
      {data.data.items.length === 0 || data.data.items[0].workId === undefined ?
        <div className="col-6" style={{ textAlign: 'end' }}>
          <Link to={"/work" + `/{"action":"create","workDate":${workDate}}`}>
            {/* <button className="btn-custom btn-search " style={{ width: '40px', hight: '13px', borderRadius: '50%', }}><IoAddOutline /></button> */}
            <IoAddOutline style={{ backgroundColor: 'green', borderRadius: '50%', width: '30', height: '30' }} />

          </Link>
        </div> :
        <div className="col-6" style={{ textAlign: 'end' }}>
          <Link to={"/work" + `/{"action":"edit","workDate":${workDate},"workId":${data.data.items[0].workId}}`}>
            <span className="custom-icon-group" style={{ color: 'black', fontSize: '12pt', marginRight: 20 }}><FormOutlined /></span>
          </Link>
          <a className="custom-icon-group" onClick={() => {
            console.log(data.data, 'data.datadata.datadata.datadata.data')
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

  onDeleteData = async (data) => {
    try {
      var response = await axios.post(api + '/work/' , data);
   
    // if (data[1] === 'one') {
    //   let dataWorkDate = this.state.data.map(r => {
    //     if (r.workDate === data[0].workDate) {
    //       return r
    //     }
    //   })

    //   let newData = _.without(dataWorkDate, undefined);

    //   // ต้อง call api -------------------
    //   let tempDel = this.state.data.filter(r => data[0].workId.indexOf(r.workId) === -1)
    //   if (newData && newData.length <= 1) {
    //     tempDel.push({ workDate: data[0].workDate })
    //   }
    //   this.setState({ data: tempDel })
    // } else {
    //   let tempDel = _.cloneDeep(this.state.data)
    //   for (let i = 0; i < data[0].items.length; i++) {
    //     const element = data[0].items[i];
    //     tempDel = tempDel.filter(r => element.workId.indexOf(r.workId) === -1)
    //   }
    //   tempDel.push({ workDate: data[0].key })
    //   this.setState({ data: tempDel })

    if (response && response.status === 200) {
      if (response.data && response.data.resultCode === "20000") {
          this.setState({ isOpen: false });
          this.setState({ isPopupError: false });
          this.setState({ isPopupSuccess: true });
          this.setState({ isPopupMsg: msgAlertTitle.deleted });
      } else {
          this.setState({ isOpen: false })
          this.setState({ isPopupError: true })
          this.setState({ isPopupSuccess: false })
          this.setState({ isPopupMsg: msgAlertTitle.systemError })
      }
    }
  } catch (error) {
    this.setState({ loadPanelVisible: false })
    this.setState({ isOpen: false })
    this.setState({ isPopupError: true })
    this.setState({ isPopupSuccess: false })
    this.setState({ isPopupMsg: msgAlertTitle.systemError })
    console.log("TCL: Work -> fnGetData -> error", error)
  }
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

  onWorkLinkPlanChange = (event, index) => {
    let temp = _.cloneDeep(this.state.updateData)
    temp.workLinkPlan = event.target.value

    let valid = this.state.isValid_LinkPlan;
    if (!event.target.value || event.target.value !== '') {
      valid = false;
    }
    this.setState({ updateData: temp, isValid_LinkPlan: valid });
  }

  onWorkRefChange = (event, index) => {
    let temp = _.cloneDeep(this.state.updateData)
    temp.workRef = event.target.value

    let valid = this.state.isValid_Ref;
    if (!event.target.value || event.target.value !== '') {
      valid = false;
    }
    this.setState({ updateData: temp, isValid_Ref: valid });
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

  

  fnGetData = async () => {
    return new Promise(async (resolve, reject)=>{

    try {
        let filter = {}
        filter.filter = {}
        filter.fields = configService.fields.workList
        filter.limit = this.state.pageSize;
        filter.offset = this.state.pageIndex;
        filter.orderby = "projectName";

        if (this.state.filter.projectName && this.state.filter.projectName !== '') {
            filter.filter.projectName = this.state.filter.projectName
        }
        
        if (this.state.filter.typeName && this.state.filter.typeName !== '') {
            filter.filter.typeName = this.state.filter.typeName
        }

      if (this.state.filter.dateFrom && this.state.filter.dateFrom !== '') {
        filter.filter.dateFrom = this.state.filter.dateFrom
    }

      if (this.state.filter.dateTo && this.state.filter.dateTo !== '') {
        filter.filter.dateTo = this.state.filter.dateTo
    }

      
        const response = await axios.get(api + '/work', { params: filter })
        if (response && response.status === 200) {
          if (response.data && response.data.resultCode === "20000") {
              console.log("🚀 ~ file: index.js ~ line 751 ~ Work ~ returnnewPromise ~ this.state.data", this.state.data)
              let mergeData = this.state.data.concat(response.data.resultData)
              // console.log("🚀 ~ file: index.js ~ line 749 ~ Work ~ fnGetData= ~ response.data.resultData", response.data.resultData)
              console.log("\n\n\n🚀 ~ file: index.js ~ line 749 ~ Work ~ fnGetData= ~ mergeData", mergeData)
                this.setState({ data: mergeData })
                // this.fnSetDefaultDate()
            } else {
                this.setState({ data: response.data.resultData })
            }

        }
        this.setState({ loadPanelVisible: false })
    } catch (error) {
        this.setState({ loadPanelVisible: false })
        console.log("TCL: Work -> fnGetData -> error", error)
    }
  })

}

  render() {

    return (<>

      <div className="App" id="App">
        <div id="boxType" className="container-box-content">
          <div className="row wrap-container">
            <Breadcrumb>
              {/* <Breadcrumb.Item href="#"> */}
              <HomeOutlined />
              <span className="breadcrum-custom">  Work </span>
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
                                displayFormat="dd/MM/yyyy"
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
                                displayFormat="dd/MM/yyyy"
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
                      
                        <button class="btn-custom btn-search " onClick={this.onSearch}>
                          SEARCH</button>
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

                    <Column dataField="projectName" caption="Project" dataType="string" alignment="center" />
                    <Column dataField="projectPhase" caption="Phase" dataType="string" alignment="center"/>
                    <Column dataField="typeName" caption="Type" dataType="string"  alignment="center" />
                    <Column dataField="workDetail" caption="Detail" dataType="string"  alignment="center" />
                    <Column dataField="workManhour" caption="Man Hours" dataType="string"  alignment="center" />
                    <Column dataField="workTimeIn" caption="Time In" dataType="string"  alignment="center"/>
                    <Column dataField="workTimeOut" caption="Time Out" dataType="string"  alignment="center"/>
                    <Column dataField="workPlan" caption="LinkPlan" dataType="string"  alignment="center"/>
                    <Column dataField="workRef" caption="Ref" dataType="string"  alignment="center"/>
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

      <LoadPanel
        shadingColor="rgba(0,0,0,0.4)"
        position={position}
        visible={this.state.loadPanelVisible}
      />

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

            <div className="box-content" style={{ marginBottom: 0 }}>

              <div style={{ textAlign: "right" }}>
                <p className="title-field">
                  <span style={{ color: "red" }}> * </span> Items marked with an asterisk are required
                                            </p>
              </div> </div>


            <div className="box-action-content">

              {/* Date */}
              <div className="row form-group">
                <div className="col-12">
                  <div className="row">
                    <div className="col-2" style={{ textAlign: "right" }} >
                      <label className="title-field" for="Date" >
                        Date : <span style={{ color: "red" }}> * </span>
                      </label>

                    </div>
                    <div className={`col-10`} style={{ textAlign: 'start', padding: 0 }}>
                    <DateBox value={null} type="date" value={this.state.workDate}
                                                        displayFormat="dd/MM/yyyy"
                                                        type="date" onValueChanged={(e) => {
                                                            this.handleChangeDateEdit(e)
                                                        }}
                                                        className={`${this.state.isValid_workDate && this.state.isSubmit ? 'has-error-input' : ''}`} />
                                                    {this.state.isValid_workDate && this.state.isSubmit ? <span className="color-red">{msgValid.work.validWorkDate}</span> : null}
                                                </div>
                                            </div>
                                        </div>
              </div>

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
                          value={this.state.updateData.projectName}>
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
                          value={this.state.updateData.typeName} 
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
                      {this.state.greaterTimeIn && !this.state.isValid_timeIn ? <span className="color-red">{msgValid.work.validTimeInmoreTimeOut}</span> : null}

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
                      {this.state.greaterTimeOut && !this.state.isValid_timeOut ? <span className="color-red">{msgValid.work.validTimeOutlessTimeIn}</span> : null}
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

              {/* Ref */}
              <div className="row form-group">
                <div className="col-12">
                  <div className="row">
                    <div className="col-2" style={{ textAlign: "right" }} >
                      <label className="title-field" for="Ref" >
                        Ref
                                                                        </label>
                    </div>
                    <div className="col-10" style={{ textAlign: 'start', padding: 0 }}>

                      <input type="text" class="form-control" id="txtRef" value={this.state.updateData.workRef} onChange={(event) => { this.onWorkRefChange(event) }} />

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
