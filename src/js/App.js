import React, { Component } from 'react'
import CardArray from './components/CardArray'
//import logo from '../images/logo.svg';
import '../css/App.css'

class App extends Component {
  render() {

    return (
      <div className="App">
        <div className="title">
          <h1>Card Flipping Demo (Try Clicking!)</h1>
        </div>
        <CardArray
          numPairs={9}/>
      </div>
    );
  }
}

export default App;
