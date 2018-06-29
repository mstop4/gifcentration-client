import React, { Component } from 'react'
import Card from './Card'
import Confetti from './Confetti'
import PropTypes from 'prop-types'
import pairShuffler from '../helpers/pairShuffler'
import '../../css/CardArray.css'

const checkDelay = 1000

class CardArray extends Component {
  constructor() {
    super()
    this.state = {
      flipped: [],
      matched: [],
      gameFinished: false
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
    // Match
    if (this.cardIndices[this.flippedIndices[0]] === this.cardIndices[this.flippedIndices[1]]) {
      let newMatched = this.state.matched
      newMatched[this.flippedIndices[0]] = true
      newMatched[this.flippedIndices[1]] = true
      this.setState({ matched: newMatched })

      if (!newMatched.includes(false)) {
        setTimeout(() => this.setState({gameFinished: true}), 500)
      }
    } 
    
    // No match
    else {
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
    for (let i = 0; i < this.props.numPairs * 2; i++) {
      newFlipped.push(false)
    }

    let newMatched = JSON.parse(JSON.stringify(newFlipped))

    this.setState({
      flipped: newFlipped,
      matched: newMatched,
      gameFinished: false
    })
  }

  render() {
    let cardArray = []

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
      <div className="card-array">
        <Confetti
          appWidth={this.props.appWidth}
          appHeight={this.props.appHeight}
          active={this.state.gameFinished}
        />
        <div className="array-container">
          {cardArray}
        </div>
      </div>
    )
  }
}

CardArray.propTypes = {
  appWidth: PropTypes.number,
  appHeight: PropTypes.number,
  isAllLoaded: PropTypes.bool,
  fetchStatus: PropTypes.string,
  imageUrls: PropTypes.array,
  numPairs: PropTypes.number,
}

export default CardArray