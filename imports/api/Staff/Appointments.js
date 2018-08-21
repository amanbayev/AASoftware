import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Appointments = new Mongo.Collection('appointments');

Appointments.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Appointments.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Appointments.schema = new SimpleSchema({
  createdAt: {
    type: String,
    label: 'The date this appointment was created.',
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    },
  },
  createdBy: {
    type: String,
    label: 'The ID of Meteor user who created this appointment',
    autoValue() {
      return this.userId;
    },
  },
  clientId: {
    type: String,
    label: 'Client ID',
  },
  date: {
    type: Date,
    label: 'Date of the appointment',
  },
  doctorId: {
    type: String,
    optional: true,
    label: 'Doctor ID',
  },
  approved: {
    type: Boolean,
    defaultValue: true,
  },
});

Appointments.attachSchema(Appointments.schema);

export default Appointments;
