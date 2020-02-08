import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import writeUserData from './getInfo.js'

// const ROOMS = [{name: 'SN11', maxOcc: 10, currOcc: 1}, {name:'SN12',  maxOcc: 10, currOcc: 1}]
const ROOMS = ['SN11', 'SN12']

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'SN11',
      currOcc: null,
      maxOcc: null,
      rooms: []
    };
  }

  populate = (e) => {
    e.preventDefault();

    const roomRef = firebase.database().ref().child('Classroom')
    .child(this.state.location);
    const currOccRef = roomRef.child('currOcc');
    const maxOccRef = roomRef.child('maxOcc');
    maxOccRef.on('value', snap => {
      this.setState({
        maxOcc: snap.val()
      });
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

  handleSelectRoom = e => {
    e.preventDefault();
    console.log(e.target)
    const roomRef = firebase.database().ref().child('Classroom')
    .child(e.target.room);

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
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
        </header>
      </div>
    );
  }
}

export default App;
