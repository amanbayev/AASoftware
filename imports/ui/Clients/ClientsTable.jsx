import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Bert } from 'meteor/themeteorchef:bert'

import ClientsCollection from '/imports/api/Clients/Clients'

import {
  Icon,
  Label,
  Menu,
  Table,
  Button,
  Form,
  Segment
} from 'semantic-ui-react'

class ClientsTable extends Component {
  renderClients() {
    return this.props.clients.map((client, index) => (
      <Table.Row key={client.number}>
        <Table.Cell>{client.number}</Table.Cell>
        <Table.Cell>{client.lastname}</Table.Cell>
        <Table.Cell>{client.firstname}</Table.Cell>
        <Table.Cell>{client.patronimic}</Table.Cell>
        <Table.Cell>{client.phone}</Table.Cell>
        <Table.Cell>{client.iin}</Table.Cell>
      </Table.Row>
    ))
  }

  render() {
    return (
      <Segment>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Номер</Table.HeaderCell>
              <Table.HeaderCell>Фамилия</Table.HeaderCell>
              <Table.HeaderCell>Имя</Table.HeaderCell>
              <Table.HeaderCell>Отчество</Table.HeaderCell>
              <Table.HeaderCell>Телефон</Table.HeaderCell>
              <Table.HeaderCell>ИИН</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderClients()}</Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Segment>
    )
  }
}

export default withTracker(() => {
  const subscription = Meteor.subscribe('AllClients')
  return {
    loading: !subscription.ready(),
    clients: ClientsCollection.find().fetch()
  }
})(ClientsTable)
