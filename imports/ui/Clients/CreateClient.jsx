import React, { Component } from 'react'
import {
  Segment,
  Form,
  Select,
  Radio,
  Button,
  Breadcrumb
} from 'semantic-ui-react'
import { Bert } from 'meteor/themeteorchef:bert'

const options = [
  { key: 'm', text: 'Мужчина', value: 'male' },
  { key: 'f', text: 'Женщина', value: 'female' }
]

class CreateClient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      patronimic: '',
      phone: '',
      iin: '',
      sex: 'male',
      dob: '',
      notes: '',
      referrealSource: 'noanswer'
    }
  }

  handleRadioChange = (e, { value }) =>
    this.setState({ referrealSource: value })

  handleSexChange = (e, { value }) => this.setState({ sex: value })

  handleSave = e => {
    console.log(this.state)
    // TODO: validate form inputs
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Section link>Главная</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section link>Клиенты</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>Добавить</Breadcrumb.Section>
        </Breadcrumb>
        <Segment.Group>
          <Segment>
            <h3>Добавить нового клиента</h3>
          </Segment>
          <Segment>
            <Form onSubmit={this.handleSave}>
              <Form.Field>
                <Form.Input
                  readOnly
                  value="Будет присвоен после сохранения"
                  label="Номер клиента"
                />
              </Form.Field>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Фамилия"
                  required
                  placeholder="Тестов"
                  onChange={e => {
                    this.setState({ lastname: e.target.value })
                  }}
                  value={this.state.lastname}
                />
                <Form.Input
                  fluid
                  label="Имя"
                  required
                  placeholder="Тест"
                  onChange={e => {
                    this.setState({ firstname: e.target.value })
                  }}
                  value={this.state.firstname}
                />
                <Form.Input
                  fluid
                  required
                  label="Отчетство"
                  placeholder="Тестович"
                  onChange={e => {
                    this.setState({ patronimic: e.target.value })
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
                  placeholder="123000123000"
                  onChange={e => {
                    this.setState({ iin: e.target.value })
                  }}
                  value={this.state.iin}
                />
                <Form.Input
                  label="Телефон"
                  input="phone"
                  required
                  placeholder="+77015551122"
                  onChange={e => {
                    this.setState({ phone: e.target.value })
                  }}
                  value={this.state.phone}
                />
              </Form.Group>
              <Form.Group>
                <Form.Input
                  type="date"
                  required
                  label="Дата рождения"
                  onChange={e => {
                    this.setState({ dob: e.target.value })
                  }}
                  value={this.state.dob}
                />
              </Form.Group>
              <Form.TextArea
                label="Заметки"
                placeholder="Просто вежливый пациент"
                onChange={e => {
                  this.setState({ notes: e.target.value })
                }}
                value={this.state.notes}
              />
              <Form.Group>
                <Form.Field>
                  <label>Откуда узнал о клинике:</label>
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Не ответил"
                    name="radioGroup"
                    value="noanswer"
                    checked={this.state.referrealSource === 'noanswer'}
                    onChange={this.handleRadioChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Вывеска"
                    name="radioGroup"
                    value="banner"
                    checked={this.state.referrealSource === 'banner'}
                    onChange={this.handleRadioChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Рекоммендации"
                    name="radioGroup"
                    value="recommendations"
                    checked={this.state.referrealSource === 'recommendations'}
                    onChange={this.handleRadioChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Интернет"
                    name="radioGroup"
                    value="internet"
                    checked={this.state.referrealSource === 'internet'}
                    onChange={this.handleRadioChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Реклама"
                    name="radioGroup"
                    value="ad"
                    checked={this.state.referrealSource === 'ad'}
                    onChange={this.handleRadioChange}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Button primary type="submit">
                  Сохранить
                </Form.Button>
                <Form.Button
                  onClick={e => {
                    e.preventDefault()
                  }}
                  secondary
                >
                  Отмена
                </Form.Button>
              </Form.Group>
            </Form>
          </Segment>
        </Segment.Group>
      </div>
    )
  }
}

export default CreateClient
