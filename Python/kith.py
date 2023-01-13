from random import choice
import requests
from dhooks import Webhook, Embed
import time
from bs4 import BeautifulSoup

sizes = []
def get_proxy():
    url = "https://www.sslproxies.org/"
    r = requests.get(url)
    test = BeautifulSoup(r.content, 'html.parser')
    return {'https': choice(list(map(lambda x:x[0]+':'+x[1], list(zip(map(lambda x:x.text, test.findAll('td')[::8]),map(lambda x:x.text, test.findAll('td')[1::8]))))))}

def monitor():
    proxy = get_proxy()
    source = requests.get('https://eu.kith.com/collections/mens-footwear', proxies=proxy, timeout=5).text
    soup = BeautifulSoup(source, 'html.parser')
    hook = Webhook("YOUR OWN WEBHOOK")
    for items in soup.find_all('li', class_='collection-product'):
        url = 'https://eu.kith.com' + items.a.get('href')
        image = 'https:' + items.img.get('src')
        product = items.find('h1', class_='product-card__title')
        title = product.text
        for test in items.find_all('li', class_='product-card__variant-container'):
            list = test.button.get('data-universal-sizing')
            sizes.append(list)
        filename = 'kith.txt'
        with open(filename, 'r') as rf:
            with open(filename, 'a') as af:
                read = rf.read()
                if title == "Nike Air Jordan 1 Retro High OG" or title == "Nike Air Jordan 3 Retro":
                    if url not in read:
                        embed = Embed(
                            description="**["+title+"](" + url + ")**",
                            color=0x5CDBF0,
                            timestamp='now'
                        )
                        print(url)
                        af.write('\n' + url)
                        if sizes == []:
                            print("No new links found")
                            sizes.clear()
                        else:
                            embed.add_field(name='Sizes', value='\n'.join(sizes))
                            embed.add_field(name='Type', value='Restock')
                            embed.add_field(name='Site', value='KITH')
                            embed.set_footer(text='SecretProject')
                            embed.set_thumbnail(url=image)
                            hook.send(embed=embed)
                    else:
                        print("No new links found")
                    sizes.clear()
                else:
                    print("No new links found")
                    sizes.clear()

    else:
        print('Nothing much')
    time.sleep(60)



while True:
    monitor()




