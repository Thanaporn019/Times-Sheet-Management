// import React from 'react';
import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from './JobType/Head';
// import Dashboard from './JobType/Dashboard';
import { BsFillCalendarFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { AiOutlineStepBackward } from "react-icons/ai";
import { AiFillStepForward } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
// import { handleShow } from "module";
// import { show } from "module";
// import { handleClose } from "module";



import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Paging,
  SearchPanel,
} from 'devextreme-react/data-grid';
import CheckBox from 'devextreme-react/check-box';
import { customers } from './Work/data';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
class Test extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      autoExpandAll: true
    };

    this.onAutoExpandAllChanged = this.onAutoExpandAllChanged.bind(this);
  }

  render() {
    return (
    

      <div>
        <DataGrid
          dataSource={customers}
          allowColumnReordering={true}
          showBorders={true}
        >
          <GroupPanel visible={true} />
          <SearchPanel visible={true} />
          <Grouping autoExpandAll={this.state.autoExpandAll} />
          <Paging defaultPageSize={10} />

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

        <div className="options">
          <div className="caption">Options</div>
          <div className="option">
            <CheckBox text="Expand All Groups"
              value={this.state.autoExpandAll}
              onValueChanged={this.onAutoExpandAllChanged} />
          </div>
        </div>
      </div>
    );
  }

  onAutoExpandAllChanged() {
    this.setState({
      autoExpandAll: !this.state.autoExpandAll


    });
  }
}


export default Test;