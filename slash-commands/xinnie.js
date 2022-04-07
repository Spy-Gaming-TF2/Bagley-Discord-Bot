const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
		.setName('xinnie')
		.setDescription("Sends Image of Xinnie the Pooh"),
        async execute(interaction) {
            interaction.reply({content : "https://imgur.com/a/xMzp1iW", ephemeral : true })
        },
};