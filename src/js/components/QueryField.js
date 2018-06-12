import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../css/QueryField.css'

const QueryField = props => {
  let output = null
  const totalImgs = Object.keys(props.imageLoaded).length

  // Show loading text
  if (props.showLoading) {
    let numLoaded = 0
    for (let img in props.imageLoaded) {
      numLoaded = props.imageLoaded[img] ? numLoaded + 1 : numLoaded
    }

    output =
      <div className="queryField-loading-container">
        <div className="queryField-spinner"></div>
        <span className="queryField-loading">
          {totalImgs > 0 ? `Loading (${numLoaded}/${totalImgs})` : `Searching...`}
        </span>
      </div>
  }

  // Show input field. Show clear button only if input field is not empty
  else {
    output = <div>
      <input
        className="queryField-input"
        type="input"
        placeholder="Search Giphy"
        value={props.query}
        onChange={props.handleChange}
        onKeyUp={props.handleSubmit}
      />
      {
        props.query &&
        <button className="queryField-input-clear"
          onClick={props.handleQueryClear}
        >
          <i className="far fa-times-circle"></i>
        </button>
      }
    </div>
  }

  return (
    <div className="queryField">
      {output}
    </div>
  )
}

QueryField.propTypes = {
  showLoading: PropTypes.bool,
  imageLoaded: PropTypes.object,
  query: PropTypes.string,
  handleChange: PropTypes.func,
  handleQueryClear: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default QueryField