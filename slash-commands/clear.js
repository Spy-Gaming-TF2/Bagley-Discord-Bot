const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { parse } = require('path/posix');

module.exports = {
    data: new SlashCommandBuilder() 
    .setName('clear')
    .setDescription('Deletes messages from current channel')
    .addIntegerOption((option) => {
        return option
        .setName('amount')
        .setDescription('Amount of messages to delete')
        .setRequired(true)
    }),
    async execute(client, interaction) {
        if(!interaction.member.permission.has('MANAGE_MESSAGES')) return interaction.reply({ content: "You don't have the right permissions to do that!"})
        if(interaction.guild.me.permission.has('MANAGE_MESSAGES')) return interaction.reply({ content: "I don't have the right permissions to do this!"})

        let amount = interaction.option.getInterger('amount')

        if(isNaN(amount)) {
            return interaction.reply({content: '***Please specify a valid ammount between 1 - 100!***', ephemeral: true})
        }

        if(parseInt(amount) > 99) {
            return interaction.reply({content: '**I can only delete 99 messages at once!**', ephemeral: true})
        } else {
            try{
            let { size } = await interaction.channel.bulkDelete(amount)
            await interaction.reply({content: `Deleted ${size} messages`, ephemeral: true})
            } catch(e) {
                console.log(e)
                interaction.reply({ content: `I cannot delete messages older thatn 14 days (causes errors.)`, ephemeral: true})
            }
        }
    }
}