import requests
import time
import json
from bs4 import BeautifulSoup
import threading

def monitor():
	source = requests.get('https://www.nike.com/launch/').text #, headers=RandomHeaders.LoadHeader()).text
	soup = BeautifulSoup(source, 'html.parser')
	webhook = 'https://discord.com/api/webhooks/825460407111254016/tIRDBjqwGoILC11XXEBXz0naoJvcZFymuUhPU0Zix5Thx-2ELIBGnviy1_Li8ikiclJq'
	for hrefs in soup.find_all('figure', class_='pb2-sm va-sm-t ncss-col-sm-12 ncss-col-md-6 ncss-col-lg-4 pb4-md prl0-sm prl2-md ncss-col-sm-6 ncss-col-lg-3 pb4-md prl2-md pl1-md pr0-md'):
		url = "https://www.nike.com" + hrefs.a.get('href')
		filename = 'nikelinks.txt'
		with open(filename, 'r') as rf:
			with open(filename, 'a') as af:
				read = rf.read()
				if url not in read:
					print(url)
					af.write('\n' + url)
					data = {
						"username": "Nike Monitor",
						"content": url
					}
					requests.post(webhook, data=data)
				else:
					print("Now new links found")
	time.sleep(5)

while True:
	monitor()