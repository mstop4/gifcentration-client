import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../css/QueryField.css'

class QueryField extends Component {
  render() {
    let output = null
    const totalImgs = Object.keys(this.props.imageLoaded).length

    // Show loading text
    if (this.props.showLoading) {
      let numLoaded = 0
      for (let img in this.props.imageLoaded) {
        numLoaded = this.props.imageLoaded[img] ? numLoaded + 1 : numLoaded
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
          value={this.props.query}
          onChange={this.props.handleChange}
          onKeyUp={this.props.handleSubmit}
        />
        {
          this.props.query &&
          <button className="queryField-input-clear"
            onClick={this.props.handleQueryClear}
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