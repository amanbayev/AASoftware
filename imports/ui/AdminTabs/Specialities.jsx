import React, { Component } from 'react';

import { Tab, Table, Button, Icon, Input } from 'semantic-ui-react';

import { withTracker } from 'meteor/react-meteor-data';
import SpecialitiesCollection from '/imports/api/Staff/Specialities';
import { Bert } from 'meteor/themeteorchef:bert';

class Specialities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  render() {
    return (
      <Tab.Pane>
        <h3>Специальности</h3>
        <Input
          style={{ width: '240px' }}
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
          placeholder="Название специальности"
        />
        <Button
          style={{ marginLeft: '16px' }}
          icon
          labelPosition="left"
          onClick={e => {
            Meteor.call('Speciality.insert', this.state.name, (err, res) => {
              if (err) {
                Bert.alert({
                  title: 'Ошибка добавления!',
                  message: err.reason,
                  type: 'danger',
                  style: 'growl-top-right',
                  icon: 'fa-user',
                });
              } else {
                Bert.alert({
                  title: 'Успешна добавлена!',
                  message: 'Специальность успешна добавлена в базу данных!',
                  type: 'success',
                  style: 'growl-top-right',
                  icon: 'fa-user',
                });
                this.setState({ name: '' });
              }
            });
          }}
          secondary
        >
          Добавить специальность
          <Icon name="plus" />
        </Button>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Название</Table.HeaderCell>
              <Table.HeaderCell>Удалить</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Test</Table.Cell>
              <Table.Cell>
                <Button basic>
                  <Icon name="trash" />
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Tab.Pane>
    );
  }
}

export default withTracker(props => {
  const subscription = Meteor.subscribe('AllSpecialities');
  return {
    loading: !subscription.ready(),
    specialities: SpecialitiesCollection.find({}).fetch(),
  };
})(Specialities);
