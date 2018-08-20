import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Services = new Mongo.Collection('services');

Services.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Services.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Services.schema = new SimpleSchema({
  createdBy: {
    type: String,
    label: 'The ID of the user this service was created by.',
  },
  createdAt: {
    type: String,
    label: 'The date this service was created.',
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this service was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    },
  },
  code: {
    type: String,
    label: 'Code of the service.',
    autoValue() {
      if (this.isInsert) {
        let currentNumber = Services.find().count() + 1;
        let stringNumber = currentNumber.toString().padStart(10, '0');
        return stringNumber;
      }
    },
  },
  name: {
    type: String,
    optional: true,
    label: 'Name of the service.',
  },
  baseCost: {
    required: true,
    type: Number,
    label: 'Base cost of the service',
  },
  notes: {
    type: String,
    optional: true,
    label: 'Notes',
  },
});

Services.attachSchema(Services.schema);

export default Services;
