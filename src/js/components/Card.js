import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../css/Card.css'

class Card extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.props.handleClick(this.props.index, e)
  }

  render() {
    return (
      <section className="container">
        <div className={"body" + (this.props.flipped ? " flipped" : "")} onClick={this.handleClick}>
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

Card.propTypes = {
  index: PropTypes.number,
  handleClick: PropTypes.func,
  flipped: PropTypes.bool,
  imageUrl: PropTypes.string,
  altText: PropTypes.string
}

export default Card;