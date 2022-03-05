const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Allows the admin or owner to kick the member.")
    .addUserOption((option) => option.setName('user').setDescription('The person who you want to kick').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Reason to kick member').setRequired(false)),
  async execute(interaction) {

    if (!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.followUp({ content: "You do not have permission to use this command.", ephemeral: true })

    if (!interaction.client.permissions.has("KICK_MEMBERS")) return interaction.followUp({ content: "Please give me the \"Kick Members\" permission." })

    const user = interaction.options.getUser('user')
    const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {
      return interaction.followUp({ content: "I couldn't find that member?", ephemeral: true })
    })

    if (!member) return interaction.followUp({ content: "Unable to get details related to given member.", ephemeral: true });
    var reason = interaction.options.getString('reason')
    if (!reason) reason = "No reason given."

    if(interaction.client.roles.highest.position <= member.roles.highest.position)
    return interaction.followUp({ content: 'I cannot kick that user because they are above me.', ephemeral: true })

    if (!member.kickable || member.user.id === interaction.client.user.id)
      return interaction.followUp("I am unable to kick this member");

    if (interaction.member.roles.highest.position <= member.roles.highest.position)
      return interaction.followUp('Given member has higher or equal rank as you so i can not kick them.')

    const embed = new MessageEmbed()
      .setDescription(`**${member.user.tag}** is kicked out from the server for \`${reason}\``)
      .setColor("GREEN")
      .setFooter("Kick Member")
      .setTimestamp()

    await member.user.send(`You are kicked from **\`${interaction.guild.name}\`** for \`${reason}\``).catch(err => { })
    member.kick({ reason })

    return interaction.followUp({ embeds: [embed] })

  },

};