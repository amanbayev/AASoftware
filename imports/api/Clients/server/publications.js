import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Clients from '../Clients'

Meteor.publish('Clients', function Clients() {
  return Clients.find({ owner: this.userId })
})

// Note: Clients.view is also used when editing an existing document.
Meteor.publish('Clients.view', function ClientsView(documentId) {
  check(documentId, String)
  return Clients.find({ _id: documentId, owner: this.userId })
})
