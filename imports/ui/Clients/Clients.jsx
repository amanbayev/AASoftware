import React, { Component } from 'react';

import CreateClient from './CreateClient';
import ClientsSearchTable from './ClientsSearchTable';
import ShowClient from './ShowClient';

import { Switch, Route } from 'react-router-dom';

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creating: true,
      editing: false,
    };
  }
  render() {
    return (
      <Switch>
        <Route exact path="/clients/add" component={CreateClient} />
        <Route exact path="/clients/:number" component={ShowClient} />
        <Route exact path="/clients" component={ClientsSearchTable} />
      </Switch>
    );
  }
}

export default Clients;
