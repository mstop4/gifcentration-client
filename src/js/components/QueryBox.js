import React from 'react'
import PropTypes from 'prop-types'
import QueryField from './QueryField'
import QueryBlurb from './QueryBlurb'
import CloseButton from './CloseButton'
import PopularSearches from './PopularSearches'
import fetchStatus from '../helpers/fetchStatus'
import '../../css/QueryBox.css'

const QueryBox = props => {
  const showLoading = props.imagesFinished && props.fetchStatus === fetchStatus.pending

  // Query toggle class
  let classes = "query-background"
  if (!props.isHidden) {
    classes += " query-open"
  }

  return (
    <div className={classes}>
      {!showLoading && 
        <CloseButton
          handleClick={props.handleQueryToggle}
      />}
      <QueryField
        showLoading={showLoading}
        imageLoaded={props.imageLoaded}
        query={props.query}
        handleChange={props.handleChange}
        handleQueryClear={props.handleQueryClear}
        handleSubmit={props.handleSubmit}
      />
      <QueryBlurb
        fetchStatus={props.fetchStatus}
        longWait={props.longWait}
        imageLoaded={props.imageLoaded}
      />
      {!showLoading &&
        <PopularSearches
          handlePopularClick={props.handleChipClick}
          handleTrendingClick={props.handleTrendingClick}
          popularSearches={props.popularSearches}
        />
      }
    </div>
  )
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