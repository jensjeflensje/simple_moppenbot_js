const { Client, MessageEmbed } = require("discord.js");
const { get } = require("superagent");
const { prefix, token } = require("./config.json");
const bot = new Client();
bot.login(token);

bot.on('ready', () => {
    console.log(`${bot.user.tag} werkt nu als simple_moppenbot`);
});

bot.on('message', message => {
    if (message.content === `${prefix}mop`) {
        get("https://moppenbot.nl/api/random")
            .then(res => {
                if (!res.body.success) {
                    message.channel.send("MoppenBot API gaf een error aan.");
                    return;
                }
                let jokeObj = res.body.joke;
                let embed = new MessageEmbed()
                    .setTitle(`Mop van ${jokeObj.author}`)
                    .setDescription(jokeObj.joke)
                    .setFooter(`${jokeObj.likes} likes`);
                message.channel.send(embed);
            })
            .catch(err => {
                message.channel.send("HTTP request gaf een error aan.")
            });
    }
});

