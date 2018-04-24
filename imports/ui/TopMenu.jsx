import React, { Component } from 'react'
import { Menu, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class TopMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'home'
    }
  }

  handleMenuItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push('/' + name)
  }
  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Container>
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            content="Главная"
            onClick={this.handleMenuItemClick}
          />
          <Menu.Item
            name="admin"
            active={activeItem === 'admin'}
            content="Администрирование"
            onClick={this.handleMenuItemClick}
          />
          <Menu.Item
            name="clients"
            active={activeItem === 'clients'}
            content="Клиенты"
            onClick={this.handleMenuItemClick}
          />
        </Container>
      </Menu>
    )
  }
}

export default TopMenu
