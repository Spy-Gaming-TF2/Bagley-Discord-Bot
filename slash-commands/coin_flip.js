const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("coin_flip")
        .setDescription("Flip a coin."),
    async execute(interaction) {
        const coin = ['Heads', 'Tails'][Math.floor(Math.random() * 2)]
        const embed = new MessageEmbed()
            .setDescription(`**${interaction.user.tag}** flipped a coin and got \`${coin}\``)
            .setColor("GREEN")
            .setFooter("Coin Flip")
            .setTimestamp()
        return interaction.followUp({ embeds: [embed] })
    }
}