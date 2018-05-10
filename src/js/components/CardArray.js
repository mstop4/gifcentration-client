import React, { Component } from 'react'
import Card from './Card'
import imageData from '../helpers/imageData'
import pairShuffler from '../helpers/pairShuffler' 

class CardArray extends Component {
  constructor() {
    super()
  }

  render() {
    let cardArray = [];
    let cardIndices = pairShuffler(this.props.numPairs)

    for (let i = 0; i < this.props.numPairs*2; i++) {
      cardArray.push(
        <Card key={i}
              imageUrl={imageData[cardIndices[i]]}
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

export default CardArray