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
      date: '17',
      month: '08',
      year: '2018',
      doctor: 'Ерлан Зейнуллаевич',
      referrer: '',
      number: '01',
      patient_name: 'Талгат А.',
      patient_phone: '7 700 177 07 77',
      diagnoses: '',
      services: [
        {
          number: '1',
          quantity: 'Проф чистка зубов',
          price: '7 000',
        },
        {
          number: '2',
          quantity: 'air flow',
          price: '15 000',
        },
      ],
      total: '22 000',
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
