from discord_webhook import DiscordWebhook, DiscordEmbed

#Dans ce cas là, le discord bot est spécifique aux montres

def discord(title, brand, price, link, image):
    filename = 'site.txt'
    with open(filename, 'r') as rf:
        with open(filename, 'a') as af:
            read = rf.read()
            if link not in read:
                af.write(link + '\n')
                print(link)
                hook = discord_brand(brand)
                webhook = DiscordWebhook(url=hook, username="Elliot Prybil")
                embed = DiscordEmbed(description="**[" + title + "](" + link + ")**", color='ffffff')
                embed.set_footer(text='CookGroup', icon_url='https://i.pinimg.com/originals/a2/00/d9/a200d9a45bfbca318084084d27ac2228.jpg')
                embed.set_thumbnail(url=image)
                embed.add_embed_field(name='Brand', value=brand)
                embed.add_embed_field(name='Price', value=price + '€')
                embed.add_embed_field(name='Site', value='site')
                webhook.add_embed(embed)
                webhook.execute()
            else:
                 print('No New Links Found')


#Dans ce cas là, le discord bot est spécifique aux sneakers

def discord(url, image, title, sizes):
	if 'DUNK' in title or 'JORDAN' in title or 'YEEZY' in title:
		filename = 'yoox.txt'
	            with open(filename, 'r') as rf:
	                with open(filename, 'a') as af:
	                    read = rf.read()
	                    if url not in read:
	                        af.write(url + '\n')
	                        af.write(sizes + '\n')
	                        print(url)
						    true_sizes = sizes.replace(' ', '\n')
						    hook = "https://discord.com/api/webhooks/837431328378191943/C9nNYzfaBBeTWIgCt2oC6mwkoEhk6VRTDml54YG6aIQapie20Vmc9LB_ZsdsUfkr4x5R"
						    webhook = DiscordWebhook(url=hook, username="Elliot Prybil")
						    embed = DiscordEmbed(description="**[" + title + "](" + url + ")**", color='ffffff')
						    embed.set_footer(text='CookGroup', icon_url='https://i.pinimg.com/originals/a2/00/d9/a200d9a45bfbca318084084d27ac2228.jpg')
						    embed.set_thumbnail(url=image)
						    embed.add_embed_field(name='Sizes', value=true_sizes)
						    embed.add_embed_field(name='Brand', value='Nike')
						    embed.add_embed_field(name='Site', value='Yoox')
						    webhook.add_embed(embed)
						    webhook.execute()
						else:
	                        chech_line(filename, url, sizes, image, title)


