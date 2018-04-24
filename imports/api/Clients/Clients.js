import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

const Clients = new Mongo.Collection('clients')

Clients.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
})

Clients.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
})

Clients.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this client belongs to.'
  },
  createdAt: {
    type: String,
    label: 'The date this client was created.',
    autoValue() {
      if (this.isInsert) return new Date().toISOString()
    }
  },
  updatedAt: {
    type: String,
    label: 'The date this client was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString()
    }
  },
  number: {
    required: true,
    type: String,
    label: 'Number of the client.'
  },
  lastname: {
    required: true,
    type: String,
    label: 'lastname of the client.'
  },
  firstname: {
    required: true,
    type: String,
    label: 'Firstname of the client.'
  },
  patronimic: {
    required: true,
    type: String,
    label: 'patronimic of the client.'
  },
  email: {
    type: String,
    label: 'Email of the client.'
  },
  phone: {
    required: true,
    type: String,
    label: 'Phone number of the client'
  },
  iin: {
    required: true,
    type: String,
    label: 'IIN'
  },
  sex: {
    required: true,
    type: String,
    label: 'Sex'
  },
  dob: {
    type: Date,
    required: true,
    label: 'Date of birth'
  }
})

Clients.attachSchema(Clients.schema)

export default Clients
