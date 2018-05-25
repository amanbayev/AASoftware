import React, { Component } from 'react';

import ClientSearch from './ClientSearch';
import ClientsTable from './ClientsTable';

import { Link } from 'react-router-dom';
import { Segment, Button, Icon } from 'semantic-ui-react';

class ClientsSearchTable extends Component {
  constructor(props) {
    super(props);
    this.state = { skip: 0, filters: {} };
    this.handleSkipChange = this.handleSkipChange.bind(this);
    this.handleFiltersChange = this.handleFiltersChange.bind(this);
  }

  handleFiltersChange(newFilters) {
    this.setState({ filters: newFilters });
  }

  handleSkipChange(newSkip) {
    this.setState({ skip: newSkip });
  }

  render() {
    return (
      <Segment.Group>
        <Segment>
          <Button
            as={Link}
            to="/clients/add"
            icon
            labelPosition="left"
            secondary
          >
            Добавить нового клиента
            <Icon name="plus" />
          </Button>
        </Segment>
        <ClientSearch handleFiltersChange={this.handleFiltersChange} />
        <ClientsTable
          skip={this.state.skip}
          filters={this.state.filters}
          handleSkipChange={this.handleSkipChange}
          {...this.props}
        />
      </Segment.Group>
    );
  }
}

export default ClientsSearchTable;
