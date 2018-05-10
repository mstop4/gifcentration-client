import React, { Component } from 'react'
import CardArray from './components/CardArray'
//import logo from '../images/logo.svg';
import '../css/App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      numPairs: 9
    }
  }

  render() {
    return (
      <div className="App">
        <div className="title">
          <h1>GIFcentration with Cats (Try Clicking!)</h1>
        </div>
        <CardArray
          numPairs={this.state.numPairs}/>
      </div>
    );
  }
}

export default App;
