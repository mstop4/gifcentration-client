import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../css/MenuBar.css'

class MenuBar extends Component {

  render() {
    return (
      <div className="menubar">
        <div className="menubar-left">
          <h1>GIFcentration</h1>
        </div>
        <div className="menubar-right">
          <button className="newgame" onClick={this.props.handleToggleQuery}>New Game</button>
        </div>
      </div>
    )
  }
}

MenuBar.propTypes = {
  handleToggleQuery: PropTypes.func
}

export default MenuBar