import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import writeUserData from './getInfo.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      maxOcc: 0
    };
  }

  //this is called after inital DOM
  componentWillMount() {
    const roomRef = firebase.database().ref().child('Classroom').child('SN11');
    const locationRef = roomRef.child('location');
    const maxOccRef = roomRef.child('maxOcc');

    maxOccRef.on('value', snap => {
      this.setState({
        maxOcc: snap.val(),
      });
    });
}

 //  handleSubmit(e) {
 //    e.preventDefault();
 //
 //    var x = hello();
 //
 //    firebase.database().ref().child('Classroom').child('SN11').update({
 //      location: 'SN11',
 //      maxOcc: x + 1
 //    });
 //
 // }

  render() {
    return (
      <div className="App">
        <head>
          <script src="https://cdn.firebase.com/js/client/2.4.2/firebase.js"></script>
        </head>
        <header className="App-header">
          <button onClick=
            {this.setState({
              location: this.state.location,
              maxOcc: this.state.maxOcc + 1
            })}
            >Occupied/Leave</button>
          <p>
            {this.state.floor}
          </p>
          <p>
            {this.state.occupied}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
