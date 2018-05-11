import React, { Component } from 'react'
import PropTypes from 'prop-types'

class QueryBox extends Component {

  render() {
    return (
      <div className="background">
        <input 
          type="text"
          value={this.props.query}
          onChange={this.props.handleChange}
          onKeyUp={this.props.handleSubmit}
        />
      </div>
    )
  }
}

QueryBox.propTypes = {
  query: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default QueryBox