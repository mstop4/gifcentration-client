import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../css/QueryBox.css'

class QueryBox extends Component {

  render() {
    let textField = null
    
    // Show loading text
    if (this.props.showLoading) {
      let numLoaded = 0
      for (let img in this.props.imageLoaded) {
        numLoaded = this.props.imageLoaded[img] ? numLoaded+1 : numLoaded
      }
      const totalImgs = Object.keys(this.props.imageLoaded).length

      textField = <span 
        className="query-loading">Loading ({numLoaded}/{totalImgs})</span>
    } 

    // Show input field
    else {
      textField = <input
                    className="query-input"
                    type="text"
                    value={this.props.query}
                    onChange={this.props.handleChange}
                    onKeyUp={this.props.handleSubmit}
                  />
    }

    let classes = "query-background"
    if (!this.props.isDisabled) {
      classes += " query-open"
    }

    return (
      <div className={classes}>
        {textField}
      </div>
    )
  }
}

QueryBox.propTypes = {
  isDisabled: PropTypes.bool,
  query: PropTypes.string,
  showLoading: PropTypes.bool,
  imageLoaded: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default QueryBox