process.env["NTBA_FIX_319"] = 1;

const TelegramApi = require('node-telegram-bot-api');

const token = process.env.BOT_ID

if (!token) throw new Error('BOT_ID variable is not set.')

const bot = new TelegramApi(token, { polling: true })

const main = async (userId, msg) => {
    return bot.sendMessage(userId, msg);
}

const receiver = process.argv[2];

const msg = process.argv.slice(3).join(' ');

console.log(receiver, msg);

(async () => {
    await main(receiver, msg);
    process.exit();
})();
