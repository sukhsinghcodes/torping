import * as nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);

const mailConfig = {
  from: process.env.FROM_EMAIL,
  to: process.env.TEST_EMAIL,
  subject: 'Your TOR site is down!',
};

export function sendMail(message: string): void {
  transporter.sendMail({ ...mailConfig, text: message }, (err) => {
    if (err) {
      console.error(err);
    }

    console.log('Email sent!');
  });
}
