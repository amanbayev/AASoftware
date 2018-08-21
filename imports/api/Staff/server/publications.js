import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import StaffCollection from '../Staff';
import SpecialitiesCollection from '../Specialities';
import CabinetsCollection from '../Cabinets';
import AppointmentsCollection from '../Appointments';

Meteor.publish('AllAppointments', function() {
  return AppointmentsCollection.find();
});

Meteor.publish('AppointmentsInRage', function(startDate, endDate) {
  return AppointmentsCollection.find({
    date: {
      $gte: startDate,
      $lt: endDate,
    },
  });
});

Meteor.publish('AllStaff', function Staff() {
  return StaffCollection.find();
});

Meteor.publish('AllSpecialities', function() {
  return SpecialitiesCollection.find();
});

Meteor.publish('AllCabinets', function() {
  return CabinetsCollection.find();
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
