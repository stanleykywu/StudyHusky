import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import writeUserData from './getInfo.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currOcc: 0,
      maxOcc: 0
    };
  }

  //this is called after inital DOM
  componentWillMount() {
    const roomRef = firebase.database().ref().child('Classroom').child('SN11');
    const currRef = roomRef.child('currOcc');
    const maxOccRef = roomRef.child('maxOcc');

    maxOccRef.on('value', snap => {
      this.setState({
        maxOcc: snap.val(),
      });
    });

    currRef.on('value', snap => {
      this.setState({
        currOcc: snap.val()
      });
    });
}

  handleSubmitAdd = (e) => {
    e.preventDefault();
    firebase.database().ref().child('Classroom').child('SN11').update({
      location: this.state.location,
      maxOcc: this.state.curOcc + 1
    });
 }

 handleSubmitSub = (e) => {
   e.preventDefault();
   firebase.database().ref().child('Classroom').child('SN11').update({
     location: this.state.location,
     maxOcc: this.state.curOcc - 1
   });
}

  render() {
    return (
      <div className="App">

        <header className="App-header">
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
