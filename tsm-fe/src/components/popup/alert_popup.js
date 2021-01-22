import React, { useEffect, useState } from "react";
import { Button, List, Avatar, Row, Col, Tooltip, Form, TimePicker, Modal, Pagination, Select } from "antd";
import _ from "lodash";
import moment from 'moment';
import { BsExclamationTriangle } from "react-icons/bs";


const IconCorrect = (props) => <svg aria-hidden="true" style={props.style} focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
const IconInCorrect = (props) => <svg aria-hidden="true" style={props.style} focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
const AlertPopUp = (props) => {
    const isPopupSuccess = (props.successStatus);
    const isPopupError = (props.errorStatus);
    const isPopupLoading = (props.loadingStatus);
    const msg = (props.message);
    useEffect(() => {
        // getProductItem()
    }, []);
    const setIsPopupError = () => {
        props.onClose()
    }
    const setIsPopupSuccess = () => {
        props.onClose()
    }

    const setIsPopupLoading = () => {
        props.onClose()
    }

    return (<>
        <Modal centered
            footer={null}
            header={null}
            visible={isPopupError}
            width={500}
            closable={true}
            onOk={() => {
                setIsPopupError(false);
            }}
            onCancel={() => {
                setIsPopupError(false)
            }}>

            {isPopupError ? <>
                <div style={{ textAlign: 'center' }}>
                        <div className="popup-icon-error" style={{ display: 'flow-root', textAlign: 'center', justifyContent: 'center' }}>
                            <IconInCorrect style={{ width: '75px', color: '#fff', top: 10, position: 'relative' }} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p className="popup-title"> System Error </p>
                            <p className="popup-sub-title"> {msg ? msg : ''} </p>
                        <div style={{ textAlign: 'center' }} className="row">
                            <button className="btn btn-popup-error">OK</button>
                        </div>
                        </div>
                    </div>

                <div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flow-root', textAlign: 'center', justifyContent: 'center' }}>
                            {isPopupError ? <IconInCorrect style={{ width: '75px', color: 'red' }} /> : null}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: 17, marginTop: 15, marginBottom: 15 }}> {msg !== 'error' ? msg : 'เกิดข้อผิดพลาด! กรุณาลองใหม่อีกครั้ง'} </p>

                        </div>
                    </div>
                </div>
            </> : null}
        </Modal>


        <Modal centered
            footer={null}
            header={null}
            visible={isPopupSuccess}
            width={500}
            closable={false}
            onOk={() => {
                setIsPopupSuccess(false)
            }}
            onCancel={() => {
                setIsPopupSuccess(false)
            }}>

            {isPopupSuccess ? <>
                    <div style={{ textAlign: 'center' }}>
                        <span className="popup-icon-success" style={{ display: 'flow-root', textAlign: 'center', justifyContent: 'center' }}>
                            <IconCorrect style={{ width: '75px', color: '#fff', top: 10, position: 'relative' }} />
                        </span>
                        <div style={{ textAlign: 'center', bottom: 32, position: 'relative' }}>
                            <p className="popup-title"> Success </p>
                            <p className="popup-sub-title"> {msg ? msg : ''} </p>
                        <div style={{ textAlign: 'center' , position: 'relative', top: 20}}>
                            <button className="btn btn-popup-success">OK</button>
                        </div>
                        </div>
                    </div>
            </> : null}
        </Modal>


        <Modal centered
            footer={null}
            header={null}
            visible={isPopupLoading}
            width={500}
            closable={false}
            onOk={() => {
                setIsPopupLoading(false)
            }}
            onCancel={() => {
                setIsPopupLoading(false)
            }}>

            {isPopupLoading ? <>
                <div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flow-root', textAlign: 'center', justifyContent: 'center' }}>
                            {isPopupLoading ? <BsExclamationTriangle style={{ color: 'rgb(226 189 82)', fontSize: '75px' }} /> : null}
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: 17, marginTop: 15, marginBottom: 15 }}>
                                {msg ? <span dangerouslySetInnerHTML={{ __html: msg }}></span> : ''} </p>

                        </div>
                    </div>
                </div>
            </> : null}
        </Modal>


    </>)
};

export default AlertPopUp;
