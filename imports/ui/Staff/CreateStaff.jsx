import React, { Component } from 'react';
import { Segment, Form, Select, Radio, Button } from 'semantic-ui-react';
import { Bert } from 'meteor/themeteorchef:bert';

const options = [
  { key: 'm', text: 'Мужчина', value: 'male' },
  { key: 'f', text: 'Женщина', value: 'female' },
];

class CreateStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      patronimic: '',
      phone: '',
      iin: '',
      sex: 'male',
      dob: '',
      notes: '',
      email: '',
      profession: '',
    };
  }

  handleRadioChange = (e, { value }) =>
    this.setState({ referralSource: value });

  handleSexChange = (e, { value }) => this.setState({ sex: value });

  handleSave = e => {
    // TODO: validate form inputs
    let newStaff = this.state;
    let history = this.props.history;
    Meteor.call('Staff.insert', newStaff, (err, res) => {
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
          title: 'Успешно добавлен!',
          message: 'Сотрудник успешно добавлен в базу данных!',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-user',
        });
        history.push('/staff');
      }
    });
  };

  render() {
    const { value } = this.state;
    return (
      <Segment.Group>
        <Segment>
          <h3>Добавить нового сотрудника</h3>
        </Segment>
        <Segment>
          <Form onSubmit={this.handleSave}>
            <Form.Field>
              <Form.Input
                readOnly
                value="Будет присвоен после сохранения"
                label="Номер сотрудника"
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Фамилия"
                required
                placeholder="Тестов"
                onChange={e => {
                  this.setState({ lastname: e.target.value });
                }}
                value={this.state.lastname}
              />
              <Form.Input
                fluid
                label="Имя"
                required
                placeholder="Тест"
                onChange={e => {
                  this.setState({ firstname: e.target.value });
                }}
                value={this.state.firstname}
              />
              <Form.Input
                fluid
                required
                label="Отчетство"
                placeholder="Тестович"
                onChange={e => {
                  this.setState({ patronimic: e.target.value });
                }}
                value={this.state.patronimic}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field
                control={Select}
                required
                label="Пол"
                options={options}
                onChange={this.handleSexChange}
                placeholder="Выберите пол"
              />
              <Form.Input
                required
                label="ИИН"
                input="number"
                placeholder="123456789012"
                onChange={e => {
                  this.setState({ iin: e.target.value });
                }}
                value={this.state.iin}
              />
              <Form.Input
                label="Телефон"
                input="phone"
                required
                placeholder="+77XXYYYZZZZ"
                onChange={e => {
                  this.setState({ phone: e.target.value });
                }}
                value={this.state.phone}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                width={5}
                type="date"
                required
                label="Дата рождения"
                onChange={e => {
                  this.setState({ dob: e.target.value });
                }}
                value={this.state.dob}
              />
              <Form.Input
                type="email"
                width={11}
                placeholder="test@test.kz"
                value={this.state.email}
                label="Email"
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
              />
            </Form.Group>
            <Form.TextArea
              label="Заметки"
              placeholder="Просто вежливый пациент"
              onChange={e => {
                this.setState({ notes: e.target.value });
              }}
              value={this.state.notes}
            />
            <Form.Group>
              <Form.Button primary type="submit">
                Сохранить
              </Form.Button>
              <Form.Button
                onClick={e => {
                  e.preventDefault();
                  this.props.history.goBack();
                }}
                secondary
              >
                Отмена
              </Form.Button>
            </Form.Group>
          </Form>
        </Segment>
      </Segment.Group>
    );
  }
}

export default CreateStaff;
