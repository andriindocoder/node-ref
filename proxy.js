const fs = require('fs')
const request = require('request-promise')

async function main() {
	const result = await request.get(
		"https://indocoder.com"
	);

	fs.writeFileSync("./test.html", result);
}

main();