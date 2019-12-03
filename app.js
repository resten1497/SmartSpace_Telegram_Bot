process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
const token = 'INPUT_API_KEY';
const fs = require('fs')

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId,"안녕하세요!")
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    switch (msg.text) {
        case "안녕":
            break;

        case "시간표":
            break;

        default:
            bot.sendMessage(chatId, '이해를 못했어요 ㅠㅠ');
            break;
    // send a message to the chat acknowledging receipt of their message

}})



bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const data = JSON.parse(callbackQuery.data);

});



const SelectGrade = (chatId) => {
    const opts = {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: '1학년',
                    callback_data: JSON.stringify({
                        'grade': '1',
                    })
                },
                    {
                        text: '2학년',
                        callback_data: JSON.stringify({
                            'grade': '2',
                        })
                    }
                ]
            ]
        }
    };
    bot.sendMessage(chatId, '몇학년이신가요?', opts);
};



const getSchadule = (gradeNum) => {
    const day = ['수요일', '목요일', '금요일'];
    let result = "";

    try {
        let Obj = JSON.parse(fs.readFileSync('./schadule/grade' + gradeNum + '.json', 'utf-8'))
        day.forEach(element => {
            result += element + "\n";

            Obj[element].forEach(testData => {
                result += testData['period'] + "교시 " + testData['class'] + " " + testData['time'] + "분" + "\n";
            })
            result += "----------------------" + "\n";


        })
        return result

    }catch (e) {
        return "오류!"

    }

}
