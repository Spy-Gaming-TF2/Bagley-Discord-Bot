const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
 	data : new SlashCommandBuilder()
		.setName('ping')
		.setDescription("Pong!"),
	async execute(interaction) {
        const apiPing = interaction.client.ws.ping
        console.log(`Ping : ${apiPing}ms`)
        interaction.reply({content: `Pong! ${apiPing}ms`, ephemeral : true})
        .catch(e => {
            console.log(e)
        })
	},
}