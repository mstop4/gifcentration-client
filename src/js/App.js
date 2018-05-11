import React, { Component } from 'react'
import CardArray from './components/CardArray'
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
          <h1>GIFcentration</h1>
        </div>
        <CardArray
          numPairs={this.state.numPairs}
          query={'yoshi'}
        />
      </div>
    );
  }
}

export default App;
