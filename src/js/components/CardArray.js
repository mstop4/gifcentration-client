import React, { Component } from 'react'
import Card from './Card'
import PropTypes from 'prop-types'
import pairShuffler from '../helpers/pairShuffler'

class CardArray extends Component {
  constructor() {
    super()
    this.state = {
      flipped: [],
    }

    this.numFlipped = 0
    this.cardIndices = null
    this.flippedIndices = [-1, -1]

    this.handleCardFlip = this.handleCardFlip.bind(this)
    this.checkPair = this.checkPair.bind(this)
  }

  componentDidMount() {
    this.resetCards()
    this.cardIndices = pairShuffler(this.props.numPairs)
  }

  handleCardFlip(index, e) {
    e.preventDefault()

    if (!this.state.flipped[index] && this.numFlipped < 2) {
      let newFlipped = this.state.flipped
      newFlipped[index] = true

      this.flippedIndices[this.numFlipped] = index
      this.numFlipped++

      if (this.numFlipped >= 2) {
        setTimeout(this.checkPair, 1500)
      }

      this.setState({
        flipped: newFlipped
      })
    }
  }

  checkPair() {
    if (this.cardIndices[this.flippedIndices[0]] === this.cardIndices[this.flippedIndices[1]]) {
      console.log("Match!")
    } else {
      console.log("No Match!")
      let newFlipped = this.state.flipped
      newFlipped[this.flippedIndices[0]] = false
      newFlipped[this.flippedIndices[1]] = false
      this.setState({flipped: newFlipped})
    }

    this.numFlipped = 0
  }

  resetCards() {
    let newFlipped = []
    for (let i = 0; i < this.props.numPairs*2; i++) {
      newFlipped.push(false)
    }

    this.setState({ flipped: newFlipped })
  }

  render() {
    if (this.props.loadError) {
      return <p>Problem getting GIFs from the server: {this.props.loadError}</p>
    } else {
      let cardArray = [];

      if (this.props.isLoaded) {
        for (let i = 0; i < this.props.numPairs*2; i++) {
          cardArray.push(
            <Card key={i}
                  index={i}
                  handleClick={this.handleCardFlip}
                  flipped={this.state.flipped[i]}
                  imageUrl={this.props.imageUrls[this.cardIndices[i]]}
                  altText='kitty'
          />)
        }
      }

      return (
        <div>
          {cardArray}
        </div>
      )
    }
  }
}

CardArray.propTypes = {
  isLoaded: PropTypes.bool,
  loadError: PropTypes.string,
  imageUrls: PropTypes.array,
  numPairs: PropTypes.number
}

export default CardArray