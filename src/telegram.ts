import dotenv from 'dotenv';

dotenv.config();

const botApiEndpoint = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

export async function sendMessage(message: string) {
  try {
    const response = await fetch(botApiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    console.log('Telegram message sent!');
  } catch (e) {
    console.error('Telegram message failed to send: ', e);
  }
}
