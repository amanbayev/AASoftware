import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import Specialities from './AdminTabs/Specialities';
import Cabinets from './AdminTabs/Cabinets';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialitiesSkip: 0,
      cabinetsSkip: 0,
    };
    this.handleSkipChange = this.handleSkipChange.bind(this);
  }

  handleSkipChange(type, newSkip) {
    this.setState({ [type]: newSkip });
  }

  render() {
    const panes = [
      {
        menuItem: 'Специальности врачей',
        render: () => (
          <Specialities
            skip={this.state.specialitiesSkip}
            handleSkipChange={this.handleSkipChange}
          />
        ),
      },
      {
        menuItem: 'Кабинеты',
        render: () => (
          <Cabinets
            skip={this.state.cabinetsSkip}
            handleSkipChange={this.handleSkipChange}
          />
        ),
      },
    ];

    return (
      <Tab
        style={{ marginTop: '16px' }}
        menu={{
          fluid: true,
          vertical: true,
          tabular: true,
        }}
        panes={panes}
      />
    );
  }
}

export default Admin;
