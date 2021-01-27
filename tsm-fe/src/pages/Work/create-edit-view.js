import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import DateBox from "devextreme-react/date-box";
import _ from "lodash";
import { Breadcrumb, TimePicker, Select } from "antd";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AlertPopUp from "../../components/popup/alert_popup";
import ConfirmPopup from "../../components/popup/confirm_popup";
import configService from "../../config";
const msgAlertTitle = configService.msgAlert;
const msgPopupTitle = configService.msgConfirm;
const msgValid = configService.validDateFill;
const format = "HH:mm A";
const Option = Select.Option;

class ActionsWork extends React.Component {
    state = {
        isOpen: false,
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    constructor(props) {
        console.log("ActionsWork -> constructor -> props", props);
        let query = _.cloneDeep(props.match.params.query);
        let tempQuery = JSON.parse(JSON.stringify(query));
        let param = JSON.parse(tempQuery);

        super(props);
        this.state = {
            isPopupSuccess: false, // alert success case
            isPopupError: false, // alert error case
            isPopupMsg: "", // alert msg
            isOpen: false, // open popup confirm
            isTypeShowConfirm: "", // ประเภทของ popup : save , del
            isDataPopUp: {}, // ข้อมูลที่ใช้
            isTextMsg: "", // msg ของ Popup
            isDelete: false, // ใช้เช็คว่าเป็นการลบไหม
            workDate: null,
            data: [
                {
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
            ],
            projectList: [],
            typeList: [],
            params: param,
            isValid_projectName: [],
            isValid_jobType: [],
            isValid_timeIn: [],
            isValid_timeOut: [],
            isValid_manHours: [],
            isValid_detail: [],
            isValid_workDate: false,
            greaterTimeIn: [],
            greaterTimeOut: [],
            isSubmit: false,
        };

        let tempDateFirstRow = _.cloneDeep(this.state.data)
        tempDateFirstRow[0].workDate = this.state.params.action === 'create' && this.state.params.workDate ? this.state.params.workDate : null
        console.log("TCL: ActionsWork -> constructor -> tempDateFirstRow", tempDateFirstRow)
        this.setState({ data: tempDateFirstRow })
    }

    componentDidMount() {
        this.getTypeList();
        this.getProjectList();
    }

    getProjectList() {
        this.setState({
            projectList: [
                {
                    projectId: "001",
                    projectName: "test1",
                },
                {
                    projectId: "002",
                    projectName: "test2",
                },
            ],
        });

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

    getTypeList() {
        this.setState({
            jobtypeList: [
                {
                    typeId: "001",
                    typeName: "test1",
                },
                {
                    typeId: "002",
                    typeName: "test2",
                },
            ],
        });

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


    // TODO :: Select
    // TODO :: Dropdown Project Name
    handleChangeProject = (value, index) => {
        let data = [...this.state.data];
        let item = { ...data[index] };
        item.projectId = value;
        data[index] = item;

        let valid = [...this.state.isValid_projectName];
        console.log("TCL: ActionsWork -> handleChangeProject -> valid", valid)
        if (!value || value !== '') {
            valid[index] = false;
        }

        this.setState({ data: data, isValid_projectName: valid });

        console.log("TCL: ActionsWork -> handleChangeProject -> ", this.state)
    };

    handleBlurProject = () => {
        console.log("blur ---- ", this.typeList);
    };

    handleFocusProject = () => {
        console.log("focus ....", this.typeList);
    };

    // TODO :: Dropdown Job Type
    handleChangeType = (value, index) => {
        let data = [...this.state.data];
        let item = { ...data[index] };
        item.typeId = value;
        data[index] = item;

        let valid = [...this.state.isValid_jobType];
        if (!value || value !== '') {
            valid[index] = false;
        }

        this.setState({ data: data, isValid_jobType: valid });
    };

    handleBlurType = () => {
        console.log("blur ---- ", this.typeList);
    };

    handleFocusType = () => {
        console.log("focus ....", this.typeList);
    };


    // TODO :: Dropdown Time In
    onChangeTimeIn = (time, timestring, index) => {
        // console.log("ActionsWork -> onChangeTimeIn -> time, timestring, index", time, timestring, index)
        let data = [...this.state.data];
        let item = { ...data[index] };
        item.workTimeIn = time;
        item.timeIn = timestring;
        data[index] = item;

        let valid = [...this.state.isValid_timeIn];
        if (!timestring || timestring !== '') {
            valid[index] = false;
        }

        this.setState({ data: data, isValid_timeIn: valid });
    };

    // TODO :: Dropdown Time Out
    onChangeTimeOut = (time, timestring, index) => {
        console.log(
            "ActionsWork -> onChangeTimeOut -> time, timestring, index",
            time,
            timestring,
            index
        );
        let data = [...this.state.data];
        let item = { ...data[index] };
        item.workTimeOut = time;
        item.timeOut = timestring;
        data[index] = item;
        let valid = [...this.state.isValid_timeOut];
        if (!timestring || timestring !== '') {
            valid[index] = false;
        }

        this.setState({ data: data, isValid_timeOut: valid });
    };


    // TODO :: calculate man hours
    calManHours = (index) => {

        let temp = _.cloneDeep(this.state.data)
        let validIn = [...this.state.isValid_timeIn];
        let validOut = [...this.state.isValid_timeOut];


        if (!temp[index].timeIn || temp[index].timeIn === '' || !temp[index].timeOut || temp[index].timeOut === '') {
            if (!temp[index].timeOut || temp[index].timeOut === '') {
                validOut[index] = true;
                this.setState({ isValid_timeOut: validOut });
            }
            if (!temp[index].timeIn || temp[index].timeIn === '') {
                validIn[index] = true;
                this.setState({ isValid_timeIn: validIn });
            }
            return
        }

        if (this.checkGreaterTime('one', index) === false) {
            console.log("TCL: ActionsWork -> calManHours -> ", 'time out > time in')
            return
        }

        var start = moment(temp[index].timeIn, 'HH:mm A').format('HH:mm');
        var end = moment(temp[index].timeOut, 'HH:mm A').format('HH:mm');
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

        temp[index].workManhour = time
        this.setState({ data: temp })
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


    // TODO :: Add form data
    handleAddData = () => {
        console.log("ActionsWork -> handleAddData -> handleAddData");
        this.state.data.push({
            projectId: null,
            typeId: null,
            workDate: null,
            workDetail: null,
            workUrl: null,
            workManhour: null,
            workTimeIn: null,
            workTimeOut: null,
        });
        let a = this.state.data;
        this.setState({ data: a });
        console.log(
            "ActionsWork -> handleAddData ->  this.state.data",
            this.state.data
        );
    };

    handleChangeDate = (event) => {
        let temp = _.cloneDeep(this.state.data)
        for (let i = 0; i < temp.length; i++) {
            const element = temp[i];
            element.workDate = event.value
        }

        if (!event.value || event.value !== '') {
            this.setState({ isValid_workDate: false });
        }
        console.log("TCL: ActionsWork -> handleChangeDate -> temp", temp)
        this.setState({ workDate: event.value, data: temp })
    }

    deleteData = (data) => {
        console.log("TCL: ActionsWork -> deleteData -> data", data)

        // ต้อง call api -------------------
        let tempDel = _.cloneDeep(this.state.data)
        tempDel.splice(data[1], 1);
        this.setState({ data: tempDel })
        // ต้อง call api -------------------

        this.setState({ isOpen: false });
        this.setState({ isPopupError: false });
        this.setState({ isPopupSuccess: true });
        this.setState({ isPopupMsg: msgAlertTitle.deleted });
    }

    confirmSave = (data) => {
        console.log("TCL: ActionsWork -> confirmSave -> data", data)
        this.setState({ isOpen: false });
        this.setState({ isPopupError: false });
        this.setState({ isPopupSuccess: true });
        this.setState({ isPopupMsg: this.state.params.action === "edit" ? msgAlertTitle.updated : msgAlertTitle.saved });

    }

    onWorkManHoursChange = (event, index) => {
        let temp = _.cloneDeep(this.state.data)
        temp[index].workManhour = event.target.value

        let valid = [...this.state.isValid_timeOut];
        if (!event.target.value || event.target.value !== '') {
            valid[index] = false;
        }

        this.setState({ data: temp, isValid_timeOut: valid });
    }
    onWorkUrlChange = (event, index) => {
        console.log("TCL: ActionsWork -> onWorkUrlChange -> event", event)
        let temp = _.cloneDeep(this.state.data)
        temp[index].workUrl = event.target.value
        console.log("TCL: ActionsWork -> onWorkUrlChange -> temp", temp)

        this.setState({
            data: temp
        });
    }
    onWorkDetailChange = (event, index) => {
        let temp = _.cloneDeep(this.state.data)
        temp[index].workDetail = event.target.value

        let valid = [...this.state.isValid_detail];
        if (!event.target.value || event.target.value !== '') {
            valid[index] = false;
        }
        this.setState({ data: temp, isValid_detail: valid });
    }

    checkValidData = () => {
        let validProject = this.checkValid('project')
        let validJobType = this.checkValid('job')
        let validTimeIn = this.checkValid('in')
        let validTimeOut = this.checkValid('out')
        let validManHours = this.checkValid('hours')
        let validDetail = this.checkValid('detail')
        let validDate = this.checkValid('date')
        let validGreater = this.checkGreaterTime('all', '')
        if (validProject && validJobType && validTimeIn && validTimeOut && validManHours && validDetail && validDate && validGreater) {
            this.setState({
                isOpen: true,
                isTypeShowConfirm: "save",
                isTextMsg: msgPopupTitle.saved,
                isDataPopUp: this.state.data,
                isDelete: false,
            });
        } else {

            console.log("TCL: ActionsWork -> checkValidData -> ", 'กรอกข้อมูลไม่ครบ')
        }
    }

    checkValid = (type) => {
        let temp = _.cloneDeep(this.state.data)
        let res = true;
        if (type === 'project') {
            for (let i = 0; i < temp.length; i++) {
                const element = temp[i];
                let valid = [...this.state.isValid_projectName];
                if (!element.projectId || element.projectId === '') {
                    res = false;
                    valid[i] = true;
                    this.setState({ isValid_projectName: valid });
                }
            }
        } else if (type === 'job') {
            for (let i = 0; i < temp.length; i++) {
                const element = temp[i];
                let valid = [...this.state.isValid_jobType];
                if (!element.typeId || element.typeId === '') {
                    res = false;
                    valid[i] = true;
                    this.setState({ isValid_jobType: valid });
                }
            }
        } else if (type === 'in') {
            for (let i = 0; i < temp.length; i++) {
                const element = temp[i];
                let valid = [...this.state.isValid_timeIn];
                if (!element.workTimeIn || element.workTimeIn === '') {
                    res = false;
                    valid[i] = true;
                    this.setState({ isValid_timeIn: valid });
                }
            }
        } else if (type === 'out') {
            for (let i = 0; i < temp.length; i++) {
                const element = temp[i];
                let valid = [...this.state.isValid_timeOut];
                if (!element.workTimeOut || element.workTimeOut === '') {
                    res = false;
                    valid[i] = true;
                    this.setState({ isValid_timeOut: valid });
                }
            }
        } else if (type === 'hours') {
            for (let i = 0; i < temp.length; i++) {
                const element = temp[i];
                let valid = [...this.state.isValid_manHours];
                if (!element.workManhour || element.workManhour === '') {
                    res = false;
                    valid[i] = true;
                    this.setState({ isValid_manHours: valid });
                }
            }
        } else if (type === 'detail') {
            for (let i = 0; i < temp.length; i++) {
                const element = temp[i];
                let valid = [...this.state.isValid_detail];
                if (!element.workDetail || element.workDetail === '') {
                    res = false;
                    valid[i] = true;
                    this.setState({ isValid_detail: valid });
                }
            }
        } else if (type === 'date') {
            if (this.state.workDate === '' || !this.state.workDate) {
                res = false;
                this.setState({ isValid_workDate: true });
            }
        }

        return res;
    }

    checkGreaterTime(type, index) {
        if (type === 'one') {

            if ((!this.state.data[index].timeIn || this.state.data[index].timeIn !== '') && (!this.state.data[index].timeOut || this.state.data[index].timeOut !== '')) {
                var start = moment(this.state.data[index].timeIn, 'HH:mm A').format('HH:mm');
                var end = moment(this.state.data[index].timeOut, 'HH:mm A').format('HH:mm');
                let validTimeIn = [...this.state.greaterTimeIn];
                let validTimeOut = [...this.state.greaterTimeOut];
                if (start > end) {
                    validTimeIn[index] = true;
                    validTimeOut[index] = true;
                    this.setState({
                        greaterTimeIn: validTimeIn,
                        greaterTimeOut: validTimeOut,
                    })
                    return false
                }
            }
        } else {
            let temp = _.cloneDeep(this.state.data)
            let res = true;
            for (let i = 0; i < temp.length; i++) {
                const element = temp[i];
                var start = moment(element.timeIn, 'HH:mm A').format('HH:mm');
                var end = moment(element.timeOut, 'HH:mm A').format('HH:mm');
                let validTimeIn = [...this.state.greaterTimeIn];
                let validTimeOut = [...this.state.greaterTimeOut];
                if (start > end) {
                    validTimeIn[i] = true;
                    validTimeOut[i] = true;
                    this.setState({
                        greaterTimeIn: validTimeIn,
                        greaterTimeOut: validTimeOut,
                    })
                    res = false
                }
            }
            return res
        }
    }

    render() {
        return (
            <>
                <div className="App">
                    <div id="boxType" className="container-box-content">
                        <div className="row wrap-container">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/work">
                                    <HomeOutlined />
                                    <span className="breadcrum-custom"> work </span>
                                </Breadcrumb.Item>
                                {this.state.params.action === "create" ? (
                                    <span className="breadcrum-custom"> Create work </span>
                                ) : null}
                                {this.state.params.action === "edit" ? (
                                    <span className="breadcrum-custom"> Update work </span>
                                ) : null}
                            </Breadcrumb>

                            <div className="wrap-content">
                                <div className="box-action">
                                    <div className="box-title-search">

                                        {this.state.params.action === "create" ? (<p className="font-size-search"> Create Work </p>) : null}
                                        {this.state.params.action === "edit" ? (<p className="font-size-search"> Update Work </p>) : null}
                                    </div>
                                    <div className="box-content" style={{ marginBottom: 0 }}>
                                        <div className="box-action-date">
                                            <div className="row form-group">
                                                <div className="col-3" style={{ textAlign: "right" }}>

                                                    <label className="title-field" for="ddlDate">

                                                        Date : <span style={{ color: "red" }}> * </span>
                                                    </label>
                                                </div>
                                                <div className={`col-4`} style={{ textAlign: 'start', padding: 0 }}>
                                                    <DateBox value={null} type="date" value={this.state.workDate}
                                                        type="date" onValueChanged={(e) => {
                                                            this.handleChangeDate(e)
                                                        }}
                                                        className={`${this.state.isValid_workDate && this.state.isSubmit ? 'has-error-input' : ''}`} />
                                                    {this.state.isValid_workDate && this.state.isSubmit ? <span className="color-red">{msgValid.work.validWorkDate}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="hr-action" />
                                        <div style={{ textAlign: "right" }}>
                                            <p className="title-field">
                                                <span style={{ color: "red" }}> * </span> Items marked with an asterisk are required
                                            </p>
                                        </div>
                                        {this.state.data.map((data, i) => {
                                            return (
                                                <>
                                                    <div className="box-action-content">
                                                        <div className="row form-group">
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-4"
                                                                        style={{ textAlign: "right" }}
                                                                    >
                                                                        <label className="title-field" for="ddlProjectName" >
                                                                            Project Name <span style={{ color: "red" }}> * </span>
                                                                        </label>
                                                                    </div>
                                                                    <div className={`col-8`} style={{ textAlign: 'start', padding: 0 }}>
                                                                        <div className={`form-control div-select ${this.state.isValid_projectName[i] && this.state.isSubmit ? 'has-error-input' : ''}`}>
                                                                            <Select
                                                                                showSearch
                                                                                style={{ width: 200 }}
                                                                                placeholder="Please selete project"
                                                                                optionFilterProp="children"
                                                                                onChange={(e) => {
                                                                                    this.handleChangeProject(e, i);
                                                                                }}
                                                                                onFocus={(e) => {
                                                                                    this.handleFocusProject(e, i);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    this.handleBlurProject(e, i);
                                                                                }}
                                                                                filterOption={(input, option) =>
                                                                                    option.props.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                                }
                                                                                value={data.projectId}>
                                                                                {this.projectList}
                                                                            </Select>
                                                                        </div>
                                                                        {this.state.isValid_projectName[i] && this.state.isSubmit ? <span className="color-red">{msgValid.work.validProjectName}</span> : null}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <div className="col-4" style={{ textAlign: "right" }} >
                                                                        <label className="title-field" for="ddlJobType" >
                                                                            Job Type <span style={{ color: "red" }}> * </span>
                                                                        </label>
                                                                    </div>
                                                                    <div className={`col-8`} style={{ textAlign: 'start', padding: 0 }}>
                                                                        <div className={`form-control div-select ${this.state.isValid_projectName[i] && this.state.isSubmit ? 'has-error-input' : ''}`}>
                                                                            <Select
                                                                                showSearch
                                                                                style={{ width: 200 }}
                                                                                placeholder="Please selete Type"
                                                                                optionFilterProp="children"
                                                                                onChange={(e) => {
                                                                                    this.handleChangeType(e, i);
                                                                                }}
                                                                                onFocus={(e) => {
                                                                                    this.handleFocusType(e, i);
                                                                                }}
                                                                                onBlur={(e) => {
                                                                                    this.handleBlurType(e, i);
                                                                                }}
                                                                                filterOption={(input, option) =>
                                                                                    option.props.children[1]
                                                                                        .toLowerCase()
                                                                                        .indexOf(input.toLowerCase()) >= 0
                                                                                }
                                                                                value={data.typeId}
                                                                            >

                                                                                {this.typeList}
                                                                            </Select>
                                                                        </div>
                                                                        {this.state.isValid_jobType[i] && this.state.isSubmit ? <span className="color-red">{msgValid.work.validJobType}</span> : null}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Time in */}
                                                        <div className="row form-group">
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
                                                                            value={data.workTimeIn}
                                                                            showNow={true}
                                                                            onChange={(time, timestring) => {
                                                                                this.onChangeTimeIn(
                                                                                    time,
                                                                                    timestring,
                                                                                    i
                                                                                );
                                                                            }}
                                                                            className={`${this.state.isValid_timeIn[i] || this.state.greaterTimeIn[i] ? 'has-error-input' : ''}`} />
                                                                        {this.state.isValid_timeIn[i] && !this.state.greaterTimeIn[i] ? <span className="color-red">{msgValid.work.validTimeIn}</span> : null}
                                                                        {this.state.greaterTimeIn[i] && !this.state.isValid_timeIn[i] ? <span className="color-red">{msgValid.work.validTimeInAndOut}</span> : null}

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
                                                                            value={data.workTimeOut}
                                                                            showNow={true}
                                                                            onChange={(time, timestring) => {
                                                                                this.onChangeTimeOut(
                                                                                    time,
                                                                                    timestring,
                                                                                    i
                                                                                );
                                                                            }}
                                                                            className={`${this.state.isValid_timeOut[i] || this.state.greaterTimeOut[i] ? 'has-error-input' : ''}`} />
                                                                        {this.state.isValid_timeOut[i] && !this.state.greaterTimeOut[i] ? <span className="color-red">{msgValid.work.validTimeOut}</span> : null}
                                                                        {this.state.greaterTimeOut[i] && !this.state.isValid_timeOut[i] ? <span className="color-red">{msgValid.work.validTimeInAndOut}</span> : null}
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
                                                                    <div className="col-4" style={{ textAlign: 'start', padding: 0 }}>
                                                                        <input type="text" className={`form-control ${this.state.isValid_manHours[i] && this.state.isSubmit ? 'has-error-input' : ''}`}
                                                                            id="txtManHours" value={data.workManhour} onChange={(event) => { this.onWorkManHoursChange(event, i) }} />
                                                                        {this.state.isValid_manHours[i] && this.state.isSubmit ? <span className="color-red">{msgValid.work.validManHours}</span> : null}
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <button class="btn-custom btn-calculate" onClick={() => { this.calManHours(i) }} >
                                                                            Calculate
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* Url */}
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <div className="col-4" style={{ textAlign: "right" }} >
                                                                        <label className="title-field" for="txtUrl">
                                                                            Url
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-8" style={{ textAlign: 'start', padding: 0 }}>
                                                                        <input type="text" class="form-control" id="txtUrl" value={data.workUrl} onChange={(event) => { this.onWorkUrlChange(event, i) }} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Detail */}
                                                        <div className="row form-group">
                                                            <div className="col-12">
                                                                <div className="row">
                                                                    <div className="col-2" style={{ textAlign: "right" }} >
                                                                        <label className="title-field" for="txtDetail" >
                                                                            Detail <span style={{ color: "red" }}> * </span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-10" style={{ textAlign: 'start', padding: 0 }}>
                                                                        <textarea
                                                                            rows="3"
                                                                            type="text"
                                                                            id="txtDetail"
                                                                            className={`form-control ${this.state.isValid_detail[i] && this.state.isSubmit ? 'has-error-input' : ''}`}
                                                                            value={data.workDetail} onChange={(event) => { this.onWorkDetailChange(event, i) }}
                                                                        />
                                                                        {this.state.isValid_detail[i] && this.state.isSubmit ? <span className="color-red">{msgValid.work.validWorkDetail}</span> : null}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {this.state.data.length > 1 ? (
                                                        <div
                                                            style={{
                                                                textAlign: "end",
                                                                marginTop: 20,
                                                                marginBottom: 10,
                                                            }}
                                                        >
                                                            <button type="button" style={{ background: "red", color: "#fff", width: 300 }}
                                                                className="btn btn-popup-custom error"
                                                                onClick={() => {
                                                                    this.setState({
                                                                        isOpen: true,
                                                                        isTypeShowConfirm: "del",
                                                                        isTextMsg: msgPopupTitle.deleted,
                                                                        isDataPopUp: [data, i],
                                                                        isDelete: true,
                                                                    });
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    ) : null}
                                                    <hr className="hr-action" />
                                                </>
                                            );
                                        })}
                                        <br />
                                        <div>
                                            <button type="button" class="btn btn-add-work" onClick={this.handleAddData} >
                                                <span className="btn-add-work-icon">
                                                    <PlusOutlined />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-12" style={{ textAlign: "right" }}>
                                            <Link to="/work">
                                                <button class="btn-custom btn-reset" style={{ marginRight: 20 }} >
                                                    CANCEL
                                                </button>
                                            </Link>
                                            <button
                                                class="btn-custom btn-search"
                                                style={{ marginRight: 70 }}
                                                onClick={() => {
                                                    this.setState({ isSubmit: true })
                                                    this.checkValidData()

                                                }}
                                            >
                                                {this.state.params.action === "edit" ? "UPDATE" : "CREATE"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* POPUP */}
                <AlertPopUp
                    successStatus={this.state.isPopupSuccess}
                    errorStatus={this.state.isPopupError}
                    message={this.state.isPopupMsg}
                    clearActive={() => {

                        if (this.state.isPopupSuccess) {
                            this.props.history.push('/work')
                        }
                        this.setState({ isPopupError: false });
                        this.setState({ isPopupSuccess: false });
                    }}
                />
                <ConfirmPopup
                    open={this.state.isOpen}
                    type={this.state.isTypeShowConfirm}
                    text={this.state.isTextMsg}
                    data={this.state.isDataPopUp}
                    del={false}
                    onClose={() => {
                        this.setState({ isOpen: false });
                    }}
                    clearActive={(e) => {
                        this.setState({ isOpen: false });
                    }}
                    confirmActive={(data) => {
                        console.log("Work -> render -> e", data);
                        if (this.state.isDelete) {
                            this.deleteData(data)
                        } else {
                            this.confirmSave(data)
                        }

                    }}
                />
            </>
        );
    }
}

export default ActionsWork;
