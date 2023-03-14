const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { get } = require("superagent");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mop')
		.setDescription('Krijg een random mop vanuit de Moppenbot API'),
	async execute(interaction) {
        get("https://moppenbot.nl/api/random/?likes=true")
        .then(res => {
            if(!res.body.success) {
                interaction.reply({ content: `De API van MoppenBot heeft een error meegegeven`, ephemeral: true});
                return;
            }

            let jokeObj = res.body.joke;
            let embed = new EmbedBuilder()
            .setTitle(`Mop van ${jokeObj.author}`)
            .setDescription(jokeObj.joke)
            .setColor(0x00FF00)
            .setFooter({ text: `${jokeObj.likes} likes`, iconURL: 'https://i.imgur.com/4yEMjrv.png' });
            interaction.reply({embeds: [embed]})
        }).catch(err => {
            interaction.reply({ content: `De API van MoppenBot heeft een error gekregen, probeer later opnieuw.`, ephemeral: true});
            console.log(err);
        })
	},
}