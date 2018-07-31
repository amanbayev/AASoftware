import React, { Component } from 'react';

import { Card, Tab, Table } from 'semantic-ui-react';

export default class ClientCard extends Component {
  render() {
    const Table = () => (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Header</Table.HeaderCell>
            <Table.HeaderCell>Header</Table.HeaderCell>
            <Table.HeaderCell>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Test</Table.Cell>
            <Table.Cell>Test</Table.Cell>
            <Table.Cell>Test</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    const panes = [
      {
        menuItem: 'История посещений',
        render: <Table />,
      },
      {
        menuItem: 'Состояние зубов',
        render: () => <Tab.Pane>Content goes here</Tab.Pane>,
      },
    ];
    return (
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Card.Header>Карточка клиента</Card.Header>
          <Tab style={{ paddingTop: '16px' }} panes={panes} />
        </Card.Content>
      </Card>
    );
  }
}
