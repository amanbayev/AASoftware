import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import KeyGen from '/imports/modules/generate-key';
import ClientsCollection from '/imports/api/Clients/Clients';

import { Icon, Menu, Table, Segment } from 'semantic-ui-react';

class ClientsTable extends Component {
  constructor(props) {
    super(props);
  }

  renderClients() {
    return this.props.clients.map((client, index) => {
      // console.log('rendering client number ' + client.number);
      // console.log(KeyGen(client.number));
      return (
        <Table.Row
          key={KeyGen(client.number)}
          style={{ cursor: 'pointer' }}
          onClick={e => {
            // this.props.history.push('/clients/' + client.number);
            this.props.handler(client);
          }}
        >
          <Table.Cell>{client.number}</Table.Cell>
          <Table.Cell>{client.lastname}</Table.Cell>
          <Table.Cell>{client.firstname}</Table.Cell>
          <Table.Cell>{client.patronimic}</Table.Cell>
          <Table.Cell>{client.phone}</Table.Cell>
          <Table.Cell>{client.iin}</Table.Cell>
          {/* <Table.Cell>{client.lastVisit}</Table.Cell> */}
        </Table.Row>
      );
    });
  }

  generateInterimItems() {
    if (this.props.last > 2) {
      let buttons = [];
      let skip = this.props.skip;
      for (let i = 2; i < this.props.last; i++) buttons.push(i);
      return buttons.map((button, index) => (
        <Menu.Item
          key={index}
          as="a"
          active={skip + 1 == button}
          onClick={e => this.props.handleSkipChange(button - 1)}
        >
          {button}
        </Menu.Item>
      ));
    }
    return '';
  }

  render() {
    let skip = this.props.skip;
    if (skip * 5 >= this.props.total) skip = 0;
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
          <Table.Body>{this.renderClients()}</Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                Показываются с {this.props.total > 0 ? skip * 5 + 1 : 0} по{' '}
                {skip + 1 == this.props.last && this.props.last > 0
                  ? this.props.total
                  : (skip + 1) * 5}{' '}
                из {this.props.total} записей
                <Menu floated="right" pagination>
                  {skip > 0 && (
                    <Menu.Item
                      as="a"
                      icon
                      onClick={e => {
                        this.props.handleSkipChange(skip - 1);
                      }}
                    >
                      <Icon name="chevron left" />
                    </Menu.Item>
                  )}
                  {this.props.total > 5 && (
                    <Menu.Item
                      as="a"
                      active={skip + 1 == 1}
                      onClick={e => this.props.handleSkipChange(0)}
                    >
                      1
                    </Menu.Item>
                  )}
                  {this.generateInterimItems()}
                  <Menu.Item
                    as="a"
                    active={skip + 1 == this.props.last}
                    onClick={e => {
                      this.props.handleSkipChange(this.props.last - 1);
                    }}
                  >
                    {this.props.last}
                  </Menu.Item>
                  {skip + 1 < this.props.last && (
                    <Menu.Item
                      as="a"
                      icon
                      onClick={e => {
                        this.props.handleSkipChange(skip + 1);
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
  let skip = props.skip || 0;
  const filters = props.filters || {};
  const total = ClientsCollection.find(filters).count();
  if (skip * 5 >= total) skip = 0;
  const subscription = Meteor.subscribe('AllClients');
  return {
    loading: !subscription.ready(),
    handleSkipChange: props.handleSkipChange,
    total,
    last: Math.ceil(total / 5),
    clients: ClientsCollection.find(filters, {
      skip: skip * 5,
      limit: 5,
    }).fetch(),
  };
})(ClientsTable);
