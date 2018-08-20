import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Services from './Services';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'Services.insert': function ServicesInsert(doc) {
    check(doc, {
      code: String,
      name: String,
      baseCost: Number,
      notes: String,
    });

    try {
      return Services.insert({ owner: this.userId, ...doc });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'Services.update': function ServicesUpdate(doc) {
    check(doc, {
      _id: String,
      code: String,
      name: String,
      baseCost: Number,
      notes: String,
    });

    try {
      const documentId = doc._id;
      Services.update(documentId, { $set: doc });
      return documentId; // Return _id so we can redirect to document after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'Services.remove': function ServicesRemove(documentId) {
    check(documentId, String);

    try {
      return Services.remove(documentId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: ['Services.insert', 'Services.update', 'Services.remove'],
  limit: 5,
  timeRange: 1000,
});
