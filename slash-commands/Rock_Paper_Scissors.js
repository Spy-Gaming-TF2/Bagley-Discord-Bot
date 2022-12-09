const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rps")
        .setDescription("Play rock paper scissors")
        .addStringOption(option => option.setName('choice').setDescription('Your choice').setRequired(true).addChoice('Rock', 'rock').addChoice('Paper', 'paper').addChoice('Scissors', 'scissors')),
    async execute(interaction) {
        const choice = interaction.options.getString('choice')
        const botChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)]
        const result = (choice === botChoice) ? 'Tie' : (choice === 'rock' && botChoice === 'paper') || (choice === 'paper' && botChoice === 'scissors') || (choice === 'scissors' && botChoice === 'rock') ? 'You lost' : 'You won'
        const embed = new MessageEmbed()
            .setDescription(`**${interaction.user.tag}** chose \`${choice}\` and **Bot** chose \`${botChoice}\` so you ${result}`)
            .setColor("GREEN")
            .setFooter("Rock Paper Scissors")
            .setTimestamp()
        return interaction.followUp({ embeds: [embed] })
    }
}