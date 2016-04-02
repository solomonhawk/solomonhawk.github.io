import React from 'react'
import Intro from './intro'
import SelectedWorks from './selected-works'
import Writings from './writings'
import Contact from './contact'
import FlipMove from 'react-flip-move'
import EASINGS from './constants/easings'

export default React.createClass({

  displayName: 'index',

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getChildKey() {
    return this.props.location.pathname.replace(/^\//, '')
  },

  renderChildRoute() {
    return (
      <FlipMove
        key="root"
        easing={ EASINGS.EASE_OUT_QUINT }
        duration={ 2000 }
        className="app-index"
      >
        { React.cloneElement(this.props.children, { key: this.getChildKey(), fullView: true }, null) }
      </FlipMove>
    )
  },

  renderRoot() {
    return (
      <FlipMove
        key="root"
        easing={ EASINGS.EASE_OUT_QUINT }
        duration={ 2000 }
        className="app-index"
      >
        <Intro         key="intro"          { ...this.props } />
        <SelectedWorks key="selected-works" { ...this.props } />
        <Writings      key="writings"       { ...this.props } />
        <Contact       key="contact"        { ...this.props } />
      </FlipMove>
    )
  },

  render() {
    return this.props.children ? this.renderChildRoute() : this.renderRoot()
  }

})
