import React from 'react'
import PropTypes from 'prop-types'
import '../../css/CloseButton.css'

const CloseButton = props => {
  return (
    <button className="closeButton" onClick={props.handleClick}>
      <i className="fas fa-times"></i>
    </button>
  )
}

CloseButton.propTypes = {
  handleClick: PropTypes.func
}

export default CloseButton