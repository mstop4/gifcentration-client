import React, { Component } from 'react'
import MenuBar from './components/MenuBar'
import CardArray from './components/CardArray'
import '../css/App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      numPairs: 9,
      query: 'yoshi'
    }
  }

  render() {
    return (
      <div className="App">
        <MenuBar/>
        <CardArray
          numPairs={this.state.numPairs}
          query={this.state.query}
        />
      </div>
    );
  }
}

export default App;
