import React, { Component } from 'react'
import Card from './Card'
import PropTypes from 'prop-types'
import pairShuffler from '../helpers/pairShuffler'
import '../../css/CardArray.css'

const checkDelay = 1000;

class CardArray extends Component {
  constructor() {
    super()
    this.state = {
      flipped: [],
      matched: []
    }

    this.numFlipped = 0
    this.cardIndices = null
    this.flippedIndices = [-1, -1]

    this.handleCardFlip = this.handleCardFlip.bind(this)
    this.checkPair = this.checkPair.bind(this)
  }

  componentWillMount() {
    this.resetCards()
  }

  handleCardFlip(index, e) {
    if (!this.state.flipped[index] && this.numFlipped < 2) {
      let newFlipped = this.state.flipped
      newFlipped[index] = true

      this.flippedIndices[this.numFlipped] = index
      this.numFlipped++

      if (this.numFlipped >= 2) {
        setTimeout(this.checkPair, checkDelay)
      }

      this.setState({
        flipped: newFlipped
      })
    }
  }

  checkPair() {
    if (this.cardIndices[this.flippedIndices[0]] === this.cardIndices[this.flippedIndices[1]]) {
      console.log("Match!")
      let newMatched = this.state.matched
      newMatched[this.flippedIndices[0]] = true
      newMatched[this.flippedIndices[1]] = true
      this.setState({ matched: newMatched })
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
    this.numFlipped = 0
    this.flippedIndices = [-1, -1]
    this.cardIndices = pairShuffler(this.props.numPairs)

    let newFlipped = []
    for (let i = 0; i < this.props.numPairs*2; i++) {
      newFlipped.push(false)
    }

    let newMatched = JSON.parse(JSON.stringify(newFlipped))

    this.setState({ 
      flipped: newFlipped,
      matched: newMatched
    })
  }

  render() {
    if (this.props.loadError) {
      return <p>Problem getting GIFs from the server: {this.props.loadError}</p>
    } else {
      let cardArray = [];

      for (let i = 0; i < this.props.numPairs*2; i++) {
        cardArray.push(
          <Card key={i}
                index={i}
                handleClick={this.handleCardFlip}
                flipped={this.state.flipped[i]}
                matched={this.state.matched[i]}
                active={this.props.isAllLoaded}
                imageUrl={this.props.imageUrls[this.cardIndices[i]]}
        />)
      }

      return (
        // <div className="array-wrapper">
          <div className="array-container">
            {cardArray}
          </div>
        // </div>
      )
    }
  }
}

CardArray.propTypes = {
  isAllLoaded: PropTypes.bool,
  loadError: PropTypes.string,
  imageUrls: PropTypes.array,
  numPairs: PropTypes.number,
}

export default CardArray