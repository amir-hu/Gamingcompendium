from bs4 import BeautifulSoup
import requests
import re
import sys
import os
import http.cookiejar
import json
import urllib.request, urllib.error, urllib.parse


def get_soup(url,header):
    return BeautifulSoup(urllib.request.urlopen(
        urllib.request.Request(url,headers=header)),
        'html.parser')

def bing_image_search(query):
    query= query.split()
    query='+'.join(query)
    url="http://www.bing.com/images/search?q=" + query + "&FORM=HDRSC2"

    #add the directory for your image here
    DIR="Pictures"
    header={'User-Agent':"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"}
    soup = get_soup(url,header)
    image_result_raw = soup.find("a",{"class":"iusc"})

    m = json.loads(image_result_raw["m"])
    murl, turl = m["murl"],m["turl"]# mobile image, desktop image

    image_name = urllib.parse.urlsplit(murl).path.split("/")[-1]
    return (image_name,murl, turl)



#if __name__ == "__main__":
query = sys.argv[1]
results = bing_image_search(query)
print(results[2])

