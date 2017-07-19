import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classString from 'helpers/class-string'

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

    return (!!examples && (
      <section>
        <h2
          className={classString('__title')}>
          Examples
        </h2>

        <div
          className={classString('__dropdown')}>
          <select
            className={classString('__dropdown__select')}
            onChange={this.onChange}
            value={this.state.current}>
            {Object.keys(examples).map(example => (
              <option
                key={example}>
                {example}
              </option>
            ))}
          </select>

          <div className={classString('__dropdown__arrow')} />
        </div>
      </section>
    )) || null
  }
}

Examples.propTypes = {
  setExample: PropTypes.func.isRequired,
  examples: PropTypes.object
}

export default Examples
