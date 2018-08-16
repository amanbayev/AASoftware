import '../imports/startup/server';

import JSZip from 'jszip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

Meteor.methods({
  GenerateDocX: function() {
    const content = Assets.getBinary('naryad.docx');

    const zip = new JSZip(content);

    const doc = new Docxtemplater();
    doc.loadZip(zip);

    doc.setData({
      date: '05',
      month: '08',
      year: '2018',
      doctor: 'Test Doctor',
      referrer: '',
      number: '01',
      patient_name: 'Test patient',
      patient_phone: '7 702 555 88 44',
      diagnoses: '',
      services: [
        {
          number: '1',
          quantity: 'prof chistka',
          price: '',
        },
        {
          number: '2',
          quantity: 'air flow',
          price: '15 000',
        },
      ],
      total: '15 000',
      nosology: [
        {
          reason: '',
          period: '',
        },
      ],
    });

    try {
      doc.render();
    } catch (error) {
      var e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties,
      };
      console.log(JSON.stringify({ error: e }));
      throw error;
    }

    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    var path = process.env['METEOR_SHELL_DIR'] + '/../../../public';
    console.log(fs.realpathSync('.'));
    fs.writeFileSync(path + '/output.docx', buf);
  },
});
