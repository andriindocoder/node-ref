const robotParser = require("robots-parser");
const request = require("request-promise");

const robotsUrl = "https://textfiles.meulie.net/robots.txt";

async function getRobotsTxt(robotsUrl) {
	const robotTxt = await request.get(robotsUrl);
	const robots = robotParser(robotsUrl, robotTxt);

	console.log(robots.isAllowed("https://textfiles.meulie.net/100/", "StefanBot"));
	console.log(robots.isAllowed("https://textfiles.meulie.net/100/", "rogerbot"));

	return robotTxt;
}

getRobotsTxt(robotsUrl)