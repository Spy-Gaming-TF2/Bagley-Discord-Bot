const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("Roast Me")
        .setDescription("Roast yourself (Might be NSFW)"),
    async execute(interaction) {
        const roast = await fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
            .then(res => res.json())
            .then(json => json.insult);
        const embed = new MessageEmbed()
            .setDescription(`**${interaction.user.tag}** ${roast}`)
            .setColor("GREEN")
            .setFooter("Roast Me")
            .setTimestamp()
        return interaction.followUp({ embeds: [embed] })
    }
}