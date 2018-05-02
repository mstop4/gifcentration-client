import React, { Component } from 'react';
import '../../css/Card.css'

class Card extends Component {

  constructor() {
    super();
    this.state = {
      flipped: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault()
    this.setState({ flipped: !this.state.flipped }) 
    console.log("Flip")
  }

  render() {
    return (
      <section className="container">
        <div className={"body" + (this.state.flipped ? " flipped" : "")} onClick={this.handleClick}>
          <figure className="front">
            ?
          </figure>
          <figure className="back">
            <img className="gif" src="https://media0.giphy.com/media/Maz1hoeGskARW/200w.gif" alt="kitty"/>
          </figure>
        </div>
      </section>
    );
  }
}

export default Card;