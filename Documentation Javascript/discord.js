import { MessageEmbed, WebhookClient} from 'discord.js';

export function discord_notifications(title, price, link, statut, image, brand, hook) {
 
    const webhookClient = new WebhookClient({ url: hook});

    const embed = new MessageEmbed()
        .setColor('#0099ff') 
        .setTitle('EBAY')
        .setURL(link)
        .setDescription(title)
        .setThumbnail(image)
        .addFields(
            { name: 'Price', value: price, inline: false },
            { name: 'Statut', value: statut, inline: true },
            { name: 'Brand', value: brand, inline: true },
            { name: 'Useful Link', value: 'Put resell price', inline: true }
            )
        .setTimestamp()
        .setFooter('Butterfly Effect', 'https://lh3.googleusercontent.com/proxy/rRBmUxbz-4fqSnKkTlw1BhaVCxZw9EU6ih-UcyHwflIyVSZTg5R_N15WzRgRkn6vjE_BSuuwo0eipvDV9gNYcjn1PQ_uBPQk0UnOgAy35wry8I6NxOoZegTewTKE71BD_Gb6YXHspTGdWh4hpSeLbyEfXuZ2VLrqsg');
            

    webhookClient.send({
        username: 'KingHellium',
        avatarURL: 'https://img.icons8.com/cotton/2x/kiwi--v2.png',
        embeds: [embed],
    });

};