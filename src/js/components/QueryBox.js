import React, { Component } from 'react'
import PropTypes from 'prop-types'
import QueryField from './QueryField'
import QueryBlurb from './QueryBlurb'
import PopSearchChip from './PopSearchChip'
import TrendingChip from './TrendingChip'
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
    let searchChips = []


    searchChips.push(
      <TrendingChip
        key={"$trending"}
        handleClick={this.props.handleTrendingClick}
      />
    )

    if (this.props.popularSearches) {
      this.props.popularSearches.forEach((query) => {
        searchChips.push(
          <PopSearchChip
            key={query._id}
            label={query._id}
            handleClick={this.props.handleChipClick}
          />
        )
      })
    }

    const showLoading = this.props.imagesFinished && this.props.fetchStatus === fetchStatus.pending

    // Close button
    closeButton = <button className="query-close" onClick={this.props.handleQueryToggle}>
                    <i className="fas fa-times"></i>
                  </button>

    // Query toggle class
    let classes = "query-background"
    if (!this.props.isHidden) {
      classes += " query-open"
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
        <QueryBlurb
          fetchStatus={this.props.fetchStatus}
          longWait={this.props.longWait}
          imageLoaded={this.props.imageLoaded}
        />
        {!showLoading &&
          <div className="query-popSearches">
            {searchChips}
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
  handleTrendingClick: PropTypes.func,
  handleQueryToggle: PropTypes.func,
  handleQueryClear: PropTypes.func
}

export default QueryBox