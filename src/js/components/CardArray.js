import React, { Component } from 'react'
import Card from './Card'
import PropTypes from 'prop-types'
//import imageData from '../helpers/imageData'
import pairShuffler from '../helpers/pairShuffler' 

class CardArray extends Component {
  constructor() {
    super()
    this.state = {
      flipped: [],
      imageUrls: [],
      isLoaded: false,
      canLoad: true,
      error: null
    }

    this.numFlipped = 0
    this.cardIndices = null
    this.flippedIndices = [-1, -1]
    this.serverAddress = null

    this.handleCardFlip = this.handleCardFlip.bind(this)
  }

  componentDidMount() {
    this.serverAddress = process.env.REACT_APP_SERVER

    if (this.state.canLoad) {
      this.fetchGifs()
    }
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
      console.log('Flip')
    }
  }

  fetchGifs() {
    fetch(`${this.serverAddress}/gifme/json?query=${this.props.query}&limit=${this.props.numPairs}`)
    .then(res => res.json())
    .then(data => {
      if (data.length < this.props.numPairs) {
        this.setState({
          isLoaded: false,
          error: "Query did not return enough GIFs"
        })
      } else {
        this.cardIndices = pairShuffler(this.props.numPairs)

        let newFlipped = []
        for (let i = 0; i < this.props.numPairs*2; i++) {
          newFlipped.push(true)
        }
        this.setState({
          flipped: newFlipped,
          imageUrls: data,
          isLoaded: true,
          error: null
        })
      }
    },

    error => {
      console.dir(error)
      this.setState({
        isLoaded: false,
        error: error.message
      })
    }
  )}

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

  render() {
    if (this.state.error) {
      return <p>Problem getting GIFs from the server: {this.state.error}</p>
    } else {
      let cardArray = [];

      if (this.state.isLoaded) {
        for (let i = 0; i < this.props.numPairs*2; i++) {
          cardArray.push(
            <Card key={i}
                  index={i}
                  handleClick={this.handleCardFlip}
                  flipped={this.state.flipped[i]}
                  imageUrl={this.state.imageUrls[this.cardIndices[i]]}
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
  numPairs: PropTypes.number,
  query: PropTypes.string
}

export default CardArray