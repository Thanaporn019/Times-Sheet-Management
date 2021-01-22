import React, { Component } from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Head from './JobType/Head';
// import Dashboard from './JobType/Dashboard';
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

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
// import React from 'react';

import TreeList, { RemoteOperations, Column, SearchPanel, HeaderFilter, Editing, RequiredRule, Lookup } from 'devextreme-react/tree-list';
import AspNetData from 'devextreme-aspnet-data-nojquery';



class workTable extends Component {
    state = {
        isOpen: false
    };

    constructor(props) {
        super(props);
        this.state = {
            value: new Date(1981, 3, 27),
            isOpen: false
        };
        this.dateFrom = new Date();
        this.dateTo = new Date();
    }

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    render() {

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

        return (<>

            <div className="App">
                <div id="boxType" className="container-box-content">
                    <div className="row wrap-container">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item" active aria-current="page"><a>Work</a></li>
                            </ol>
                        </nav>
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
                                                        <select class="form-control col-7" id="ddlProjectName">
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row form-group">
                                                        <div className="col-4"><label for="ddlJobType">Job Type</label></div>
                                                        <select class="form-control col-7" id="ddlJobType">
                                                            <option>1</option>
                                                            <option>2</option>
                                                            <option>3</option>
                                                            <option>4</option>
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
                                                            <DateBox defaultValue={this.dateFrom}
                                                                type="date" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row form-group">
                                                        <div className="col-4"><label for="ddlJobType">Date : To</label></div>
                                                        <div className="col-7" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                            <DateBox defaultValue={this.dateTo}
                                                                type="date" />
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </form>

                                        <div className="row form-group">
                                            <div className="col-12" style={{ textAlign: 'center' }}>
                                                <button type="button" class="btn btn-secondary" style={{ marginRight: 20 }}>RESET</button>
                                                <button type="button" class="btn btn-primary">SEARCH</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                        {/* content start*/}
                        <div className="wrap-content">
                            <div className="box-search">
                                <div style={{ textAlign: 'end', padding: 15 }}>
                                    <Link to="/work/create">
                                        <Button variant="primary" onClick={this.openModal}><IoAddOutline style={{ width: '16px' }} /> Create Work</Button>
                                    </Link>
                                </div>

                                {/* <div style={{ padding: 20 }}>
                                    <DataGrid
                                        dataSource={customers}
                                        showBorders={true}
                                    >
                                        <GroupPanel visible={true} />
                                        {/* <Grouping autoExpandAll={this.state.autoExpandAll} /> */}
                                        {/* <Paging defaultPageSize={10} />

                                        <Column dataField="PROJECT" dataType="string" />
                                        <Column dataField="PHASE" dataType="string" />
                                        <Column dataField="TYPE" dataType="string" />
                                        <Column dataField="DETAIL" dataType="string" />
                                        <Column dataField="MANHOUR" dataType="string" />
                                        <Column dataField="TIME IN" dataType="string" />
                                        <Column dataField="TIME OUT" dataType="string" />
                                        <Column dataField="EDIT DELETE" dataType="string" />
                                        <Column dataField="State" dataType="string" groupIndex={0} />

                                    </DataGrid>
                                </div> */} */}

                            </div>
                        </div>
                        {/* content end*/}

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
        <SearchPanel visible={true} />
        <HeaderFilter visible={true} />
        <Editing
          mode="row"
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true} />
        <Column dataField="Task_Subject" minWidth={250}>
          <RequiredRule />
        </Column>
        <Column dataField="Task_Assigned_Employee_ID" caption="Assigned" minWidth={120}>
          <Lookup dataSource={employeesData} valueExpr="ID" displayExpr="Name" />
          <RequiredRule />
        </Column>
        <Column dataField="Task_Status" caption="Status" minWidth={120}>
          <Lookup dataSource={statusesData} />
        </Column>
        <Column dataField="Task_Start_Date" caption="Start Date" dataType="date" />
        <Column dataField="Task_Due_Date" caption="Due Date" dataType="date" />
      </TreeList>


                    </div>

                </div>
            </div>
        </>
        );

    }
}

export default workTable;
