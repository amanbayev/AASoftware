import React, { Component } from 'react';
import { Form, Icon, Segment } from 'semantic-ui-react';
import _ from 'lodash';

let searchFieldOptions = [
  {
    key: 'phone',
    value: 'phone',
    text: 'Номер телефона',
  },
  {
    key: 'lastname',
    value: 'lastname',
    text: 'Фамилия',
  },
  {
    key: 'firstname',
    value: 'firstname',
    text: 'Имя',
  },
  {
    key: 'email',
    value: 'email',
    text: 'Email',
  },
  {
    key: 'iin',
    value: 'iin',
    text: 'ИИН',
  },
  {
    key: 'number',
    value: 'number',
    text: 'Номер клиента',
  },
];

class ClientSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searching: false,
      searchField: 'lastname',
    };
    this.handleSearch = _.debounce(this.handleSearch, 100);
  }

  handleSearch = e => {
    if (!this.state.searching) {
      let { searchText, searchField } = this.state;
      // console.log(searchField);
      let filters = {
        [searchField]: {
          $regex: '.*' + searchText + '.*',
          $options: 'i',
        },
      };

      this.props.handleFiltersChange(filters);
      // console.log(filters);
    }
  };

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
                this.setState({ searchField: data.value });
              }}
              options={searchFieldOptions}
            />
            <Form.Input
              value={this.state.searchText}
              onChange={(e, { value }) => {
                this.setState({ searchText: value });
                this.handleSearch();
              }}
              icon="search"
              type="text"
              placeholder="Поиск"
            />
            <Form.Button
              labelPosition="right"
              icon
              type="submit"
              disabled={this.state.searching}
              primary
            >
              Искать
              <Icon name="search" />
            </Form.Button>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

export default ClientSearch;
