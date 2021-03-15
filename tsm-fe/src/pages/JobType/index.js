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
import axios from 'axios'
import { LoadPanel } from 'devextreme-react/load-panel';

const msgAlertTitle = configService.msgAlert;
const msgPopupTitle = configService.msgConfirm;
const api = configService.appIp + configService.apiUrlPrefix
const position = { of: '#App' };

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
            data: [],
            pageSize: configService.defaultPageSize,
            pageIndex: 0,
            loadPanelVisible: false
        };
        this.dataGridRef = React.createRef();
        this.getTotalPageCount = () => {
            return this.dataGridRef.current.instance.pageCount();
        }

        this.changePageSize = this.changePageSize.bind(this);
        this.goToLastPage = this.goToLastPage.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    async componentDidMount() {
        this.fnGetData();
    }

    changePageSize(value) {
        this.setState({
            pageSize: value
        });
    }

    goToLastPage() {
        const pageCount = this.dataGridRef.current.instance.pageCount();
        this.setState({
            pageIndex: pageCount - 1
        });
    }

    handleOptionChange(e) {
        console.log("TCL: JobType -> handleOptionChange -> e", e)
        if (e.fullName === 'paging.pageSize') {
            this.setState({
                pageSize: e.value
            });
        }
        if (e.fullName === 'paging.pageIndex') {
            this.setState({
                pageIndex: e.value
            });
        }
    }

    onTypeNameChange = (event) => {
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
        this.setState({ loadPanelVisible: true })
        this.setState({
            filter: { typeName: '', typeCode: '' }
        });
        setTimeout(() => {
            this.fnGetData();
        }, 100);
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
        this.setState({ loadPanelVisible: true})
        this.fnGetData();
    };

    onDeleteData = async (data) => {
        try {
            var response = await axios.delete(api + '/type/' + data);
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
            console.log("TCL: JobType -> fnGetData -> error", error)
        }
    }

    fnGetData = async () => {
        try {
            let filter = {}
            filter.filter = {}
            filter.fields = configService.fields.typeList
            filter.limit = this.state.pageSize;
            filter.offset = this.state.pageIndex;
            filter.orderby = "typeName";
            if (this.state.filter.typeName && this.state.filter.typeName !== '') {
                filter.filter.typeName = this.state.filter.typeName
            }
            if (this.state.filter.typeCode && this.state.filter.typeCode !== '') {
                filter.filter.typeCode = this.state.filter.typeCode
            }
            const response = await axios.get(api + '/type', { params: filter })
            if (response && response.status === 200) {
                if (response.data && response.data.resultCode === "20000") {
                    this.setState({ data: response.data.resultData })
                } else {
                    this.setState({ data: response.data.resultData })
                }

            }
            this.setState({ loadPanelVisible: false })
        } catch (error) {
            this.setState({ loadPanelVisible: false })
            console.log("TCL: JobType -> fnGetData -> error", error)
        }
    }

    render() {
        return (
            <>
                <div className="App" id="App">
                    <div id="boxType" className="container-box-content">
                        <div className="row wrap-container">
                            <Breadcrumb>
                                {/* <Breadcrumb.Item href="#"> */}
                                    <HomeOutlined />
                                    <span className="breadcrum-custom"> Job Type77777 </span>
                                {/* </Breadcrumb.Item> */}
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
                                                {/* Job Type */}
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
                                            ref={this.dataGridRef}
                                            noDataText="No Data"
                                            onOptionChanged={this.handleOptionChange}
                                        >
                                            <Paging defaultPageSize={configService.defaultPageSize}
                                                pageSize={this.state.pageSize}
                                                pageIndex={this.state.pageIndex} />
                                            <Pager
                                                showPageSizeSelector={true}
                                                allowedPageSizes={configService.allowedPageSizes}
                                                showInfo={true}
                                                showNavigationButtons={true}
                                                visible={true}
                                                remoteOperations={true}
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
                                                alignment="center"
                                            />
                                            <Column
                                                caption="Code"
                                                dataField="typeCode"
                                                dataType="string"
                                                alignment="center"
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
                                    <LoadPanel
                                        shadingColor="rgba(0,0,0,0.4)"
                                        position={position}
                                        visible={this.state.loadPanelVisible}
                                    />
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
                        this.setState({ loadPanelVisible: true })
                        this.fnGetData()
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
