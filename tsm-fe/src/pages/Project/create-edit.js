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
import AlertPopUp from "../../components/popup/alert_popup";
import ConfirmPopup from "../../components/popup/confirm_popup";
import configService from '../../config';
import axios from 'axios'
import { LoadPanel } from 'devextreme-react/load-panel';

const api = configService.appIp + configService.apiUrlPrefix
const msgAlertTitle = configService.msgAlert;
const msgPopupTitle = configService.msgConfirm;
const msgValid = configService.validDateFill;
const format = 'HH:mm';
const Option = Select.Option;
const position = { of: '#App' };
class ActionsProject extends React.Component {
    state = {
        isOpen: false
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    constructor(props) {
        console.log("Actionsproject -> constructor -> props", props)
        let query = _.cloneDeep(props.match.params.query);
        let tempQuery = JSON.parse(JSON.stringify(query))
        let param = JSON.parse(tempQuery)

        super(props);
        this.state = {
            isPopupSuccess: false, // alert success case
            isPopupError: false,  // alert error case
            isPopupMsg: '',  // alert msg
            isOpen: false, // open popup confirm
            isTypeShowConfirm: '', // ประเภทของ popup : save , del
            isDataPopUp: {}, // ข้อมูลที่ใช้
            isTextMsg: '', // msg ของ Popup
            data: {
                projectId: null,
                projectName: null,
                projectPhase: null,
                projectDetail: null,
                projectStartDate: null,
                projectEndDate: null,
                projectManDays: null,
                customerEmail: null,
                createDate: null,
createBy: null,
updateDate: null,
updateBy: null,
            },
            params: param,
            isSubmit: false,
            isValid_startDate: false,
            isValid_endDate: false,
            isValid_projectName: false,
            isValid_phase: false,
            isValid_detail: false,
            isValid_email: false,
            inputDate: {
                startDate: '',
                endDate: ''
            },
            greater: {
                startDate: '',
                endDate: ''
            },
            startGreater: false,
            endGreater: false,
            loadPanelVisible: false
        };
    }

    componentDidMount() {
        console.log("TCL: ActionsProject -> componentDidMount -> this.state.params", this.state.params)
        if (this.state.params.action !== 'create') {
            this.fnGetDataView();
        }
    }

    handleChangeDate = (event, type) => {
        let temp = _.cloneDeep(this.state.data)
        if (type === 'start') {
            this.setState({
                data: {
                    ...this.state.data,
                    projectStartDate: event.value,
                }
            });
            this.setState({ isValid_startDate: false })
        } else {
            this.setState({
                data: {
                    ...this.state.data,
                    projectEndDate: event.value,
                }
            });
            this.setState({ isValid_endDate: false })

        }
        this.checkGreaterValue();
        this.checkGreaterStartDateValue();
        this.checkGreaterStopDateValue();
    }

    onProjectNameChange = (event) => {
        this.setState({
            data: {
                ...this.state.data,
                projectName: event.target.value
            }
        });

        if (event.target.value !== '' || !event.target.value) {
            this.setState({ isValid_projectName: false })
        }
    }

    onProjectPhaseChange = (event) => {
        this.setState({
            data: {
                ...this.state.data,
                projectPhase: event.target.value
            }
        });

        if (event.target.value !== '' || !event.target.value) {
            this.setState({ isValid_phase: false })
        }
    }

    onProjectDetailChange = (event) => {
        this.setState({
            data: {
                ...this.state.data,
                projectDetail: event.target.value
            }
        });

        if (event.target.value !== '' || !event.target.value) {
            this.setState({ isValid_detail: false })
        }
    }

    onCustomerEmailChange = (event) => {
        this.setState({
            data: {
                ...this.state.data,
                customerEmail: event.target.value
            }
        });

        setTimeout(() => {
            if (this.state.data.customerEmail && !this.checkValidEmail()) {
                this.setState({ isValid_email: true })
            } else {
                this.setState({ isValid_email: false })
            }
        }, 100);
    }
    onManDaysChange = (event) => {
        this.setState({
            data: {
                ...this.state.data,
                projectManDays: event.target.value
            }
        });
    }

    checkValidate = () => {
        let vaildProjectName = this.checkValidValue('name');
        let vaildProjectPhase = this.checkValidValue('phase');
        let vaildProjectDetail = this.checkValidValue('detail');
        let vaildProjectStart = this.checkValidValue('start');
        let vaildProjectEnd = this.checkValidValue('end');
        let vaildEmail = this.state.data.customerEmail ? this.checkValidEmail() : true;
        if (vaildProjectStart && vaildProjectEnd) {
            this.checkValidValue('date')
        }
        if (vaildProjectName && vaildProjectPhase && vaildProjectDetail && vaildProjectStart && vaildProjectEnd && !this.state.greater.startDate && !this.state.greater.endDate && !this.state.startGreater && !this.state.endGreater && vaildEmail) {
            this.setState({ isOpen: true, isTypeShowConfirm: 'save', isTextMsg: this.state.params.action === 'edit' ? msgPopupTitle.saved : msgPopupTitle.saved, isDataPopUp: this.state.data })
        } else {

            console.log("TCL: ActionsProject -> checkValidate -> ", 'กรอกข้อมูลไม่ครบหรือ ติด valid')
        }
    }

    checkValidValue = (type) => {
        if (type === 'name') {
            if (!this.state.data.projectName || this.state.data.projectName === '') {
                this.setState({ isValid_projectName: true })
                return false;
            } else {
                this.setState({ isValid_projectName: false })
                return true;
            }
        } else if (type === 'phase') {
            if (!this.state.data.projectPhase || this.state.data.projectPhase === '') {
                this.setState({ isValid_phase: true })
                return false;
            } else {
                this.setState({ isValid_phase: false })
                return true;
            }
        } else if (type === 'detail') {
            if (!this.state.data.projectDetail || this.state.data.projectDetail === '') {
                this.setState({ isValid_detail: true })
                return false;
            } else {
                this.setState({ isValid_detail: false })
                return true;
            }
        } else if (type === 'start') {
            if (!this.state.data.projectStartDate || this.state.data.projectStartDate === '') {
                this.setState({ isValid_startDate: true })
                return false;
            } else {
                this.setState({ isValid_startDate: false })
                return true;
            }
        } else if (type === 'end') {
            if (!this.state.data.projectEndDate || this.state.data.projectEndDate === '') {
                this.setState({ isValid_endDate: true })
                return false;
            } else {
                this.setState({ isValid_endDate: false })
                return true;
            }
        } else if (type === 'date') {
            this.checkGreaterValue()
        }
    }

    checkGreaterValue = () => {
        if (!this.state.data.projectEndDate || !this.state.data.projectStartDate || this.checkNullObjectMany(this.state.inputDate)) {
            this.setState({
                greater: {
                    startDate: false,
                    endDate: false,
                }
            })
        }
        let checkGreaterCreatedDate = this.checkGreater(this.state.data.projectEndDate, this.state.data.projectStartDate);
        console.log("TCL: ActionsProject -> checkGreaterValue -> checkGreaterCreatedDate", checkGreaterCreatedDate)
        this.setState({
            greater: {
                startDate: checkGreaterCreatedDate,
                endDate: checkGreaterCreatedDate,
            }
        })
    }

    checkNullObjectMany = (dataObject) => {
        for (let key in dataObject) {

            for (let item in dataObject[key]) {
                if (dataObject[key][item]) {
                    return true;
                }
            }
        }
        return false;
    }

    checkGreater(dateFrom, dateTo) {
        let greater;
        if (dateFrom && dateTo) {
            greater = dateFrom < dateTo ? true : false;
        } else {
            greater = false;
        }
        return greater;
    }

    checkGreaterStartDateValue = () => {
        if (!this.state.data.projectStartDate || !this.state.data.projectEndDate || this.checkNullObjectMany(this.inputDate)) {
            this.setState({ startGreater: false })
        }
        let checkGreaterCreatedDate = this.checkGreaterStartDate(this.state.data.projectEndDate, this.state.data.projectStartDate);
        this.setState({ startGreater: checkGreaterCreatedDate })
    }

    checkGreaterStopDateValue = () => {
        if (!this.state.data.projectStartDate || !this.state.data.projectEndDate || this.checkNullObjectMany(this.inputDate)) {
            this.setState({ endGreater: false })
        }
        let checkGreaterCreatedDate = this.checkGreaterStopDate(this.state.data.projectEndDate, this.state.data.projectStartDate);
        this.setState({ endGreater: checkGreaterCreatedDate })
    }

    checkGreaterStartDate = () => {
        let greaterStart;
        greaterStart = false;
        return greaterStart;
    }

    checkGreaterStopDate = (dataFrom, dataTo) => {
        let greaterStop;
        let now = moment().format();
        if (dataTo && dataFrom) {
            let stop = moment(dataFrom).format();
            greaterStop = stop < now ? true : false;
        } else {
            greaterStop = false;
        }
        return greaterStop;

    }

    checkValidEmail = () => {
        let reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const match = this.state.data.customerEmail ? this.state.data.customerEmail.match(reg) : null;
        console.log("TCL: ActionsProject -> checkValidEmail -> match", match)
        if (match && match.length > 0) {
            return true
        } else {
            return false
        }
    }

    confirmSave = async (data) => {
        this.setState({ loadPanelVisible: true })
        console.log("TCL: ActionJobType -> confirmSave -> data", data)
        try {
            let body = {}
            body.projectName = data.projectName;
            body.projectPhase = data.projectPhase;
            body.projectDetail = data.projectDetail;
            body.projectStartDate = moment(data.projectStartDate).format('YYYY-MM-DD HH:mm:ss');
            body.projectEndDate = moment(data.projectEndDate).format('YYYY-MM-DD HH:mm:ss');
            if (data.projectManDays) {
                body.projectManDays = data.projectManDays;
            }
            if (data.customerEmail) {
                body.customerEmail = data.customerEmail;
            }
            console.log("TCL: ActionsProject -> confirmSave -> body", body)
            var response;
            if (this.state.params.action === 'edit') {
                response = await axios.put(api + '/project/' + this.state.data.projectId, body)
            } else {
                response = await axios.post(api + '/project', body)
            }
            if (response && response.status === 200) {
                if (response.data && response.data.resultCode === "20000") {
                    this.setState({ isOpen: false })
                    this.setState({ isPopupError: false })
                    this.setState({ isPopupSuccess: true })
                    this.setState({ isPopupMsg: this.state.params.action === 'edit' ? msgAlertTitle.updated : msgAlertTitle.saved })
                } else {
                    this.setState({ isOpen: false })
                    this.setState({ isPopupError: true })
                    this.setState({ isPopupSuccess: false })
                    this.setState({ isPopupMsg: msgAlertTitle.systemError })
                }
            }
            this.setState({ loadPanelVisible: false })
        } catch (error) {
            this.setState({ loadPanelVisible: false })
            this.setState({ isOpen: false })
            this.setState({ isPopupError: true })
            this.setState({ isPopupSuccess: false })
            this.setState({ isPopupMsg: msgAlertTitle.systemError })
            console.log("TCL: JobType -> fnGetData -> error", error)
        }
    }

    fnGetDataView = async () => {
        try {

            this.setState({ loadPanelVisible: true })
            let filter = {
                "projectId": this.state.params.projectId
            }
            const response = await axios.get(api + '/project/' + this.state.params.projectId)
            console.log("TCL: ActionJobType -> fnGetDataView -> response", response)
            if (response && response.status === 200) {
                if (response.data && response.data.resultCode === "20000") {
                    this.setState({
                        data: {
                            projectId: response.data.resultData[0].projectId,
                            projectName: response.data.resultData[0].projectName,
                            projectPhase: response.data.resultData[0].projectPhase,
                            projectDetail: response.data.resultData[0].projectDetail,
                            projectStartDate: moment(response.data.resultData[0].projectStartDate, 'YYYY/MM/DD HH:mm:ss').toDate(),
                            projectEndDate: moment(response.data.resultData[0].projectEndDate, 'YYYY/MM/DD HH:mm:ss').toDate(),
                            projectManDays: response.data.resultData[0].projectManDays,
                            customerEmail: response.data.resultData[0].customerEmail,
                            createDate: response.data.resultData[0].createDate, 
                            createBy: response.data.resultData[0].createBy,
                            updateDate: response.data.resultData[0].updateDate,
                            updateBy: response.data.resultData[0].updateBy,
                        }
                    })
                } else {
                    this.setState({
                        data: {
                            projectId: null,
                            projectName: null,
                            projectPhase: null,
                            projectDetail: null,
                            projectStartDate: null,
                            projectEndDate: null,
                            projectManDays: null,
                            customerEmail: null,
                            createDate: null,
                            createBy: null,
                            updateDate: null,
                            updateBy: null,
                        }
                    })
                }

            }
            this.setState({ loadPanelVisible: false })
        } catch (error) {
            this.setState({ loadPanelVisible: false })
            console.log("TCL: ActionJobType -> fnGetDataView -> error", error)
        }
    }


    render() {

        return (<>

            <div className="App" id="App">
                <div id="boxType" className="container-box-content">
                    <div className="row wrap-container">

                        <Breadcrumb>
                            <Breadcrumb.Item href="/project">
                                <HomeOutlined />
                                <span className="breadcrum-custom">project</span>
                            </Breadcrumb.Item>
                            {/* <Breadcrumb.Item href="#"> */}
                            {this.state.params.action === 'create' ? <span className="breadcrum-custom">Create project</span> : null}
                            {this.state.params.action === 'edit' ? <span className="breadcrum-custom">  Update project</span> : null}
                            {this.state.params.action === 'view' ? <span className="breadcrum-custom">  Detail project</span> : null}

                            {/* </Breadcrumb.Item> */}
                        </Breadcrumb>


                        <div className="wrap-content">
                            <div className="box-action">
                                <div className="box-title-search">
                                    <div className="box-action-content">
                                        {this.state.params.action === 'create' ? <p className="font-size-search">Create Project</p> : null}
                                        {this.state.params.action === 'edit' ? <p className="font-size-search">Update Project</p> : null}
                                        {this.state.params.action === 'view' ? <p className="font-size-search">Detail Project</p> : null}

                                        {/* Start Date */}
                                        <div className="row form-group">
                                            <div className="col-4" style={{ textAlign: 'right' }}><label className="title-field" for="ddlStartDate">Start Date {this.state.params.action !== 'view' ? <span style={{ color: 'red' }}>*</span> : null}</label></div>
                                            <div className={`col-4`} style={{ textAlign: 'start', padding: 0 }}>
                                                <DateBox
                                                    value={this.state.data.projectStartDate}
                                                    disabled={this.state.params.action === 'view'}
                                                    displayFormat="yyyy/MM/dd"
                                                    type="date" onValueChanged={(e) => {
                                                        this.handleChangeDate(e, 'start')
                                                    }}
                                                    className={`${this.state.isValid_startDate && this.state.isSubmit || this.state.greater.startDate || this.state.startGreater ? 'has-error-input' : ''}`} />
                                                {this.state.isValid_startDate && this.state.isSubmit ? <span className="color-red">{msgValid.req}</span> : null}
                                                {this.state.greater.startDate || this.state.startGreater ? <span className="color-red">{msgValid.project.validStartDatemoreEndDate}</span> : null}


                                            </div>
                                        </div>

                                        {/* End Date */}
                                        <div className="row form-group">
                                            <div className="col-4" style={{ textAlign: 'right' }}><label className="title-field" for="ddlEndDate">End Date{this.state.params.action !== 'view' ? <span style={{ color: 'red' }}>*</span> : null}</label></div>
                                            <div className={`col-4`} style={{ textAlign: 'start', padding: 0 }}>
                                                <DateBox
                                                    value={this.state.data.projectEndDate}
                                                    displayFormat="yyyy/MM/dd"
                                                    disabled={this.state.params.action === 'view'}
                                                    type="date" onValueChanged={(e) => {
                                                        this.handleChangeDate(e, 'end')
                                                    }}
                                                    className={`${this.state.isValid_endDate && this.state.isSubmit || this.state.greater.endDate || this.state.endGreater || this.state.greater.startDate ? 'has-error-input' : ''}`} />
                                                {this.state.isValid_endDate && this.state.isSubmit ? <span className="color-red">{msgValid.req}</span> : null}
                                                {this.state.greater.endDate || this.state.greater.startDate && !this.state.endGreater && this.state.data.projectEndDate ? <span className="color-red">{msgValid.project.validEndDatelessStartDate}</span> : null}
                                                {/* {!this.state.greater.stopDate && this.state.endGreater && this.state.data.projectEndDate ? <span className="color-red">The end date must be greater than the start date. </span> : null} */}

                                            </div>
                                        </div>

                                        {/* Project */}
                                        <div className="row form-group">
                                            <div className="col-4" style={{ textAlign: 'right' }}><label className="title-field" for="ddlProject">Project{this.state.params.action !== 'view' ? <span style={{ color: 'red' }}>*</span> : null}</label></div>
                                            <div className="col-4" style={{ textAlign: 'start', padding: 0 }}>
                                                <input type="text" class={`form-control  ${this.state.isValid_projectName && this.state.isSubmit ? 'has-error-input' : ''}`} id="txtProject"
                                                    value={this.state.data.projectName} onChange={this.onProjectNameChange} disabled={this.state.params.action === 'view'}/>
                                                {this.state.isValid_projectName && this.state.isSubmit ? <span className="color-red">{msgValid.req}</span> : null}
                                            </div>

                                        </div>

                                        {/* Phase */}
                                        <div className="row form-group">
                                            <div className="col-4" style={{ textAlign: 'right' }}><label className="title-field" for="ddlPhase">Phase{this.state.params.action !== 'view' ? <span style={{ color: 'red' }}>*</span> : null}</label></div>
                                            <div className="col-4" style={{ textAlign: 'start', padding: 0 }}>
                                                <input type="text" class={`form-control  ${this.state.isValid_phase && this.state.isSubmit ? 'has-error-input' : ''}`}
                                                    id="txtPhase" value={this.state.data.projectPhase} onChange={this.onProjectPhaseChange} disabled={this.state.params.action === 'view'}/>
                                                {this.state.isValid_phase && this.state.isSubmit ? <span className="color-red">{msgValid.req}</span> : null}

                                            </div>
                                        </div>

                                        {/*Man Day */}
                                        <div className="row form-group">
                                            <div className="col-4" style={{ textAlign: 'right' }}><label className="title-field" for="txtManDay">Man Day{this.state.params.action !== 'view' ? <span style={{ color: 'red' }}></span> : null}</label></div>
                                            <div className="col-5" style={{ textAlign: 'start', padding: 0 }}>
                                                <input type="text" class="form-control col-5" id="txtManDay" value={this.state.data.projectManDays} onChange={this.onManDaysChange} disabled={this.state.params.action === 'view'}/>
                                          
                                            </div>
                                        </div>

                                        {/* Detail */}
                                        <div className="row form-group">
                                            <div className="col-4" style={{ textAlign: 'right' }}><label className="title-field" for="txtDetail">Detail {this.state.params.action !== 'view' ? <span style={{ color: 'red' }}>*</span> : null}</label></div>
                                            <div className="col-5" style={{ textAlign: 'start', padding: 0 }}>
                                                <textarea rows="3" type="text" class={`form-control  ${this.state.isValid_detail && this.state.isSubmit ? 'has-error-input' : ''}`}
                                                    id="txtDetail" value={this.state.data.projectDetail} onChange={this.onProjectDetailChange} disabled={this.state.params.action === 'view'}/>
                                                {this.state.isValid_detail && this.state.isSubmit ? <span className="color-red">{msgValid.req}</span> : null}
                                            </div>
                                        </div>

                                        {/* CustomerEmail */}
                                        <div className="row form-group">
                                            <div className="col-4" style={{ textAlign: 'right' }}><label className="title-field" for="txtCustomerEmail">Customer Email<span style={{ color: 'red' }}></span></label></div>
                                            <div className="col-5" style={{ textAlign: 'start', padding: 0 }}>
                                                <input type="text" class={`form-control  ${this.state.isValid_email ? 'has-error-input' : ''}`} id="txtCustomerEmail" value={this.state.data.customerEmail} onChange={this.onCustomerEmailChange} disabled={this.state.params.action === 'view'}/>
                                                {this.state.isValid_email ? <span className="color-red">{msgValid.project.validEmail}</span> : null}
                                            </div>
                                        </div>

                                        {/* CreateDate */}
                                        {this.state.params.action === 'view' ? <div className="row form-group">
                                            <div className="col-4" style={{ textAlign: 'right' }}><label className="title-field" for="txtCreateDate">CreateDate<span style={{ color: 'red' }}></span></label></div>
                                            <input type="text" class="form-control col-5" id="txtCreateDate" disabled={this.state.params.action === 'view'} value={this.state.data.createDate}/>
                                        </div> : null}

                                        {/* CreateBy */}
                                        {this.state.params.action === 'view' ? <div className="row form-group">
                                            <div className="col-4" style={{ textAlign: 'right' }}><label className="title-field" for="txtCreateBy">CreateBy<span style={{ color: 'red' }}></span></label></div>
                                            <input type="text" class="form-control col-5" id="txtCreateBy" disabled={this.state.params.action === 'view'} value={this.state.data.createBy}/>

                                        </div> : null}

                                        {/* UpdateDate */}
                                        {this.state.params.action === 'view' ? <div className="row form-group">
                                            <div className="col-4" style={{ textAlign: 'right' }}><label className="title-field" for="txtUpdateDate">UpdateDate<span style={{ color: 'red' }}></span></label></div>
                                            <input type="text" class="form-control col-5" id="txtUpdateDate" disabled={this.state.params.action === 'view'} value={this.state.data.updateDate}/>

                                        </div> : null}

                                        {/*  UpdateBy */}
                                        {this.state.params.action === 'view' ? <div className="row form-group">
                                            <div className="col-4" style={{ textAlign: 'right' }}><label className="title-field" for="txtUpdateBy">UpdateBy<span style={{ color: 'red' }}></span></label></div>
                                            <input type="text" class="form-control col-5" id="txtUpdateBy" disabled={this.state.params.action === 'view'} value={this.state.data.updateBy}/>

                                        </div> : null}

                                        {this.state.params.action !== 'view' ? <div style={{ textAlign: 'right' }}>
                                            <p className="title-field"><span style={{ color: 'red' }}>*</span> Items marked with an asterisk are required</p>
                                        </div> : null}
                                    </div>

                                </div>
                                <div className="row form-group">
                                    <div className="col-12" style={{ textAlign: 'right' }}>
                                        {this.state.params.action !== 'view' ?
                                            <Link to='/project'>
                                                <button class="btn-custom btn-reset" style={{ marginRight: 20 }}>CANCEL</button>
                                            </Link> : null}
                                        {this.state.params.action !== 'view' ? <button class="btn-custom btn-search" style={{ marginRight: 20 }} onClick={() => {
                                            this.setState({ isSubmit: true })
                                            this.checkValidate()
                                        }}>{this.state.params.action === 'edit' ? 'UPDATE' : 'CREATE'}</button> : null}
                                        {this.state.params.action === 'view' ?
                                            <Link to='/project'>
                                                <button class="btn-custom btn-search " style={{ marginRight: 20 }} >BACK</button>
                                            </Link>
                                            : null}
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    if (this.state.isPopupSuccess) {
                        this.props.history.push('/project')
                    }
                    this.setState({ isPopupError: false })
                    this.setState({ isPopupSuccess: false })
                }} />

            <ConfirmPopup open={this.state.isOpen} type={this.state.isTypeShowConfirm} text={this.state.isTextMsg} data={this.state.isDataPopUp} del={false}
                onClose={() => { this.setState({ isOpen: false }) }}
                clearActive={(e) => { this.setState({ isOpen: false }) }}
                confirmActive={(e) => {
                    console.log("Work -> render -> e", e)
                    this.confirmSave(e)
                }}
            />
        </>
        );

    }
}

export default ActionsProject;
