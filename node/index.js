const TelegramApi = require('node-telegram-bot-api');

const token = process.env.BOT_ID

if (!token) throw new Error('BOT_ID variable is not set.')

const bot = new TelegramApi(token, { polling: true })

const main = async () => {
    bot.setMyCommands([
        { command: '/go', description: 'GO!' },
    ])

    bot.on('message', async msg => {
        console.table(msg);
        console.log('entities');
        console.table(msg.entities);
        const cmd = msg.text;
        const chatId = msg.chat.id;

        console.log(cmd);
        if (cmd.startsWith('/go')) {
            return bot.sendMessage(chatId, "Let's /go",
                {
                    reply_markup: JSON.stringify({
                        inline_keyboard: [[{
                            text: "Click",
                            callback_data: `/answer`,
                        }]]
                    })
                });
        }
        return bot.sendMessage(chatId, '?');
    })

    bot.on('callback_query', async update => {
        console.log('update');
        console.table(update);
        console.log(`message.from`);
        console.table(update.message.from);
        console.log(`message.chat`);
        console.table(update.message.chat);
        console.log(`message.entities`);
        console.table(update.message.entities);
        console.log(new Date(update.message.date * 1000));
        const cmd = update.data;
        const chatId = update.message.chat.id;

        if (cmd == '/go') {
            console.log('/go query');
        }
    })
}

main()
