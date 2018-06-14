import React from 'react'
import PropTypes from 'prop-types'
import PopSearchChip from './PopSearchChip'
import TrendingChip from './TrendingChip'
import '../../css/PopularSearches.css'

const PopularSearches = props => {
  let searchChips = []

  if (props.popularSearches) {
    searchChips.push(
      <TrendingChip
        key={"$trending"}
        handleClick={props.handleTrendingClick}
      />
    )

    let chipCount = 0

    props.popularSearches.every((query) => {
      searchChips.push(
        <PopSearchChip
          key={query._id}
          label={query._id}
          handleClick={props.handlePopularClick}
        />
      )
      chipCount++
      return chipCount < props.maxChips
    })
  } else {
    searchChips.push(
      <div className="popSearches-spinner"></div>
    )
  }

  return (
    <div className="popSearches">
      {searchChips}
    </div>
  )
}

PopularSearches.propTypes = {
  handleChipClick: PropTypes.func,
  handleTrendingClick: PropTypes.func,
  popularSearches: PropTypes.arrayOf(PropTypes.object),
  maxChips: PropTypes.number
}


export default PopularSearches