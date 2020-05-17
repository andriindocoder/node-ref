const request = require('request-promise').defaults({ jar: true })
const fs = require('fs')

async function main(){
	try{
		const html = await request.post("https://accounts.craigslist.org/login", {
			form: {
				inputEmailHandle: "stef@gmail.com",
				inputPassword: "1sxa42sdf"
			},
			headers: {
				Referer: "https://accounts.craigslist.org/login?rt=L&wre="
			},
			simple: false,
			followAllRedirects: true,
			jar: true
		})
		fs.writeFileSync("./login.html", html)

		const billingHtml = await request.get("https://accounts.craigslist.org/login?rt=L&wre=billing")
		fs.writeFileSync("./billing.html", billingHtml)
	}catch(e){
		console.log(e)
	}
}

main()