var express = require('express');
var app = express();
app.get("/", (request, response) => {
    response.sendStatus(200);
});
app.listen(process.env.PORT);

const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = "S!";
const TOKEN = process.env.TOKEN;
const ms = require('ms')

client.on('ready', () => {
    console.log('Bot wurde gestartet!')
});

client.on('message', message => {
    if (message.content === "S!IDOT") {
        message.channel.send('The Creator is and IDOT')
    }
});

client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.find(ch => ch.name === 'Hello');

    let willkommensembed = new Discord.MessageEmbed()
        .setTitle('Willkommen')
        .setDescription(`Herzlichst Willkommen auf dem DiCoMa - Community-Server, ${member}\n\nMit dir sind wir nun ${member.guild.memberCount} Mitglieder!\n\nLie� dir bitte die Regeln durch!`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter('Created by DiCoMa')

    channel.send(`${member.user}`)
    channel.send(willkommensembed)
});

client.on('guildMemberRemove', member => {

    const channel = member.guild.channels.find(ch => ch.name === 'Hello');

    let aufwiedersehensembed = new Discord.MessageEmbed()
        .setTitle('Goodbye IDOT')
        .setDescription(`Fuck you, ${member.user.tag}, I hope you have a bad time`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter('�Just jump from a building')

    channel.send(aufwiedersehensembed)
});

client.on('message', async message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {

        case "Idot":
            message.channel.send('I am a Big IDOT!');
            break;

        case 'ping':
            let pingMessage = await message.channel.send('@everyone');

            pingMessage.edit(`haha mow ping ${pingMessage.createdTimestamp - message.createdTimestamp} ms`)
            break;

        case 'say':
            let channel = message.mentions.channels.first();

            if (!channel) {
                message.delete();
                message.channel.send(args.slice(1).join(" "))
                //message.channel.send(`args.slice(1).join(" ")\n\n~ ${message.member.tag}`)
            }
            channel.send(args.slice(2).join(" "))
            //message.channel.send(`args.slice(2).join(" ")\n\n~ ${message.member.tag}`)
            message.delete()
            break;

        case 'clear':
            try {
                if (!message.member.hasPermission(["MANAGE_MESSAGES"])) {
                    message.member.send('Haha big IDOT!')
                    message.delete()
                    return;
                } else if (message.member.hasPermission(["MANAGE_MESSAGES"])) {
                    let max = 100;

                    if (args[1] && parseInt(args[1]) <= 100) {
                        max = parseInt(args[1])
                    }

                    await message.delete()
                    message.channel.bulkDelete(max, true)

                        .then((messages) => {
                            message.channel.send('Haha die: ' + max)
                        })
                }
            } catch (err) {
                console.error(err)
            }

            break;
        case 'spam':
            if (!message.member.hasPermission(["ADMINISTRATOR"])) return;

            message.channel.send(`> **__Admin ${args.slice(0).join(" ")}__**`)
            setInterval(function () {
                message.channel.send(args.slice(0).join(" "))
            }, ms(args[0])
    };
});

client.login('Nzg2NjE0NjgyMjQ4Njc1MzI5.X9I - Ag.21TqEZSnz_VjDkeG2r4t1LoJ30M')