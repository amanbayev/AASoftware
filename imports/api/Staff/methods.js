import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Staff from './Staff';
import Specialities from './Specialities';

import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'Staff.insert': function StaffInsert(doc) {
    check(doc, {
      lastname: String,
      firstname: String,
      patronimic: String,
      email: String,
      phone: String,
      iin: String,
      sex: String,
      dob: String,
      notes: String,
      profession: String,
    });

    try {
      return Staff.insert({ owner: this.userId, ...doc });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'Staff.update': function StaffUpdate(doc) {
    check(doc, {
      _id: String,
      lastname: String,
      firstname: String,
      patronimic: String,
      email: String,
      phone: String,
      iin: String,
      sex: String,
      dob: String,
      notes: String,
      profession: String,
    });

    try {
      const documentId = doc._id;
      Staff.update(documentId, { $set: doc });
      return documentId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'Staff.remove': function StaffRemove(documentId) {
    check(documentId, String);

    try {
      return Staff.remove(documentId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'Speciality.insert': function(name) {
    check(name, String);
    try {
      let doc = {
        name,
      };
      let id = Specialities.insert(doc);
      console.log(id);
      return id;
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'Speciality.insert': function(documentId) {
    check(documentId, String);
    try {
      return Specialities.remove(documentId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: ['Staff.insert', 'Staff.update', 'Staff.remove'],
  limit: 5,
  timeRange: 1000,
});
