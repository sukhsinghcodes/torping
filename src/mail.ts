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
  to: process.env.TO_EMAIL,
  subject: 'Your site is down!',
  text: 'Your site is down!',
  html: 'Your site is down!',
};

export function sendMail(message: string): void {
  transporter.sendMail({ ...mailConfig, text: message, html: message }, (err) => {
    if (err) {
      console.error(JSON.stringify(err));
      return;
    }

    console.log('Email sent!');
  });
}
