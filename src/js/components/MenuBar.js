import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../css/MenuBar.css'

class MenuBar extends Component {

  constructor() {
    super()

    this.handleWindowResize = this.handleWindowResize.bind(this)
  }

  componentWillMount() {
    this.handleWindowResize()
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('orientationchange', this.handleWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('orientationchange', this.handleWindowResize)
  }

  handleWindowResize() {
    const w = window
    const doc = document
    const docElem = doc.documentElement
    const menubarElems = doc.getElementsByClassName('menubar')

    if (menubarElems.length > 0) {
      const menubarStyles = w.getComputedStyle(menubarElems[0])

      if (menubarStyles) {
        docElem.style.setProperty('--menubar-height', menubarStyles.height)
      }
    }
  }

  render() {
    return (
      <div className="menubar">
        <div className="menubar-left">
          <h1>GIFcentration</h1> <h2>beta</h2>
        </div>
        <div className="menubar-right">
          <button className="newgame" onClick={this.props.handleQueryToggle}><i className="fas fa-search"></i></button>
        </div>
      </div>
    )
  }
}

MenuBar.propTypes = {
  handleQueryToggle: PropTypes.func
}

export default MenuBar