const { App } = require('@slack/bolt')
const Airtable = require('airtable');
//use metascraper https://www.npmjs.com/package/scrape-meta
const token = process.env.BOT_TOKEN
const app = new App({
	signingSecret: process.env.SIGNING_SECRET,
	token: token
});
Airtable.configure({
	endpointUrl:
		'https://api.airtable.com',
	apiKey: process.env.AIRTABLE_API_KEY
});

var base = Airtable.base('appelSu1QbwJdEw2p');

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

const extractUrl = (message) => {
	try {
		let raw = message.match('([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?')[0];
		let splitArr = ["|", ">"];
		for (let symbol of splitArr) {
			if (raw.includes(symbol)) {
				return raw.split(symbol)[0];
			}
		}
		return raw;
	} catch (err) {
		console.error(err);
	}
};

app.event('message', async (body) => {
	try {
		if (typeof body.event.subtype === "undefined" && hasUrl(body.event.text)) {
			let date = new Date(body.event.ts * 1000).toISOString();
			let url = extractUrl(body.event.text);
			let user = body.event.user;
			base('test').create({
				"date": date,
				"url": url,
				"user": user
			}, function(err, record) {
				if (err) {
					console.error(err);
					return;
				}
				console.log(record.getId());
			});
		}
	} catch (err) {
		console.error(err);
	}
});

(async () => {
	try {
		await app.start(process.env.PORT || 3000);
		console.log('⚡️ Bolt app is running!')
	} catch (err) {
		console.error(err);
	}
})();