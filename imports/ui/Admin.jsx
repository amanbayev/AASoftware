import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import Specialities from './AdminTabs/Specialities';

class Admin extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const panes = [
      {
        menuItem: 'Специальности врачей',
        render: () => <Specialities />,
      },
      {
        menuItem: 'Кабинеты',
        render: () => <Tab.Pane>Tab 2</Tab.Pane>,
      },
      {
        menuItem: 'Диагнозы',
        render: () => <Tab.Pane>Tab 3</Tab.Pane>,
      },
      {
        menuItem: 'Призяка врачей к кабинетам',
        render: () => <Tab.Pane>Tab 4</Tab.Pane>,
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
