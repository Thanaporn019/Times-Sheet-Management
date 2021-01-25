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
const format = "HH:mm A";
const Option = Select.Option;

let data = [
    {
        projectId: null,
        typeId: null,
        workDate: null,
        workDetail: null,
        workUrl: null,
        workManhour: null,
        workTimeIn: null,
        workTimeOut: null,
    },
];

let projectList = [];
let typeList = [];
let timeHours = [];
let timeMin = [];

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
                },
            ],
            projectList: [],
            typeList: [],
            params: param,
        };
    }

    componentDidMount() {
        // console.log("ActionsWork -> componentDidMount -> s", this.state.data)
        this.getTypeList();
        this.getProjectList();
        this.setDdlTime();
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

    handleProjectChange = (value, i) => {
        console.log("ActionsWork -> handleProjectChange -> i", i);
        console.log("ActionsWork -> handleProjectChange -> value", value);

        // let temp = _.cloneDeep(this.state.filter)
        // temp.projectId = value
        // this.setState({
        //     filter: {
        //         dateFrom: temp.dateFrom,
        //         dateTo: temp.dateTo,
        //         typeId: temp.typeId,
        //         projectId: value
        //     }
        // });
    };
    handleTypeChange = (event) => {
        let temp = _.cloneDeep(this.state.filter);
        temp.typeId = event.target.value;
        this.setState({
            filter: {
                dateFrom: temp.dateFrom,
                dateTo: temp.dateTo,
                typeId: temp.typeId,
                projectId: temp.projectId,
            },
        });
    };

    setDdlTime() {
        // let maxMin = 60;
        // let maxHours = 24;

        // let tmpMin = []
        // let tmpHours = []
        // for (let i = 0; i < maxHours; i++) {
        //     tmpMin.push()
        // }

        // TODO :: get hours
        var hours = []; // time array
        var th = 0; // start time
        //loop to increment the time and push results in array
        for (var i = 0; th < 24 * 60; i++) {
            var hh = Math.floor(th / 60); // gething hours of day in 0-24 format
            var mm = th % 60; // gething minutes of the hour in 0-55 format
            hours[i] = ("0" + hh).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
            th++;
        }
        hours = _.uniq(hours);
        console.log("ActionsWork -> setDdlTime -> hours", hours);
        // timeHours
        // timeMin

        // TODO :: get min
        // var min = []; // time array
        // var tm = 0;
        // for (var j = 0; th < 60 *60; j++) {
        //     // var hh = Math.floor(th / 60); // gething hours of day in 0-24 format
        //     var mm = (tm % 60); // gething minutes of the hour in 0-55 format
        //     min[i] = ("0" + (mm)).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
        //     tm +=10;
        // }
        // min = _.uniq(min)
        // console.log("ActionsWork -> setDdlTime -> min", min)
        // timeHours
    }

    // TODO :: Select

    handleChangeProject = (value, index) => {
        let data = [...this.state.data];
        let item = { ...data[index] };
        item.projectId = value;
        data[index] = item;
        this.setState({ data });
    };

    handleBlurProject = () => {
        console.log("blur ---- ", this.typeList);
    };

    handleFocusProject = () => {
        console.log("focus ....", this.typeList);
    };
    handleChangeType = (value, index) => {
        let data = [...this.state.data];
        let item = { ...data[index] };
        item.typeId = value;
        data[index] = item;
        this.setState({ data });
    };

    handleBlurType = () => {
        console.log("blur ---- ", this.typeList);
    };

    handleFocusType = () => {
        console.log("focus ....", this.typeList);
    };

    onChangeTimeIn = (time, timestring, index) => {
        // console.log("ActionsWork -> onChangeTimeIn -> time, timestring, index", time, timestring, index)
        let data = [...this.state.data];
        let item = { ...data[index] };
        item.workTimeIn = time;
        data[index] = item;
        this.setState({ data });
    };
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
        data[index] = item;
        this.setState({ data });
    };

    calManHours = () => { };

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

                                        {this.state.params.action === "create" ? (
                                            <p className="font-size-search"> Create Work </p>
                                        ) : null}
                                        {this.state.params.action === "edit" ? (
                                            <p className="font-size-search"> Update Work </p>
                                        ) : null}
                                    </div>
                                    <div className="box-content" style={{ marginBottom: 0 }}>
                                        <div className="box-action-date">
                                            <div className="row form-group">
                                                <div className="col-3" style={{ textAlign: "right" }}>

                                                    <label className="title-field" for="ddlDate">

                                                        Date : <span style={{ color: "red" }}> * </span>
                                                    </label>
                                                </div>
                                                <div
                                                    className="col-4"
                                                    style={{ paddingLeft: 0, paddingRight: 0 }}
                                                >
                                                    <DateBox value={null} type="date" />
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="hr-action"> </hr>
                                        <div style={{ textAlign: "right" }}>
                                            <p className="title-field">

                                                <span style={{ color: "red" }}> * </span> Items marked
                        with an asterisk are required
                      </p>
                                        </div>
                                        {this.state.data.map((data, i) => {
                                            console.log("ActionsWork -> render -> data", data);
                                            console.log("ActionsWork -> render -> i", i);
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
                                                                        <label
                                                                            className="title-field"
                                                                            for="ddlProjectName"
                                                                        >

                                                                            Project Name
                                      <span style={{ color: "red" }}> * </span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-8">
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
                                                                                option.props.children
                                                                                    .toLowerCase()
                                                                                    .indexOf(input.toLowerCase()) >= 0
                                                                            }
                                                                            value={data.projectId}
                                                                        >

                                                                            {this.projectList}
                                                                        </Select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-4"
                                                                        style={{ textAlign: "right" }}
                                                                    >
                                                                        <label
                                                                            className="title-field"
                                                                            for="ddlJobType"
                                                                        >

                                                                            Job Type
                                      <span style={{ color: "red" }}> * </span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-8">
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
                                                                                option.props.children
                                                                                    .toLowerCase()
                                                                                    .indexOf(input.toLowerCase()) >= 0
                                                                            }
                                                                            value={data.typeId}
                                                                        >

                                                                            {this.typeList}
                                                                        </Select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Time in */}
                                                        <div className="row form-group">
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-4"
                                                                        style={{ textAlign: "right" }}
                                                                    >
                                                                        <label
                                                                            className="title-field"
                                                                            for="ddlTimeIn"
                                                                        >

                                                                            Time in
                                      <span style={{ color: "red" }}> * </span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-8">
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
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* Time out */}
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-4"
                                                                        style={{ textAlign: "right" }}
                                                                    >
                                                                        <label
                                                                            className="title-field"
                                                                            for="ddlTimeOut"
                                                                        >

                                                                            Time out
                                      <span style={{ color: "red" }}> * </span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-8">
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
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Man hours */}
                                                        <div className="row form-group">
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-4"
                                                                        style={{ textAlign: "right" }}
                                                                    >
                                                                        <label
                                                                            className="title-field"
                                                                            for="txtManHours"
                                                                        >
                                                                            Man hours
                                      <span style={{ color: "red" }}> * </span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <input
                                                                            type="text"
                                                                            class="form-control"
                                                                            id="txtManHours"
                                                                        />
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <button
                                                                            class="btn-custom btn-calculate"
                                                                            onClick={this.calManHours}
                                                                        >

                                                                            Calculate
                                    </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* Url */}
                                                            <div className="col-6">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-4"
                                                                        style={{ textAlign: "right" }}
                                                                    >
                                                                        <label className="title-field" for="txtUrl">

                                                                            Url
                                      <span style={{ color: "red" }}> * </span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-8">
                                                                        <input
                                                                            type="text"
                                                                            class="form-control"
                                                                            id="txtUrl"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Detail */}
                                                        <div className="row form-group">
                                                            <div className="col-12">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-2"
                                                                        style={{ textAlign: "right" }}
                                                                    >
                                                                        <label
                                                                            className="title-field"
                                                                            for="txtDetail"
                                                                        >

                                                                            Detail
                                      <span style={{ color: "red" }}> * </span>
                                                                        </label>
                                                                    </div>
                                                                    <div className="col-10">
                                                                        <textarea
                                                                            rows="3"
                                                                            type="text"
                                                                            class="form-control"
                                                                            id="txtDetail"
                                                                        />
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
                                                            <button
                                                                type="button"
                                                                style={{
                                                                    background: "red",
                                                                    color: "#fff",
                                                                    width: 300,
                                                                }}
                                                                className="btn btn-popup-custom error"
                                                                onClick={() => {
                                                                    console.log("ActionsWork -> render -> d");
                                                                    this.setState({
                                                                        isOpen: true,
                                                                        isTypeShowConfirm: "del",
                                                                        isTextMsg: msgPopupTitle.deleted,
                                                                        isDataPopUp: this.state.data,
                                                                        isDelete: true,
                                                                    });
                                                                }}
                                                            >
                                                                Delete
                              </button>
                                                        </div>
                                                    ) : null}
                                                    <hr className="hr-action"> </hr>
                                                </>
                                            );
                                        })}
                                        <br />
                                        <div>
                                            <button
                                                type="button"
                                                class="btn btn-add-work"
                                                onClick={this.handleAddData}
                                            >

                                                <span className="btn-add-work-icon">

                                                    <PlusOutlined />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-12" style={{ textAlign: "right" }}>
                                            <Link to="/work">
                                                <button
                                                    class="btn-custom btn-reset"
                                                    style={{ marginRight: 20 }}
                                                >

                                                    CANCEL
                        </button>
                                            </Link>
                                            <button
                                                class="btn-custom btn-search"
                                                style={{ marginRight: 70 }}
                                                onClick={() => {
                                                    this.setState({
                                                        isOpen: true,
                                                        isTypeShowConfirm: "save",
                                                        isTextMsg: msgPopupTitle.saved,
                                                        isDataPopUp: this.state.data,
                                                        isDelete: false,
                                                    });
                                                }}
                                            >

                                                {this.state.params.action === "edit"
                                                    ? "UPDATE"
                                                    : "CREATE"}
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
                    confirmActive={(e) => {
                        this.setState({ isOpen: false });
                        this.setState({ isPopupError: false });
                        this.setState({ isPopupSuccess: true });
                        this.setState({
                            isPopupMsg:
                                this.state.isDelete === false &&
                                    this.state.params.action === "edit"
                                    ? msgAlertTitle.updated
                                    : this.state.isDelete === false
                                        ? msgAlertTitle.saved
                                        : msgAlertTitle.deleted,
                        });
                        console.log("Work -> render -> e", e);
                    }}
                />
            </>
        );
    }
}

export default ActionsWork;
