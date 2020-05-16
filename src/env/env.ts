process.env.ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || 'development-seed';
process.env.MAILER_EMAIL_ID =
  process.env.MAILER_EMAIL_ID || 'testnodemailer.cristian@gmail.com';
process.env.MAILER_PASSWORD = process.env.MAILER_PASSWORD || 'Ortiz$2019';
process.env.MAILER_SERVICE_PROVIDER =
  process.env.MAILER_SERVICE_PROVIDER || 'Gmail';
process.env.API_URL = process.env.API_URL || 'http://localhost:5001/api/v1.0';
process.env.FRONT_END_URL =
  process.env.FRONT_END_URL || 'http://localhost:3000';

export const port = 5001;
