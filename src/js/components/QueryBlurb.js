import React from 'react'
import PropTypes from 'prop-types'
import fetchStatus from '../helpers/fetchStatus'
import '../../css/QueryBlurb.css'

const QueryBlurb = props => {
  const totalImgs = Object.keys(props.imageLoaded).length

  switch(props.fetchStatus) {

    case fetchStatus.ok: 
      return <h2>Popular Searches</h2>

    case fetchStatus.pending:
      if (props.longWait && totalImgs === 0) {
        return <h2>Poking the server...</h2>
      } else {
        return <h2>&nbsp;</h2>
      }

    case fetchStatus.giphyError:
      return <h2>Oops! We couldn't get any GIFs from Giphy for you.</h2>

    case fetchStatus.redisError:
      return <h2>Oops! We couldn't get any GIFs from the cache for you.</h2>

    case fetchStatus.serverError:
      return <h2>Oops! Something went wrong with the server.</h2>
    
    case fetchStatus.insufficientGifs:
      return <h2>Uh-oh! We couldn't find enough GIFs with that query.</h2>

    case fetchStatus.genericError:
      return <h2>Oops! Something went wrong and we don't know why.</h2>

    default:
      return <h2>&nbsp;</h2>
  }
}

QueryBlurb.propTypes = {
  fetchStatus: PropTypes.string,
  longWait: PropTypes.bool,
  imageLoaded: PropTypes.object
}

export default QueryBlurb