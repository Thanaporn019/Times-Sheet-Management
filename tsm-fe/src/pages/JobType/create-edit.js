import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from "react-bootstrap";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import DateBox from 'devextreme-react/date-box';
import _ from "lodash";
import { Breadcrumb, TimePicker, Select } from 'antd';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// const format = 'HH:mm';
// const Option = Select.Option;

// let data = [{
//     jobtypeId: null,
//     codeId: null,
// }]

// let projectList = [];
// let typeList = [];


class ActionJobType extends React.Component {
    state = {
        isOpen: false
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    constructor(props) {
        console.log("Actionsjobtype -> constructor -> props", props)
        let query = _.cloneDeep(props.match.params.query);
        let tempQuery = JSON.parse(JSON.stringify(query))
        let param = JSON.parse(tempQuery)
        console.log("ActionJobType -> constructor -> param", param)
        super(props);
        this.state = {
            data: [{
                jobtypeId: null,
                codeId: null,

            }],
            projectList: [],
            typeList: [],
            params: param
        };
    }

    // componentDidMount() {

    //     // console.log("ActionsWork -> componentDidMount -> s", this.state.data)
    //     this.getTypeList();
    //     this.getProjectList();
    //     this.setDdlTime();


    // }

    // getProjectList() {
    //     this.setState({
    //         projectList: [{
    //             projectId: '001',
    //             projectName: 'test1'
    //         },
    //         {
    //             projectId: '002',
    //             projectName: 'test2'
    //         }]
    //     })

    //     let resData = [{
    //         projectId: '001',
    //         projectName: 'test1'
    //     },
    //     {
    //         projectId: '002',
    //         projectName: 'test2'
    //     }]
    //     let temp = [];
    //     for (let i = 0; i < resData.length; i++) {
    //         temp.push(<Option key={resData[i].projectId}>{resData[i].projectName}</Option>);
    //     }

    //     this.projectList = temp
    // }

    // getTypeList() {
    //     this.setState({
    //         jobtypeList: [{
    //             typeId: '001',
    //             typeName: 'test1'
    //         },
    //         {
    //             typeId: '002',
    //             typeName: 'test2'
    //         }]
    //     })

    //     let resData = [{
    //         typeId: '001',
    //         typeName: 'test1'
    //     },
    //     {
    //         typeId: '002',
    //         typeName: 'test2'
    //     }]
    //     let temp = []
    //     for (let i = 0; i < resData.length; i++) {
    //         temp.push(<Option key={resData[i].typeId}>{resData[i].typeName}</Option>);
    //         console.log("ActionsWork -> getJobtypeList -> resData[i].typeId", resData[i].typeId)
    //     }

    //     this.typeList = temp
    // }

    // handleProjectChange = (value, i) => {
    //     console.log("actionJobType -> handleProjectChange -> i", i)
    //     console.log("actionJobType -> handleProjectChange -> value", value)

    //     // let temp = _.cloneDeep(this.state.filter)
    //     // temp.projectId = value
    //     // this.setState({
    //     //     filter: {
    //     //         dateFrom: temp.dateFrom,
    //     //         dateTo: temp.dateTo,
    //     //         typeId: temp.typeId,
    //     //         projectId: value
    //     //     }
    //     // });
    // }
    // handleTypeChange = (event) => {

    //     let temp = _.cloneDeep(this.state.filter)
    //     temp.typeId = event.target.value
    //     this.setState({
    //         filter: {
    //             dateFrom: temp.dateFrom,
    //             dateTo: temp.dateTo,
    //             typeId: temp.typeId,
    //             projectId: temp.projectId
    //         }
    //     });
    // }

    // setDdlTime() {
    // let maxMin = 60;
    // let maxHours = 24;

    // let tmpMin = []
    // let tmpHours = []
    // for (let i = 0; i < maxHours; i++) {
    //     tmpMin.push()
    // }


    // TODO :: get hours
    // var hours = []; // time array
    // var th = 0; // start time
    //loop to increment the time and push results in array
    // for (var i = 0; th < 24 * 60; i++) {
    //     var hh = Math.floor(th / 60); // gething hours of day in 0-24 format
    //     var mm = (th % 60); // gething minutes of the hour in 0-55 format
    //     hours[i] = ("0" + (hh)).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
    //     th++;
    // }
    // hours = _.uniq(hours)
    // console.log("ActionsWork -> setDdlTime -> hours", hours)
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
    // }

    // TODO :: Select

    // handleChangeProject = (value, index) => {
    //     let data = [...this.state.data];
    //     let item = { ...data[index] };
    //     item.projectId = value;
    //     data[index] = item;
    //     this.setState({ data });
    // }

    // handleBlurProject = () => {
    //     console.log('blur ---- ', this.typeList);
    // }

    // handleFocusProject = () => {
    //     console.log('focus ....', this.typeList);
    // }
    // handleChangeType = (value, index) => {
    //     let data = [...this.state.data];
    //     let item = { ...data[index] };
    //     item.typeId = value;
    //     data[index] = item;
    //     this.setState({ data });
    // }

    // handleBlurType = () => {
    //     console.log('blur ---- ', this.typeList);
    // }

    // handleFocusType = () => {
    //     console.log('focus ....', this.typeList);
    // }

    // onChangeTimeIn = (time, timestring, index) => {
    //     // console.log("ActionsWork -> onChangeTimeIn -> time, timestring, index", time, timestring, index)
    //     let data = [...this.state.data];
    //     let item = { ...data[index] };
    //     item.workTimeIn = time;
    //     data[index] = item;
    //     this.setState({ data });
    // }
    // onChangeTimeOut = (time, timestring, index) => {
    //     console.log("ActionsWork -> onChangeTimeOut -> time, timestring, index", time, timestring, index)
    //     let data = [...this.state.data];
    //     let item = { ...data[index] };
    //     item.workTimeOut = time;
    //     data[index] = item;
    //     this.setState({ data });
    // }

    // calManHours = () => {

    // }

    // handleAddData = () => {
    //     console.log("ActionsWork -> handleAddData -> handleAddData")
    //     this.state.data.push({
    //         projectId: null,
    //         typeId: null,
    //         workDate: null,
    //         workDetail: null,
    //         workUrl: null,
    //         workManhour: null,
    //         workTimeIn: null,
    //         workTimeOut: null,
    //     })
    //     let a = this.state.data
    //     this.setState({ data: a })
    //     console.log("ActionsWork -> handleAddData ->  this.state.data", this.state.data)
    // }

    render() {

        return (<>

            <div className="App">
                <div id="boxType" className="container-box-content">
                    <div className="row wrap-container">

                        <Breadcrumb>
                            <Breadcrumb.Item href="/jobtype">
                                <HomeOutlined />
                                <span className="breadcrum-custom">Job Type</span>
                            </Breadcrumb.Item>
                            {/* <Breadcrumb.Item href="#"> */}
                                {this.state.params.action === 'create' ? <span className="breadcrum-custom">  Create Job Type</span> : null}
                                {this.state.params.action === 'edit' ? <span className="breadcrum-custom">  Update Job Type</span> : null}

                            {/* </Breadcrumb.Item> */}
                        </Breadcrumb>

                        <div className="wrap-content">
                            <div className="box-action">
                                <div className="box-title-search">


                                    {this.state.data.map((data, i) => {
                                        console.log("ActionsJobType -> render -> data", data)
                                        console.log("ActionsJobType -> render -> i", i);
                                        return (
                                            <>
                                                <div className="box-action-content">
                                                    {this.state.params.action === 'create' ? <p className="font-size-search">Create Job Type</p> : null}
                                                    {this.state.params.action === 'edit' ? <p className="font-size-search">Update Job Type</p> : null}
                                                    <div className="row form-group">
                                                        <div className="col-4" style={{ textAlign: 'right' }}>

                                                        </div>


                                                    </div>
                                                    {/* Job Type Name */}
                                                    <div className="row form-group">
                                                        <div className="col-5" style={{ textAlign: 'right' }}><label for="txtJob Type Name">Job Type Name<span style={{ color: 'red' }}>*</span></label></div>
                                                        <input type="text" class="form-control col-3" id="txtJob Type Name" />
                                                        {/* <div class="col-3">
                                                            <button type="button" class="btn btn-custom-color" style={{ marginRight: 20 }} onClick={this.calManHours}>Calculate</button></div> */}
                                                    </div>
                                                   
                                                    {/* <hr className="hr-action"></hr> */}

                                                    {/* Code */}
                                                    <div className="row form-group">
                                                        <div className="col-5" style={{ textAlign: 'right' }}><label for="txtCode">Code <span style={{ color: 'red' }}>*</span></label></div>
                                                        <input type="text" class="form-control col-3" id="txtCode" />

                                                    </div>

                                                    <div style={{ textAlign: 'right' }}>

                                                        <p><span style={{ color: 'red' }}>*</span> Items marked with an asterisk are required</p>
                                                    </div>

                                                </div>
                                                {/* <hr className="hr-action"></hr> */}
                                            </>
                                        )

                                    })}
                                    <br />
                                    <div>
                                        {/* <button type="button" class="btn btn-add-work" onClick={this.handleAddData}><span className="btn-add-work-icon"><PlusOutlined /></span></button> */}
                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-12" style={{ textAlign: 'right' }}>
                                        {this.state.params.action !== 'view' ?
                                            <Link to='/jobtype'>
                                                <button type="button" class="btn btn-secondary" style={{ marginRight: 20 }} onClick={this.handleReset}>CANCEL</button>
                                            </Link> : null}

                                        {this.state.params.action !== 'view' ? <button type="button" class="btn btn-custom-color" style={{ marginRight: 20 }} onClick={this.openModal}>{this.state.params.action === 'edit' ? 'UPDATE' : 'CREATE'}</button> : null}



                                    </div>

                                    <Modal show={this.state.isOpen} onHide={this.closeModal}>
                                        <Modal.Header closeButton style={{ color: "#bb1717" }}>
                                            <Modal.Title style={{ padding: "3rem 11rem" }}>Confirm</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ textAlign: "center" }}>Please confirm your configuration.</Modal.Body>

                                        <Modal.Footer style={{ borderTop: "3px" }} style={{ justifyContent: "center" }}>
                                            <Button variant="btn btn-secondary" onClick={this.closeModal}>
                                                ON</Button>

                                            <Button variant="primary" onClick={this.openModal}>
                                                YES</Button>

                                        </Modal.Footer>

                                    </Modal>



                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </>
        );

    }
}

export default ActionJobType;
