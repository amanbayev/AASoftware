import React, { Component } from 'react';

import { Input, Grid } from 'semantic-ui-react';
import ClientsSearchTable from '/imports/ui/Clients/ClientsSearchTable';

export default class Visit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <ClientsSearchTable {...this.props} />;
  }
}
