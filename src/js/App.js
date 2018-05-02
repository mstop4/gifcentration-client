import React, { Component } from 'react';
import Card from './components/Card';
//import logo from '../images/logo.svg';
import '../css/App.css';

class App extends Component {
  render() {
    let cardArray = [];

    for (let i = 0; i < 18; i++) {
      cardArray.push(<Card key={i}/>);
    }

    return (
      <div className="App">
        <div className="title">
          <h1>Card Flipping Demo (Try Clicking!)</h1>
        </div>
        {cardArray}
      </div>
    );
  }
}

export default App;
