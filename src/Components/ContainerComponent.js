import React, { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col, Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {ButtonDropdown} from "reactstrap";


class ContainerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      occupied: false,
      room: 'Select room'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
  }



  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state.id);
    });
  }

  handleSubmit(e) {
    this.setState({ occupied: true}, () => {
      alert(this.state.room + ' ' + this.state.id);
    });
    //this.props.onLocChange(this.state.room);
    this.props.populate(e);
    e.preventDefault();
  }

  handleRoomChange(roomVal) {
    this.setState({ room: roomVal }, () => {
      this.props.onLocChange(this.state.room);
    });
  }

  render() {
    return (
      <div className='m-5'>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Please enter your NUID</Label>
            <Input type="text" name="id" placeholder="000000000" onChange={(this.handleChange)}/>
          </FormGroup>
          {!this.state.occupied && <DropdownComponent2 onRoomChange={this.handleRoomChange} roomNumber={this.state.room}/>}
          {this.state.occupied && <Alert color="success">Occupied!</Alert>}
          {!this.state.occupied && <Button type="submit" color="success">Occupy this room</Button>}
        </Form>
      </div>
    );
  }
}

class DropdownComponent2 extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      dropDownValue: 'Select location',
      dropdownOpen: false
    };
  }

  toggle(event) {

    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  changeValue(e) {
    this.props.onRoomChange(e.currentTarget.textContent);
    // this.setState({dropDownValue: e.currentTarget.textContent}, () => {
    //     console.log(this.state.dropDownValue);
    // });
    // this.setState({dropDownValue: e.currentTarget.textContext}, () => {
    //         this.props.onRoomChange(e.currentTarget.textContent);
    //     })
  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret color="primary">
          {this.props.roomNumber}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.changeValue}>SN11</DropdownItem>
          <DropdownItem onClick={this.changeValue}>SN12</DropdownItem>
          <DropdownItem onClick={this.changeValue}>SN13</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }

}

export {ContainerComponent, DropdownComponent2};
