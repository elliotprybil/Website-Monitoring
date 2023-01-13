import { MessageEmbed, WebhookClient } from 'discord.js';

export function discord_notifications(title, price, image, url, brand, hook) {
    const webhookClient = new WebhookClient({ url: hook});

    const embed = new MessageEmbed()
        .setColor('#0099ff') 
        .setTitle(brand)
        .setURL(url)
        .setDescription(title)
        .setThumbnail(image)
        .addFields(
            { name: 'Price', value: price, inline: true },
            { name: 'Website', value: 'Amazon', inline: true },
            )
        .setTimestamp()
        .setFooter('image', 'https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_1/v1568818092/brrsdk12njus/gkdr19sajcnkrptzu5ey/butterflycoinike2019.png');
            

    webhookClient.send({
        username: 'Pokemon',
        avatarURL: 'https://i1.wp.com/www.inforumatik.com/wp-content/uploads/2013/05/Pokemon.png?fit=256%2C256&ssl=1',
        embeds: [embed],
    });

};