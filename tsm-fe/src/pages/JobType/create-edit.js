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
import { BrowserRouter as Router, Switch, Route, Link, Redirect  } from 'react-router-dom';
import AlertPopUp from "../../components/popup/alert_popup";
import ConfirmPopup from "../../components/popup/confirm_popup";
import configService from '../../config';
const msgAlertTitle = configService.msgAlert;
const msgPopupTitle = configService.msgConfirm;

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
            isPopupSuccess: false, // alert success case
            isPopupError: false,  // alert error case
            isPopupMsg: '',  // alert msg
            isOpen: false, // open popup confirm
            isTypeShowConfirm: '', // ประเภทของ popup : save , del
            isDataPopUp: {}, // ข้อมูลที่ใช้
            isTextMsg: '', // msg ของ Popup
            routeStatus: null, // msg ของ Popup
            data: {
                typeName: null,
                typeCode: null,
                typeId: null,

            },
            projectList: [],
            typeList: [],
            params: param,
            isSubmit: false,
            valid_typeName: false,
            valid_typeCode: false,
        };

        this.onTypeNameChange = this.onTypeNameChange.bind(this);
        this.onTypeCodeChange = this.onTypeCodeChange.bind(this);
        
    }

    onTypeNameChange(event) {
        this.setState({
            data: {
                ...this.state.data,
                typeName: event.target.value
            }
        });

        if (event.target.value !== '' || !event.target.value) {
            this.setState({ valid_typeName: false })
        }
    }
    onTypeCodeChange(event) {
        this.setState({
            data: {
                ...this.state.data,
                typeCode: event.target.value
            }
        });

        console.log("TCL: ActionJobType -> onTypeCodeChange -> event.target.value", event.target.value)
        if (event.target.value !== '' || !event.target.value) {
            this.setState({ valid_typeCode: false })
        }
    }

    checkValidate = () => {
        console.log("TCL: ActionJobType -> checkValidate -> this.state.data", this.state.data)
        if (this.state.data.typeName && this.state.data.typeCode) {
            this.setState({ isOpen: true, isTypeShowConfirm: 'save', isTextMsg: msgPopupTitle.saved, isDataPopUp: this.state.data, valid_typeName: false, valid_typeCode: false })
        } else {
            if (!this.state.data.typeName) {
                console.log("TCL: ActionJobType -> checkValidate -> this.state.data.typeName", this.state.data.typeName)
                this.setState({ valid_typeName: true })
                // this.state.valid_typeName = true
            }
            if (!this.state.data.typeCode) {
                console.log("TCL: ActionJobType -> checkValidate -> this.state.data.typeCode", this.state.data.typeCode)
                this.setState({ valid_typeCode: true })
                // this.state.valid_typeCode = true
            }
            console.log("TCL: ActionJobType -> checkValidate -> this.state.valid_typeName", this.state.valid_typeName, this.state.isSubmit)
        }
    }

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
                            {this.state.params.action === 'create' ? <span className="breadcrum-custom">  Create Job type</span> : null}
                            {this.state.params.action === 'edit' ? <span className="breadcrum-custom">  Update Job type</span> : null}

                            {/* </Breadcrumb.Item> */}
                        </Breadcrumb>

                        <div className="wrap-content">
                            <div className="box-action">
                                <div className="box-title-search">
                                    <div className="box-action-content">
                                        {this.state.params.action === 'create' ? <p className="font-size-search">Create Job type</p> : null}
                                        {this.state.params.action === 'edit' ? <p className="font-size-search">Update Job type</p> : null}

                                        {/* Job Type Name */}
                                        <div className="row form-group">
                                            <div className={`col-5`} style={{ textAlign: 'right' }}><label className="title-field" for="txtJob Type Name">Job Type Name<span style={{ color: 'red' }}>*</span></label></div>
                                            <input type="text" class={`form-control col-3 ${this.state.valid_typeName && this.state.isSubmit ? 'has-error-input' : ''}`} id="txtJob Type Name" value={this.state.data.typeName} onChange={this.onTypeNameChange} />
                                        </div>


                                        {/* Code */}
                                        <div className="row form-group">
                                            <div className="col-5" style={{ textAlign: 'right' }}><label className="title-field" for="txtCode">Code <span style={{ color: 'red' }}>*</span></label></div>
                                            <input type="text" class={`form-control col-3 ${this.state.valid_typeCode && this.state.isSubmit ? 'has-error-input' : ''}`} id="txtCode" value={this.state.data.typeCode} onChange={this.onTypeCodeChange} />

                                        </div>

                                        <div style={{ textAlign: 'right' }}>

                                            <p className="title-field" ><span style={{ color: 'red' }}>*</span> Items marked with an asterisk are required</p>
                                        </div>

                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-12" style={{ textAlign: 'right' }}>
                                        {this.state.params.action !== 'view' ?
                                            <Link to='/jobtype'>
                                                <button class="btn-custom btn-reset" style={{ marginRight: 20 }} onClick={this.handleReset}>CANCEL</button>
                                            </Link>
                                            : null}

                                        {this.state.params.action !== 'view' ? <button class="btn-custom btn-search" style={{ marginRight: 20 }} onClick={() => {
                                            this.setState({ isSubmit: true })
                                            this.checkValidate()
                                        }}>
                                            {this.state.params.action === 'edit' ? 'UPDATE' : 'CREATE'}
                                        </button> : null}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* POPUP */}
            <AlertPopUp successStatus={this.state.isPopupSuccess} errorStatus={this.state.isPopupError} message={this.state.isPopupMsg} routeStatus={this.state.routeStatus}
                clearActive={() => {
                    
                    this.setState({ routeStatus: this.state.isPopupSuccess ? 'success' : 'error' });
                    // if (this.state.isPopupSuccess) {
                    //     console.log("TCL: this.state.isPopupSuccess", this.state.isPopupSuccess)
                    //     // <Route to='/jobtype' />
                        this.setState({ isPopupError: false });
                        this.setState({ isPopupSuccess: false });
                    //         // <Route path="/jobtype" />
                    //     // <Link to={`/jobtype`} activeClassName="active"></Link>
                    //     // return <Redirect push to="/jobtype" />;
                    //     return <Redirect to={'/jobtype'} />
                        
                    //     // history.push("/jobtype");
                    // } else {
                    //     return
                    // }
                }} />

            <ConfirmPopup open={this.state.isOpen} type={this.state.isTypeShowConfirm} text={this.state.isTextMsg} data={this.state.isDataPopUp} del={false}
                onClose={() => { this.setState({ isOpen: false }) }}
                clearActive={(e) => { this.setState({ isOpen: false }) }}
                confirmActive={(e) => {
                    this.setState({ isOpen: false })
                    this.setState({ isPopupError: false })
                    this.setState({ isPopupSuccess: true })
                    this.setState({ isPopupMsg: this.state.params.action === 'edit' ? msgAlertTitle.updated : msgAlertTitle.saved })
                    console.log("Work -> render -> e", e)
                }}
            />
        </>
        );
    }
}

export default ActionJobType;
