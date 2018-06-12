import React from 'react'
import PropTypes from 'prop-types'
import fetchStatus from '../helpers/fetchStatus'
import '../../css/QueryBlurb.css'

const QueryBlurb = props => {
  const totalImgs = Object.keys(props.imageLoaded).length

  if (props.fetchStatus === fetchStatus.ok) {
    return <h2>Popular Searches</h2>
  }

  else if (props.fetchStatus === fetchStatus.pending &&
    props.longWait && totalImgs === 0) {
    return <h2>Poking the server...</h2>
  }
  
  else if (props.fetchStatus === fetchStatus.genericError) {
    return <h2>Oops! We couldn't get any GIFs for you.</h2>
  } 
  
  else if (props.fetchStatus === fetchStatus.insufficientGifs) {
    return <h2>Uh-oh! We couldn't find enough GIFs with that query.</h2>
  }

  else {
    return <h2>&nbsp;</h2>
  }
}

QueryBlurb.propTypes = {
  fetchStatus: PropTypes.string,
  longWait: PropTypes.bool,
  imageLoaded: PropTypes.object
}

export default QueryBlurb