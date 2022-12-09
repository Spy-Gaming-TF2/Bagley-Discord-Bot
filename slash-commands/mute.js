const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mute a user.")
        .addUserOption(option => option.setName('user').setDescription('User to mute').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for muting').setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has('MANAGE_ROLES')) return interaction.reply({ content: "You don't have permission to use this command.", ephemeral: true })
        const user = interaction.options.getUser('user')
        const reason = interaction.options.getString('reason')
        const member = interaction.guild.members.cache.get(user.id)
        const role = interaction.guild.roles.cache.find(role => role.name === 'Muted')
        if (member.roles.cache.has(role.id)) return interaction.reply({ content: `${user.tag} is already muted.`, ephemeral: true })
        member.roles.add(role)
        const embed = new MessageEmbed()
            .setDescription(`**${interaction.user.tag}** muted **${user.tag}** for \`${reason}\``)
            .setColor("GREEN")
            .setFooter("Mute")
            .setTimestamp()
        return interaction.reply({ embeds: [embed] })
    }
}