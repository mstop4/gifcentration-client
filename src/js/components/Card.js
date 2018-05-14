import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../css/Card.css'

class Card extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    if (this.props.active) {
      this.props.handleClick(this.props.index, e)
    }
  }

  render() {
    return (
      <section className="card-container">
        <div className={"card-body" + (this.props.active ? " card-active" : " card-inactive") + (this.props.flipped ? " flipped" : "")} onClick={this.handleClick}>
          <figure className="front">
            <i className="fas fa-question"></i>
          </figure>
          <figure className="back">
            <img 
              className="card-gif"
              src={this.props.imageUrl}
              alt={this.props.altText}
            />
          </figure>
        </div>
      </section>
    );
  }
}

Card.propTypes = {
  index: PropTypes.number,
  active: PropTypes.bool,
  handleClick: PropTypes.func,
  flipped: PropTypes.bool,
  imageUrl: PropTypes.string,
  altText: PropTypes.string
}

export default Card;