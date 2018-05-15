import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../css/MenuBar.css'

class MenuBar extends Component {

  render() {
    return (
      <div className="menubar">
        <div className="menubar-left">
          <h1>GIFcentration</h1> <h2>v.0.3.1</h2>
        </div>
        <div className="menubar-right">
          <button className="newgame" onClick={this.props.handleToggleQuery}><i className="fas fa-search"></i></button>
        </div>
      </div>
    )
  }
}

MenuBar.propTypes = {
  handleToggleQuery: PropTypes.func
}

export default MenuBar