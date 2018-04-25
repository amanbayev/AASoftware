import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import ClientsCollection from '../Clients'

Meteor.publish('AllClients', function Clients() {
  return ClientsCollection.find()
})

// Note: Clients.view is also used when editing an existing document.
Meteor.publish('Clients.view', function ClientsView(documentId) {
  check(documentId, String)
  return ClientsCollection.find({ _id: documentId, owner: this.userId })
})
