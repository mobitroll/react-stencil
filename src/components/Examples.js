import React, { Component } from 'react'
import PropTypes from 'prop-types'
import className from 'helpers/class-name'

class Examples extends Component {
  constructor (props) {
    super(props)

    this.state = {
      current: 'default'
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange ({target: { value }}) {
    this.props.setExample(value)
    this.setState({current: value})
  }

  render () {
    const examples = this.props.examples

    return (examples && (
      <section>
        <h2
          className={className('title')}>
          Examples
        </h2>

        <select
          className={className('dropdown')}
          onChange={this.onChange}
          value={this.state.current}>
          {Object.keys(examples).map(example => (
            <option
              key={example}>
              {example}
            </option>
          ))}
        </select>
      </section>
    )) || null
  }
}

Examples.propTypes = {
  setExample: PropTypes.func.isRequired,
  examples: PropTypes.object
}

export default Examples
