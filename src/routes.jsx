import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppIndex from './app/index'
import SelectedWorks from './app/selected-works'
import SelectedWorksShow from './app/selected-works/show'
import Writings from './app/writings'
import WritingsShow from './app/writings/show'
import Contact from './app/contact'
import NotFound from './app/not-found'

export default (
  <Route path="/" component={ AppIndex }>
    <Route path="/selected-works" component={ SelectedWorks } />
    <Route path="/selected-works/:id" component={ SelectedWorksShow } />
    <Route path="/writings" component={ Writings } />
    <Route path="/writings/:id" component={ WritingsShow } />
    <Route path="/contact" component={ Contact } />
    <Route path="*" component={ NotFound } />
  </Route>
)
