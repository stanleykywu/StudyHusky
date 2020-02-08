import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import {ContainerComponent, DropdownComponent2} from './Components/ContainerComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'SN null',
      currOcc: null,
      maxOcc: null
    };
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange(locVal) {
    this.setState({location : locVal} , () => {
      console.log(this.state.location);
    })
  }

  populate = (e) => {
    // e.preventDefault();
    console.log(this.state)
    const roomRef = firebase.database().ref().child('Classroom')
    .child(this.state.location);
    const currOccRef = roomRef.child('currOcc');
    const maxOccRef = roomRef.child('maxOcc');
    maxOccRef.on('value', snap => {
      this.setState({
        maxOcc: snap.val()
      }, () => {console.log("please work", snap.val())})
    });

    currOccRef.on('value', snap => {
      this.setState({
        currOcc: snap.val()
      });
    });
  }

  handleSubmitAdd = (e) => {
    e.preventDefault();
    if (this.state.currOcc == this.state.maxOcc) {
      alert('Max occupency reached')
    }
    else {
      firebase.database().ref().child('Classroom').child(this.state.location).update({
        currOcc: this.state.currOcc + 1
      });
    }
  }

  handleSubmitSub = (e) => {
    e.preventDefault();
    if (this.state.currOcc == 0) {
      alert('There is nobody in this room');
    }
    else {
      firebase.database().ref().child('Classroom').child(this.state.location).update({
        currOcc: this.state.currOcc - 1
      });
    }
  }

  render() {
    return (
      <div className="App">
        {/*}<header className="App-header">
        <button onClick=
        {this.populate}
        >Populate</button>
        <button onClick=
        {this.handleSubmitAdd}
        >Occupy</button>
        <button onClick=
        {this.handleSubmitSub}
        >Leave</button>
        <p>
        {this.state.currOcc}
        </p>
        <p>
        {this.state.maxOcc}
        </p>
        </header>*/}
        <ContainerComponent onLocChange = {this.handleLocationChange}
          populate = {this.populate} submitAdd = {this.handleSubmitAdd}
          />
      </div>
    );
  }
}

export default App;
