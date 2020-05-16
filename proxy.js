const fs = require('fs')
const rp = require('request-promise')

async function main() {
	const result = rp({
	            resolveWithFullResponse: true,
	            uri: 'https://indocoder.com',
	            agentOptions: {
	                socksHost: "180.210.201.57", // Defaults to 'localhost'.
	                socksPort: 3130 // Defaults to 1080.
	            }
	        }).then((hasil) => {
				fs.writeFileSync("./test4.html", hasil.body);
	        })
}

main();