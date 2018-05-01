import React, { Component } from 'react';
import '../../css/Card.css'

class Card extends Component {
  render() {
    return (
      <div>
      <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
        <div class="flipper">
          <div class="front">
            Front
          </div>
          <div class="back">
            Back
          </div>
        </div>
      </div>
      <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
        <div class="flipper">
          <div class="front">
            Front
          </div>
          <div class="back">
            Back
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Card;