process.env["NTBA_FIX_319"] = 1;
const TelegramBot = require('node-telegram-bot-api');
const ogs = require('open-graph-scraper');
const firebase = require('firebase');

const token = '1291886629:AAH8Gb4eS2_vPak4MV2ZnlhXWMQmTm7k6YY';
const bot = new TelegramBot(token, {polling: true});

// bot.on('message', (msg) => {
//   bot.sendMessage(msg.chat.id, 'Ill have the tuna. No crust.');
// });

const app = firebase.initializeApp({
  apiKey: "AIzaSyC8v2jVXi9qZenh7XegAFMvw9l2NO1EhNA",
  authDomain: "telebookmark.firebaseapp.com",
  databaseURL: "https://telebookmark.firebaseio.com",
  projectId: "telebookmark",
  storageBucket: "telebookmark.appspot.com",  
  messagingSenderId: "283303506043",
  appId: "1:283303506043:web:3eca17edcd53216ebf72de"
});

const ref = firebase.database().ref();
const sitesRef = ref.child("sites");

let siteUrl;
bot.onText(/\/bookmark (.+)/, (msg, match) => {
  siteUrl = match[1];
  console.log("situsitu", siteUrl);
  bot.sendMessage(msg.chat.id,'Got it, in which category?', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: 'Development',
          callback_data: 'development'
        },{
          text: 'Music',
          callback_data: 'music'
        },{
          text: 'Cute monkeys',
          callback_data: 'cute-monkeys'
        }
      ]]
    }
  });
});

bot.on("callback_query", (callbackQuery) => {
  const message = callbackQuery.message;
  ogs({'url': siteUrl}, function (error, results) {
    if(results.success) {
      sitesRef.push().set({
        name: results.data.ogSiteName,
        title: results.data.ogTitle,
        description: results.data.ogDescription,
        url: siteUrl,
        thumbnail: results.data.ogImage.url,
        category: callbackQuery.data
      });
      bot.sendMessage(message.chat.id,'Added \"' + results.data.ogTitle +'\" to category \"' + callbackQuery.data + '\"!')
} else {
      sitesRef.push().set({
        url: siteUrl
      });
      bot.sendMessage(message.chat.id,'Added new website, but there was no OG data!');
    }
  });
});

