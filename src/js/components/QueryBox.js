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
      textField = <span className="query-loading">Loading</span>
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
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default QueryBox