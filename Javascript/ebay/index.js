import fetch from 'node-fetch';
import cheerio from 'cheerio';
import fs from 'fs';
import { discord_notifications } from './discord.js';
import { brandChecking } from './brand.js';
import { which_hook } from './hook.js';
import { verify_criterias } from './price.js';

var myVar;

function myFunction() {
    console.log('Starting the Module')
    myVar = setInterval(scrapeEbay, 5000);
};

async function scrapeEbay () {
    console.log('Starts')

    const response = await fetch(       
        'https://www.ebay.fr/sch/i.html?_dcat=31387&_fsrp=1&rt=nc&_from=R40&_nkw=montres&_sacat=0&Marque=Audemars%2520Piguet%7CBell%2520%2526%2520Ross%7CBreitling%7CZenith%7CTAG%2520Heuer%7CPatek%2520Philippe%7CTUDOR%7CRolex%7COMEGA', {
        headers: {"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36"}
    });
    
    const html = await response.text();
    
    const $ = cheerio.load(html);
    
    const watches = $('.srp-results')
    .children()
    .map(function (i, el) { 
        const article = {
            name: $(this).find('.s-item__title').text() || 'null',
            prix: $(this).find('.s-item__price').text() || 'null',
            link: $(this).find('.s-item__link').attr('href') || 'null',
            statut: $(this).find('.s-item__purchase-options-with-icon').text() || 'null',
            image: $(this).find(".s-item__image-wrapper img").attr('src') || 'null'
        };
 
        const price = list[1];
        const link = list[2];
        const statut = list[3].replace('ou ', '');
        const image = list[4];
        if (verify_criterias(title, price) == 1) {
            if (typeof title == 'string' && title != 'null' && typeof price == 'string' && price != 'null' && typeof link == 'string' && link != 'null' && typeof statut == 'string' && statut != 'null' && typeof image == 'string' && image != 'null' ) {
                const brand = brandChecking(title);
                if ( brand != 2 ) {
                    const hook = which_hook(brand);
                    console.log('good');
                    try {
                        const data = fs.readFileSync('/Users/elliotprybil/Desktop/ebay/file.txt', 'utf8'); //Read File Datas
                        if (!data.includes(title)) { 
                            try {
                                discord_notifications(title, price, link, statut, image, brand, hook);
                                fs.writeFile('/Users/elliotprybil/Desktop/ebay/file.txt', title + '\n', { flag: 'a+' }, err => {}); //New Item Wrote
                            }   
                            catch (err) {
                                console.error(err);
                            }
                        }
                    } 
                    catch (err) {
                        console.error(err);
                    }
                };
            };
        } 
    });
};

myFunction();