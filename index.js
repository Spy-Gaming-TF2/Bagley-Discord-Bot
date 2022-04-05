const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs')
const { Client, Intents } = require('discord.js');
//Some of these are privledged intents: be sure to allow or remove them if needed!
const bot = new Discord.Client({ intents: [ Intents.FLAGS.GUILDS ,  Intents.FLAGS.GUILD_MEMBERS ,  Intents.FLAGS.GUILD_BANS ,  Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS ,  Intents.FLAGS.GUILD_INTEGRATIONS ,  Intents.FLAGS.GUILD_WEBHOOKS ,  Intents.FLAGS.GUILD_INVITES ,  Intents.FLAGS.GUILD_VOICE_STATES ,  Intents.FLAGS.GUILD_PRESENCES ,  Intents.FLAGS.GUILD_MESSAGES ,  Intents.FLAGS.GUILD_MESSAGE_REACTIONS ,  Intents.FLAGS.GUILD_MESSAGE_TYPING ,  Intents.FLAGS.DIRECT_MESSAGES ,  Intents.FLAGS.DIRECT_MESSAGE_REACTIONS ,  Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
const client = bot

//Creates a list of all slash commands in your bot.
client.slashCommands = new Discord.Collection();
const commandFiles = fs.readdirSync('./slash-commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./slash-commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.slashCommands.set(command.data.name, command);
}

//When it's ready, then it'll tell you and set its activity.
bot.on('ready', () => {
	const DateNow = new Date()
    	console.log(`${bot.user.tag} successfully connected!`)
    	client.user.setActivity(`Helping ${client.guilds.cache.size} servers`);
})

//Handles when a slash command is started
client.on("interactionCreate", async interaction => {
	//Checks if the command exists
  if (!interaction.isCommand()) return
  //Find the appropriate command
	const command = client.slashCommands.get(interaction.commandName);
  //Makes sure the command exists.
	if (!command) return;
  //Checks if the command is used in a guild. This prevents commands like kick and ban from erroriously executing.
	else if (!interaction.guild) {
		await interaction.reply({ content: "This bot only works in a guild.", ephemeral : true})
	}
  //Don't know why, but sometimes this helps.
  if (!interaction) return
	else {
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
})


process.on('unhandledRejection', error => {
	console.log(error)
});

client.login(config.token);