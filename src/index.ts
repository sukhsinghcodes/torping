import * as tr from 'tor-request';
import { sendMail } from './mail';

// In mintues as you don't really want to make TOR requests often
const pollIntervalOptions = [10000, 30, 60];

// const inputUrl = 'http://dwigb6uzyyj5qfpdojkgpv7q3ccn6cwh5u6wem65cnlcmus3dmtuj4yd.onion';
const inputUrl = 'http://wasabiukrxmkdgve5kynjztuovbg43uxcbcxn6y2okcrsg7gb6jdmbad.oniondd';
const inputPollInterval = pollIntervalOptions[0];

interface Response {
  statusCode: number;
  statusMessage: string;
}

function handlePing(err: unknown, res: Response): void {
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
// if (inputPollInterval > 0) {
//   setInterval(() => {
//     ping(inputUrl);
//   }, inputPollInterval);
// }
