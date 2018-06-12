import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../css/Chip.css'

class TrendingChip extends Component {
  render() {
    return(
      <div 
        className="chip trending"
        onClick={() => this.props.handleClick(this.props.label)}
      >
        Trending
      </div>
    )
  }
}

TrendingChip.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func
}

export default TrendingChip