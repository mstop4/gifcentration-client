import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MenuBar extends Component {

  render() {
    return (
      <div className="menubar">
        <span className="title">GIFcentration</span>
        <button className="newgame" onClick={this.props.handleNewGame}>New Game</button>
      </div>
    )
  }
}

MenuBar.propTypes = {
  handleNewGame: PropTypes.func
}

export default MenuBar