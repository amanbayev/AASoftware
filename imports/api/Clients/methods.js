import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Clients from './Clients';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'Clients.insert': function ClientsInsert(doc) {
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
      referralSource: String,
    });

    try {
      return Clients.insert({ owner: this.userId, ...doc });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'Clients.update': function ClientsUpdate(doc) {
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
      referralSource: String,
    });

    try {
      const documentId = doc._id;
      Clients.update(documentId, { $set: doc });
      return documentId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'Clients.remove': function ClientsRemove(documentId) {
    check(documentId, String);

    try {
      return Clients.remove(documentId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: ['Clients.insert', 'Clients.update', 'Clients.remove'],
  limit: 5,
  timeRange: 1000,
});
