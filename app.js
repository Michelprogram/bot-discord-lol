const { Client,MessageAttachment,MessageEmbed } = require('discord.js');
const get_Runes = require('./lib/fetch_data')
const Canvas_draw = require('./lib/tCanvas')
const check_champ = require('./lib/champion')
const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', async msg => {
    if (msg.content.slice(0,5) == '+rune' && !msg.author.bot && msg.channel.name == 'runes_bot'){
        if(msg.content.split(' ').length == 3){
            const [_,champ_name,poste] = msg.content.split(' ')
            if(check_champ(champ_name)){
                const runes = await get_Runes(champ_name,poste)
            
                const canvas = new Canvas_draw()
                await canvas.draw_champ_img(runes.img_champ)
                await canvas.draw_runes(runes.rune_1,60)
                await canvas.draw_runes(runes.rune_2,260)
                await canvas.draw_runes(runes.fragment,420)
                canvas.draw_title(champ_name,poste)
        
                const attachment = new MessageAttachment(canvas.canva.toBuffer())
                msg.channel.send(msg.author,attachment)
                return 0 
            }

            msg.reply("Le champion n'existe pas !")
            return 0
            
        }
        
    }

    else if(msg.content == '+help'){
        const message = new MessageEmbed()
        .setColor('#0099ff')
        .addFields(
            
            { name: 'Commande de base', value: '+rune nom_du_champion', inline:true },
            { name: '_', value:"Permet de connaître le runage pour un champion", inline:true},

            { name :'Attention :warning: ', value : "Les noms des champions à espace sont remplacés par _"},
            { name : 'Source', value : 'Les runes sont copiées du site https://www.op.gg/'}

        )
        .setTimestamp()
        .setThumbnail('https://media.discordapp.net/attachments/823596682528292865/839805521895751710/unknown.png')
        msg.channel.send(message)
        return 0

    }

    else if (msg.content == '+choliere'){
        msg.reply('Oh tu as trouvé la commande secrète :smirk: ')
        return 0
    }

})

client.login("ODAwMzU1NzQwMTQ1NDE4MjUw.YAQ7Xg.xcw-XyMtqGCNUGosCUfh_OyW7ZY");