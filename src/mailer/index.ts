import nodemailer from 'nodemailer';
import mailGun from 'nodemailer-mailgun-transport';

import { auth, mailOptions } from '../config/mail';
import logger from '../logger';

const sendEmail = (cause: string): void => {
  const transporter = nodemailer.createTransport(mailGun(auth));

  transporter.sendMail(mailOptions(cause), (err, info) => {
    console.log(err, info);
    if (err) {
      logger.error('Error occurs', err);
      return;
    }
    logger.info('Email sent!', info);
  });
};

export default sendEmail;
