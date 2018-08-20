import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import ServicesCollection from '../Services';

Meteor.publish('AllServices', function Services() {
  return ServicesCollection.find();
});

// Note: Services.view is also used when editing an existing document.
Meteor.publish('Services.view', function ServicesView(documentId) {
  check(documentId, String);
  return ServicesCollection.find({ _id: documentId, owner: this.userId });
});
