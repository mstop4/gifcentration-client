import React, { Component } from 'react';
import Card from './components/Card';
import logo from '../images/logo.svg';
import '../css/App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isFlipped: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({ isFlipped: !this.state.isFlipped })
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}

export default App;
