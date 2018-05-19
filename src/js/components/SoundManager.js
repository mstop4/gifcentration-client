import React, { Component } from 'react'
import ReactHowler from 'react-howler'
import PropTypes from 'prop-types'

const soundList = [ 'cardPlace1', 'cardPlace2' ]

class SoundManager extends Component {
  constructor() {
    super()

    let initPlayState = {}
    let soundRefs = {}

    for (let snd in soundList) {
      initPlayState[soundList[snd]] = false
      soundRefs[soundList[snd]] = React.createRef()
    }

    this.state = {
      isPlaying: initPlayState,
      soundRefs: soundRefs
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.soundId) {

      const newPlayState = {
        ...prevState.isPlaying,
        [nextProps.soundId]: true
      }

      console.log(prevState.soundRefs[nextProps.soundId]._howler)

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
        playing={this.state.isPlaying['cardPlace1']}
        ref={this.state.soundRefs['cardPlace1']}
      />
    )
  }
}

export default SoundManager