import React, { Component } from 'react';
import Calendar from 'react-calendar';
import { Grid } from 'semantic-ui-react';

export default class Schedule extends Component {
  state = {
    date: new Date(),
  };

  onChange = date => this.setState({ date });

  render() {
    return (
      <Grid>
        <Calendar onCange={this.onChange} value={this.state.date} />
      </Grid>
    );
  }
}
