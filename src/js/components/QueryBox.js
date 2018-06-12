import React, { Component } from 'react'
import PropTypes from 'prop-types'
import QueryField from './QueryField'
import QueryBlurb from './QueryBlurb'
import CloseButton from './CloseButton'
import PopSearchChip from './PopSearchChip'
import TrendingChip from './TrendingChip'
import fetchStatus from '../helpers/fetchStatus'
import '../../css/QueryBox.css'

class QueryBox extends Component {
  constructor() {
    super()

    this.maxChips = 9
    this.handleChipClick = this.handleChipClick.bind(this)
  }

  handleChipClick(query) {
    this.handleSubmit(query)
  }

  render() {
    let searchChips = []

    searchChips.push(
      <TrendingChip
        key={"$trending"}
        handleClick={this.props.handleTrendingClick}
      />
    )

    if (this.props.popularSearches) {
      let chipCount = 0

      this.props.popularSearches.every((query) => {
        searchChips.push(
          <PopSearchChip
            key={query._id}
            label={query._id}
            handleClick={this.props.handleChipClick}
          />
        )
        chipCount++
        return chipCount < this.maxChips
      })
    }

    const showLoading = this.props.imagesFinished && this.props.fetchStatus === fetchStatus.pending

    // Query toggle class
    let classes = "query-background"
    if (!this.props.isHidden) {
      classes += " query-open"
    }

    return (
      <div className={classes}>
        {!showLoading && 
          <CloseButton
            handleClick={this.props.handleQueryToggle}
        />}
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