import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Specialities = new Mongo.Collection('specialities');

Specialities.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Specialities.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Specialities.schema = new SimpleSchema({
  createdAt: {
    type: String,
    label: 'The date this client was created.',
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    },
  },
  name: {
    type: String,
    optional: false,
    label: 'Name',
  },
});

Specialities.attachSchema(Specialities.schema);

export default Specialities;
