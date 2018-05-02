import React, { Component } from 'react';
import '../../css/Card.css'

class Card extends Component {
  render() {
    return (
      <section class="container">
        <div class="body">
          <figure class="front">1</figure>
          <figure class="back">2</figure>
        </div>
      </section>
    );
  }
}

export default Card;