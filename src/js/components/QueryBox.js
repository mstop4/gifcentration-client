import React, { Component } from 'react'
import PropTypes from 'prop-types'
import QueryField from './QueryField'
import QueryBlurb from './QueryBlurb'
import CloseButton from './CloseButton'
import PopSearchChip from './PopSearchChip'
import TrendingChip from './TrendingChip'
import fetchStatus from '../helpers/fetchStatus'
import '../../css/QueryBox.css'
import PopularSearches from './PopularSearches';

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
          <PopularSearches
            handlePopularClick={this.handleChipClick}
            handleTrendingClick={this.props.handleTrendingClick}
            popularSearches={this.props.popularSearches}
            maxChips={this.maxChips}
          />
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