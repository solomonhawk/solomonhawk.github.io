import React from 'react'
import SimpleDivider from './components/simple-divider'

export default React.createClass({
  displayName: 'intro',

  render() {
    return (
      <div className="section intro">
        <h2 className="section-heading">Solomon Hawk</h2>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur mollitia blanditiis accusamus pariatur, facilis sunt dolorem dicta repellendus iure, quo similique laudantium non doloribus nisi. Laboriosam earum asperiores repellat, commodi.</p>

        <SimpleDivider />
      </div>
    )
  }
})
