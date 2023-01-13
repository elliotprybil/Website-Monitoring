import fetch from 'node-fetch';
import cheerio from 'cheerio';

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
        let list = Object.values(article);
        
        const title = list[0];