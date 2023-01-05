const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendEmail = async (options) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken,
      },
    });

    const mailOptions = {
      from: `Nerd Educational PlatForm ${process.env.EMAIL}`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
      attachments: options.attachments,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log('error in sending email');
    console.log(error);
  }
};

module.exports = sendEmail;
