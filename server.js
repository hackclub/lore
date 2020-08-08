const { App } = require('@slack/bolt')
console.log(process.env.PORT)
// const app = new App({
//   signingSecret: process.env.SIGNING_SECRET,
//   token: process.env.BOT_TOKEN
// });

// (async () => {
//   await app.start(process.env.PORT || 3000);
//   // publishMessage('C018J1ZEFA7', 'sick it works')
//   console.log('⚡️ Bolt app is running!')
// })()