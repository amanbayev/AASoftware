import React, { Component } from 'react'
import ClientsTable from './ClientsTable'

class Clients extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h3>Клиенты</h3>
        <ClientsTable />
      </div>
    )
  }
}

export default Clients
