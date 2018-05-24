import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fetchStatus from '../helpers/fetchStatus'
import '../../css/QueryBox.css'

class QueryBox extends Component {
  render() {
    let textField = null
    const showLoading = this.props.imagesFinished && this.props.fetchStatus === fetchStatus.pending

    // Show loading text
    if (showLoading) {
      let numLoaded = 0
      for (let img in this.props.imageLoaded) {
        numLoaded = this.props.imageLoaded[img] ? numLoaded+1 : numLoaded
      }
      const totalImgs = Object.keys(this.props.imageLoaded).length

      textField = 
      <div className="query-loading-container">
        <div className="query-spinner"></div>
          <span className="query-loading">
          { totalImgs > 0 ? `Loading (${numLoaded}/${totalImgs})` : `Connecting...` }
          </span>
      </div>
    } 

    // Show input field
    else {
      textField = <input
                    className="query-input"
                    type="text"
                    placeholder="Search Giphy"
                    value={this.props.query}
                    onChange={this.props.handleChange}
                    onKeyUp={this.props.handleSubmit}
                  />
    }

    let classes = "query-background"
    if (!this.props.isHidden) {
      classes += " query-open"
    }

    return (
      <div className={classes}>
        {/* <h2>Enter a query</h2> */}
        {textField}
        {!showLoading && <button className="query-close" onClick={this.props.handleToggleQuery}><i className="fas fa-times"></i></button>}
      </div>
    )
  }
}

QueryBox.propTypes = {
  isHidden: PropTypes.bool,
  query: PropTypes.string,
  imagesFinished: PropTypes.bool,
  imageLoaded: PropTypes.object,
  fetchStatus: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleToggleQuery: PropTypes.func
}

export default QueryBox