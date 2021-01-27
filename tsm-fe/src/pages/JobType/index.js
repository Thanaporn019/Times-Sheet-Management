import React, { Component } from "react";
import { IoAddOutline } from "react-icons/io5";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AspNetData from "devextreme-aspnet-data-nojquery";
import _ from "lodash";
import { Breadcrumb } from "antd";
import {
    HomeOutlined,
    EyeOutlined,
    DeleteOutlined,
    FormOutlined,
} from "@ant-design/icons";
import DataGrid, { Column, Pager, Paging } from "devextreme-react/data-grid";
import configService from "../../config";
import AlertPopUp from "../../components/popup/alert_popup";
import ConfirmPopup from "../../components/popup/confirm_popup";
const url = "https://js.devexpress.com/Demos/Mvc/api/TreeListTasks";
const msgAlertTitle = configService.msgAlert;
const msgPopupTitle = configService.msgConfirm;

const tasksData = AspNetData.createStore({
    key: "Task_ID",
    loadUrl: `${url}/Tasks`,
    insertUrl: `${url}/InsertTask`,
    updateUrl: `${url}/UpdateTask`,
    deleteUrl: `${url}/DeleteTask`,
    onBeforeSend: function (method, ajaxOptions) {
        ajaxOptions.xhrFields = { withCredentials: true };
    },
});

const employeesData = AspNetData.createStore({
    key: "ID",
    loadUrl: `${url}/TaskEmployees`,
});

const statusesData = [
    "Not Started",
    "Need Assistance",
    "In Progress",
    "Deferred",
    "Completed",
];

class JobType extends React.Component {
    state = {
        isOpen: false,
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    constructor(props) {
        super(props);
        this.state = {
            isPopupSuccess: false, // alert success case
            isPopupError: false, // alert error case
            isPopupMsg: "Please contact your administrator.", // alert msg
            isOpen: false, // open popup confirm
            isTypeShowConfirm: "del", // ประเภทของ popup : save , del
            isDataPopUp: {}, // ข้อมูลที่ใช้
            isTextMsg: "Are you sure you want to delete this?", // msg ของ Popup
            filter: {
                typeName: null,
                typeCode: null,
            },
            data: [
                {
                    typeId: "0001",
                    typeName: "test",
                    typeCode: "T0001",
                    updateDate: "01/12/2020",
                    updateBy: "joon",
                    createDate: "01/11/2020",
                    createBy: "joon",
                },
                {
                    typeId: "0002",
                    typeName: "test2",
                    typeCode: "T0002",
                    updateDate: "01/12/2020",
                    updateBy: "joon",
                    createDate: "01/11/2020",
                    createBy: "joon",
                },
                {
                    typeId: "0003",
                    typeName: "test3",
                    typeCode: "T0003",
                    updateDate: "01/12/2020",
                    updateBy: "joon",
                    createDate: "01/11/2020",
                    createBy: "joon",
                },
                {
                    typeId: "0004",
                    typeName: "test4",
                    typeCode: "T0004",
                    updateDate: "01/12/2020",
                    updateBy: "joon",
                    createDate: "01/11/2020",
                    createBy: "joon",
                },
                {
                    typeId: "0005",
                    typeName: "test5",
                    typeCode: "T0005",
                    updateDate: "01/12/2020",
                    updateBy: "joon",
                    createDate: "01/11/2020",
                    createBy: "joon",
                },
            ],
        };
    }

    componentDidMount() {
    }

    onTypeNameChange = (event) => {
        console.log("TCL: JobType -> handleReset -> ", this.state.filter)
        console.log("TCL: JobType -> onTypeNameChange -> event.target.value", event.target.value)
        this.setState({
            filter: {
                ...this.state.filter,
                typeName: event.target.value
            }
        });
    }
    onTypeCodeChange = (event) => {
        this.setState({
            filter: {
                ...this.state.filter,
                typeCode: event.target.value
            }
        });
    }

    handleReset = () => {
        console.log("TCL: JobType -> handleReset -> ", this.state.filter)
        this.setState({
            filter: { typeName: '', typeCode: '' }
        });
    };

    delCellRender = (data) => {
        return (
            <a
                onClick={() => {
                    this.setState({
                        isOpen: true,
                        isTypeShowConfirm: "del",
                        isTextMsg: msgPopupTitle.deleted,
                        isDataPopUp: data.data.typeId,
                    });
                }}
            >

                <span style={{ color: "#111", fontSize: "12pt" }}>

                    <DeleteOutlined />
                </span>
            </a>
        );
    };

    editCellRender = (data) => {
        return (
            <Link
                to={"/jobtype" + `/{"action":"edit","jobTypeId":"${data.data.typeId}"}`}
            >
                <span style={{ color: "black", fontSize: "12pt" }}>

                    <FormOutlined />
                </span>
            </Link>
        );
    };

    noCellRender = (data) => {
        return (
            <span style={{ color: "black", fontSize: "12pt" }}>

                {data.component.pageIndex() * data.component.pageSize() +
                    data.rowIndex +
                    1}
            </span>
        );
    };

    onSearch = () => {
        console.log("TCL: JobType -> onSearch -> ")
    };

    onDeleteData = (data) => {
        console.log("TCL: JobType -> onDeleteData -> data", data)
        this.setState({ isOpen: false });
        this.setState({ isPopupError: false });
        this.setState({ isPopupSuccess: true });
        this.setState({ isPopupMsg: msgAlertTitle.deleted });

        // ต้อง call api -------------------
        let tempDel = this.state.data.filter(r => data.indexOf(r.typeId) === -1)
        // console.log("TCL: JobType -> onDeleteData -> delete", tempDel)
        this.setState({ data: tempDel })
        // ต้อง call api -------------------
    }
    render() {
        return (
            <>
                <div className="App">
                    <div id="boxType" className="container-box-content">
                        <div className="row wrap-container">
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">
                                    <HomeOutlined />
                                    <span className="breadcrum-custom"> Job Type </span>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="wrap-content">
                                <div className="box-search">
                                    <div className="box-title-search">
                                        <p className="font-size-search"> Search Job Type </p>
                                    </div>
                                    <div className="box-content">
                                        <div className="box-search-border">
                                            <form>
                                                <div className="row form-group">
                                                    <div
                                                        className="col-4"
                                                        style={{ textAlign: "right" }}
                                                    ></div>
                                                </div>
                                                {/* Job Type Name */}
                                                <div className="row form-group">
                                                    <div className="col-4" style={{ textAlign: "right" }}>

                                                        <label for="txtTypeName" className="title-field">
                                                            Job Type
                                                        </label>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        class="form-control col-3"
                                                        id="txtTypeName"
                                                        value={this.state.filter.typeName} onChange={this.onTypeNameChange}
                                                    />
                                                </div>
                                                {/* Code */}
                                                <div className="row form-group">
                                                    <div className="col-4" style={{ textAlign: "right" }}>

                                                        <label for="txtTypeCode" className="title-field">
                                                            Code
                                                        </label>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        class="form-control col-3"
                                                        id="txtTypeCode"
                                                        value={this.state.filter.typeCode} onChange={this.onTypeCodeChange}
                                                    />
                                                </div>
                                            </form>
                                            <div className="row form-group">
                                                <div className="col-12" style={{ textAlign: "center" }}>
                                                    <button
                                                        class="btn-custom btn-reset "
                                                        style={{ marginRight: 20 }}
                                                        onClick={this.handleReset}
                                                    >
                                                        RESET
                                                    </button>
                                                    <button class="btn-custom btn-search " onClick={this.onSearch}>
                                                        SEARCH
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* content start*/}
                            <div className="wrap-content">
                                <div className="box-search" style={{ padding: 30 }}>
                                    <div style={{ textAlign: "end", padding: 15 }}>
                                        <Link to='/jobtype/{"action":"create"}'>
                                            <button
                                                className="btn-custom btn-search "
                                                style={{ width: 250 }}
                                            >

                                                <span className="btn-icon">

                                                    <IoAddOutline />
                                                </span>
                                                <span className="btn-txt-icon">
                                                    Create Job Type
                                            </span>
                                            </button>
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
                                                allowedPageSizes={[10, 20, 50, 100]}
                                                showInfo={true}
                                                showNavigationButtons={true}
                                            />
                                            <Column
                                                width="100"
                                                caption="No"
                                                alignment="center"
                                                cellRender={this.noCellRender}
                                                dataType="string"
                                            />
                                            <Column
                                                caption="Job Type"
                                                dataField="typeName"
                                                dataType="string"
                                            />
                                            <Column
                                                caption="Code"
                                                dataField="typeCode"
                                                dataType="string"
                                            />
                                            <Column
                                                width="100"
                                                alignment="center"
                                                caption="Edit"
                                                cellRender={this.editCellRender}
                                            />
                                            <Column
                                                width="100"
                                                alignment="center"
                                                cellRender={this.delCellRender}
                                                caption="Delete"
                                            />
                                        </DataGrid>
                                    </div>
                                </div>
                            </div>
                            {/* content end*/}
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
                        console.log("Work -> render -> e", e);
                        this.onDeleteData(e)

                    }}
                />
            </>
        );
    }
}

export default JobType;
