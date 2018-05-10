import React, { Component } from 'react'
import Card from './Card'
import imageData from '../helpers/imageData'

class CardArray extends Component {
  constructor() {
    super()
  }

  render() {
    let cardArray = [];

    for (let i = 0; i < 18; i++) {
      cardArray.push(
        <Card key={i}
              imageUrl={imageData[Math.floor(i/2)]}
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