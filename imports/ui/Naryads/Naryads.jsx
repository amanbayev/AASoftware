import React, { Component } from 'react';

import { Header, Menu, Grid, Button } from 'semantic-ui-react';

export default class Naryads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'allNaryads',
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  generateClick = e => {
    Meteor.call('GenerateDocX', (err, res) => {
      if (err) console.log(err);
      else console.log(res);
    });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Grid style={{ marginTop: '16px' }}>
        <Grid.Column width={4}>
          <Menu vertical>
            <Menu.Item
              name="allNaryads"
              active={activeItem === 'allNaryads'}
              onClick={this.handleItemClick}
            >
              <Header as="h4">Promotions</Header>
              <p>Check out our new promotions</p>
            </Menu.Item>
            <Menu.Item
              name="archives"
              active={activeItem === 'archives'}
              onClick={this.handleItemClick}
            >
              <Header as="h4">Archives</Header>
              <p>Useful archives here</p>
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column width={12}>
          <h4>Test content will go here</h4>
          <p>Like this one</p>
          <Button onClick={this.generateClick.bind(this)}> Test</Button>
        </Grid.Column>
      </Grid>
    );
  }
}
