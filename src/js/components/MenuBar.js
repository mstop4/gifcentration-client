import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewGameButton from './NewGameButton'

class MenuBar extends Component {

  render() {
    return (
      <div className="menubar">
        <span className="title">GIFcentration</span>
        <NewGameButton/>
      </div>
    )
  }
}

export default MenuBar