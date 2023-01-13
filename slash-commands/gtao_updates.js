const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('GTA Online Weekly Updates')
        .setDescription('Get the latest GTA Online Weekly Updates'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setTitle('GTA Online Weekly Updates')
            .setURL('https://www.rockstargames.com/newswire/category/updates/gtaonline')
            .setThumbnail('https://i.imgur.com/5zg7pZk.png')
            .setColor('#ff0000')
            .setFooter('GTA Online Weekly Updates', 'https://i.imgur.com/5zg7pZk.png');
        await interaction.reply({ embeds: [embed] });
    }
};