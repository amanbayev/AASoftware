import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Staff = new Mongo.Collection('staff');

Staff.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Staff.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Staff.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this client belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this client was created.',
    autoValue() {
      if (this.isInsert) return new Date().toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this client was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return new Date().toISOString();
    },
  },
  number: {
    type: String,
    label: 'Number of the client.',
    autoValue() {
      if (this.isInsert) {
        let currentNumber = Staff.find().count() + 1;
        let stringNumber = currentNumber.toString().padStart(10, '0');
        // console.log('autovalue number: ' + stringNumber)
        return stringNumber;
      }
    },
  },
  lastname: {
    required: true,
    type: String,
    label: 'lastname of the client.',
  },
  firstname: {
    required: true,
    type: String,
    label: 'Firstname of the client.',
  },
  patronimic: {
    required: true,
    type: String,
    label: 'patronimic of the client.',
  },
  email: {
    type: String,
    optional: true,
    label: 'Email of the client.',
  },
  phone: {
    required: true,
    type: String,
    label: 'Phone number of the client',
  },
  iin: {
    required: true,
    type: String,
    label: 'IIN',
  },
  sex: {
    required: true,
    type: String,
    label: 'Sex',
  },
  dob: {
    type: Date,
    required: true,
    label: 'Date of birth',
  },
  notes: {
    type: String,
    optional: true,
    label: 'Notes',
  },
  profession: {
    type: String,
    optional: true,
    label: 'Profession',
  },
});

Staff.attachSchema(Staff.schema);

export default Staff;
