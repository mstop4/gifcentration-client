import React from 'react'
import PropTypes from 'prop-types'
import ReactDomConfetti from 'react-dom-confetti'
import '../../css/Confetti.css'

const Confetti = props => {
  const config = {
    angle: 90,
    spread: 60,
    startVelocity: 50,
    elementCount: 30,
    decay: 0.9
  }

  return (
    <div className='confetti'>
      <ReactDomConfetti
        className='confetti-1'
        active={props.active}
        config={config}
      />
      <ReactDomConfetti
        className='confetti-2'
        active={props.active}
        config={config}
      />
      <ReactDomConfetti
        className='confetti-3'
        active={props.active}
        config={config}
      />
    </div>
  )
}

Confetti.propTypes = {
  active: PropTypes.bool
}

export default Confetti