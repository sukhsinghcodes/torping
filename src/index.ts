import * as tr from 'tor-request';
import { sendMail } from './mail';

// In mintues as you don't really want to make TOR requests often
const pollIntervalOptions = [10, 30, 60, 1];

const inputUrl = 'http://wasabiukrxmkdgve5kynjztuovbg43uxcbcxn6y2okcrsg7gb6jdmbad.onion/';
const inputPollIntervalMinutes = pollIntervalOptions[3];

interface IResponse {
  statusCode: number;
  statusMessage: string;
}

function handlePing(err: unknown, res: IResponse): void {
  if (err) {
    console.error('Offline ❌');
    console.error(err);
    sendMail(`Offline ❌\n\nAn error occurred: ${err}`);
  }

  if (res) {
    if (res.statusCode >= 400) {
      console.log('The service is online but has an application error 😔');
      console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
      sendMail(
        `The service is online but has an application error 😔\n\nStatus: ${res.statusCode} ${res.statusMessage}`
      );
      return;
    }
    console.log('Online ✅');
  }
}

function ping(url: string) {
  console.log('Pinging', url);
  tr.request(url, handlePing);
}

ping(inputUrl);
if (inputPollIntervalMinutes > 0) {
  setInterval(() => {
    ping(inputUrl);
  }, inputPollIntervalMinutes * 60000);
}
