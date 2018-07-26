import React from 'react'
import PropTypes from 'prop-types'
import PopSearchChip from './PopSearchChip'
import TrendingChip from './TrendingChip'
import '../../css/PopularSearches.css'

const PopularSearches = props => {
  const maxChipsPerRow = 5
  const maxLabelLength = 12
  let i = 0
  let searchChipsTop = []
  let searchChipBottom = []

  if (props.popularSearches) {

    // Populate top row
    searchChipsTop.push(
      <TrendingChip
        key={"$trending"}
        handleClick={props.handleTrendingClick}
      />
    )

    for (; i < maxChipsPerRow-1 && i < props.popularSearches.length; i++) {
      let queryText = props.popularSearches[i]._id
      searchChipsTop.push(
        <PopSearchChip
          key={queryText}
          label={queryText}
          maxLabelLength={maxLabelLength}
          handleClick={props.handlePopularClick}
        />
      )
    }

    // Populate bottow row
    for (; i < maxChipsPerRow*2 && i < props.popularSearches.length; i++) {
      let queryText = props.popularSearches[i]._id
      searchChipBottom.push(
        <PopSearchChip
          key={queryText}
          label={queryText}
          maxLabelLength={maxLabelLength}
          handleClick={props.handlePopularClick}
        />
      )
    }
  } else {
    searchChipBottom.push(
      <div key="spinner" className="popSearches-spinner"></div>
    )
  }

  return (
    <div className="popSearches">
      <div className="popSearches-row">
        {searchChipsTop}
      </div>
      <div className="popSearches-row">
        {searchChipBottom}
      </div>
    </div>
  )
}

PopularSearches.propTypes = {
  handleChipClick: PropTypes.func,
  handleTrendingClick: PropTypes.func,
  popularSearches: PropTypes.arrayOf(PropTypes.object),
}


export default PopularSearches