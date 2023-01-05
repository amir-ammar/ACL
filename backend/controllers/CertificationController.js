const CertificationModel = require('../models');
const { StatusCodes } = require('http-status-codes');
const sendEmail = require('../utils/mail');
const generatePDF = require('../utils/pdfGenerator');

// only for admin
const allCertifications = (req, res) => {
  res.send('all Certification');
};

// only for owner
const findCertification = (req, res) => {
  res.send('get Certification');
};

// only for admin
const updateCertification = (req, res) => {
  res.send('update Certification');
};

// only for admin
const deleteCertification = (req, res) => {
  res.send('delete Certification');
};

// when course is finished
const createCertification = async (req, res) => {
  const { email, username, course } = req.body;

  if (!email || !username || !course) {
    console.log('please provide all values');
    throw new BadRequestError('please provide all values');
  }
  try {
    const pdf = await generatePDF(username, course);
    await sendEmail({
      email,
      subject: 'Certificate',
      text: 'Congratulations, you have completed the course',
      html: '<h1>Congratulations, you have completed the course</h1>',
      attachments: [
        {
          filename: `${username}-certificate.pdf`,
          content: pdf,
          contentType: 'application/pdf',
        },
      ],
    });
  } catch (error) {
    console.log('error');
  }
  // res.status(StatusCodes.OK).json({
  //   msg: 'Certificate sent',
  // });
};

module.exports = {
  allCertifications,
  findCertification,
  updateCertification,
  deleteCertification,
  createCertification,
};
