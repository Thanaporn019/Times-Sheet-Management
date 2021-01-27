import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import _ from "lodash";
import moment from 'moment';
const IconExitRegular = (props) => <svg aria-hidden="true" style={props.style} focusable="false" data-prefix="far" data-icon="window-close" class="svg-inline--fa fa-window-close fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"></path></svg>
const IconSaveRegular = (props) => <svg aria-hidden="true" style={props.style} focusable="false" data-prefix="far" data-icon="save" class="svg-inline--fa fa-save fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"></path></svg>
const IconWarning = (props) => <svg aria-hidden="true" style={props.style} focusable="false" data-prefix="fas" data-icon="exclamation-triangle" class="svg-inline--fa fa-exclamation-triangle fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>
const IconCheckRegular = (props) => <svg aria-hidden="true" style={props.style} focusable="false" data-prefix="far" data-icon="check-square" class="svg-inline--fa fa-check-square fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"></path></svg>
const IconTrash = (props) => <svg aria-hidden="true" style={props.style} focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>

const ConfirmPopup = (props) => {
    // console.log(`auto boost: ConfirmPopup -> props`, props)
    const isOpen = (props.open);
    const isPopupType = (props.type);
    const isDel = (props.del);

    const setIsOpen = () => {
        props.onClose()
    }
    const confirmActive = () => {
        props.confirmActive(props.data)
    }
    return (<>



        <Modal centered
            footer={null}
            header={null}
            visible={isOpen}
            width={650}
            closable={false}
            onOk={() => {
                setIsOpen(false)
            }}
        >
            {isPopupType === 'save' ?
                <div>
                    <div style={{ textAlign: 'center' , margin: 40}}>
                        <p className="popup-title save" style={{ color: '#38B000' }}> Confirm </p>
                        <p className="popup-sub-title"> {props.text}</p>
                        <div style={{ textAlign: 'center', position: 'relative', top: 20 }}>
                            <div className="row">
                                <div className="col-6" style={{textAlign:'end'}}>
                                    <button className="btn-custom btn-reset" htmlType="submit" onClick={() => { props.clearActive() }} >
                                        No
                            </button>
                                </div>
                                <div className="col-6" style={{textAlign:'start'}}>
                                    <button className="btn-custom success" style={{ background: '#38B000' }} onClick={() => {
                                        confirmActive()
                                    }}>
                                        Yes
                            </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                
                : <div>
                <div style={{ textAlign: 'center' , margin: 40}}>
                    <p className="popup-title del" style={{ color: 'red' }}> Confirm </p>
                    <p className="popup-sub-title"> {props.text}</p>
                    <div style={{ textAlign: 'center', position: 'relative', top: 20 }}>
                        <div className="row">
                            <div className="col-6" style={{textAlign:'end'}}>
                                <Button className="btn-custom  btn-reset"  onClick={() => { props.clearActive() }} >
                                    No
                        </Button>
                            </div>
                            <div className="col-6" style={{textAlign:'start'}}>
                                <Button htmlType="submit" className="btn-custom error" style={{ background: 'red' }} onClick={() => {
                                    confirmActive()
                                }}>
                                    Yes
                        </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            }
        </Modal>
    </>)

}
export default ConfirmPopup;