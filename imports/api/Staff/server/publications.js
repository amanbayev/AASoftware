import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import StaffCollection from '../Staff';

Meteor.publish('AllStaff', function Staff() {
  return StaffCollection.find();
});

Meteor.publish('findStaff', function(number) {
  return StaffCollection.find({ number });
});

Meteor.publish('getStaff', function(page) {
  return StaffCollection.find({}, { limit: 5, skip: page * 5 });
});

// Note: Staff.view is also used when editing an existing document.
Meteor.publish('Staff.view', function StaffView(documentId) {
  check(documentId, String);
  return StaffCollection.find({ _id: documentId, owner: this.userId });
});
