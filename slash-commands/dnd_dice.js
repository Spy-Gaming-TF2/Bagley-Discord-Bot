const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('DND Dice')
        .setDescription('Rolls a DND Dice')
        .addIntegerOption(option =>
            option.setName('sides')
                .setDescription('The number of sides')
                .setRequired(true)),
    async execute(interaction) {
        const sides = interaction.options.getInteger('sides');
        const roll = Math.floor(Math.random() * sides) + 1;
        const embed = new MessageEmbed()
            .setTitle('DND Dice')
            .setDescription(`You rolled a ${roll}`)
            .setColor('RANDOM');
        await interaction.reply({ embeds: [embed] });
    },
};