import React, { Component } from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _debounce from 'lodash.debounce'
import classString from 'src/helpers/class-string'
import HeadingAnchor from 'src/components/HeadingAnchor'
import Swatch from 'src/components/Swatch'
import Frame from 'react-frame-component'

export default class Preview extends Component {
  constructor (props) {
    super(props)

    this.state = {
      current: null,
      componentHeight: 0
    }

    this.handleResize = _debounce(this.handleResize.bind(this), 150)
    this.setSwatch = this.setSwatch.bind(this)
  }

  setSwatch (swatch) {
    this.setState({
      current: swatch
    })
  }

  handleResize () {
    const iframeElement = ReactDom.findDOMNode(this.iframe)
    const iframeDocElement = iframeElement.contentDocument || iframeElement.contentWindow.document
    const componentHeight = iframeDocElement.getElementsByTagName('html')[0].offsetHeight
    if (componentHeight !== this.state.componentHeight) {
      this.setState({
        componentHeight
      })
    }
  }

  render () {
    const {
      current,
      componentHeight
    } = this.state

    const {
      swatches,
      children: Component
    } = this.props

    let swatchButtons
    if (swatches && swatches.length > 0) {
      swatchButtons = (
        <div
          className={classString('__swatch-list')}>
          <Swatch
            swatch={null}
            isActive={current === null}
            onClick={this.setSwatch} />

          {swatches.map(swatch => (
            <Swatch
              key={swatch}
              swatch={swatch}
              isActive={current === swatch}
              onClick={this.setSwatch} />
          ))}
        </div>
      )
    }

    return (
      <section
        className={classString('__section')}>
        <h2
          className={classString('__heading')}>
          <HeadingAnchor
            anchorId='preview' />
          Preview
        </h2>

        {swatchButtons}

        <Frame
          sandbox='allow-same-origin allow-scripts'
          ref={(iframe) => {
            this.iframe = iframe
          }}
          style={{
            background: current,
            // 68 is the total padding and border width of the preview box
            height: (componentHeight + 68)
          }}
          className={classString('__preview')}>
          {Component}
        </Frame>
      </section>
    )
  }

  componentDidMount () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  componentDidUpdate () {
    this.handleResize()
  }
}

Preview.propTypes = {
  children: PropTypes.element.isRequired,
  swatches: PropTypes.arrayOf(PropTypes.string)
}
