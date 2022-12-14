const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("$GTA to USD")
        .setDescription("Convert $GTA to USD (from gta v online prices)")
        .addIntegerOption(option => option.setName('dollars').setDescription('Dollars to convert').setRequired(true)),
    async execute(interaction) {
        const dollars = interaction.options.getInteger('dollars')
        const usd = dollars / 1000000
        const embed = new MessageEmbed()
            .setDescription(`**${interaction.user.tag}** converted \`${dollars} $GTA\` to \`${usd} USD\``)
            .setColor("GREEN")
            .setFooter("$GTA to USD")
            .setTimestamp()
        return interaction.followUp({ embeds: [embed] })
    }
}