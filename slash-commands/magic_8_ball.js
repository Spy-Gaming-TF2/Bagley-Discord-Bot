const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("Magic 8 Ball")
        .setDescription("Ask the Magic 8 Ball a question")
        .addStringOption(option => option.setName('question').setDescription('Question to ask').setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question')
        const answers = ['It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes - definitely.', 'You may rely on it.', 'As I see it, yes.', 'Most likely.', 'Outlook good.', 'Yes.', 'Signs point to yes.', 'Reply hazy, try again.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 'Concentrate and ask again.', "Don't count on it.", 'My reply is no.', 'My sources say no.', 'Outlook not so good.', 'Very doubtful.']
        const answer = answers[Math.floor(Math.random() * answers.length)]
        const embed = new MessageEmbed()
            .setDescription(`**${interaction.user.tag}** asked \`${question}\` and the Magic 8 Ball answered \`${answer}\``)
            .setColor("GREEN")
            .setFooter("Magic 8 Ball")
            .setTimestamp()
        return interaction.followUp({ embeds: [embed] })
    }
}