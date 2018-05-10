import React, { Component } from 'react'
import Card from './Card'
import PropTypes from 'prop-types'
import imageData from '../helpers/imageData'
import pairShuffler from '../helpers/pairShuffler' 

class CardArray extends Component {
  constructor() {
    super()
    this.state = {
      flipped: []
    }

    this.handleCardFlip = this.handleCardFlip.bind(this)
  }

  componentWillMount() {
    this.cardIndices = pairShuffler(this.props.numPairs)

    let newFlipped = []
    for (let i = 0; i < this.props.numPairs*2; i++) {
      newFlipped.push(false)
    }
    this.setState({flipped: newFlipped})
  }

  handleCardFlip(index, e) {
    e.preventDefault()

    if (!this.state.flipped[index]) {
      let newFlipped = this.state.flipped
      newFlipped[index] = true
      this.setState({flipped: newFlipped})
      console.log('Flip')
    }
  }

  render() {
    let cardArray = [];

    for (let i = 0; i < this.props.numPairs*2; i++) {
      cardArray.push(
        <Card key={i}
              index={i}
              handleClick={this.handleCardFlip}
              flipped={this.state.flipped[i]}
              imageUrl={imageData[this.cardIndices[i]]}
              altText='kitty'
      />);
    }

    return (
      <div>
        {cardArray}
      </div>
    )
  }
}

CardArray.propTypes = {
  numPairs: PropTypes.number
}

export default CardArray