import React, { Component } from 'react'
import PropTypes from 'prop-types'

class QueryBox extends Component {

  render() {
    return (
      <div className="background">
        <input type="text" value={this.props.query}/>
      </div>
    )
  }
}

export default QueryBox