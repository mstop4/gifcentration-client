import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../css/Card.css'

class Card extends Component {
  constructor() {
    super()
    this.handleCardClick = this.handleCardClick.bind(this)
    this.handleLinkClick = this.handleLinkClick.bind(this)
  }

  handleCardClick(e) {
    if (this.props.active) {
      this.props.handleClick(this.props.index, e)
    }
  }

  handleLinkClick(e) {
    if (!this.props.matched) {
      e.preventDefault()
    }
  }

  render() {
    return (
      <section className="card-container">
        <div className={"card-body" + (this.props.active ? " card-active" : " card-inactive") + (this.props.flipped ? " flipped" : "")} onClick={this.handleCardClick}>
          <figure className="front">
            <i className="fas fa-question"></i>
          </figure>
          <figure className={"back" + (this.props.matched ? " matched" : "")}>
            <a href={this.props.imageUrl ? `https://giphy.com/gifs/${this.props.imageUrl.id}` : ''} target="_blank" onClick={this.handleLinkClick}>
              <img 
                className="card-gif"
                src={this.props.imageUrl ? this.props.imageUrl.url : ''}
                alt={this.props.imageUrl ? this.props.imageUrl.id : 'No Image'}
              />
            </a>
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
  matched: PropTypes.bool,
  imageUrl: PropTypes.object,
}

export default Card;