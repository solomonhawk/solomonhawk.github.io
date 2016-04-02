import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  displayName: 'selectedWorksShow',

  render() {
    return (
      <div className="section selected-works-show">
        <h2 className="section-heading">
          <Link to="/selected-works">Selected Works</Link>
        </h2>

        Writings Show Page
      </div>
    )
  }
})
