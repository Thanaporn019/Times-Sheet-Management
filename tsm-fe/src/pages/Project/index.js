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
import AspNetData from 'devextreme-aspnet-data-nojquery';
import _ from "lodash";
import { Breadcrumb } from 'antd';
import { HomeOutlined, EyeOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import DataGrid, { Column, Pager, Paging } from 'devextreme-react/data-grid';
import AlertPopUp from "../../components/popup/alert_popup";
import ConfirmPopup from "../../components/popup/confirm_popup";
import configService from '../../config';
const msgAlertTitle = configService.msgAlert;
const msgPopupTitle = configService.msgConfirm;

const url = 'https://js.devexpress.com/Demos/Mvc/api/TreeListTasks';

const tasksData = AspNetData.createStore({
    key: 'Task_ID',
    loadUrl: `${url}/Tasks`,
    insertUrl: `${url}/InsertTask`,
    updateUrl: `${url}/UpdateTask`,
    deleteUrl: `${url}/DeleteTask`,
    onBeforeSend: function(method, ajaxOptions) {
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



class Project extends React.Component {
    state = {
        isOpen: false
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });


    constructor(props) {
        super(props);
        this.state = {
            isPopupSuccess: false, // alert success case
            isPopupError: false, // alert error case
            isPopupMsg: '', // alert msg
            isOpen: false, // open popup confirm
            isTypeShowConfirm: '', // ประเภทของ popup : save , del
            isDataPopUp: {}, // ข้อมูลที่ใช้
            isTextMsg: '', // msg ของ Popup
            filter: {
                dateFrom: new Date(),
                dateTo: new Date(),
                projectId: null,
                typeId: null
            },
            projectList: [],
            jobtypeList: [],
            data: [{
                    projectId: '0001',
                    projectName: 'name1',
                    projectPhase: '1',
                    projectDetail: '....',
                    projectStartDate: '20/01/2020',
                    projectEndDate: '31/12/2021',
                    projectManDays: '50',
                    customerEmail: 'test@test.com',
                    updateDate: '01/01/2020',
                    updateBy: 'joon',
                    createDate: '01/01/2020',
                    createBy: 'joon',
                },
                {
                    projectId: '0002',
                    projectName: 'name2',
                    projectPhase: '1',
                    projectDetail: '....',
                    projectStartDate: '20/01/2020',
                    projectEndDate: '31/12/2021',
                    projectManDays: '50',
                    customerEmail: 'test@test.com',
                    updateDate: '01/01/2020',
                    updateBy: 'joon',
                    createDate: '01/01/2020',
                    createBy: 'joon',
                },
                {
                    projectId: '0003',
                    projectName: 'name3',
                    projectPhase: '1',
                    projectDetail: '....',
                    projectStartDate: '20/01/2020',
                    projectEndDate: '31/12/2021',
                    projectManDays: '50',
                    customerEmail: 'test@test.com',
                    updateDate: '01/01/2020',
                    updateBy: 'joon',
                    createDate: '01/01/2020',
                    createBy: 'joon',
                },
                {
                    projectId: '0004',
                    projectName: 'name4',
                    projectPhase: '1',
                    projectDetail: '....',
                    projectStartDate: '20/01/2020',
                    projectEndDate: '31/12/2021',
                    projectManDays: '50',
                    customerEmail: 'test@test.com',
                    updateDate: '01/01/2020',
                    updateBy: 'joon',
                    createDate: '01/01/2020',
                    createBy: 'joon',
                }
            ]

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
                }
            ]
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
                }
            ]
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


    delCellRender = (data) => {
        console.log("project -> DelcellRender -> data", data)
        return <a onClick = {
            () => {
                console.log("project -> DelcellRender -> data", data.data.typeId)
                this.setState({ isOpen: true, isTypeShowConfirm: 'del', isTextMsg: msgPopupTitle.deleted, isDataPopUp: this.state.data })
            }
        } > < span style = {
            { color: '#111', fontSize: '12pt' }
        } > < DeleteOutlined / > < /span></a > ;
    }

    editCellRender = (data) => {
        return <Link to = { "/project" + `/{"action":"edit","projectId":"${data.data.typeId}"}` } >
            <
            span style = {
                { color: 'black', fontSize: '12pt' }
            } > < FormOutlined / > < /span> < /
            Link >
    }
    viewCellRender = (data) => {
        return <Link to = { "/project" + `/{"action":"view","projectId":"${data.data.typeId}"}` } >
            <
            span style = {
                { color: 'black', fontSize: '12pt' }
            } > < EyeOutlined / > < /span> < /
            Link >
    }
    noCellRender = (data) => {
        return <span style = {
            { color: 'black', fontSize: '12pt' }
        } > { data.component.pageIndex() * data.component.pageSize() + data.rowIndex + 1 } < /span>
    }

    render() {

        return ( < >

            <
            div className = "App" >
            <
            div id = "boxType"
            className = "container-box-content" >
            <
            div className = "row wrap-container" >
            <
            Breadcrumb >
            <
            Breadcrumb.Item href = "#" >
            <
            HomeOutlined / >
            <
            span className = "breadcrum-custom" > Project < /span> < /
            Breadcrumb.Item > <
            /Breadcrumb>

            <
            div className = "wrap-content" >
            <
            div className = "box-search" >
            <
            div className = "box-title-search" >
            <
            p className = "font-size-search" > Search Project < /p>

            <
            /div> <
            div className = "box-content" >
            <
            div className = "box-search-border" >
            <
            form >

            <
            div className = "row form-group" >
            <
            div className = "col-4"
            style = {
                { textAlign: 'right' }
            } >

            <
            /div>


            <
            /div> { / * Job Type Name * / } <
            div className = "row form-group" >
            <
            div className = "col-3"
            style = {
                { textAlign: 'right' }
            } > < label className = "title-field"
            for = "txtProject Name" > Project Name < span style = {
                { color: 'red' }
            } > * < /span></label > < /div> <
            input type = "text"
            class = "form-control col-6"
            id = "txtJob Type" / >
            <
            /div>

            { /* </div> */ }

            <
            /form>

            <
            div className = "row form-group" >
            <
            div className = "col-12"
            style = {
                { textAlign: 'center' }
            } >
            <
            button class = "btn-custom btn-reset "
            style = {
                { marginRight: 20 }
            }
            onClick = { this.handleReset } > RESET < /button> <
            button class = "btn-custom btn-search " > SEARCH < /button> < /
            div > <
            /div> < /
            div >

            <
            /div>

            <
            /div> < /
            div >

            { /* content start*/ } <
            div className = "wrap-content" >
            <
            div className = "box-search"
            style = {
                { padding: 30 }
            } >
            <
            div style = {
                { textAlign: 'end', padding: 15 }
            } >
            <
            Link to = '/project/{"action":"create"}' >
            <
            button className = "btn-custom btn-search "
            style = {
                { width: 250 }
            } > < span className = "btn-icon" > < IoAddOutline / > < /span> <span className="btn-txt-icon">Create Project</span > < /button> < /
            Link > <
            /div>

            { /* data grid */ }

            <
            div style = {
                { padding: 20 }
            } >
            <
            DataGrid dataSource = { this.state.data }
            showBorders = { true }
            showRowLines = { true } >
            <
            Paging defaultPageSize = { 3 }
            /> <
            Pager showPageSizeSelector = { true }
            allowedPageSizes = {
                [5, 10, 20]
            }
            showInfo = { true }
            showNavigationButtons = { true }
            />

            <
            Column width = "100"
            caption = "No"
            alignment = "center"
            cellRender = { this.noCellRender }
            dataType = "string" / >
            <
            Column caption = "Project Name"
            dataField = "projectName"
            dataType = "string" / >
            <
            Column caption = "Phase"
            dataField = "projectPhase"
            dataType = "string" / >
            <
            Column width = "100"
            alignment = "center"
            caption = "View"
            cellRender = { this.viewCellRender }
            /> <
            Column width = "100"
            alignment = "center"
            caption = "Edit"
            cellRender = { this.editCellRender }
            /> <
            Column width = "100"
            alignment = "center"
            cellRender = { this.delCellRender }
            caption = "Delete" / >

            <
            /DataGrid> < /
            div >


            <
            /div> < /
            div > { /* content end*/ }



            <
            /div>

            <
            /div> < /
            div > { /* POPUP */ } <
            AlertPopUp successStatus = { this.state.isPopupSuccess }
            errorStatus = { this.state.isPopupError }
            message = { this.state.isPopupMsg }
            clearActive = {
                () => {
                    this.setState({ isPopupError: false })
                    this.setState({ isPopupSuccess: false })
                }
            }
            />

            <
            ConfirmPopup open = { this.state.isOpen }
            type = { this.state.isTypeShowConfirm }
            text = { this.state.isTextMsg }
            data = { this.state.isDataPopUp }
            del = { false }
            onClose = {
                () => { this.setState({ isOpen: false }) }
            }
            clearActive = {
                (e) => { this.setState({ isOpen: false }) }
            }
            confirmActive = {
                (e) => {
                    this.setState({ isOpen: false })
                    this.setState({ isPopupError: false })
                    this.setState({ isPopupSuccess: true })
                    this.setState({ isPopupMsg: msgAlertTitle.deleted })
                    console.log("Work -> render -> e", e)
                }
            }
            />

            <
            />
        );

    }
}

export default Project;