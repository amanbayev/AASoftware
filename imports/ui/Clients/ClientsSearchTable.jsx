import React, { Component } from 'react'

import ClientSearch from './ClientSearch'
import ClientsTable from './ClientsTable'

import { Link } from 'react-router-dom'
import { Segment, Button, Icon } from 'semantic-ui-react'

class ClientsSearchTable extends Component {
  render() {
    return (
      <Segment.Group>
        <Segment>
          <Button
            as={Link}
            to="/clients/add"
            icon
            labelPosition="left"
            secondary
          >
            Добавить нового клиента
            <Icon name="plus" />
          </Button>
        </Segment>
        <ClientSearch />
        <ClientsTable />
      </Segment.Group>
    )
  }
}

export default ClientsSearchTable
