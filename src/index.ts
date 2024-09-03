import * as tr from 'tor-request';
import ping from 'ping';
import { sendMessage } from './telegram';

// const inputUrl = 'http://wasabiukrxmkdgve5kynjztuovbg43uxcbcxn6y2okcrsg7gb6jdmbad.onion/';
const pollIntervalMinutes = 60;
const hosts = process.env.HOSTS.split(',');

interface IResponse {
  statusCode: number;
  statusMessage: string;
}

function handlePing(host: string, isAlive: boolean): void {
  if (!isAlive) {
    console.log(`${host} is offline ❌`);
    sendMessage(`*${host}* is offline ❌`);
    return;
  }

  console.log(`${host} is online ✅`);
}

function torping(host: string) {
  console.log('Pinging', host);
  tr.request(host, (err: unknown, res: IResponse) => {
    let isAlive = true;

    if (err || (res && res.statusCode >= 400) || !res) {
      isAlive = false;
    }

    handlePing(host, isAlive);
  });
}

function webping(host: string) {
  ping.sys.probe(host, function (isAlive) {
    console.log('Pinging', host, isAlive ? '✅' : '❌');
    handlePing(host, isAlive);
  });
}

// Start the pinging
hosts.forEach((host) => webping(host));

if (pollIntervalMinutes > 0) {
  setInterval(() => {
    hosts.forEach((host) => webping(host));
  }, pollIntervalMinutes * 60000);
}
