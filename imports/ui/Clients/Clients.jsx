import React, { Component } from 'react'

import ClientsTable from './ClientsTable'
import CreateClient from './CreateClient'

import { Switch, Route } from 'react-router-dom'

class Clients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creating: true,
      editing: false
    }
  }
  render() {
    return (
      <Switch>
        <Route exact path="/clients/add" component={CreateClient} />
        <Route exact path="/clients" component={ClientsTable} />
      </Switch>
    )
  }
}

export default Clients
