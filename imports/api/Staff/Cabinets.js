import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Cabinets = new Mongo.Collection('cabinets');

Cabinets.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Cabinets.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Cabinets.schema = new SimpleSchema({
  createdAt: {
    type: String,
    label: 'The date this cabinet was created.',
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    },
  },
  name: {
    type: String,
    optional: false,
    label: 'Name',
  },
  occupiedBy: {
    type: String,
    optional: true,
    label: 'Occupied by',
  },
});

Cabinets.attachSchema(Cabinets.schema);

export default Cabinets;
