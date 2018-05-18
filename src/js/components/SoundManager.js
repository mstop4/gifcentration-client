import React, { Component } from 'react'
import ReactHowler from 'react-howler'
import PropTypes from 'prop-types'

const soundList = [ 'cardFlip1', 'cardFlip2' ]

class SoundManager extends Component {
  constructor() {
    super()

    let initPlayState = {}
    this.soundRefs = {}

    for (let snd in soundList) {
      initPlayState[soundList[snd]] = false
      this.soundRefs[soundList[snd]] = React.createRef()
    }

    this.state = {
      isPlaying: initPlayState
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.soundId) {

      const newPlayState = {
        ...prevState.isPlaying,
        [nextProps.soundId]: true
      }

      return {
        isPlaying: newPlayState
      }
    } else {
      return prevState
    }
  }

  render() {
    return (
      <ReactHowler
        src='../sounds/cardPlace1.mp3'
        playing={this.state.isPlaying.cardFlip1}
        ref={this.soundRefs.cardPlace1}
      />
    )
  }
}

export default SoundManager