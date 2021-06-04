import json
import os


from telegram.ext import (
    Updater,
    CommandHandler,
    CallbackContext,
)

BOT_ID = os.environ['BOT_ID']


def as_formatted_json(value) -> str:
    if isinstance(value, dict):
        return json.dumps(value, indent=4)

    return json.dumps(
        json.loads(
            str(value)
            .replace("'", '"')
            .replace('False', '"False"')
            .replace('True', '"True"')
        ),
        indent=4,
    )


def go(bot, update: CallbackContext):
    print(as_formatted_json(bot))
    print(as_formatted_json(update.bot_data))
    print(as_formatted_json(update.chat_data))
    print(as_formatted_json(update.user_data))
    print(as_formatted_json(update.args))


def main():
    updater = Updater(BOT_ID)
    dispatcher = updater.dispatcher
    dispatcher.add_handler(CommandHandler('go', go))
    updater.start_polling()
    updater.idle()


if __name__ == '__main__':
    main()
