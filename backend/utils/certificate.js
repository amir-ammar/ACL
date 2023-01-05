const { parse } = require('node-html-parser');
const fs = require('fs');
const path = require('path');

const generateCertificate = async (name, course) => {
  await fs.readFile(
    path.join(__dirname, '../assets/certificate.html'),
    'utf8',
    (err, data) => {
      if (err) {
        console.log(err);
      }
      const doc = parse(data);
      //get strong tag
      const name = doc.getElementById('name');
      const course = doc.getElementById('course');
      name.set_content(name);
      course.set_content(course);
      return doc;
    }
  );
};

module.exports = {
  generateCertificate,
};
