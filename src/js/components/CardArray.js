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

    this.numFlipped = 0
    this.cardIndices = null
    this.flippedIndex = [-1, -1]

    this.handleCardFlip = this.handleCardFlip.bind(this)
    this.checkPair = this.checkPair.bind(this)
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

    if (!this.state.flipped[index] && this.numFlipped < 2) {
      let newFlipped = this.state.flipped
      newFlipped[index] = true

      this.flippedIndex[this.numFlipped] = index
      this.numFlipped++

      if (this.numFlipped >= 2) {
        setTimeout(this.checkPair, 1500)
      }

      this.setState({
        flipped: newFlipped
      })
      console.log('Flip')
    }
  }

  checkPair() {
    if (this.cardIndices[this.flippedIndex[0]] === this.cardIndices[this.flippedIndex[1]]) {
      console.log("Match!")
    } else {
      console.log("No Match!")
      let newFlipped = this.state.flipped
      newFlipped[this.flippedIndex[0]] = false
      newFlipped[this.flippedIndex[1]] = false
      this.setState({flipped: newFlipped})
    }

    this.numFlipped = 0
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