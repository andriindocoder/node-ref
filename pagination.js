const fs = require('fs')
const rp = require('request-promise')

async function main() {
	const result = rp({
	            resolveWithFullResponse: true,
	            uri: 'https://craigslist.com',
	            agentOptions: {
	                socksHost: "139.196.120.52", // Defaults to 'localhost'.
	                socksPort: "8080" // Defaults to 1080.
	            }
	        }).then((hasil) => {
				fs.writeFileSync("./test4.html", hasil.body);
	        })
}

main();