//Scrapes the datas from the last 12 posts of an account
import { discord_notifications } from './discord.js';
import fetch from 'node-fetch';
import cheerio from 'cheerio';


const response = await fetch(       
    'https://www.instagram.com/noahbeck/feed/?__a=1', {
    headers: {"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36"}
});

const html = await response.text();

const $ = cheerio.load(html);

const jsondata = JSON.parse($.text());

const user_data = jsondata['graphql']['user'];

const profile = user_data['full_name'];

const posts = user_data['edge_owner_to_timeline_media']['edges'];

for (let i in posts) {
    let post = posts[i];
    let type = post['node']['__typename'];
    if (type === 'GraphSidecar') {
        let code = post['node']['shortcode'];
        let url = 'https://www.instagram.com/p/' + code + '/';
        let image = post['node']['display_url'];
        let deeper = post['node']['edge_media_to_caption']['edges'];
        if (deeper.length != 0 ) {
            let support = post['node']['edge_media_to_caption']['edges'][0]['node']['text'];
            let text = support.substring(0, 250);
            let hook = 'https://discord.com/api/webhooks/837431328378191943/C9nNYzfaBBeTWIgCt2oC6mwkoEhk6VRTDml54YG6aIQapie20Vmc9LB_ZsdsUfkr4x5R';
            discord_notifications(text, hook, image, profile, url);
        } else {
            console.log('No New Links');
        };
    } else {
        console.log("Vidéo");
    };

};

