import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class TopMenu extends Component {
  constructor(props) {
    super(props);
    let path = props.location.pathname;
    this.state = {
      activeItem: path,
    };
  }

  handleMenuItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push(name);
  };
  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Container>
          <Menu.Item header>AASoftware</Menu.Item>
          <Menu.Item
            name="/landing"
            active={activeItem === '/landing'}
            content="Главная"
            onClick={this.handleMenuItemClick}
          />
          <Menu.Item
            name="/admin"
            active={activeItem === '/admin'}
            content="Администрирование"
            onClick={this.handleMenuItemClick}
          />
          <Menu.Item
            name="/clients"
            active={activeItem === '/clients'}
            content="Клиенты"
            onClick={this.handleMenuItemClick}
          />
          <Menu.Item
            name="/staff"
            active={activeItem === '/staff'}
            content="Персонал"
            onClick={this.handleMenuItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item
              name="/profile"
              active={activeItem === '/profile'}
              content="Профиль"
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item content="Выход" onClick={e => Meteor.logout()} />
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default TopMenu;
