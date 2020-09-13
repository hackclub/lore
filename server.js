const { App } = require('@slack/bolt')
const Airtable = require('airtable');
const metascraper = require('metascraper')([
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo-favicon')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
])

const got = require('got');
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

async function scrapeData (link) {
	const { body: html, url } = await got(link)
	const metadata = await metascraper({ html, url })
	if (metadata.logo == null) {
		metadata.logo = "https://images.emojiterra.com/google/android-10/512px/1f517.png"
	}
	if (metadata.publisher == null) {
		metadata.publisher = metadata.title;
	}
	return(metadata)
}

app.event('message', async (body) => {
	try {
		if (typeof body.event.subtype === "undefined" && hasUrl(body.event.text)) {
			let date = new Date(body.event.ts * 1000).toISOString();
			let url = extractUrl(body.event.text);
			let user = body.event.user;
			let md = await scrapeData(url);
			console.log(md);
			base('test').create({
				"date": date,
				"url": url,
				"user": user, 
				"title": md.title,
				"description": md.description,
				"publisher": md.publisher,
				"img": md.image,
				"favicon": md.logo
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