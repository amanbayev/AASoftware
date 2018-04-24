import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Container } from 'semantic-ui-react'

import TopMenu from '/imports/ui/TopMenu'
import Blank from '/imports/ui/Blank'
import Admin from '/imports/ui/Admin'
import Clients from '/imports/ui/Clients/Clients'
import NotFound from '/imports/ui/NotFound'

const PropsWrapper = props => (
  <div>
    <TopMenu location={props.location} history={props.history} />
    <Container>
      <Switch>
        <Route exact path="/" component={Blank} />
        <Route path="/admin" component={Admin} />
        <Route path="/clients" component={Clients} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router>
        <Route path="/" component={PropsWrapper} />
      </Router>
    )
  }
}

export default App
