from discord_webhook import DiscordWebhook, DiscordEmbed
from bs4 import BeautifulSoup
import linecache
import requests
import time


proxies = {
        'YOUR OWN PROXIES',
        'YOUR OWN PROXIES',
    }

def replace_line(filename, sizes_text, sizes):
    with open(filename, 'r') as file:
        filedata = file.read()
    filedata = filedata.replace(sizes_text, sizes + '\n')
    with open(filename, 'w') as file:
        file.write(filedata)

def chech_line(filename, url, sizes, image, title):
    with open(filename, "r") as my_file:
        line_number = 0
        for items in my_file:
            line_number = line_number + 1
            line = items.replace('\n','')
            if line == url:
                size_line = line_number + 1
                sizes_text = linecache.getline(filename, size_line).replace('\n', '')
                if sizes_text != sizes:
                    replace_line(filename, sizes_text, sizes)
                    discord(url, image, title, sizes)
                else:
                    print('No New Links')

def discord(url, image, title, sizes):
    true_sizes = sizes.replace(' ', '\n')
    hook = "YOUR OWN WEBHOOK"
    webhook = DiscordWebhook(url=hook, username="PERSONNAL INFORMATIONS")
    embed = DiscordEmbed(description="**[" + title + "](" + url + ")**", color='ffffff')
    embed.set_footer(text='CookGroup', icon_url='https://i.pinimg.com/originals/a2/00/d9/a200d9a45bfbca318084084d27ac2228.jpg')
    embed.set_thumbnail(url=image)
    embed.add_embed_field(name='Sizes', value=true_sizes)
    embed.add_embed_field(name='Brand', value='Nike')
    embed.add_embed_field(name='Site', value='Yoox')
    webhook.add_embed(embed)
    webhook.execute()

def connection(url, proxies=proxies):
    session = requests.Session()
    response = session.get(url, proxies=proxies)
    html = BeautifulSoup(response.text, 'html.parser')
    return html

def parsing(html):
    for items in html.find_all('div', {'class': 'col-8-24'})[:120]:
        support = items.a.get('href')
        if type(support) == str:
            url = 'https://www.yoox.com' + support
        else:
            url = ' '
        support0 = items.img.get('rel')
        if type(support0) == str:
            image = support0
        else:
            image = 'https://pbs.twimg.com/profile_images/773827376354619392/sOU3PLUh.jpg'
        support1 = items.find('div', class_='title')
        if type(support1) == type(None):
            title = 'Yoox'
        else:
            title = support1.text
        sizes = items.find('div', class_='colorSize').text.replace('\n', ' ')[2:][:-2]
        if 'DUNK' in title or 'JORDAN' in title or 'YEEZY' in title:
            filename = 'yoox.txt'
            with open(filename, 'r') as rf:
                with open(filename, 'a') as af:
                    read = rf.read()
                    if url not in read:
                        af.write(url + '\n')
                        af.write(sizes + '\n')
                        print(url)
                        discord(url, image, title, sizes)
                    else:
                        chech_line(filename, url, sizes, image, title)
        else:
            print('No New Links')

def monitor():
    while True:
        try:
            for i in range(1,3):
                url = 'https://www.yoox.com/FR/shoponline?d=682&dept=shoeswomen&gender=D&page='+str(i)+'&season=X&clientabt=SmsMultiChannel_ON%2CRecentlyViewed_ON%2CRecentlyViewedItemPage_ON%2CmyooxNew_ON%2COnePageCheckout_ON%2COPCSummary_ON%2CitemNew_ON%2CSrRecommendations_OFF'
                connection = connection(url)
                parsing(connection)
        except:
            pass



while True:
    monitor()
    print('stop')
    time.sleep(60)
