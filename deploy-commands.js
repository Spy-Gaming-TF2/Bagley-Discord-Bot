const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./slash-commands').filter(file => file.endsWith('.js'));

const clientId = config.clientID;
const guildId = config.guildId;

//Creates a list of all slash commands in your bot.
for (const file of commandFiles) {
	const command = require(`./slash-commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		// Get the current application info.
		await rest.put(
            Routes.applicationCommands(clientId, guildId),
            { body: commands },
        );        

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();