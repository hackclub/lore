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

const hasUrl = (message) => (
	new RegExp(
		'([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?'
	).test(message)
);

app.event('message', async (body) => {
	if (hasUrl(body.event.text)) {
		publishMessage('C018J1ZEFA7', 'sick it works')
	}
});

(async () => {
	try {
		await app.start(process.env.PORT || 3000);
		console.log('⚡️ Bolt app is running!')
	} catch (err) {
		console.error(err);
	}
})()