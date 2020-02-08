import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floor: null
    };
  }

  //this is called after inital DOM
  componentWillMount() {
    const floorRef = firebase.database().ref().child('Classroom').child('SN11').child('floor');
    floorRef.on('value', snap => {
      this.setState({
        floor: snap.val(),
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    firebase.database().ref().child('Classroom').child('SN11').update({
      occupied: 'vv',
      section: 'A14',
      floor: 1
    });

 }

  render() {
    return (
      <div className="App">
        <head>
          <script src="https://cdn.firebase.com/js/client/2.4.2/firebase.js"></script>
        </head>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={this.handleSubmit} >Occupied/Leave</button>
          <p>
            {this.state.floor}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
