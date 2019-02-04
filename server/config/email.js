
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kappatank98@gmail.com',
    pass: 'iloveha123'
  }
});

const mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

const sendEmail = (config) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(config, function(error, info){
      if (error) {
        reject(new Error("Failed to send email"))
      } else {
        console.log('Email sent: ' + info.response);
        resolve();
      }
    });
  });

};


module.exports = sendEmail;