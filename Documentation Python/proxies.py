import requests

url = "https://httpbin.org/ip"
proxy_host = "proxy.zyte.com"
proxy_port = "8011"
proxy_auth = "2c14b06436784c2583c16e8dfcc85a6e:" # Make sure to include ':' at the end
proxies = {
    "https": f"http://{proxy_auth}@{proxy_host}:{proxy_port}/",
    "http": f"http://{proxy_auth}@{proxy_host}:{proxy_port}/"
}

r = requests.get(url, proxies=proxies, verify=False)
print(r.text)
