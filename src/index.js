import React from 'react'
import DOM from 'react-dom'
import Routes from './routes'
import Index from './app/index'
import { Router, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

const mountNode = document.querySelector('#app')

injectTapEventPlugin()

DOM.render(<Router history={ browserHistory }>{ Routes }</Router>, mountNode)
