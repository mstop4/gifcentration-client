import React, { Component } from 'react'
import '../../css/Card.css'

class Card extends Component {

  constructor() {
    super()
    this.state = {
      flipped: false,
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
            <img className="gif" src={this.props.imageUrl} alt={this.props.altText}/>
          </figure>
        </div>
      </section>
    );
  }
}

export default Card;