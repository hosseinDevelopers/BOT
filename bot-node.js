import TelegramBot from 'node-telegram-bot-api';

const TELEGRAM_TOKEN = 'token telgram';
const OPENROUTER_KEY = 'api key ';

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

console.log('🤖 Bot started...');

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  await bot.sendMessage(chatId, '⏳ در حال پردازش...');

  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENROUTER_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openrouter/auto',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful, polite Persian-speaking assistant.',
            },
            { role: 'user', content: text },
          ],
        }),
      }
    );

    const data = await response.json();
    const answer =
      data.choices?.[0]?.message?.content ?? 'پاسخی دریافت نشد';

    await bot.sendMessage(chatId, answer);
  } catch (err) {
    console.error(err);
    await bot.sendMessage(chatId, '❌ خطایی رخ داد');
  }
});

const res = await fetch(
  'https://api.telegram.org/bot8566181062:AAFC2uKxqNH9slELN17_vsueQcsGUs7LsBg/getMe'
);

const text = await res.text();
console.log(text);

