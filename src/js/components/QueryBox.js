import React, { Component } from 'react'
import PropTypes from 'prop-types'
import QueryField from './QueryField'
import PopSearchChip from './PopSearchChip'
import fetchStatus from '../helpers/fetchStatus'
import '../../css/QueryBox.css'

class QueryBox extends Component {
  constructor() {
    super()

    this.handleChipClick = this.handleChipClick.bind(this)
  }

  handleChipClick(query) {
    this.handleSubmit(query)
  }

  render() {
    let closeButton = null
    let blurb = <h2>&nbsp;</h2>
    let popularSearches = []

    if (this.props.popularSearches) {
      this.props.popularSearches.forEach((query) => {
        popularSearches.push(
          <PopSearchChip
            key={query._id}
            label={query._id}
            handleClick={this.props.handleChipClick}
          />
        )
      })
    }

    const showLoading = this.props.imagesFinished && this.props.fetchStatus === fetchStatus.pending
    const totalImgs = Object.keys(this.props.imageLoaded).length

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
        <QueryField
          showLoading={showLoading}
          imageLoaded={this.props.imageLoaded}
          query={this.props.query}
          handleChange={this.props.handleChange}
          handleQueryClear={this.props.handleQueryClear}
          handleSubmit={this.props.handleSubmit}
        />
        {blurb}
        {!showLoading &&
          <div className="query-popSearches">
            {popularSearches}
          </div>
        }
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
  handleChipClick: PropTypes.func,
  handleQueryToggle: PropTypes.func,
  handleQueryClear: PropTypes.func
}

export default QueryBox