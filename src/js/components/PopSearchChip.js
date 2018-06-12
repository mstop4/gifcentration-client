import React from 'react'
import PropTypes from 'prop-types'
import '../../css/Chip.css'

const PopSearchChip = props => {
  return (
    <div
      className="chip popSearch"
      onClick={() => props.handleClick(props.label)}
    >
      {props.label}
    </div>
  )
}

PopSearchChip.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func
}

export default PopSearchChip