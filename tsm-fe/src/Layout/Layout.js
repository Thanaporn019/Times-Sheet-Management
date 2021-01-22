
import { render } from "less";
import React, { useState, useEffect } from "react";
// import "../styles/layout.css"
const Layout = (props) => {
  return (
    <>
      <div class="flexContainer flexColumn fullHeight">
        <LayoutHeader />
        <LayoutBody>
          {props.children}
        </LayoutBody >
      </div>
    </>
  )
}

const LayoutHeader = (props) => {
  return (
    <>

      <nav className="nav-header split">
        <div className="nav-left">
          <a className="">maekha.in.th</a>
        </div>
        <div className="nav-right">
          <div className="burger-box">
            <div className="menu-btn-burger">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="nav-sign">
            <div className="sign-box">
              <a className=""><i>1</i><span>ลงทะเบียน</span></a>
            </div>
            <div className="sign-box">
              <a className=""><i>2</i><span>เข้าสู่ระบบ</span></a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

const LayoutBody = (props) => {
  return (
    <>
      <div className="bodyContainer ">
        <aside className="sidebar-x  flexRow">
          <div class="flexContainer flexCenter user-panel">

            <div class="left-image">
              <img src='https://app.maekha.in.th/img/user.png' alt="user" />
            </div>

            <div class="left-info flexContainer flexRow flexItem">
              <div>บุคคลทั่วไป</div>
              <a href="#"><i class="fa fa-circle text-success" >•</i><span>Online</span></a>
            </div>

          </div>


          <ul className="nav-menu">
            <li className="">
              <a>
                <i>1</i><span>หน้าแรก</span>
              </a>
            </li>
            <li className="">
              <a>
                <i>2</i><span>บริการทั้งหมด</span>
              </a>
            </li>
            <li className="active">
              <a>
                <i>3</i><span>คู่มือการใช้งาน</span>
              </a>
            </li>
            <li className="">
              <a>
                <i>4</i><span>ติดต่อเรา</span>
              </a>
            </li>
          </ul>
        </aside>
        <main className="mainContainer">
          <div className="content">
            <div className="head-content">
              <div className='left-content'>
                <div style={{ marginRight: '5px' }}>
                  12
                </div>
                <h1>
                  {'เข้าสู่ระบบ'}
                </h1>
              </div>
              <div className='right-content'>
                <a>{'หน้าหลัก'}</a> {' > '} <a>{'เข้าสู่ระบบ'}</a>
              </div>
            </div>
            <div className="box-children">{props.children}</div>
          </div>
          <div className="bar-footer">
            <div>Copyright © 2018 maekha.in.th. All Rights Reserved.</div>
            <div>เวอร์ชัน 1.0.</div>
          </div>
        </main>
      </div>

    </>
  )
}


export default Layout;