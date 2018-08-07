import React, { Component } from 'react';

import { Card, Tab, Table, Button } from 'semantic-ui-react';
import ToothMap from '/imports/ui/ClientRecordCard/ToothMap';

export default class ClientCard extends Component {
  render() {
    const history = () => (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Дата посещения</Table.HeaderCell>
            <Table.HeaderCell>Отделение</Table.HeaderCell>
            <Table.HeaderCell>Просмотр</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>12 июля 2018</Table.Cell>
            <Table.Cell>Терапевт</Table.Cell>
            <Table.Cell>
              <Button>
                <i className="fa fa-file" />
                &nbsp;&nbsp;Отчет&nbsp;&nbsp;
                <i className="fa fa-arrow-down" />
              </Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>14 июля 2018</Table.Cell>
            <Table.Cell>Рентген</Table.Cell>
            <Table.Cell>
              <Button>
                <i className="fa fa-search" />
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    const panes = [
      {
        menuItem: 'История посещений',
        render: history,
      },
      {
        menuItem: 'Зубная карта',
        render: ToothMap,
      },
    ];
    return (
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Card.Header>Карточка клиента</Card.Header>
          <Tab
            menu={{ attached: false }}
            style={{ paddingTop: '16px' }}
            panes={panes}
          />
        </Card.Content>
      </Card>
    );
  }
}
