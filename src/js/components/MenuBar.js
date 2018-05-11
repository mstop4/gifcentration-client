import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MenuBar extends Component {

  render() {
    return (
      <div className="menubar">
        <span className="title">GIFcentration</span>
        <button className="newgame">New Game</button>
      </div>
    )
  }
}

export default MenuBar