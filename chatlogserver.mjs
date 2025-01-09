
// server.mjs
import { createServer } from 'node:http';
import { WebhookClient } from 'discord.js';

/*
This file is based on the provided example here: https://apiconan.totchinuko.fr/#/roleplay?id=player-chat-logger
and the base setup here: https://nodejs.org/en/
and the Discord.js guide at: https://discordjs.guide,
in particular the example here: https://github.com/discordjs/guide/blob/main/code-samples/popular-topics/webhooks/14/using-WebhookClient.js
For conveniance, the declarations needed listed here at the beginning
fill out as nessesary.
*/

// hostname - the simulated localhost, if the server is run at the same machine that is played on, then you dont need to change it
const hostname = "127.0.0.1";

// port to listen to - only change if different port wanted
const port = 3000;

// the webhook link, create a webhook on your discord server, and use the direct link that it provide between the " " signs
const webhookLink = "https://discord.com/api/webhooks/id/token";

// name that the logger is going to use on Discord, if changed keep it between the " " signs
const chatloggername = "some-username"

// link to the profile image of the Discord post, direct link to image, current from discordjs.guide
const imageforlogger = "https://i.imgur.com/AfFp7pu.png"

// start up the server and checks for message then post it to the Discord webhook, as long as open it will continue to do so unless it throws an error
const server = createServer((req, res) => {
  try {
	const posterVariable = parseMessage(req);
	if (posterVariable)
		{
			postDiscord(posterVariable);
		}
	}
	catch (err) {
		console.error(err);
	}
	res.statusCode = 200;
	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(
		JSON.stringify({
		  ManifestFileVersion: "000000000000",
		  bIsFileData: false,
		  AppID: "000000000000",
		  AppNameString: "",
		  BuildVersionString: "",
		  LaunchExeString: "",
		  LaunchCommand: "",
		  PrereqIds: [],
		  PrereqName: "",
		  PrereqPath: "",
		  PrereqArgs: "",
		  FileManifestList: [],
		  ChunkHashList: {},
		  ChunkShaList: {},
		  DataGroupList: {},
		  ChunkFilesizeList: {},
		  CustomFields: {},
		})
	);
});

// starts a simple http server locally on the adress given at the top: hostname and port
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

// define the discord webhook link to clean up the setup at the top
const webhookClient = new WebhookClient({ url: webhookLink });

//parsing the message for the logger to post
// 
// todo: make safety check work proper
//

function parseMessage(req) {
	const [urlPath] = req.url.split("?");
	// if (urlPath !== "/message"){
	//	console.log(urlPath);
	//	return;};

    // expected message to parse /message=hello world&sender=The Barbarian
	const query = req.url.slice(urlPath.length + 1);
	const parts = query.split("&");

    // clear out buffer while run continuously
	let sender = "";
	let message = "";
    // new message parsed out to message and sender
	for (const currPart of parts) {
	  const [paramName] = currPart.split("=", 1);
	  const value = currPart.slice(paramName.length + 1);
  
		switch (paramName) {
			case "message":
				message = decodeURIComponent(value);
				break;
			case "sender":
				sender = decodeURIComponent(value);
		}
	}
	return { sender, message} ;
}

// posts the information from message with an image of server, and the name of logger according to initial values
function postDiscord(msg) {
	const payload = `\n[${getTimestamp()}] ${msg.sender}: ${msg.message}`;
webhookClient.send({
	content: payload,
	username: chatloggername,
	avatarURL: imageforlogger,
	});
};

/*
getting a timestamp if you want imperial value prinout then move the // to the other return
parts not neede can be removed according to the constants
symbols can be included so a date format like this:
(30/12 : 09:29:30)
would looke like this:
`${day}/${month}" : "${hour}:${minute}:${second}
symbols between datapoints can be changed as well / to : and such
*/
function getTimestamp() {
	const now = new Date();
  
	const year = now.getFullYear();
	const month = (now.getMonth() + 1).toString().padStart(2, "0");
	const day = now.getDate().toString().padStart(2, "0");
	const hour = now.getHours().toString().padStart(2, "0");
	const minute = now.getMinutes().toString().padStart(2, "0");
	const second = now.getSeconds().toString().padStart(2, "0");
	return `"The: "${day}/${month}" at:"${hour}:${minute}:${second}`;
    // return `${year}/${month}/${day}-${hour}:${minute}:${second}`;
}