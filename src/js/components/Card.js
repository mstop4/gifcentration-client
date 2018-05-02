import React, { Component } from 'react';
import '../../css/Card.css'

class Card extends Component {
  render() {
    return (
      <section class="container">
        <div class="body">
          <figure class="front">
            ?
          </figure>
          <figure class="back">
            <img src="https://media0.giphy.com/media/Maz1hoeGskARW/200w.gif" alt="kitty"/>
          </figure>
        </div>
      </section>
    );
  }
}

export default Card;