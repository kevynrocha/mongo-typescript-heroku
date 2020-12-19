import { SendMailOptions } from 'nodemailer';

export const auth = {
  auth: {
    api_key: process.env.EMAIL_API_KEY || '',
    domain: process.env.EMAIL_DOMAIN,
  },
};

export const mailOptions = (cause: string): SendMailOptions => ({
  from:
    'Mailgun Sandbox <postmaster@sandboxa6366c5b8351431492d1b611d726e601.mailgun.org>',
  to: 'kevyn_oliver@hotmail.com',
  subject: 'Fullstack Challenge 20201030 - Kevyn Rocha',
  text: `Falha ao realizar rotina de importação de dados. Motivo: ${cause}`,
});
