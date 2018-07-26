import React from 'react'
import PropTypes from 'prop-types'
import '../../css/Chip.css'

const PopSearchChip = props => {
  let shortLabel = props.label.length <= props.maxLabelLength ? 
                   props.label : 
                   props.label.slice(0,props.maxLabelLength+1) + "..."
  return (
    <div
      className="chip popSearch"
      onClick={() => props.handleClick(props.label)}
    >
      {shortLabel}
    </div>
  )
}

PopSearchChip.propTypes = {
  label: PropTypes.string,
  maxLabelLength: PropTypes.number,
  handleClick: PropTypes.func
}

export default PopSearchChip