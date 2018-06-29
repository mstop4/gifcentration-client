import React from 'react'
import PropTypes from 'prop-types'
import ReactConfetti from 'react-confetti'
import '../../css/Confetti.css'

const Confetti = props => {
  return (
    <div className="confetti">
      <ReactConfetti
        width={props.appWidth + 'px'}
        height={props.appHeight + 'px'}
        confettiSource={{x: 0, y: 0, w: props.appWidth, h: 0}}
        numberOfPieces={500}
        recycle={false}
      />
    </div>
  )
}

Confetti.propTypes = {
  appWidth: PropTypes.number,
  appHeight: PropTypes.number
}

export default Confetti