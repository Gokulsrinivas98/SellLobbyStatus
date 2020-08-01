const Discord = require('discord.js');

const client = new Discord. Client();
const prefix = '-';
//const fs =require('fs');
//client.commands = new Discord.Collection();
//const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
//for(const file of commandFiles){
//    const command = require(`./commands/${file}`);
//    client.commands.set(command.name, command);
//}

client.once('ready', () => {
    console.log('Ad is online!');
});
let arr=[ ];
let n=0;
client.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    let msga = message.author;
    let msgai=message.author.id;
    
    let SellRoleObject = message.guild.roles.cache.find(r=> r.name === 'Sell');
    
    if(command === 'sellon'){
        arr.push(msgai);
        
        
        message.channel.setName(`🟢┋sell-lobby`)
            .catch(console.error);
        
        message.channel.send(`${msga} is hosting a ${SellRoleObject} lobby`);
        message.delete();
               
    }
    
    else if (command === 'host'){
        
        let men= message.mentions.users.first().id
        
        if(arr.indexOf(men)!==-1){
            
            arr.splice(arr.indexOf(men), 1);
            
            arr.push(msgai);
            message.delete();
            message.channel.messages.fetch({ limit: 98 }).then(fetchedMessages => {
                const messagesToDelete = fetchedMessages.filter(msg => (msg.author.id === '737355306350149676' && msg.content.includes(`${'<@'+men+'>'}`,` ${SellRoleObject} lobby`)));
                return message.channel.bulkDelete(messagesToDelete, true);    }).catch(console.error);
            message.channel.send(`${msga} is hosting ${'<@'+men+'>'}'s ${SellRoleObject} lobby`).catch(console.error);
            }
        else{message.channel.send(`${'<@'+men+'>'} is not hosting a lobby`).then(sentMessage => {
            sentMessage.delete({ timeout: 5000 });});
            message.delete({ timeout: 5000 })}
    }
    else if (command === 'selloff'){
        message.channel.setName(`🔴┋sell-lobby`)
            .catch(console.error);
         
        async function clear() {
            message.delete();
            const fetched = await message.channel.messages.fetch({limit: 99});
            const notPinned = fetched.filter(fetchedMsg => !fetchedMsg.pinned);
            message.channel.bulkDelete(notPinned,true)
                .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
            }
        arr.length=0;      
        clear();
            
        
    }else if (command === 'help'){
        
        const exampleEmbed = new Discord.MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle('Sell Lobby Status Bot')
	        //.setURL()
	        
	        .setDescription('Pings all the users with @Sell role when a sell lobby is hosted by a member')
	        .setThumbnail('https://media.giphy.com/media/ADgfsbHcS62Jy/giphy.gif')
	        .addFields(
		        //{ name: 'Sell Commands:',value:' ' },
                //{ name: '\u200B', value: '\u200B' },
                
		        { name: 'Hey! Hope this helps you.\n\n Sell Commands:\n\n📍 -sellon', value: 'Pings members with @Sell role and changes the red dot into green',  },
                { name: '📍 -selloff', value: 'Reverts back the green dot to red and clears the channel'},
                {name : '📍 -host @existing host' , value:'Replaces the old host with the new host '}
	)
	        //.addField('Inline field title', 'Some value here', true)
	        
	        .setTimestamp()
	        .setAuthor('Adroxxus','https://cdn.discordapp.com/embed/avatars/0.png','https://discord.com/channels/@me/738806953714647153')

        message.channel.send(exampleEmbed);
        message.delete();
    }
    
    
});


client.login(process.env.token);