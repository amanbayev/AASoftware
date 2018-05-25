import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import ClientsCollection from '../Clients';

Meteor.publish('AllClients', function Clients() {
  return ClientsCollection.find();
});

Meteor.publish('findClient', function(number) {
  return ClientsCollection.find({ number });
});

Meteor.publish('getClients', function(page) {
  return ClientsCollection.find({}, { limit: 5, skip: page * 5 });
});

// Note: Clients.view is also used when editing an existing document.
Meteor.publish('Clients.view', function ClientsView(documentId) {
  check(documentId, String);
  return ClientsCollection.find({ _id: documentId, owner: this.userId });
});
