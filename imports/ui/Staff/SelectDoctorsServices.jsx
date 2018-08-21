import React, { Component } from 'react';

import { Grid, List, Header, Segment, Search } from 'semantic-ui-react';

const ListDoctors = () => (
  <List selection verticalAlign="middle">
    <List.Item>
      <List.Content>
        <List.Header>Talgat</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        <List.Header>Talgat</List.Header>
      </List.Content>
    </List.Item>
  </List>
);

const getResults = () =>
  _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, '$'),
  }));

const source = _.range(0, 3).reduce(memo => {
  const name = faker.hacker.noun();

  // eslint-disable-next-line no-param-reassign
  memo[name] = {
    name,
    results: getResults(),
  };

  return memo;
}, {});

export default class SelectDoctorsServices extends Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      const filteredResults = _.reduce(
        source,
        (memo, data, name) => {
          const results = _.filter(data.results, isMatch);
          if (results.length) memo[name] = { name, results }; // eslint-disable-line no-param-reassign

          return memo;
        },
        {},
      );

      this.setState({
        isLoading: false,
        results: filteredResults,
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header sub>Врачи:</Header>
            <ListDoctors />
            <Search
              category
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true,
              })}
              results={results}
              value={value}
              {...this.props}
            />
          </Grid.Column>
          <Grid.Column>
            <Header sub>Услуги врача:</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
