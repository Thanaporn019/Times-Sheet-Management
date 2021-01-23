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

const format = 'HH:mm';
const Option = Select.Option;

let data = [{
    projectId: null,
    typeId: null,
    workDate: null,
    workDetail: null,
    workUrl: null,
    workManhour: null,
    workTimeIn: null,
    workTimeOut: null,
}]

let projectList = [];
let typeList = [];
let timeHours = [];
let timeMin = [];

class ActionsProject extends React.Component {
    state = {
        isOpen: false
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    constructor(props) {
        // console.log("ActionsWork -> constructor -> props", props.match.params.action)
        // let param = useParams();
        // console.log("param", param)
        // console.log("ActionsWork -> constructor -> props", props)
        super(props);
        this.state = {
            data: [{
                projectId: null,
                typeId: null,
                workDate: null,
                workDetail: null,
                workUrl: null,
                workManhour: null,
                workTimeIn: null,
                workTimeOut: null,
            }],
            projectList: [],
            typeList: []
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
            projectList: [{
                projectId: '001',
                projectName: 'test1'
            },
            {
                projectId: '002',
                projectName: 'test2'
            }]
        })

        let resData = [{
            projectId: '001',
            projectName: 'test1'
        },
        {
            projectId: '002',
            projectName: 'test2'
        }]
        let temp = [];
        for (let i = 0; i < resData.length; i++) {
            temp.push(<Option key={resData[i].projectId}>{resData[i].projectName}</Option>);
        }

        this.projectList = temp
    }

    getTypeList() {
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

        let resData = [{
            typeId: '001',
            typeName: 'test1'
        },
        {
            typeId: '002',
            typeName: 'test2'
        }]
        let temp = []
        for (let i = 0; i < resData.length; i++) {
            temp.push(<Option key={resData[i].typeId}>{resData[i].typeName}</Option>);
            console.log("ActionsWork -> getJobtypeList -> resData[i].typeId", resData[i].typeId)
        }

        this.typeList = temp
    }

    handleProjectChange = (value, i) => {
        console.log("ActionsWork -> handleProjectChange -> i", i)
        console.log("ActionsWork -> handleProjectChange -> value", value)

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
            var mm = (th % 60); // gething minutes of the hour in 0-55 format
            hours[i] = ("0" + (hh)).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
            th++;
        }
        hours = _.uniq(hours)
        console.log("ActionsWork -> setDdlTime -> hours", hours)
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
    }

    handleBlurProject = () => {
        console.log('blur ---- ', this.typeList);
    }

    handleFocusProject = () => {
        console.log('focus ....', this.typeList);
    }
    handleChangeType = (value, index) => {
        let data = [...this.state.data];
        let item = { ...data[index] };
        item.typeId = value;
        data[index] = item;
        this.setState({ data });
    }

    handleBlurType = () => {
        console.log('blur ---- ', this.typeList);
    }

    handleFocusType = () => {
        console.log('focus ....', this.typeList);
    }

    onChangeTimeIn = (time, timestring, index) => {
        // console.log("ActionsWork -> onChangeTimeIn -> time, timestring, index", time, timestring, index)
        let data = [...this.state.data];
        let item = { ...data[index] };
        item.workTimeIn = time;
        data[index] = item;
        this.setState({ data });
    }
    onChangeTimeOut = (time, timestring, index) => {
        console.log("ActionsWork -> onChangeTimeOut -> time, timestring, index", time, timestring, index)
        let data = [...this.state.data];
        let item = { ...data[index] };
        item.workTimeOut = time;
        data[index] = item;
        this.setState({ data });
    }

    calManHours = () => {

    }

    handleAddData = () => {
        console.log("ActionsWork -> handleAddData -> handleAddData")
        this.state.data.push({
            projectId: null,
            typeId: null,
            workDate: null,
            workDetail: null,
            workUrl: null,
            workManhour: null,
            workTimeIn: null,
            workTimeOut: null,
        })
        let a = this.state.data
        this.setState({ data: a })
        console.log("ActionsWork -> handleAddData ->  this.state.data", this.state.data)
    }

    render() {

        return (<>

            <div className="App">
                <div id="boxType" className="container-box-content">
                    <div className="row wrap-container">
                        <Breadcrumb>
                            <Breadcrumb.Item href="/project">
                                <HomeOutlined />
                                <span className="breadcrum-custom">project</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href="#">
                                {this.props.match.params.action === 'create' ? <span className="breadcrum-custom">create project</span> : null}
                                {this.props.match.params.action === 'edit' ? <span className="breadcrum-custom">  Edit</span> : null}
                                {this.props.match.params.action === 'view' ? <span className="breadcrum-custom">  View</span> : null}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="wrap-content">
                            <div className="box-action">
                                <div className="box-title-search">


                                </div>
                                {/* <div className="box-content">
                                    <div className="box-action-date">
                                        <div className="row form-group">
                                            <div className="col-4" style={{ textAlign: 'right' }}><label for="ddlDate">Date : <span style={{ color: 'red' }}>*</span></label></div>
                                            <div className="col-5" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                <DateBox
                                                    value={null}
                                                    type="date" />
                                            </div>
                                        </div>
                                    </div> */}
                                {/* <hr className="hr-action"></hr> */}
                                <div style={{ textAlign: 'right' }}>
                                    {/* <p><span style={{ color: 'red' }}>*</span> Items marked with an asterisk are required</p> */}
                                </div>
                                {this.state.data.map((data, i) => {
                                    console.log("ActionsWork -> render -> data", data)
                                    console.log("ActionsWork -> render -> i", i);
                                    return (
                                        <>
                                            <div className="box-action-content text-center">
                                                {this.props.match.params.action === 'create' ? <p className="font-size-search">Create Project</p> : null}
                                                {this.props.match.params.action === 'edit' ? <p className="font-size-search">Edit Work</p> : null}
                                                {this.props.match.params.action === 'view' ? <p className="font-size-search">View Work</p> : null}

                                                {/* Start Date */}
                                                <div className="row form-group">
                                                    <div className="col-4" style={{ textAlign: 'right' }}><label for="ddlStartDate">Start Date : <span style={{ color: 'red' }}>*</span></label></div>
                                                    <div className="col-4" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                        <DateBox
                                                            value={null}
                                                            type="date" />
                                                    </div>

                                                    {/* <Select
                                                            showSearch
                                                            style={{ width: 200 }}
                                                            placeholder="Please selete project"
                                                            optionFilterProp="children"
                                                            onChange={(e) => { this.handleChangeProject(e, i) }}
                                                            onFocus={(e) => { this.handleFocusProject(e, i) }}
                                                            onBlur={(e) => { this.handleBlurProject(e, i) }}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            value={data.projectId}
                                                        >
                                                            {this.projectList}
                                                        </Select> */}
                                                </div>

                                                {/* End Date */}
                                                <div className="row form-group">
                                                    <div className="col-4" style={{ textAlign: 'right' }}><label for="ddlEndDate">End Date<span style={{ color: 'red' }}>*</span></label></div>
                                                    <div className="col-4" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                                        <DateBox
                                                            value={null}
                                                            type="date" />
                                                    </div> </div>

                                                {/* Project */}
                                                <div className="row form-group">
                                                    <div className="col-4" style={{ textAlign: 'right' }}><label for="ddlProject">Project<span style={{ color: 'red' }}>*</span></label></div>
                                                    <input type="text" class="form-control col-4" id="txtProject" />

                                                </div>

                                                {/* WorkOut */}
                                                <div className="row form-group">
                                                    <div className="col-4" style={{ textAlign: 'right' }}><label for="ddlPhase">Phase<span style={{ color: 'red' }}>*</span></label></div>
                                                    <input type="text" class="form-control col-5" id="txtPhase" />
                                                </div>

                                                {/* man hours */}
                                                <div className="row form-group">
                                                    <div className="col-4" style={{ textAlign: 'right' }}><label for="txtManDay">Man Day<span style={{ color: 'red' }}></span></label></div>
                                                    <input type="text" class="form-control col-5" id="txtManDay" />
                                                    <div class="col-3">
                                                    </div>
                                                </div>

                                                {/* Detail */}
                                                <div className="row form-group">
                                                    <div className="col-4" style={{ textAlign: 'right' }}><label for="txtDetail">Detail <span style={{ color: 'red' }}>*</span></label></div>
                                                    <textarea rows="3" type="text" class="form-control col-5" id="txtDetail" />

                                                </div>

                                                {/* CustomerEmail */}
                                                <div className="row form-group">
                                                    <div className="col-4" style={{ textAlign: 'right' }}><label for="txtCustomerEmail">Customer Email<span style={{ color: 'red' }}></span></label></div>
                                                    <input type="text" class="form-control col-5" id="txtCustomerEmail" />

                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <p><span style={{ color: 'red' }}>*</span> Items marked with an asterisk are required</p> 
                                            </div></div>

   <div className="row form-group">
                                    <div className="col-12" style={{ textAlign: 'right' }}>
                                        <button type="button" class="btn btn-secondary" style={{ marginRight: 20 }} onClick={this.handleReset}>CANCEL</button>
                                        {/* <button type="button" class="btn btn-primary" style={{ marginRight: 80 }}>CREATE</button> */}

                                        <button type="button" class="btn btn-custom-color" style={{ marginRight: 20 }} onClick={this.openModal}>CREATE</button>
                                        {/* <Button variant="custom" style={{ marginRight: 70 }} onClick={this.openModal}>CREATE
                     </Button> */}
                                    </div>  </div> 
                                        </>
                                    )

                                })}
                                <br />
                                <div>
                                   
                                </div>
                            </div>
                            {/* <div className="row form-group">
                                <div className="col-12" style={{ textAlign: 'right' }}>
                                    <button type="button" class="btn btn-secondary" style={{ marginRight: 20 }} onClick={this.handleReset}>CANCEL</button>

                                    <button type="button" class="btn btn-custom-color" style={{ marginRight: 70 }} onClick={this.openModal}>CREATE</button>
                                </div>
                            </div> */}

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
            {/* </div> */}
        </>
        );

    }
}

export default ActionsProject;
