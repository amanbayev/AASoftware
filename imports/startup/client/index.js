import React from 'react'
import { render } from 'react-dom'
import { Meteor } from 'meteor/meteor'
import '../both/api'

import 'semantic-ui-css/semantic.min.css'
import App from '/imports/ui/App'

Meteor.startup(() => {
  render(<App />, document.getElementById('app-body'))
})
