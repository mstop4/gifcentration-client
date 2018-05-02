import React, { Component } from 'react';
import Card from './components/Card';
//import logo from '../images/logo.svg';
import '../css/App.css';

class App extends Component {
  render() {
    let cardArray = [];

    for (let i = 0; i < 18; i++) {
      cardArray.push(<Card/>);
    }

    return (
      <div className="App">
        {cardArray}
      </div>
    );
  }
}

export default App;
