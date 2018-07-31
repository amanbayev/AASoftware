import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import CreateStaff from './CreateStaff';
import StaffSearchTable from './StaffSearchTable';
import ShowStaff from './ShowStaff';

class Staff extends Component {
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
        <Route exact path="/staff/add" component={CreateStaff} />
        <Route exact path="/staff/:number" component={ShowStaff} />
        <Route exact path="/staff" component={StaffSearchTable} />
      </Switch>
    );
  }
}

export default Staff;
