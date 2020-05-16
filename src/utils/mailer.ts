import path from 'path';
// import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
const hbs = require('nodemailer-express-handlebars');

const smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER,
  auth: {
    user: process.env.MAILER_EMAIL_ID,
    pass: process.env.MAILER_PASSWORD,
  },
});

const handlebarsOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./src/templates/'),
    layoutsDir: path.resolve('./src/templates/'),
    defaultLayout: '',
  },
  viewPath: path.resolve('./src/templates/'),
  extName: '.html',
};

smtpTransport.use('compile', hbs(handlebarsOptions));

export default smtpTransport;
