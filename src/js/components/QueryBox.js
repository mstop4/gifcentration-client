import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fetchStatus from '../helpers/fetchStatus'
import '../../css/QueryBox.css'

class QueryBox extends Component {
  render() {

    let textField = null
    let closeButton = null
    let blurb = <h2>&nbsp;</h2>
    let popularSearches = []

    if (this.props.popularSearches) {
      this.props.popularSearches.forEach((query) => {
        popularSearches.push(<div className="query-popQuery" key={query._id}>{query._id}</div>)
      })
    }

    const showLoading = this.props.imagesFinished && this.props.fetchStatus === fetchStatus.pending
    const totalImgs = Object.keys(this.props.imageLoaded).length

    // Show loading text
    if (showLoading) {
      let numLoaded = 0
      for (let img in this.props.imageLoaded) {
        numLoaded = this.props.imageLoaded[img] ? numLoaded+1 : numLoaded
      }

      textField = 
      <div className="query-loading-container">
        <div className="query-spinner"></div>
          <span className="query-loading">
          { totalImgs > 0 ? `Loading (${numLoaded}/${totalImgs})` : `Searching...` }
          </span>
      </div>
    } 

    // Show input field. Show clear button only if input field is not empty
    else {
      textField = <div>
                    <input
                      className="query-input"
                      type="input"
                      placeholder="Search Giphy"
                      value={this.props.query}
                      onChange={this.props.handleChange}
                      onKeyUp={this.props.handleSubmit}
                    />
                    {
                      this.props.query &&
                      <button className="query-input-clear"
                              onClick={this.props.handleQueryClear}
                      >
                        <i className="far fa-times-circle"></i>
                      </button>
                    }
                  </div>
    }

    // Close button
    closeButton = <button className="query-close" onClick={this.props.handleQueryToggle}>
                    <i className="fas fa-times"></i>
                  </button>

    // Query toggle class
    let classes = "query-background"
    if (!this.props.isHidden) {
      classes += " query-open"
    }

    // Blurb message
    if (this.props.fetchStatus === fetchStatus.pending &&
        this.props.longWait && totalImgs === 0) {
      blurb = <h2>Poking the server...</h2>
    } else if (this.props.fetchStatus === fetchStatus.genericError) {
      blurb = <h2>Oops! We couldn't get any GIFs for you.</h2>
    } else if (this.props.fetchStatus === fetchStatus.insufficientGifs) {
      blurb = <h2>Uh-oh! We couldn't find enough GIFs with that query.</h2>
    }

    return (
      <div className={classes}>
        {!showLoading && closeButton}
        {textField}
        {blurb}
        <div className="query-popSearches">
          {popularSearches}
        </div>
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
  longWait: PropTypes.bool,
  popularSearches: PropTypes.arrayOf(PropTypes.object),
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleQueryToggle: PropTypes.func,
  handleQueryClear: PropTypes.func
}

export default QueryBox