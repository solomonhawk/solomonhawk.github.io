import React from 'react'
import { Link } from 'react-router'
import SimpleDivider from '../components/simple-divider'

export default React.createClass({
  displayName: 'writings',

  render() {
    return (
      <div className="section writings">
        <h2 className="section-heading">
          <Link to="/writings">Writings</Link>
        </h2>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur mollitia blanditiis accusamus pariatur, facilis sunt dolorem dicta repellendus iure, quo similique laudantium non doloribus nisi. Laboriosam earum asperiores repellat, commodi.</p>

        <SimpleDivider />
      </div>
    )
  }
})
