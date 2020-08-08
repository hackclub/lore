const { App } = require('@slack/bolt')
const token = process.env.BOT_TOKEN
const app = new App({
	signingSecret: process.env.SIGNING_SECRET,
	token: token
});

async function publishMessage(id, text) {
	try {
		const result = await app.client.chat.postMessage({
			token: token,
			channel: id,
			text: text
		});
	} catch (err) {
		console.error(err);
	}
}

(async () => {
	try {
		await app.start(process.env.PORT || 3000);
		publishMessage('C018J1ZEFA7', 'sick it works')
		console.log('⚡️ Bolt app is running!')
	} catch (err) {
		console.error(err);
	}
})()