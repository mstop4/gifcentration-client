import React from 'react'
import PropTypes from 'prop-types'
import '../../css/Chip.css'

const TrendingChip = props => {
  return (
    <div 
      className="chip trending"
      onClick={() => props.handleClick(props.label)}
    >
      Trending
    </div>
  )
}

TrendingChip.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func
}

export default TrendingChip