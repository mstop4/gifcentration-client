import React, { Component } from 'react'
import PropTypes from 'prop-types'

class QueryBox extends Component {

  render() {
    let textField = null

    if (!this.props.showLoading) {
      textField = <input 
                    type="text"
                    value={this.props.query}
                    onChange={this.props.handleChange}
                    onKeyUp={this.props.handleSubmit}
                  />
    } else {

      let numLoaded = 0
      for (let img in this.props.imageLoaded) {
        numLoaded = this.props.imageLoaded[img] ? numLoaded+1 : numLoaded
      }
      const totalImgs = Object.keys(this.props.imageLoaded).length

      textField = <span className="query-loading">Loading ({numLoaded}/{totalImgs})</span>
    }

    return (
      <div className="query-background">
        {textField}
      </div>
    )
  }
}

QueryBox.propTypes = {
  query: PropTypes.string,
  showLoading: PropTypes.bool,
  imageLoaded: PropTypes.array,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default QueryBox