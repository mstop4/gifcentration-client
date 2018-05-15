import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../css/Preloader.css'

class Preloader extends Component {

  constructor() {
    super()

    this.onImageLoad = this.onImageLoad.bind(this)
  }

  onImageLoad(e) {
    this.props.handleImageLoad(e)
  }

  render() {
    let imgArray = []
    
    if (this.props.canLoad) {
      for (let i = 0; i < this.props.imageUrls.length; i++) {
        imgArray.push(
          <img 
            key={i}
            className="preloaded-img"
            src={this.props.imageUrls[i].url}
            alt={this.props.imageUrls[i].id}
            onLoad={this.onImageLoad}
          />
      )}
    }

    return (
      <div>
        {imgArray}
      </div>
    )
  }
}

Preloader.propTypes = {
  canLoad: PropTypes.bool,
  imageUrls: PropTypes.array,
  handleImageLoad: PropTypes.func
}

export default Preloader