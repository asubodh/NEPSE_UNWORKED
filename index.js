const {
    Collection,
    Client,
    Discord
} = require('discord.js')
const fs = require('fs')
const {
    MessageEmbed
} = require("discord.js");
const client = new Client({
    disableEveryone: true
});

const config = require('./config.json')
const prefix = config.prefix
const token = config.token
client.ticketCategory = '856130499738206218'
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(./handlers/${handler})(client);
});


client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args)
})


//RICH PRESENCE

client.on('ready', () => {

    const activites = [
        !!help In ${client.guilds.cache.size} Servers ❤️,
        !!help In ${client.channels.cache.size} Channels ❤️,
        !!help of ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users ❤️
    ]

    let i = 0;

    setInterval(() => client.user.setActivity(${activites[i++ % activites.length]}, {
        type: 'LISTENING'
    }), 15000); //${this.guilds.cache.size}
    console.log(${client.user.username} ✅)

});

client.login(token)
