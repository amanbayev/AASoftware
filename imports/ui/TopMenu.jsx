import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';

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

  renderMenuItem = (path, label, role) => {
    const roles = ['admin', role];
    let color;
    switch (role) {
      case 'superadmin':
        color = 'red';
        break;
      case 'doctor':
        color = 'orange';
        break;
      case 'client':
        color = 'green';
        break;
      default:
        color = 'blue';
        break;
    }
    return (
      Roles.userIsInRole(this.props.userId, roles) && (
        <Menu.Item
          name={path}
          color={color}
          active={this.state.activeItem === path}
          content={label}
          onClick={this.handleMenuItemClick}
        />
      )
    );
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Container>
          <Menu.Item header>AASoftware</Menu.Item>
          {this.renderMenuItem('/schedule', 'Расписание', [
            'admin',
            'registrar',
          ])}
          {this.renderMenuItem('/newvisit', 'Запись на прием', [
            'admin',
            'registrar',
          ])}
          {this.renderMenuItem('/visit', 'Прием пациента', 'doctor')}
          {this.renderMenuItem('/storage', 'Склад', 'registrar')}
          {this.renderMenuItem('/payments', 'Оплата', 'client')}
          {this.renderMenuItem('/database', 'База Данных', 'registrar')}
          {this.renderMenuItem(
            '/tracklogs',
            'Заполнение журналов',
            'registrar',
          )}
          {this.renderMenuItem('/admin', 'Администрирование', 'registrar')}
          {/* <Menu.Item
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
            name="/naryads"
            active={activeItem === '/naryads'}
            content="Наряды"
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
          /> */}
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
