import * as nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.GMAIL_REFRESH_TOKEN);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    accessToken: process.env.GMAIL_ACCESS_TOKEN,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
  },
});

const mailConfig = {
  from: 'tor.monitor.app@gmail.com',
  to: 'sukhvinder@durhailay.co',
  subject: 'Your TOR site is down!',
};

export function sendMail(message: string): void {
  transporter.sendMail({ ...mailConfig, text: message }, (err, info) => {
    if (err) {
      console.error(err);
    }

    console.log(info);
  });
}
