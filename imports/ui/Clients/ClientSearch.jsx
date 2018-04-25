import React, { Component } from 'react'
import { Form, Icon, Segment } from 'semantic-ui-react'

let searchFieldOptions = [
  {
    key: 'phone',
    value: 'phone',
    text: 'Номер телефона'
  },
  {
    key: 'lastname',
    value: 'lastname',
    text: 'Фамилия'
  },
  {
    key: 'firstname',
    value: 'firstname',
    text: 'Имя'
  },
  {
    key: 'email',
    value: 'email',
    text: 'Email'
  },
  {
    key: 'iin',
    value: 'iin',
    text: 'ИИН'
  },
  {
    key: 'number',
    value: 'number',
    text: 'Номер клиента'
  }
]

class ClientSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      searching: false,
      searchField: 'phone'
    }
  }
  handleSearch = e => {
    if (!this.state.searching) {
      let { searchText } = this.state
    }
  }
  render() {
    return (
      <Segment>
        <Form onSubmit={this.handleSearch}>
          <Form.Group>
            <Form.Dropdown
              placeholder="Параметры поиска"
              search
              selection
              value={this.state.searchField}
              onChange={(e, data) => {
                this.setState({ searchField: data.value })
              }}
              options={searchFieldOptions}
            />
            <Form.Input
              value={this.state.searchText}
              onChange={(e, { value }) => this.setState({ searchText: value })}
              icon="search"
              type="text"
              placeholder="Поиск"
            />
            <Form.Button labelPosition="right" icon type="submit" primary>
              Искать
              <Icon name="search" />
            </Form.Button>
          </Form.Group>
        </Form>
      </Segment>
    )
  }
}

export default ClientSearch
