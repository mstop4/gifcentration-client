import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../css/Chip.css'

class PopSearchChip extends Component {
  render() {
    return(
      <div 
        className="chip popSearch"
        onClick={() => this.props.handleClick(this.props.label)}
      >
        {this.props.label}
      </div>
    )
  }
}

PopSearchChip.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func
}

export default PopSearchChip