import React, { Component } from 'react';

import StaffSearch from './StaffSearch';
import StaffTable from './StaffTable';

import { Link } from 'react-router-dom';
import { Segment, Button, Icon } from 'semantic-ui-react';

class StaffSearchTable extends Component {
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
          <Button as={Link} to="/staff/add" icon labelPosition="left" secondary>
            Добавить нового сотрудника
            <Icon name="plus" />
          </Button>
        </Segment>
        <StaffSearch handleFiltersChange={this.handleFiltersChange} />
        <StaffTable
          skip={this.state.skip}
          filters={this.state.filters}
          handleSkipChange={this.handleSkipChange}
          {...this.props}
        />
      </Segment.Group>
    );
  }
}

export default StaffSearchTable;
