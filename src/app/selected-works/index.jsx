import React from 'react'
import { Link } from 'react-router'
import SimpleDivider from '../components/simple-divider'

export default React.createClass({
  displayName: 'selectedWorks',

  getDefaultProps() {
    return {
      fullView: false
    }
  },

  render() {
    return (
      <div key="selected-works" className="section selected-works">
        <h2 className="section-heading">
          <Link to="/selected-works">Selected Works</Link>
        </h2>

        <ul>
          <li>
            <Link to="/selected-works/1">1</Link>
          </li>
          <li>
            <Link to="/selected-works/2">2</Link>
          </li>
          <li>
            <Link to="/selected-works/3">3</Link>
          </li>
        </ul>

        <SimpleDivider />
      </div>
    )
  }
})
