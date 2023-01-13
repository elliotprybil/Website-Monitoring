import time
import requests
from bs4 import BeautifulSoup
from discord_webhook import DiscordWebhook, DiscordEmbed

dico = {"Blackbay 58 Blue Navy 79030B": "3400", "Blackbay 58 Black 79030N": "3250", "Blackbay GMT 79830RB": "3700", "Blackbay 58 925 79010SG": "4400", "Blackbay 58 Bronze 79012M": "4650", "Blackbay Chrono 79360N": "5400", #Tudor
        "Defy Classic Blue 95.9000.670 51.R790": "4200", #Zenith
        "Submariner 14060": "9500", "Submariner Date 16610": "10750", "Submariner Date Kermit 16610LV": "16700", "Submariner ref 114060": "10750", "Submariner Date ref 116610": "12500", "Submariner Date ref 116610LV": "16700", "Submariner ref 124060": "12000", "Submariner Date ref 126610": "12500", "Submariner Date Starbuck 126610LV": "16700", "GMT Master II Coke 16710": "11900", "GMT Master II Pepsi 16710": "14300", "GMT Master II lunette noire 116710": "12000", "GMT Master II Pepsi 116710": "16100", "GMT Master II Batman 126710BLNR": "13100", "GMT Master II Rootbeer 126711CHNR": "17900", "Datejust Turn-O-Graph 116264": "6000", "Datejust 126234": "11500", "Datejust 126300 ": "9200", "Oyster Perpetual 124300": "7750", "Oyster Perpetual 126000": "7200", "Skydweller 326934": "17900", "Daytona 116500LN": "20200", "SeaDweller DeepSea 126660": "15400", "SeaDweller 126600": "13700", "Explorer 214270": "7600", "Explorer II 216570": "10950", "Explorer II 226570": "11070", "Milgauss 116400GV": "10119", "Air-King 116900": "7619", #Rolex
        "Superocean Heritage '57 A10370121B1A1": "3571", "Superocean Heritage '57 Limited Edition II Rainbow A103702A1C1A1": "6547", "Breitling Top Time Deus Limited Edition A233101A1A1X1": "6666", #Breitling
        "Monaco CBL2111.FC6453": "4761", "Monaco CAW211P.FC6356": "4642", #Tag Heuer
        "BR-05 BR05A-BL-ST/SST": "3810", "BR-05 BR05A-BLU-ST/SST": "3571", "BR-05 BR05C-BL-ST/SST": "4523", "BR-05 BR05C-BU-ST/SST": "4523",#Bell&Ross
        "Nautilus 5711": "113000", "Nautilus 5712": "107000", "Nautilus 5726": "71400", "Nautilus 5980": "226100", "Nautilus 5740": "226100", "Aquanaut 5167": "53571", "Aquanaut 5168": "53500", "Aquanaut 5164": "77380", "Aquanaut 5968": "113095", #Patek Philippe
        "Royal Oak 15500": "27380", "Royal Oak 15202": "29761" #Audemars Piguet
        }

brands = ['Tudor',
          'Zenith',
          'Rolex',
          'Breitling',
          'Tag Heuer',
          'Bell&Ross',
          'Omega',
          'Patek Philippe',
          'Audemars Piguet']

def StrToInt(str):
    support = str.replace(',', '')
    return int(support)

def StrToList(str):
    li = list(str.split(" "))
    return li

def brandChecking(title):
    for i in brands:
        if i in title:
            return i

def which_brand(brand):
    if brand == 'Rolex':
        hook = 'https://discord.com/api/webhooks/847420865242988554/kzUAMH1yxSOkAmMZTOJp7iFkD2ZFx_7vcdFYlZlseHHfSBAhi4TZ-K5AsKMrbSYFwyZH'
    elif brand == 'Tudor':
        hook = 'https://discord.com/api/webhooks/847428900531077150/85zWpAvKuRE5X_G_kkU1U0k1WdWCKyL6SObdZGBgjphbJDE8MI5RsY0JxNCMY9pzmtKi'
    elif brand == 'Zenith':
        hook = 'https://discord.com/api/webhooks/855020106895720459/RLcNETtK4ndg1z--w1w9C6HO904tQ5kasKLehb1K6n2EeCjx8guJOWWO9y_uVWatT5pu'
    elif brand == 'Breitling':
        hook = 'https://discord.com/api/webhooks/855019921745248257/HvOTssEnG3V2W91xMNXY649QruGVhOX7n0t2PcrBws69Fx_6ppxxrCKgsIPONDD60F8S'
    elif brand == 'Tag Heuer':
        hook = 'https://discord.com/api/webhooks/855019757966589973/Xqq74ry0t7qDtGe9wAaNisZoYgLr8hdVlfX00AtdNwiiDVk9j6GiXwIIe5jrBw7Ve4XJ'
    elif brand == 'Bell&Ross':
        hook = 'https://discord.com/api/webhooks/855019862556016671/gtUhT3WROnKH0ESZuaA9lz9RYK3VlqFpDYufi9VQ-Lxx0zHjrtZ7nxTElpYWDPzEGGmX'
    elif brand == 'Patek Philippe':
        hook = 'https://discord.com/api/webhooks/855019692254691368/w4_s2ZFzXwkyWXERJ_Kid2vBK9HOV1F6lhmaeaUg9GGJs8WDOmNKOcMP63pwu_8dT4v_'
    elif brand == 'Omega':
        hook = 'https://discord.com/api/webhooks/855020061197860925/62ATmuH_clXPg3i1s_x18C6ouzIsKaxPx9NBoT6gYp0_XrFET7j5aq7zVLsRS5MZA1B5'
    else: #Audemars Piguet
        hook = 'https://discord.com/api/webhooks/855019622817071114/itIVOUOxzkjwCdOeAujwN3EusiDlgDOSmgbMKM4tgAy9r8gjZwwqqe0jJ_WLbgmE1Ze6'
    return hook

def monitors_icon(brand):
    if brand == 'Rolex':
        image = 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Logo_da_Rolex.png'
    elif brand == 'Tudor':
        image = 'https://theroyalshopbarbados.com/wp-content/uploads/2018/06/TUDOR-LOGO-300x300.png'
    elif brand == 'Zenith':
        image = 'https://upload.wikimedia.org/wikipedia/fr/thumb/5/55/Logo_Zenith.svg/1280px-Logo_Zenith.svg.png'
    elif brand == 'Breitling':
        image = 'https://logos-download.com/wp-content/uploads/2016/09/Breitling_logo.png'
    elif brand == 'Tag Heuer':
        image = 'https://r.lvmh-static.com/uploads/2014/10/logo-3.png'
    elif brand == 'Bell&Ross':
        image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Bell_and_Ross.svg/1280px-Bell_and_Ross.svg.png'
    elif brand == 'Patek Philippe':
        image = 'https://logodownload.org/wp-content/uploads/2019/09/patek-philippe-logo-2.png'
    elif brand == 'Omega':
        image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Greek_uc_Omega.svg/600px-Greek_uc_Omega.svg.png'
    else:  # Audemars Piguet
        image = 'https://upload.wikimedia.org/wikipedia/en/8/81/Audemars-piguet-logo.png'
    return image

def discord(title, brand, price, url, image):
    filename = 'Chrono24.txt'
    with open(filename, 'r') as rf:
        with open(filename, 'a') as af:
            read = rf.read()
            if url not in read:
                print(url)
                af.write(url + '\n')
                hook = which_brand(brand)
                webhook = DiscordWebhook(url=hook, username=brand, image=monitors_icon(brand))
                embed = DiscordEmbed(description="**[" + title + "](" + url + ")**", color='ffffff')
                embed.set_footer(text='CookGroup', icon_url='https://i.pinimg.com/originals/a2/00/d9/a200d9a45bfbca318084084d27ac2228.jpg')
                embed.set_thumbnail(url=image)
                embed.add_embed_field(name='Brand', value=brand)
                embed.add_embed_field(name='Price', value=price + '€')
                embed.add_embed_field(name='Site', value='Chrono24')
                webhook.add_embed(embed)
                webhook.execute()
            else:
                 print('No New Links Found')

def proxies_test(proxies):
    url = 'https://httpbin.org/ip'
    r = requests.get(url, proxies=proxies, verify=False)
    print(r.text)

def connection(headers, proxy):
    url = 'https://www.chrono24.com/search/index.htm?condition=101&condition=1302&condition=1301&countryIds=DE&countryIds=NO&countryIds=RS&countryIds=BE&countryIds=FI&countryIds=PT&countryIds=BG&countryIds=DK&countryIds=LT&countryIds=LU&countryIds=HR&countryIds=LV&countryIds=FR&countryIds=UA&countryIds=HU&countryIds=SE&countryIds=MC&countryIds=SI&countryIds=UK&countryIds=BY&countryIds=MD&countryIds=ME&countryIds=SK&countryIds=SM&countryIds=IE&countryIds=MK&countryIds=EE&countryIds=GI&countryIds=AD&countryIds=CH&countryIds=MT&countryIds=IS&countryIds=AL&countryIds=GR&countryIds=IT&countryIds=ES&countryIds=AT&countryIds=CY&countryIds=CZ&countryIds=PL&countryIds=LI&countryIds=RO&countryIds=NL&countryIds=BA&currencyId=USD&dosearch=true&facets=country&manufacturerIds=221&manufacturerIds=23&manufacturerIds=265&manufacturerIds=245&manufacturerIds=236&manufacturerIds=18&manufacturerIds=194&manufacturerIds=32&maxAgeInDays=0&pageSize=60&redirectToSearchIndex=true&resultview=block&showpage=1&sortorder=5'
    html = requests.get(url, headers=headers, proxies=proxy, verify=False)
    soup = BeautifulSoup(html.text, 'html.parser')
    return soup

def parsing(soup):
    for items in soup.find_all('div', class_='article-item-container wt-search-result'):
            url = 'https://www.chrono24.com' + items.a.get('href')
            support = items.img.get('data-original')
            if type(support) == str:
                image = support
            else:
                image = items.img.get('src')
            price = items.find('div', class_='article-price').text.replace('\n', '').replace('$','')
            support0 = items.find('div', class_='article-title').text[10:].replace('...', '')
            title = support0.replace('"', '').replace('-', ' ').replace(',', '').replace("(", '').replace(")",'').replace('','').replace('/', '')
            brand = brandChecking(title)
            filename = 'chrono24.txt'
            with open(filename, 'r') as rf:
                with open(filename, 'a') as af:
                    read = rf.read()
                    if url not in read:
                        if type(brand) == str:
                            for cle, valeur in dico.items():
                                counter = 0
                                list = StrToList(cle)
                                for i in list:
                                    if i in title:
                                        counter = counter + 1
                                    else:
                                        counter = counter
                                    if counter == len(list):
                                        price1 = StrToInt(valeur)
                                        price2 = StrToInt(price)
                                        if price2 <= price1:
                                            af.write(url + '\n')
                                            discord(title, brand, price, url, image)
                                        else:
                                            print('No new links')
                                    else:
                                        print('No new links')
                        else:
                            print('No new links')
                    else:
                        print('No new links')

def monitor():
    try:
        headers = {
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36"
        }
        proxy_host = "proxy.zyte.com"
        proxy_port = "8011"
        proxy_auth = "2c14b06436784c2583c16e8dfcc85a6e:"
        proxy = {
            "https": f"http://{proxy_auth}@{proxy_host}:{proxy_port}/",
            "http": f"http://{proxy_auth}@{proxy_host}:{proxy_port}/"
        }
        proxies_test(proxy)
        c = connection(headers, proxy)
    except:
        pass
    parsing(c)


while True:
    monitor()
    time.sleep(4838)
