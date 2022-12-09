const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("Guessing Game")
        .setDescription("Guess a number between 1 and 100")
        .addIntegerOption(option => option.setName('number').setDescription('Number to guess').setRequired(true)),
    async execute(interaction) {
        const number = interaction.options.getInteger('number')
        const botNumber = Math.floor(Math.random() * 100) + 1
        const result = (number === botNumber) ? 'You guessed the number!' : (number > botNumber) ? 'Too high!' : 'Too low!'
        const embed = new MessageEmbed()
            .setDescription(`**${interaction.user.tag}** guessed \`${number}\` and **Bot** chose \`${botNumber}\` so you ${result}`)
            .setColor("GREEN")
            .setFooter("Guessing Game")
            .setTimestamp()
        return interaction.followUp({ embeds: [embed] })
    }
}