from bs4 import BeautifulSoup
import requests
import codecs
import random
from random import randrange
import json
from datetime import timedelta
from datetime import datetime

def random_date(start, end):
    """
    This function will return a random datetime between two datetime 
    objects.
    """
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = randrange(int_delta)
    return start + timedelta(seconds=random_second)

styles = ["mens-athletic-shoes", "mens-boots", "mens-casual-shoes", "mens-dress-shoes", "mens-sandals"]

base_url = "https://www.famousfootwear.ca/"
descriptions = ["Modern", 
"High quality canvas construction", 
"Full canvas double sided print with rounded toe construction", 
"Elastic stretch V for easy on-and-off use", "High-quality and light-weight", 
"Crafted from a premium fabric blend for enhanced moisture-wicking performance",
"Soft textile lining with lightweight construction for maximum comfort",
"High quality EVA sole for traction and exceptional durability",
"Water-resistant with a vibrant canvas print along the full length of the tops"]


counter = 0
startDate = datetime.strptime('1/1/2015 1:30 PM', '%m/%d/%Y %I:%M %p')
endDate = datetime.strptime('1/1/2020 4:50 AM', '%m/%d/%Y %I:%M %p')
globalData = []

for style in styles:
    f=codecs.open(style + ".html", 'r')
    html = f.read()
    soup = BeautifulSoup(html, 'html.parser')
    productCells = soup.body.find_all("div", {"class": "productCell"})
    for productCell in productCells:

        #price
        price = productCell.find("span",{"class": "variantPrice"})
        if price == None : 
            price = productCell.find("span",{"class": "salePrice"})
        price = price.string.replace("$","")

        #brand
        brand = productCell.find("span",{"class": "brand"}).string.lstrip().rstrip()

        #colour
        colour = productCell.find("span",{"class": "styleName color"}).string

        #name
        name = productCell.find("span",{"class": "styleName name"}).string.lstrip().rstrip()

        #size is random
        size = random.randint(6,13) 

        #description is random
        i = random.randint(0,len(descriptions)-1) 
        description = descriptions[i]

        #stock is random
        stock = random.randint(1,15)

        #image_url
        full_url = productCell.find("img")
        if full_url.has_attr("src"):
            full_url = base_url + full_url['src']
        else:
            full_url = base_url + full_url['original']
        
        data = {}
        data["model"] = "exampleapp.shoe"
        field = {}
        counter += 1
        field["sid"] = counter
        field["price"] = float(price)
        field["style"] = style
        field["brand"] = brand
        field["stock"] = stock
        field["size"] = size
        field["image_url"] = full_url
        field["colour"] = colour
        field["name"] = name
        field["release_date"] = (str)(random_date(startDate, endDate)).split(" ")[0]
        field["description"] =description
        data["fields"] = field
        globalData.append(data)


with open('db.json', 'w') as f:
    json.dump(globalData, f)
    