import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';

import StaffCollection from '/imports/api/Staff/Staff';

import {
  Icon,
  Label,
  Menu,
  Table,
  Button,
  Form,
  Segment,
} from 'semantic-ui-react';

class StaffTable extends Component {
  constructor(props) {
    super(props);
  }

  renderStaff() {
    return this.props.staff.map((staff, index) => (
      <Table.Row
        key={staff.number}
        style={{ cursor: 'pointer' }}
        onClick={e => {
          this.props.history.push('/staff/' + staff.number);
        }}
      >
        <Table.Cell>{staff.number}</Table.Cell>
        <Table.Cell>{staff.lastname}</Table.Cell>
        <Table.Cell>{staff.firstname}</Table.Cell>
        <Table.Cell>{staff.patronimic}</Table.Cell>
        <Table.Cell>{staff.phone}</Table.Cell>
        <Table.Cell>{staff.iin}</Table.Cell>
        {/* <Table.Cell>{staff.lastVisit}</Table.Cell> */}
      </Table.Row>
    ));
  }

  generateInterimItems() {
    if (this.props.last > 2) {
      let buttons = [];
      for (let i = 2; i < this.props.last; i++) buttons.push(i);
      return buttons.map((button, index) => (
        <Menu.Item
          key={index}
          as="a"
          active={this.props.skip + 1 == button}
          onClick={e => this.props.handleSkipChange(button - 1)}
        >
          {button}
        </Menu.Item>
      ));
    }
    return '';
  }

  render() {
    return (
      <Segment>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Номер</Table.HeaderCell>
              <Table.HeaderCell>Фамилия</Table.HeaderCell>
              <Table.HeaderCell>Имя</Table.HeaderCell>
              <Table.HeaderCell>Отчество</Table.HeaderCell>
              <Table.HeaderCell>Телефон</Table.HeaderCell>
              <Table.HeaderCell>ИИН</Table.HeaderCell>
              {/* <Table.HeaderCell>Последний визит</Table.HeaderCell> */}
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderStaff()}</Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                Показываются с{' '}
                {this.props.total > 0 ? this.props.skip * 5 + 1 : 0} по{' '}
                {this.props.skip + 1 == this.props.last && this.props.last > 0
                  ? this.props.total
                  : (this.props.skip + 1) * 5}{' '}
                из {this.props.total} записей
                <Menu floated="right" pagination>
                  {this.props.skip > 0 && (
                    <Menu.Item
                      as="a"
                      icon
                      onClick={e => {
                        this.props.handleSkipChange(this.props.skip - 1);
                      }}
                    >
                      <Icon name="chevron left" />
                    </Menu.Item>
                  )}
                  {this.props.total > 5 && (
                    <Menu.Item
                      as="a"
                      active={this.props.skip + 1 == 1}
                      onClick={e => this.props.handleSkipChange(0)}
                    >
                      1
                    </Menu.Item>
                  )}
                  {this.generateInterimItems()}
                  <Menu.Item
                    as="a"
                    active={this.props.skip + 1 == this.props.last}
                    onClick={e => {
                      this.props.handleSkipChange(this.props.last - 1);
                    }}
                  >
                    {this.props.last}
                  </Menu.Item>
                  {this.props.skip + 1 < this.props.last && (
                    <Menu.Item
                      as="a"
                      icon
                      onClick={e => {
                        this.props.handleSkipChange(this.props.skip + 1);
                      }}
                    >
                      <Icon name="chevron right" />
                    </Menu.Item>
                  )}
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Segment>
    );
  }
}

export default withTracker(props => {
  const skip = props.skip || 0;
  const filters = props.filters || {};
  const total = StaffCollection.find(filters).count();
  const subscription = Meteor.subscribe('AllStaff');
  return {
    loading: !subscription.ready(),
    handleSkipChange: props.handleSkipChange,
    total,
    last: Math.ceil(total / 5),
    staff: StaffCollection.find(filters, {
      skip: skip * 5,
      limit: 5,
    }).fetch(),
  };
})(StaffTable);
