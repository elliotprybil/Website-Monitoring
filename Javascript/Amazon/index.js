import fetch from 'node-fetch';
import cheerio from 'cheerio';
import { discord_notifications } from './discord.js'
import fs from 'fs';

var myVar;

function myFunction() {
    console.log('Starting the Module')
    myVar = setInterval(scrapeAmazon, 5000);
};

async function scrapeAmazon () { 
    const response = await fetch(       
        'https://www.amazon.fr/s?k=pokemon', {
        headers: {"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36"}
    });
    
    const html = await response.text();
    
    const $ = cheerio.load(html);
    const products = $('.s-result-list')
        .children()
        .map(function (i, el) { 
            const article = {
                name: $(this).find('.a-size-mini').text().replace('Faites-lenous savoir ', '').replace(' ', '') || 'null',
                prix: $(this).find('.a-price-whole').text() || 'null',
                link: 'https://www.amazon.fr' + $(this).find('.a-link-normal').attr('href') || 'null',
                image: $(this).find('.s-image').attr('src') || 'null'
            };
    
            let list = Object.values(article);
            
            const title = list[0];
            const discord_price = list[1] + '€';
            const url = list[2];
            const image = list[3];
            const brand = 'Pokemon';
            const hook = 'https://discord.com/api/webhooks/837431328378191943/C9nNYzfaBBeTWIgCt2oC6mwkoEhk6VRTDml54YG6aIQapie20Vmc9LB_ZsdsUfkr4x5R';
            if (title != 'null' && discord_price != 'null€' && url != 'null' && image != 'null') {
                try {
                    const data = fs.readFileSync('/Users/elliotprybil/Desktop/BEmonitoring/Amazon/file.txt', 'utf8'); //Read File Datas
                    if (!data.includes(title)) { 
                        try {
                            discord_notifications(title, discord_price, image, url, brand, hook);
                            fs.writeFile('/Users/elliotprybil/Desktop/BEmonitoring/Amazon/file.txt', title + '\n', { flag: 'a+' }, err => {}); //New Item Wrote
                        } 
                          catch (err) {
                            console.error(err);
                        }
                    } else {
                        console.log('OLD');
                    }
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.log(2);
            }
        });
    ;
}

myFunction();