# chatloggerRpR
File for launching a locally hosted chat logger server to log local chat on RpR in Conan exiles, and posting it on a Webhook on a discord server.

Requirements to run:
Node.js - for launching and management of the application
discord.js - for handling the webhook

open the file with your preferred programming handler
example: https://code.visualstudio.com/
but a version of Notepad can do as well, there is just less help from the program to spot errors.

if you do not intend to modify a lot you can contend with the beginning of the file (example below)
for your use in a private channel, you only need to change the Webhook link, it should run as intended after that.
'chatloggername' you can change for a neater display, and the same for the 'imageforlogger'

-------------------------------------------------------
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

--------------------------------------------------------

create a webhook on your discord server
use some form of commandline interface - gitbash can work or your imbedded cmd (https://git-scm.com/downloads)
make a folder for your logger - name it what you want
install node.js - https://nodejs.org/en/
inside the folder:
install discord.js - https://discord.js.org/
copy chatlogserver.mjs file into the folder
modify the needed lines in the file with the link to the webhook on discord
in commandline from inside the folder run the server with the command:
node chatlogserver.mjs
leave the commandline interface running, and the chatlogger will continue to post on your discord
when you want to end the chatlogserver select the commandline interface and press ctrl+C (if you use Git bash) - you can now close the commandline interface

