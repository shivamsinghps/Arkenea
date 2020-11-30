const nodemailer =  require('nodemailer');

let SENDGRID_PASSWORD = ''

/**
 * Creates transporter object that will help us to send emails
 */
const nodemailerSendgrid = require('nodemailer-sendgrid');
const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: SENDGRID_PASSWORD
    })
);

/**
 *  Sends an email to user
 *
 * @param {string} to email address where to send mail
 * @param {string} subject of the email
 * @param {string} html content of the email
 */
export const sendEmail = ({ to, subject, html }) => {
  return new Promise((resolve, reject) => {
    const options = { from: "hello@uarkenea.com", to, subject, html };

    return transporter
      .sendMail(options)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};