const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("human_to_unix")
        .setDescription("Converts human time to unix milliseconds.")
        .addStringOption(option => option.setName('time').setDescription('Time to convert').setRequired(true)),
    async execute(interaction) {
        const time = interaction.options.getString('time')
        const embed = new MessageEmbed()
            .setDescription(`**${interaction.user.tag}** converted \`${time}\` to \`${Date.parse(time)}\``)
            .setColor("GREEN")
            .setFooter("Human to Unix")
            .setTimestamp()
        return interaction.followUp({ embeds: [embed] })
    }
}