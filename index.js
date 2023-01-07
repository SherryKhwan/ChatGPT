const qrcode = require('qrcode-terminal');
const axios = require('axios')

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    const content = message.body

    if(message.body === '!ping') {
        client.sendMessage(message.from, 'pong');
    }
    

    if(content === 'Plz meme'){
        // const meme = await axios("https://meme-api.herokuapp.com/gimme")
        const meme = await axios("https://meme-api.com/gimme")
        .then(res => res.data)

        client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url))
    }

});


client.initialize();
